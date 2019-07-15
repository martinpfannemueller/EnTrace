import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function createNewEvent(
  channel,
  title,
  text,
  incomming = true,
  success = false,
  warn = false
) {
  let timestamp = new Date().toLocaleTimeString();
  let event = {
    eventChannel: channel,
    eventTimestamp: timestamp,
    eventTitle: title,
    eventText: text,
    eventIncomming: incomming,
    eventSuccess: success,
    eventWarn: warn
  };
  store.commit("updateEvents", event);
}

const store = new Vuex.Store({
  state: {
    connected: false,
    edges: [],
    nodes: [],
    weights: [
      { weight: "mEndToEndDropRate", factor: 0.25 },
      { weight: "mEndToEndLatency", factor: 0.25 },
      { weight: "mEJain", factor: 0.25 },
      { weight: "mEMean", factor: 0.25 }
    ],
    metrics: [],
    timestamps: [],
    toggleMap: [
      {
        visible: true,
        h0: 10,
        h: 75,
        id: 0,
        view: "network-view"
      },
      {
        visible: true,
        h0: 10,
        h: 50,
        id: 1,
        view: "metric-view"
      },
      {
        visible: true,
        h0: 10,
        h: 65,
        id: 2,
        view: "context-feature-model"
      },
      {
        visible: true,
        h0: 10,
        h: 58,
        id: 3,
        view: "state-view"
      },
      {
        visible: true,
        h0: 10,
        h: 19,
        id: 4,
        view: "performance-view"
      },
      {
        visible: true,
        h0: 10,
        h: 51,
        id: 5,
        view: "event-view"
      }
    ],
    cfm: "",
    cfmValues: "",
    cfmAttributeDomainList: [],
    events: [],
    hoverColor: "rgb(23, 162, 184)",
    senderChannel: "startOfSimulation", // Sets the channel on which the outgoing messages are send
    notConnectedErrorMessage:
      "No message was sent to the connector because there is no connection. Please reconnect!"
  },
  mutations: {
    simulationStatusChange(state, payload) {
      state.connected = payload;
    },
    addNode(state, newNode) {
      state.nodes.push(newNode);
    },
    modNode(state, modNode) {
      let index = state.nodes.findIndex(x => x.nodeId === modNode.nodeId);
      switch (modNode.property) {
        case "color":
          state.nodes[index]["color"] = modNode.newValue;
          break;
        case "GraphElementProperty-longitude":
          state.nodes[index]["x"] = modNode.newValue;
          break;
        case "GraphElementProperty-latitude":
          state.nodes[index]["y"] = modNode.newValue;
          break;
        default:
          break;
      }
      // Update links based on new node locations to move them
      for (let i = 0; i < state.edges.length; i++) {
        let d = state.edges[i];
        let indexSource = state.nodes.findIndex(x => x.nodeId === d.sourceId);
        let indexTarget = state.nodes.findIndex(x => x.nodeId === d.targetId);
        if (indexSource == -1 || indexTarget == -1) {
          console.log("Error");
        } else if (
          // Make sure only the affected links are updated
          d.sourceId == modNode.nodeId ||
          d.targetId == modNode.nodeId
        ) {
          d.sourceIdx = state.nodes[indexSource].x;
          d.sourceIdy = state.nodes[indexSource].y;
          d.targetIdx = state.nodes[indexTarget].x;
          d.targetIdy = state.nodes[indexTarget].y;
        }
      }
    },
    removeNode(state, removeNode) {
      let index = state.nodes.findIndex(x => x.nodeId === removeNode.nodeId);
      console.log(index);
      state.nodes.splice(index, 1);
    },
    addEdge(state, newEdge) {
      // Initialize position of each edge
      let indexSource = state.nodes.findIndex(
        x => x.nodeId === newEdge.sourceId
      );
      let indexTarget = state.nodes.findIndex(
        x => x.nodeId === newEdge.targetId
      );
      if (indexSource == -1 || indexTarget == -1) {
        console.log("Error");
      } else {
        newEdge.sourceIdx = state.nodes[indexSource].x;
        newEdge.sourceIdy = state.nodes[indexSource].y;
        newEdge.targetIdx = state.nodes[indexTarget].x;
        newEdge.targetIdy = state.nodes[indexTarget].y;
      }
      // Push edge into store
      state.edges.push(newEdge);
    },
    modEdge(state, modEdge) {
      // Adjust other parameters of appropriate edge
      let index = state.edges.findIndex(x => x.edgeId === modEdge.edgeId);
      switch (modEdge.property) {
        case "color":
          state.edges[index]["color"] = modEdge.newValue;
          break;
        case "weight":
          state.edges[index]["weight"] = modEdge.newValue;
          break;
        default:
          break;
      }
    },
    removeEdge(state, removeEdge) {
      let index = state.edges.findIndex(x => x.edgeId === removeEdge.edgeId);
      state.edges.splice(index, 1);
    },
    updateMetrics(state, payload) {
      state.metrics = payload;
    },
    updateTimestamps(state, payload) {
      state.timestamps = payload;
    },
    // Used to update the weights comming from the connector
    updateWeights(state, payload) {
      state.weights = payload;
    },
    updateCFM(state, payload) {
      state.cfm = payload;
    },
    updateCFMValues(state, payload) {
      state.cfmValues = payload;
    },
    updateEvents(state, payload) {
      state.events.unshift(payload);
    },
    updateToggleMap(state, payload) {
      state.toggleMap = payload;
    },
    updateAttributeDomainList(state, payload) {
      state.cfmAttributeDomainList.push(payload);
    }
  }
});

export { createNewEvent, store };
