import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    connected: false,
    edges: [],
    nodes: [],
    weights: [],
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
        h: 21,
        id: 5,
        view: "event-view"
      }
    ],
    cfm_new: "",
    cfmValues: "",
    cfmAttributeDomainList: [],
    events: [],
    hoverColor: "rgb(23, 162, 184)"
  },
  mutations: {
    simulationStatusChange(state, payload) {
      state.connected = payload;
    },
    updateNodes(state, payload) {
      state.nodes = payload;
    },
    updateEdges(state, payload) {
      state.edges = payload;
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
    // Used to manipulate single weights in the performance view
    updateSingleWeight(state, { index, newWeight }) {
      state.weights[index] = newWeight;
    },
    updateCFM(state, payload) {
      state.cfm_new = payload;
    },
    updateCFMValues(state, payload) {
      state.cfmValues = payload;
    },
    updateEvents(state, payload) {
      state.events = payload;
    },
    updateToggle(state, payload) {
      state.toggleMap = payload;
    },
    updateAttributeDomainList(state, payload) {
      state.cfmAttributeDomainList.push(payload);
    }
  }
});
