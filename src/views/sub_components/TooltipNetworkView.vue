<template>
  <div>
    <span v-if="selectedNode != ''">
      <font-awesome-icon icon="info-circle" />
      &nbsp;Selected node: {{ selectedNode }}
      <br />
    </span>
    <span v-if="y != ''">
      <font-awesome-icon icon="map-pin" />
      &nbsp;X-coordinate: {{ x }}
      <br />
    </span>
    <span v-if="x != ''">
      <font-awesome-icon icon="map-pin" />
      &nbsp;Y-coordinate: {{ y }}
      <br />
    </span>
    <span v-if="selectedEdge != ''">
      <font-awesome-icon icon="info-circle" />
      &nbsp;Selected edge: {{ selectedEdge }}
      <br />
    </span>
    <span v-if="edgeWeight >= 0 && selectedEdge != ''">
      <font-awesome-icon icon="weight" />
      &nbsp;Weight: {{ edgeWeight }}
      <br />
    </span>
    <span v-if="edgeLength != ''">
      <font-awesome-icon icon="ruler-horizontal" />
      &nbsp;Length: {{ edgeLength }}
      <br />
    </span>
    <span v-if="sourceNode != ''">
      <font-awesome-icon icon="map-pin" />
      &nbsp;Source node: {{ sourceNode }}
      <br />
    </span>
    <span v-if="targetNode != ''">
      <font-awesome-icon icon="map-pin" />
      &nbsp;Target node: {{ targetNode }}
      <br />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    selectedNode: {
      type: [Number, String],
      default: ""
    },
    x: {
      type: [Number, String],
      default: ""
    },
    y: {
      type: [Number, String],
      default: ""
    },
    selectedEdge: {
      type: [Number, String],
      default: ""
    },
    edgeWeight: {
      type: [Number, String],
      default: ""
    },
    edgeLength: {
      type: [Number, String],
      default: ""
    },
    sourceNode: {
      type: [Number, String],
      default: ""
    },
    targetNode: {
      type: [Number, String],
      default: ""
    }
  }
};
</script>

<style></style>
