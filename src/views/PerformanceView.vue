<template>
  <view-header :id="id" :element-name="name">
    <b-row>
      <input-field
        v-for="(weight, index) in weights"
        :key="weight.weight"
        :weight="weight.weight"
        :factor="weight.factor"
        :index="index"
        size="sm"
      ></input-field>
      <b-col v-if="weights.length >= 1" cols="3">
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
import InputField from "../helper_components/InputField";
// eslint-disable-next-line no-unused-vars
import { client, sendMessage } from "../connector/mqtt-connector";
import { createNewEvent } from "../store/store";
export default {
  components: {
    "view-header": ViewHeader,
    "input-field": InputField
  },
  data() {
    return {
      name: "Performance View",
      id: 4
    };
  },
  computed: {
    weights() {
      return this.$store.state.weights;
    }
  },
  methods: {
    // Allows sending the newly entered weights to the adaptation logic, triggers the appropriate event
    sendWeights() {
      sendMessage(this.weights, "startOfSimulation");
      createNewEvent(
        "Performance View",
        "Weights sent",
        "The following weights have been sent: " + JSON.stringify(this.weights),
        false
      );
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
</style>
