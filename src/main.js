import Vue from "vue"
import Vuex from "vuex"
import App from "./App.vue"
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import Paho from "paho-mqtt"

Vue.use(Vuex);
Vue.use(BootstrapVue);

const store = new Vuex.Store({
  state: {
    nodes: [],
    edges: [],
    weights: [],
    metrics: [],
    cfm: []
  },
  mutations: {
    updateNodes(state, payload) {
      state.nodes = payload;
    },
    updateEdges(state, payload) {
      state.edges = payload;
    },
    updateMetrics(state, payload) {
      state.metrics = payload;
    },
    updateWeights(state, payload) {
      state.weights = payload;
    },
    updateCFM(state, payload) {
      state.cfm = payload; 
    }
  }
});

// Create a client instance
var client = new Paho.Client("localhost", 8080, "clientId");
var edges = [];
var nodes = [];
var metrics = [];
var weights = [];


// Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({
  onSuccess: onConnect
});

function onConnect() {
  console.log("Connection successful!");
  client.subscribe("add-edge");
  client.subscribe("mod-edge");
  client.subscribe("remove-edge");
  client.subscribe("add-node");
  client.subscribe("mod-node");
  client.subscribe("new-metric-value");
  client.subscribe("new-metricWeights");
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

// Called when a new message arrives from broker
function onMessageArrived(message) {
  switch (message.destinationName) {
    case "add-node":
      nodes.push(JSON.parse(message.payloadString));
      store.commit("updateNodes", nodes);
      break;
    case "mod-node":
      modifyNodes(JSON.parse(message.payloadString), nodes)
      break;
    case "remove-node":
      modifyNodes(JSON.parse(message.payloadString), nodes)
      break;
    case "add-edge":
      edges.push(JSON.parse(message.payloadString));
      store.commit("updateEdges", edges);
      break;
    case "mod-edge":
      modifyEdges(JSON.parse(message.payloadString), edges);
      break;
    case "remove-edge":
      modifyEdges(JSON.parse(message.payloadString), edges);
      break;
    case "new-metric-value":
      newMetric(JSON.parse(message.payloadString), metrics)
      break;
    case "new-metricWeights":
      console.log("New weights arrived");
      loadWeights(JSON.parse(message.payloadString));
      break;
  }
}

// Called when nodes are modified/deleted
function modifyNodes(modNode, nodes) {
  // Set index to determine which node element is to be modified
  let index;
  index = nodes.findIndex(x => x.nodeId === modNode.nodeId);
  if (modNode.type == "remove-node") {
    // Remove node if type is set to remove (not yet specified)
    nodes.splice(index, 1);
    // console.log("Node removed");
  } else if (modNode.type == "mod-node") {
    // Determine what is to be changed
    switch (modNode.property) {
      case "color":
        nodes[index]["color"] = modNode.newValue;
        break;
      case "GraphElementProperty-longitude":
        nodes[index]["x"] = modNode.newValue;
        break;
      case "GraphElementProperty-latitude":
        nodes[index]["y"] = modNode.newValue;
        break;
      default:
        break;
    }
    store.commit("updateNodes", nodes);
    // console.log("Node modified");
    // console.log(nodes);
  }
}

// Called when edges are modified/deleted
function modifyEdges(modEdge, edges) {
  // Set index to determine which edge element is to be modified
  let index;
  index = edges.findIndex(x => x.edgeId === modEdge.edgeId);

  if (modEdge.type == "remove-edge") {
    // Remove edge if type is set to remove
    edges.splice(index, 1);
    // console.log("Edge removed");

  } else if (modEdge.type == "mod-edge") {
    // Determine what is to be changed
    switch (modEdge.property) {
      case "color":
        edges[index]["color"] = modEdge.newValue;
        break;
      default:
        break;
    }
    store.commit("updateEdges", edges);
    // console.log("Edge modified");
    // console.log(edges);
  }
}

// Called when new metric value arrives
function newMetric(newValue, metrics) {
  // Check if metrics already exists
  if (metrics.length == 0) {
    // console.log("Wird angelegt");
    metrics.push({
      "name": newValue.metric,
      "data": [newValue.value]
    });
  } else {
    // console.log("Gibt es bereits");
    metrics[0].data.push(newValue.value);
    console.log(metrics);
  }
  while (metrics[0].data.length > 10) {
    metrics[0].data.splice(0, 1)
  }
  store.commit("updateMetrics", metrics);
}

// Called when new metric weights arrive
function loadWeights(newWeights) {
  weights = newWeights.stringMetricWeights;
  store.commit("updateWeights", weights); 
  console.log(weights);
  
}

var vm = new Vue({
  el: '#app',
  store: store,
  render: h => h(App)
})
