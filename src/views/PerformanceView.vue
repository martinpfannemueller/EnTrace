<template>
  <view-header :id="id" :element-name="name">
    <b-row>
      <b-col v-for="weight in displayedWeights" :key="weight.weight">
        <b-form-input
          v-model.number="weight.factor"
          size="sm"
          type="number"
        ></b-form-input>
        <div class="text-muted interface-text">
          {{ weight.weight }}
        </div>
      </b-col>
      <b-col v-if="displayedWeights.length >= 1" cols="3">
        <b-button
          id="applyButton"
          style="margin-top: 3px"
          size="sm"
          variant="primary"
          @click="sendWeights"
        >
          <font-awesome-icon icon="check" />&nbsp;Apply weights
        </b-button>
      </b-col>
      <b-col v-else class="no-weights" height="270px">&nbsp;</b-col>
    </b-row>
  </view-header>
</template>

<script>
import ViewHeader from "../helper_components/ViewHeader";
import { sendMessage } from "../connector/mqtt-connector";
import { createNewEvent, store } from "../store/store";
export default {
  components: {
    "view-header": ViewHeader
  },
  data() {
    return {
      name: "Performance View",
      id: 4,
      displayedWeights: ""
    };
  },
  computed: {
    storeWeights() {
      return this.$store.state.weights;
    }
  },
  watch: {
    storeWeights: function() {
      this.displayedWeights = this.storeWeights;
      this.normalizeWeights(this.displayedWeights);
    }
  },
  mounted() {
    this.displayedWeights = this.storeWeights;
    this.normalizeWeights(this.displayedWeights);
  },
  methods: {
    // Allows sending the newly entered weights to the adaptation logic, triggers the appropriate event
    sendWeights() {
      // Normalize weights before sending, also updates the store with the new weights
      this.normalizeWeights(this.displayedWeights, true);

      // Send message to the connector
      sendMessage(this.displayedWeights, "startOfSimulation");

      // Create event in the event view
      var weightString = "";
      this.displayedWeights.forEach(function(d) {
        weightString = weightString + d.weight + ": " + d.factor + ", ";
      });
      weightString = weightString.slice(0, -2); // Slices off the last comma
      createNewEvent(
        "Performance View",
        "Weights sent",
        "The following weights have been sent: " + weightString,
        false
      );
    },
    // Normalizes the weights so they sum up to one, store updating is turned off by default
    normalizeWeights(weights, update = false) {
      let normalizedWeights = weights;
      let sumOfWeights = 0;
      normalizedWeights.forEach(function(d) {
        sumOfWeights += d.factor;
      });
      normalizedWeights.forEach(function(d) {
        d.factor = d.factor / sumOfWeights;
      });
      if (update) {
        store.commit("updateWeights", normalizedWeights);
      }
    }
  }
};
</script>

<style>
.no-weights {
  display: block;
  width: 100%;
  line-height: 55px;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
