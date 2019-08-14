import Paho from "paho-mqtt";
import { createNewEvent, store } from "../store/store";

// Create a client instance
const client = new Paho.Client("localhost", 8080, "clientId");
var newtimedEventId = 0;

// Connects to the MQTT connector, handles all incomming event messages
function connectToConnector() {
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
    store.commit("changeConnectionStatus", true);
    // Create event in event view
    createNewEvent(
      "General",
      "Connection successful",
      "CoalaViz is now connected to the MQTT connector",
      true,
      true,
      false
    );

    client.subscribe("startOfSimulation");
    client.subscribe("add-edge"); // Network View
    client.subscribe("mod-edge"); // Network View
    client.subscribe("remove-edge"); // Network View
    client.subscribe("add-node"); // Network View
    client.subscribe("mod-node"); // Network View
    client.subscribe("remove-node"); // Network View
    client.subscribe("new-metric-value"); // Metric View
    client.subscribe("new-metricWeights"); // Performance View
    client.subscribe("fm"); // Configuration View
    client.subscribe("cardyFMConfig"); // Configuration/State View
  }

  // Handle lost connections
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      let eventText =
        "CoalaViz lost its connection to the MQTT connector: " +
        responseObject.errorMessage;
      // Create event in event view
      createNewEvent(
        "General",
        "Connection lost",
        eventText,
        true,
        false,
        true
      );
      store.commit("changeConnectionStatus", false);
    }
  }

  // Called when a new message arrives from broker
  function onMessageArrived(message) {
    var incommingMessage = JSON.parse(message.payloadString);
    // console.log(incommingMessage);
    var event, timedEventId;
    // console.log(incommingMessage.timedEventId + ": " + Date.now());

    // EVALUATION MODE
    // Check if evaluation mode
    if (incommingMessage.hasOwnProperty('timedEventId') && incommingMessage.timedEventId != 0) {
      // Set current event ID for store
      timedEventId = incommingMessage.timedEventId;
      store.commit("setCurrentTimedEventId", timedEventId);

      // Set current time stamp for store
      var timeStampMilliseconds = incommingMessage.timeStampMilliseconds;
      if (
        timeStampMilliseconds !==
        store.state.evaluation.currentTimeStampMilliseconds
      ) {
        store.commit("setCurrentTimeStampMilliseconds", timeStampMilliseconds);
      }

      event = incommingMessage.event;

      // Network view poisson distribution
    } else if (incommingMessage.hasOwnProperty('timedEventId') && incommingMessage.timedEventId == 0) {
      event = incommingMessage.event;
      // Create artificial IDs for the artificial cases
      timedEventId = newtimedEventId;

      // Set current time stamp for store
      timeStampMilliseconds = incommingMessage.timeStampMilliseconds;
      if (
        timeStampMilliseconds !==
        store.state.evaluation.currentTimeStampMilliseconds
      ) {
        store.commit("setCurrentTimeStampMilliseconds", timeStampMilliseconds);
      }

      store.commit("setCurrentTimedEventId", timedEventId);
      newtimedEventId++;
      event = incommingMessage.event;
      // No evaluation mode
    } else {
      event = incommingMessage;
      // Create artificial IDs for the artificial cases
      timedEventId = newtimedEventId;
      store.commit("setCurrentTimedEventId", timedEventId);
      newtimedEventId++;
    }
    // EVALUATION MODE

    switch (message.destinationName) {
      case "startOfSimulation":
        break;
      case "add-node":
        // Start the evaluation by setting the time here
        store.commit("logStart", {
          timedEventId,
          timeStampMilliseconds,
          startTime: window.performance.now(),
          view: "Network View"
        });
        store.commit("addNode", event);
        store.commit("updateNetworkView", 1);
        break;
      case "mod-node":
        // Start the evaluation by setting the time here
        store.commit("logStart", {
          timedEventId,
          timeStampMilliseconds,
          startTime: window.performance.now(),
          view: "Network View"
        });
        store.commit("modNode", event);
        store.commit("updateNetworkView", 1);
        break;
      case "remove-node":
        // Start the evaluation by setting the time here
        store.commit("logStart", {
          timedEventId,
          timeStampMilliseconds,
          startTime: window.performance.now(),
          view: "Network View"
        });
        store.commit("removeNode", event);
        store.commit("updateNetworkView", 1);
        break;
      case "add-edge":
        // Start the evaluation by setting the time here
        store.commit("logStart", {
          timedEventId,
          timeStampMilliseconds,
          startTime: window.performance.now(),
          view: "Network View"
        });
        store.commit("addEdge", event);
        store.commit("updateNetworkView", 1);
        break;
      case "mod-edge":
        // Start the evaluation by setting the time here
        store.commit("logStart", {
          timedEventId,
          timeStampMilliseconds,
          startTime: window.performance.now(),
          view: "Network View"
        });
        store.commit("modEdge", event);
        store.commit("updateNetworkView", 1);
        break;
      case "remove-edge":
        // Start the evaluation by setting the time here
        store.commit("logStart", {
          timedEventId,
          timeStampMilliseconds,
          startTime: window.performance.now(),
          view: "Network View"
        });
        store.commit("removeEdge", event);
        store.commit("updateNetworkView", 1);
        break;
      case "new-metric-value":
        // Start the evaluation by setting the time here
        store.commit("logStart", {
          timedEventId,
          timeStampMilliseconds,
          startTime: window.performance.now(),
          view: "Metric View"
        });
        store.commit("updateMetrics", event);
        break;
      case "new-metricWeights":
        store.commit("updateWeights", event.stringMetricWeights);
        createNewEvent(
          "Performance View",
          "New metric weights arrived",
          "The adaptation logic has sent initial performance weights"
        );
        break;
      case "fm":
        // Start the evaluation by setting the time here
        store.commit("logStart", {
          timedEventId,
          timeStampMilliseconds,
          startTime: window.performance.now(),
          view: "Configuration View"
        });
        store.commit("updateCFM", event);
        createNewEvent(
          "Configuration View",
          "New context feature model",
          "A new initial context feature model has arrived"
        );
        break;
      case "cardyFMConfig":
        // Start the evaluation by setting the time here
        store.commit("logStart", {
          timedEventId,
          timeStampMilliseconds,
          startTime: window.performance.now(),
          view: "Configuration View"
        });
        store.commit("logStart", {
          timedEventId,
          timeStampMilliseconds,
          startTime: window.performance.now(),
          view: "State View"
        });
        store.commit("updateCFMValues", event);
        createNewEvent(
          "Configuration View",
          "New configuration",
          "The adaptation logic has changed the configuration"
        );
        break;
    }
  }
}

// Called when disconnected
function disconnectFromConnector() {
  client.disconnect();
  store.commit("changeConnectionStatus", false);
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

// Export functions to make them available for other files
export { client, connectToConnector, disconnectFromConnector, sendMessage };
