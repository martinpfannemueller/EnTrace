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
          size="sm"
          variant="primary"
          @click="applyWeights"
        >
          <font-awesome-icon icon="check" />&nbsp;Apply weights
        </b-button>
      </b-col>
      <b-col v-else>No weights loaded</b-col>
    </b-row>
  </view-header>
</template>

<script>
import ViewHeader from "../helper_components/ViewHeader";
import InputField from "../helper_components/InputField";
import { mapMutations } from "vuex";
// eslint-disable-next-line no-unused-vars
import { client, sendMessage } from "../connector/mqtt-connector";
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
    applyWeights() {
      console.log("Applied");
      console.log(this.weights);
      sendMessage(this.weights, "startOfSimulation");
    }
  }
};
</script>

<style></style>
