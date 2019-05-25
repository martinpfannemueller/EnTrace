<template>
  <view-header :elementName="name">
    <b-row id="network-view">
      <svg :width="500" :height="200" margin="auto"></svg>
    </b-row>
    </view-header>
</template>

<script>
import ViewHeader from "./ViewHeader.vue";
export default {
  data() {
    return {
      name: "Network View"
    };
  },
  components: {
    "view-header": ViewHeader
  }
};
</script> 

<style>
</style>
