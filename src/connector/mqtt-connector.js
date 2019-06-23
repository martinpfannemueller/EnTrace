import Paho from "paho-mqtt";
import { store } from "../store/store";

const client = new Paho.Client("localhost", 8080, "clientId");

function connectToConnector() {
  // Create a client instance
  var edges = [];
  var nodes = [];
  var metrics = [];
  var timestamps = [];
  var weights = [];
  var events = [];

  // Set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // Connect
  client.connect({
    onSuccess: onConnect
  });

  function onConnect() {
    // Connect
    console.log("Connection successful!");
    store.commit("simulationStatusChange", true);
    client.subscribe("startOfSimulation");
    client.subscribe("add-edge");
    client.subscribe("mod-edge");
    client.subscribe("remove-edge");
    client.subscribe("add-node");
    client.subscribe("mod-node");
    client.subscribe("new-metric-value");
    client.subscribe("new-metricWeights");
    client.subscribe("fm");
    client.subscribe("cardyFMConfig");
  }

  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
      store.commit("simulationStatusChange", false);
    }
  }

  // Called when a new message arrives from broker
  function onMessageArrived(message) {
    switch (message.destinationName) {
      case "startOfSimulation":
        store.commit("simulationStatusChange", true);
        break;
      case "add-node":
        nodes.push(JSON.parse(message.payloadString));
        store.commit("updateNodes", nodes);
        break;
      case "mod-node":
        modifyNodes(JSON.parse(message.payloadString), nodes);
        break;
      case "remove-node":
        modifyNodes(JSON.parse(message.payloadString), nodes);
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
        newMetric(JSON.parse(message.payloadString), metrics);
        break;
      case "new-metricWeights":
        console.log("New metric weights arrived");
        loadWeights(JSON.parse(message.payloadString));
        break;
      case "fm": // TODO: Create
        console.log("New initial CFM model arrived");
        store.commit("updateCFM", JSON.parse(message.payloadString));
        break;
      case "cardyFMConfig": // TODO: Create
        console.log("New CFM values arrived");
        store.commit("updateCFMValues", JSON.parse(message.payloadString));
        events.push(JSON.parse(message.payloadString));
        createNewEvent(events);
        break;
    }
  }

  // Called when nodes are modified/deleted
  function modifyNodes(modNode, nodes) {
    // Set index to determine which node element is to be modified

    let index = nodes.findIndex(x => x.nodeId === modNode.nodeId);
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
        case "weight":
          edges[index]["weight"] = modEdge.newValue;
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
    // TODO: Make ready for several metrics
    // Check if metrics already exists
    if (metrics.length == 0) {
      metrics.push({
        name: newValue.metric,
        data: [newValue.value]
      });
      timestamps.push(1);
    } else {
      // Find index of metric
      let index = metrics.findIndex(x => x.name === newValue.metric);
      // Case metric is not yet in metrics
      if (index == undefined) {
        metrics.push({
          name: newValue.metric,
          data: [newValue.value]
        });
        // Case metric is already created
      } else {
        metrics[index].data.push(newValue.value);
        // Increase timestamps when new metric is added
        if (timestamps.length < metrics[index].data.length) {
          timestamps.push(metrics[index].data.length);
        }
      }
    }
    store.commit("updateMetrics", metrics);
    store.commit("updateTimestamps", timestamps);
  }

  // Called when new metric weights arrive
  function loadWeights(newWeights) {
    weights = newWeights.stringMetricWeights;
    store.commit("updateWeights", weights);
  }

  // Called when new event enters
  function createNewEvent(events) {
    store.commit("updateEvents", events);
  }
}

function sendMessage(payload, channel) {
  let stringMessage = JSON.stringify(payload);
  let message = new Paho.Message(stringMessage);
  message.destinationName = channel;
  client.send(message);
}

export { client, connectToConnector, sendMessage };
