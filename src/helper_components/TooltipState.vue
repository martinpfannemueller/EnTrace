<template>
  <div v-if="stateCollection.length >= 1" class="tooltip-state">
    <!-- Number of states:
    <span class="important-text">{{ stateCollection.length }}</span>
    <br /> -->
    <transition name="fade">
      <div v-show="selectedLink != ''">
        <font-awesome-icon icon="link" />&nbsp;Selected link:
        <span class="important-text"> {{ selectedLink }}</span> <br />
        <font-awesome-icon icon="weight" />&nbsp;Link count:
        <span class="important-text"> {{ linkCount }}</span> <br />
        <hr />
      </div>
    </transition>
    <font-awesome-icon icon="cogs" />&nbsp;Selected state:
    <span class="important-text"> {{ selectedState }}</span> <br />
    <font-awesome-icon icon="hashtag" />&nbsp;Hash:
    {{ stateCollection[selectedState - 1].hash }} <br />
    <br />
    <font-awesome-icon icon="check-square" />&nbsp;<strong>Features</strong>
    <br />
    <span
      v-for="(feature, index) in stateCollection[selectedState - 1].state
        .stringFeatures"
      :key="feature.name"
    >
      <!-- eslint-disable-next-line prettier/prettier -->
      {{ feature.name}}<span
        v-show="
          index !=
            stateCollection[selectedState - 1].state.stringFeatures.length - 1
        "
        >,</span
      >
    </span>
    <br />
    <br />
    <font-awesome-icon icon="info-circle" />&nbsp;<strong>Attributes</strong>
    <br />
    <span
      v-for="(attribute, index) in stateCollection[selectedState - 1].state
        .stringAttributes"
      :key="attribute.name"
    >
      {{ attribute.name }}:
      <span class="important-text">
        {{
          attribute.intValue != undefined
            ? attribute.intValue
            : attribute.interval
        }}</span
      ><span
        v-show="
          index !=
            stateCollection[selectedState - 1].state.stringAttributes.length - 1
        "
        >,</span
      >
    </span>
  </div>
</template>

<script>
export default {
  props: {
    stateCollection: {
      type: Array,
      default: function() {
        return [];
      }
    },
    selectedState: {
      type: [Number, String],
      default: undefined
    },
    selectedLink: {
      type: String,
      default: ""
    },
    linkCount: {
      type: Number,
      default: undefined
    },
    oldState: {
      type: [Number, String],
      default: undefined
    },
    newState: {
      type: [Number, String],
      default: undefined
    }
  }
};
</script>

<style scoped>
hr {
  border: 0.5px solid white;
  margin-top: 4px;
  margin-bottom: 4px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
