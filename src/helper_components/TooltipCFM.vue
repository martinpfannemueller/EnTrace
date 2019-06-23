<template>
  <div>
    <span v-if="selectedElement.length > 0">
      <font-awesome-icon icon="info-circle" />
      &nbsp;{{ selectedElement }}
      <br />
    </span>
    <span v-if="elementValue.length > 0">
      <font-awesome-icon icon="calculator" />
      &nbsp;{{ elementValue }}
      <br />
    </span>
    <span v-if="elementRange.length > 0">
      <font-awesome-icon icon="ruler-horizontal" />
      &nbsp;{{ elementRange }}
      <br />
    </span>
    <span v-if="featureInstanceCardinality.length > 0">
      <font-awesome-icon icon="arrows-alt-h" />
      &nbsp;{{ featureInstanceCardinality }}
      <br />
    </span>
    <span v-if="groupInstanceCardinality.length > 0">
      <font-awesome-icon icon="arrows-alt-h" />
      &nbsp;{{ groupInstanceCardinality }}
      <br />
    </span>
    <span v-if="groupTypeCardinality.length > 0">
      <font-awesome-icon icon="arrows-alt-h" />
      &nbsp;{{ groupTypeCardinality }}
      <br />
    </span>
  </div>
</template>

<script>
export default {
  props: [
    "showTooltip",
    "selectedElement",
    "elementValue",
    "elementRange",
    "featureInstanceCardinality",
    "groupInstanceCardinality",
    "groupTypeCardinality"
  ]
};
</script>

<style></style>
