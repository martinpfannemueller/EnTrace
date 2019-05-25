<template>
  <b-card class="shadow-sm">
    <b-row slot="header">
      <b-col>
        <h5>{{ elementName }}</h5>
      </b-col>
      <!-- <b-col>
      </b-col> -->
      <b-col>
        <b-button
          variant="outline-secondary"
          size="sm"
          class="float-right"
          @click="showCollapse = !showCollapse"
        >Toggle view</b-button>
      </b-col>
    </b-row>
    <b-collapse v-model="showCollapse" :id="elementName">
      <slot/>
    </b-collapse>
    <!-- <b-row slot="footer">Last updated: 3s</b-row> -->
  </b-card>
</template>

<script>
export default {
  props: ["elementName"],
  data() {
    return {
      showCollapse: true
    };
  },
  methods: {
    close(d) {
      console.log(d);
    }
  }
};
</script> 

<style>
</style>
