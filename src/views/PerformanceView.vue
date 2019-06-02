<template>
  <view-header :elementName="name">
    <b-row>
      <b-col>
        <b-form-input v-model="deadlinesWeight" placeholder="Enter weight"></b-form-input>
        <div class="mt-2 text-muted">Matched deadlines: {{ deadlinesWeight }}</div>
      </b-col>+
      <b-col>
        <b-form-input v-model="performanceWeight" placeholder="Enter weight"></b-form-input>
        <div class="mt-2 text-muted">Performance: {{ performanceWeight }}</div>
      </b-col>
      <b-col>
        <b-button variant="primary" id="applyButton" @click="applyWeights">Apply</b-button>
      </b-col>
  </view-header>
</template>

<script>
import ViewHeader from "./ViewHeader.vue";
export default {
  data() {
    return {
      name: "Performance View",
      deadlinesWeight: "",
      performanceWeight: ""
    };
  },
  computed: {
    weights() {
      return this.$store.state.weights;
    }
  },
  components: {
    "view-header": ViewHeader
  },
  methods: {
    applyWeights() {
      console.log("Applied");
    }
  }
};
</script> 

<style>
</style>
