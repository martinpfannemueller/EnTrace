import Paho from "paho-mqtt";
import { createNewEvent, store } from "../store/store";

// Create a client instance
const client = new Paho.Client("localhost", 8080, "clientId");

// Function to connect, handles all incomming event messages
function connectToConnector() {
  // Helper variables, will be committed to the store
  var edges = [];
  var nodes = [];
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
    // Connect
    createNewEvent(
      "General",
      "Connection successful",
      "CoalaViz is now connected to the MQTT connector",
      true,
      true,
      false
    );
    // Set "connected" status to true
    store.commit("simulationStatusChange", true);
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
    switch (message.destinationName) {
      case "startOfSimulation":
        console.log(JSON.parse(message.payloadString));
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
        createNewEvent(
          "Performance View",
          "New metric weights arrived",
          "The adaptation logic has sent initial performance weights"
        );
        newWeights(JSON.parse(message.payloadString));
        break;
      case "fm": // TODO: Create
        createNewEvent(
          "Configuration View",
          "New context feature model",
          "A new initial context feature model has arrived"
        );
        store.commit("updateCFM", JSON.parse(message.payloadString));
        break;
      case "cardyFMConfig": // TODO: Create
        createNewEvent(
          "Configuration View",
          "New configuration",
          "The adaptation logic has changed the configuration"
        );
        store.commit("updateCFMValues", JSON.parse(message.payloadString));
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
    let index = edges.findIndex(x => x.edgeId === modEdge.edgeId);

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

// Called when a new messge is send back to the adaptation logic
function sendMessage(payload, channel) {
  let stringMessage = JSON.stringify(payload);
  let message = new Paho.Message(stringMessage);
  message.destinationName = channel;
  client.send(message);
}

export { client, connectToConnector, sendMessage };
