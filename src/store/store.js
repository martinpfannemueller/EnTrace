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
    cfm: {
      fm: {
        root: {
          binaryCardinals: "NO_DOT",
          children: [
            {
              binaryCardinals: "NO_DOT",
              children: [
                {
                  binaryCardinals: "NO_DOT",
                  children: [],
                  attributes: [
                    {
                      domain: {
                        domainType: "REAL",
                        lowerBoundary: 0,
                        upperBoundary: 20
                      },
                      value: 0,
                      name: "weightOptimizationThreshold",
                      system: false,
                      currentlyChosen: false
                    }
                  ],
                  featureInstanceCardinality: { lb: 1, ub: 1 },
                  groupInstanceCardinality: { lb: 1, ub: -1 },
                  groupTypeCardinality: { lb: 1, ub: -1 },
                  name: "fsWOpt",
                  system: true,
                  currentlyChosen: false
                },
                {
                  binaryCardinals: "NO_DOT",
                  children: [
                    {
                      binaryCardinals: "NO_DOT",
                      children: [],
                      attributes: [],
                      featureInstanceCardinality: { lb: 0, ub: 1 },
                      name: "fsMAXPOWERTC",
                      system: true,
                      currentlyChosen: false
                    },
                    {
                      binaryCardinals: "NO_DOT",
                      children: [],
                      attributes: [
                        {
                          domain: {
                            domainType: "REAL",
                            lowerBoundary: 1,
                            upperBoundary: 2
                          },
                          value: 0,
                          name: "parameterKtcK",
                          system: false,
                          currentlyChosen: false
                        }
                      ],
                      featureInstanceCardinality: { lb: 0, ub: 1 },
                      groupInstanceCardinality: { lb: 1, ub: -1 },
                      groupTypeCardinality: { lb: 1, ub: -1 },
                      name: "fsDKTC",
                      system: true,
                      currentlyChosen: false
                    },
                    {
                      binaryCardinals: "NO_DOT",
                      children: [],
                      attributes: [
                        {
                          domain: {
                            domainType: "REAL",
                            lowerBoundary: 1,
                            upperBoundary: 2
                          },
                          value: 0,
                          name: "parameterEKtcK",
                          system: false,
                          currentlyChosen: false
                        }
                      ],
                      featureInstanceCardinality: { lb: 0, ub: 1 },
                      groupInstanceCardinality: { lb: 1, ub: -1 },
                      groupTypeCardinality: { lb: 1, ub: -1 },
                      name: "fsEKTC",
                      system: true,
                      currentlyChosen: false
                    },
                    {
                      binaryCardinals: "NO_DOT",
                      children: [],
                      attributes: [
                        {
                          domain: {
                            domainType: "REAL",
                            lowerBoundary: 1,
                            upperBoundary: 2
                          },
                          value: 0,
                          name: "parameterLStarKtcK",
                          system: false,
                          currentlyChosen: false
                        },
                        {
                          domain: {
                            domainType: "REAL",
                            lowerBoundary: 1,
                            upperBoundary: 2
                          },
                          value: 0,
                          name: "parameterLStarKtcA",
                          system: false,
                          currentlyChosen: false
                        }
                      ],
                      featureInstanceCardinality: { lb: 0, ub: 1 },
                      groupInstanceCardinality: { lb: 1, ub: -1 },
                      groupTypeCardinality: { lb: 1, ub: -1 },
                      name: "fsLSTARKTC",
                      system: true,
                      currentlyChosen: false
                    },
                    {
                      binaryCardinals: "NO_DOT",
                      children: [],
                      attributes: [],
                      featureInstanceCardinality: { lb: 0, ub: 1 },
                      name: "fsLMST",
                      system: true,
                      currentlyChosen: false
                    },
                    {
                      binaryCardinals: "NO_DOT",
                      children: [],
                      attributes: [],
                      featureInstanceCardinality: { lb: 0, ub: 1 },
                      name: "fsGMST",
                      system: true,
                      currentlyChosen: false
                    },
                    {
                      domain: {
                        domainType: "INTEGER",
                        lowerBoundary: 1,
                        upperBoundary: 20
                      },
                      value: 0,
                      name: "fsTCint",
                      system: true,
                      currentlyChosen: false
                    }
                  ],
                  attributes: [
                    {
                      domain: {
                        domainType: "INTEGER",
                        lowerBoundary: 1,
                        upperBoundary: 20
                      },
                      value: 0,
                      name: "fsTCint",
                      system: true,
                      currentlyChosen: false
                    }
                  ],
                  featureInstanceCardinality: { lb: 1, ub: 1 },
                  groupInstanceCardinality: { lb: 1, ub: 1 },
                  groupTypeCardinality: { lb: 1, ub: 1 },
                  name: "fsTCAlgo",
                  system: true,
                  currentlyChosen: false
                }
              ],
              attributes: [],
              featureInstanceCardinality: { lb: 1, ub: 1 },
              groupInstanceCardinality: { lb: 1, ub: -1 },
              groupTypeCardinality: { lb: 1, ub: -1 },
              name: "fsSystem",
              system: true,
              currentlyChosen: false
            },
            {
              binaryCardinals: "NO_DOT",
              children: [
                {
                  binaryCardinals: "NO_DOT",
                  children: [],
                  attributes: [
                    {
                      domain: {
                        domainType: "REAL",
                        lowerBoundary: 0,
                        upperBoundary: 5
                      },
                      value: 0,
                      name: "mobilitySpeed",
                      system: false,
                      currentlyChosen: false
                    }
                  ],
                  featureInstanceCardinality: { lb: 1, ub: 1 },
                  groupInstanceCardinality: { lb: 1, ub: -1 },
                  groupTypeCardinality: { lb: 1, ub: -1 },
                  name: "fcMobSpeed",
                  system: false,
                  currentlyChosen: false
                },
                {
                  binaryCardinals: "NO_DOT",
                  children: [
                    {
                      binaryCardinals: "NO_DOT",
                      children: [],
                      attributes: [],
                      featureInstanceCardinality: { lb: 0, ub: 1 },
                      name: "fcPOINTTOPOINT",
                      system: false,
                      currentlyChosen: false
                    },
                    {
                      binaryCardinals: "NO_DOT",
                      children: [],
                      attributes: [],
                      featureInstanceCardinality: { lb: 0, ub: 1 },
                      name: "fcGOSSIP",
                      system: false,
                      currentlyChosen: false
                    },
                    {
                      binaryCardinals: "NO_DOT",
                      children: [],
                      attributes: [],
                      featureInstanceCardinality: { lb: 0, ub: 1 },
                      name: "fcDATACOLLECTION",
                      system: false,
                      currentlyChosen: false
                    }
                  ],
                  attributes: [],
                  featureInstanceCardinality: { lb: 1, ub: 1 },
                  groupInstanceCardinality: { lb: 1, ub: 1 },
                  groupTypeCardinality: { lb: 1, ub: 1 },
                  name: "fcScenario",
                  system: false,
                  currentlyChosen: false
                },
                {
                  binaryCardinals: "NO_DOT",
                  children: [],
                  attributes: [
                    {
                      domain: {
                        domainType: "REAL",
                        lowerBoundary: 0,
                        upperBoundary: 500
                      },
                      value: 0,
                      name: "topologyDensity",
                      system: false,
                      currentlyChosen: false
                    },
                    {
                      domain: {
                        domainType: "INTEGER",
                        lowerBoundary: 0,
                        upperBoundary: 1000
                      },
                      value: 0,
                      name: "nodeCount",
                      system: false,
                      currentlyChosen: false
                    },
                    {
                      domain: {
                        domainType: "INTEGER",
                        lowerBoundary: 0,
                        upperBoundary: 1000000
                      },
                      value: 0,
                      name: "edgeCount",
                      system: false,
                      currentlyChosen: false
                    },
                    {
                      domain: {
                        domainType: "INTEGER",
                        lowerBoundary: 0,
                        upperBoundary: 5000
                      },
                      value: 0,
                      name: "worldSize",
                      system: false,
                      currentlyChosen: false
                    }
                  ],
                  featureInstanceCardinality: { lb: 1, ub: 1 },
                  groupInstanceCardinality: { lb: 1, ub: -1 },
                  groupTypeCardinality: { lb: 1, ub: -1 },
                  name: "fcTopology",
                  system: false,
                  currentlyChosen: false
                }
              ],
              attributes: [],
              featureInstanceCardinality: { lb: 1, ub: 1 },
              groupInstanceCardinality: { lb: 1, ub: -1 },
              groupTypeCardinality: { lb: 1, ub: -1 },
              name: "fcContext",
              system: false,
              currentlyChosen: false
            }
          ],
          attributes: [],
          featureInstanceCardinality: { lb: 1, ub: 1 },
          groupInstanceCardinality: { lb: 1, ub: -1 },
          groupTypeCardinality: { lb: 1, ub: -1 },
          name: "root",
          system: false,
          currentlyChosen: false
        }
      },
      type: "fm"
    },
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
