import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function createNewEvent(
  channel,
  title,
  text,
  systemEvent = true,
  success = false,
  warn = false
) {
  let timestamp = new Date().toLocaleTimeString();
  let event = {
    eventChannel: channel,
    eventTimestamp: timestamp,
    eventTitle: title,
    eventText: text,
    eventSystemEvent: systemEvent,
    eventSuccess: success,
    eventWarn: warn
  };
  store.commit("updateEvents", event);
}

const store = new Vuex.Store({
  state: {
    dashboard: {
      connected: false,
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
      notConnectedErrorMessage:
        "No message was sent to the connector because there is no connection. Please reconnect!",
      connectionFailedErrorMessage: "The connection could not be established"
    },
    settings: {
      hoverColor: "#17a2b8",
      senderChannel: "startOfSimulation" // Sets the channel on which the outgoing messages are send
    },
    networkView: {
      edges: [],
      nodes: [],
      updateNetworkView: 0
    },
    configurationView: {
      cfm: "",
      cfmValues: "",
      addedAttributes: []
    },
    metricView: {
      metrics: [],
      thresholdPercentage: 100
    },
    performanceView: {
      weights: []
    },
    stateView: {
      cfmAttributeDomainList: []
    },
    eventView: {
      events: []
    },
    evaluation: {
      currentTimedEventId: "",
      currentTimeStampMilliseconds: "",
      evaluationLogger: []
    }
  },
  mutations: {
    resetStore(state) {
      state.settings.hoverColor = "#17a2b8";
      state.settings.senderChannel = "startOfSimulation";
      state.networkView.edges = [];
      state.networkView.nodes = [];
      state.networkView.updateNetworkView = 0;
      state.configurationView.cfm = "";
      state.configurationView.cfmValues = "";
      state.configurationView.cfmAttributeDomainList = [];
      state.metricView.metrics = [];
      state.metricView.timestamps = [];
      state.performanceView.weights = [];
      state.eventView.events = [];
      state.evaluation.evaluationLogger = [];
    },
    simulationStatusChange(state, payload) {
      state.dashboard.connected = payload;
    },
    updateToggleMap(state, payload) {
      state.dashboard.toggleMap = payload;
    },
    changeSenderChannel(state, newChannel) {
      state.settings.senderChannel = newChannel;
    },
    changeHoverColor(state, hoverColor) {
      state.settings.hoverColor = hoverColor;
    },
    updateNetworkView(state, payload) {
      state.networkView.updateNetworkView =
        state.networkView.updateNetworkView + payload;
    },
    addNode(state, newNode) {
      state.networkView.nodes.push(newNode);
    },
    modNode(state, modNode) {
      let index = state.networkView.nodes.findIndex(
        x => x.nodeId === modNode.nodeId
      );
      // Catch if node exists yet
      if (index != -1 && index != undefined) {
        switch (modNode.property) {
          case "color":
            state.networkView.nodes[index]["color"] = modNode.newValue;
            break;
          case "GraphElementProperty-longitude":
            state.networkView.nodes[index]["x"] = modNode.newValue;
            break;
          case "GraphElementProperty-latitude":
            state.networkView.nodes[index]["y"] = modNode.newValue;
            break;
          default:
            break;
        }
        // Update links/edges based on new node locations to move them
        for (let i = 0; i < state.networkView.edges.length; i++) {
          let d = state.networkView.edges[i];
          let indexSource = state.networkView.nodes.findIndex(
            x => x.nodeId == d.sourceId
          );
          let indexTarget = state.networkView.nodes.findIndex(
            x => x.nodeId == d.targetId
          );
          if (indexSource == -1 || indexTarget == -1) {
            // Node does not exist
            // console.log(
            //   "Mod node: Cannot draw edge because node(s) do not exist yet"
            // );
          } else if (
            // Make sure only the affected links are updated
            d.sourceId == modNode.nodeId ||
            d.targetId == modNode.nodeId
          ) {
            d.sourceIdx = state.networkView.nodes[indexSource].x;
            d.sourceIdy = state.networkView.nodes[indexSource].y;
            d.targetIdx = state.networkView.nodes[indexTarget].x;
            d.targetIdy = state.networkView.nodes[indexTarget].y;
          }
        }
      }
    },
    removeNode(state, removeNode) {
      let index = state.networkView.nodes.findIndex(
        x => x.nodeId === removeNode.nodeId
      );
      // Catch if node exists yet
      if (index != -1 && index != undefined) {
        state.networkView.nodes.splice(index, 1);
      }
    },
    addEdge(state, newEdge) {
      // Initialize position of each edge/link
      let indexSource = state.networkView.nodes.findIndex(
        x => x.nodeId == newEdge.sourceId
      );
      let indexTarget = state.networkView.nodes.findIndex(
        x => x.nodeId == newEdge.targetId
      );
      // Check if nodes exist
      if (
        indexSource != -1 &&
        indexSource != -1 &&
        indexSource != undefined &&
        indexSource != undefined
      ) {
        newEdge.sourceIdx = state.networkView.nodes[indexSource].x;
        newEdge.sourceIdy = state.networkView.nodes[indexSource].y;
        newEdge.targetIdx = state.networkView.nodes[indexTarget].x;
        newEdge.targetIdy = state.networkView.nodes[indexTarget].y;
        // Push edge into store
        state.networkView.edges.push(newEdge);
      }
    },
    modEdge(state, modEdge) {
      // Adjust other parameters of appropriate edge
      let index = state.networkView.edges.findIndex(
        x => x.edgeId === modEdge.edgeId
      );
      // Catch if edge exists yet
      if (index != -1 && index != undefined) {
        switch (modEdge.property) {
          case "color":
            state.networkView.edges[index]["color"] = modEdge.newValue;
            break;
          case "weight":
            state.networkView.edges[index]["weight"] = modEdge.newValue;
            break;
          default:
            break;
        }
      }
    },
    removeEdge(state, removeEdge) {
      let index = state.networkView.edges.findIndex(
        x => x.edgeId === removeEdge.edgeId
      );
      // Catch if edge exists yet
      if (index != -1 && index != undefined) {
        state.networkView.edges.splice(index, 1);
      }
    },
    updateCFM(state, payload) {
      state.configurationView.cfm = payload;
    },
    updateCFMValues(state, payload) {
      state.configurationView.cfmValues = payload;
    },
    updateAddedAttribute(state, attribute) {
      state.configurationView.addedAttributes.push(attribute);
    },
    updateMetrics(state, metricValue) {
      var newMetric = true;
      // Initialize array for first value
      if (state.metricView.metrics.length == 0) {
        // Load first timetstamp and first metric into array
        state.metricView.metrics.push(
          ["timestamps", metricValue.timestamp],
          [metricValue.metric, Math.round(metricValue.value)]
        );
        // Array has already been initialised
      } else {
        // First, add the timestamps
        if (
          metricValue.timestamp !=
          state.metricView.metrics[0][state.metricView.metrics[0].length - 1]
        ) {
          state.metricView.metrics[0].push(metricValue.timestamp);
        }
        // Second, check which metric arrives
        for (let i = 1; i < state.metricView.metrics.length; i++) {
          if (metricValue.metric == state.metricView.metrics[i][0]) {
            state.metricView.metrics[i].push(Math.round(metricValue.value));
            // Check whether new value is above thresholdPercentage
            let oldValue =
              state.metricView.metrics[i][
                state.metricView.metrics[i].length - 2
              ];
            let newValue =
              state.metricView.metrics[i][
                state.metricView.metrics[i].length - 1
              ];
            let higher = Math.max(oldValue, newValue);
            let lower = Math.min(oldValue, newValue);
            if (
              higher / lower - 1 >=
              state.metricView.thresholdPercentage / 100
            ) {
              createNewEvent(
                "Metric View",
                "Threshold difference reached",
                "For the metric '" +
                  metricValue.metric +
                  "', the new value (" +
                  Math.round(newValue * 100) / 100 +
                  ")" +
                  " differs more than the threshold percentage (" +
                  state.metricView.thresholdPercentage +
                  "%) from the previous value (" +
                  Math.round(oldValue * 100) / 100 +
                  ")"
              );
            }
            newMetric = false;
          }
        }
        // Test, if a value was added in the loop, if not, it's a new metric which will be added
        if (newMetric) {
          state.metricView.metrics.push([
            metricValue.metric,
            Math.round(metricValue.value)
          ]);
        }
      }
    },
    updateThresholdPercentage(state, payload) {
      state.metricView.thresholdPercentage = payload;
    },
    updateWeights(state, payload) {
      state.performanceView.weights = payload;
    },
    updateAttributeDomainList(state, payload) {
      state.stateView.cfmAttributeDomainList.push(payload);
    },
    updateEvents(state, payload) {
      state.eventView.events.unshift(payload);
    },
    clearEvents(state) {
      state.eventView.events = [];
    },
    logStart(state, { timedEventId, timeStampMilliseconds, startTime, view }) {
      state.evaluation.evaluationLogger.push({
        timedEventId,
        view,
        timeStampMilliseconds,
        startTime: startTime,
        endTime: ""
      });
    },
    logEnd(state, { timedEventId, endTime, view }) {
      let index = state.evaluation.evaluationLogger.findIndex(
        x => x.timedEventId == timedEventId && x.view == view
      );
      if (
        index >= 0 &&
        // Make sure the endTime is only recorded once
        state.evaluation.evaluationLogger[index].endTime == ""
      ) {
        state.evaluation.evaluationLogger[index].endTime = endTime;
        state.evaluation.evaluationLogger[index].difference =
          endTime - state.evaluation.evaluationLogger[index].startTime;
      }
    },
    setCurrentTimedEventId(state, timedEventId) {
      state.evaluation.currentTimedEventId = timedEventId;
    },
    setCurrentTimeStampMilliseconds(state, timeStampMilliseconds) {
      // console.log(timeStampMilliseconds);
      state.evaluation.currentTimeStampMilliseconds = timeStampMilliseconds;
    }
  }
});

export { createNewEvent, store };
