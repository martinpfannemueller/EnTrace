import Paho from "paho-mqtt";
import { createNewEvent, store } from "../store/store";

// Create a client instance
const client = new Paho.Client("localhost", 8080, "clientId");

// Function to connect, handles all incomming event messages
function connectToConnector() {
  // Helper variables, will be committed to the store
  var metrics = [];
  var timestamps = [];
  var weights = [];

  // Set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // Connect
  client.connect({
    onSuccess: onConnect
  });

  // Connecting and subscribing to all necessary channels
  function onConnect() {
    // Set "connected" status to true
    store.commit("simulationStatusChange", true);
    // Connect
    createNewEvent(
      "General",
      "Connection successful",
      "CoalaViz is now connected to the MQTT connector",
      true,
      true,
      false
    );

    client.subscribe("startOfSimulation");
    // Network View
    client.subscribe("add-edge");
    client.subscribe("mod-edge");
    client.subscribe("remove-edge");
    client.subscribe("add-node");
    client.subscribe("mod-node");
    client.subscribe("remove-node");
    client.subscribe("new-metric-value"); // Metric View
    client.subscribe("new-metricWeights"); // Performance View
    client.subscribe("fm"); // Configuration View
    client.subscribe("cardyFMConfig"); // Configuration View
  }

  // Function to handle lost connections
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      let eventText =
        "CoalaViz lost its connection to the MQTT connector: " +
        responseObject.errorMessage;
      createNewEvent(
        "General",
        "Connection lost",
        eventText,
        true,
        false,
        true
      );
      store.commit("simulationStatusChange", false);
    }
  }

  // Called when a new message arrives from broker
  function onMessageArrived(message) {
    var incommingMessage = JSON.parse(message.payloadString);
    var event;

    // Check if evaluation mode
    if (incommingMessage.timedEventId || incommingMessage.timedEventId == 0) {
      var timedEventId = incommingMessage.timedEventId;
      event = incommingMessage.event;
      store.commit("setCurrentTimedEventId", timedEventId);
    } else {
      event = incommingMessage;
    }
    switch (message.destinationName) {
      case "startOfSimulation":
        console.log(event);
        // store.commit("simulationStatusChange", true);
        break;
      case "add-node":
        // Start the evaluation by setting the time here
        store.commit("setCurrentStartTime", window.performance.now());
        store.commit("addNode", event);
        break;
      case "mod-node":
        // Start the evaluation by setting the time here
        store.commit("setCurrentStartTime", window.performance.now());
        store.commit("modNode", event);
        break;
      case "remove-node":
        // Start the evaluation by setting the time here
        store.commit("setCurrentStartTime", window.performance.now());
        store.commit("removeNode", event);
        break;
      case "add-edge":
        // Start the evaluation by setting the time here
        store.commit("setCurrentStartTime", window.performance.now());
        store.commit("addEdge", event);
        break;
      case "mod-edge":
        // Start the evaluation by setting the time here
        store.commit("setCurrentStartTime", window.performance.now());
        store.commit("modEdge", event);
        break;
      case "remove-edge":
        // Start the evaluation by setting the time here
        store.commit("setCurrentStartTime", window.performance.now());
        store.commit("removeEdge", event);
        break;
      case "new-metric-value":
        // Start the evaluation by setting the time here
        store.commit("setCurrentStartTime", window.performance.now());
        newMetric(event, metrics);
        break;
      case "new-metricWeights":
        newWeights(event);
        createNewEvent(
          "Performance View",
          "New metric weights arrived",
          "The adaptation logic has sent initial performance weights"
        );

        break;
      case "fm":
        // Start the evaluation by setting the time here
        store.commit("setCurrentStartTime", window.performance.now());
        store.commit("updateCFM", event);
        createNewEvent(
          "Configuration View",
          "New context feature model",
          "A new initial context feature model has arrived"
        );

        break;
      case "cardyFMConfig":
        // Start the evaluation by setting the time here
        store.commit("setCurrentStartTime", window.performance.now());
        store.commit("updateCFMValues", event);
        createNewEvent(
          "Configuration View",
          "New configuration",
          "The adaptation logic has changed the configuration"
        );

        break;
    }
  }

  // Called when new metric value arrives
  function newMetric(newValue, metrics) {
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
      if (index == undefined || index == -1) {
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
  function newWeights(newWeights) {
    weights = newWeights.stringMetricWeights;
    store.commit("updateWeights", weights);
  }
}

function disconnectFromConnector() {
  client.disconnect();
  store.commit("simulationStatusChange", false);
  createNewEvent(
    "General",
    "Connection disconnected",
    "CoalaViz was disconnected from the connector",
    true,
    false,
    true
  );
}
// Called when a new messge is send back to the adaptation logic
function sendMessage(payload, channel) {
  let stringMessage = JSON.stringify(payload);
  let message = new Paho.Message(stringMessage);
  message.destinationName = channel;
  client.send(message);
}

// function transformEvaluationEvent(event) {
//   if (event.event) {
//     event.event.push(event.timedEventId);
//     event = event.event;
//   }
//   return event;
// }

export { client, connectToConnector, disconnectFromConnector, sendMessage };
