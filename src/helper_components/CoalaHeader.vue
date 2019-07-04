<template>
  <div>
    <b-row class="header">
      <b-col cols="7">
        <h4>
          🐨
          <strong>CoalaViz</strong>: Enhanced Traceability in Adaptive
          Communication Systems
        </h4>
      </b-col>
      <b-col style="margin-top: 10px">
        x
      </b-col>
      <b-col cols="3">
        <h4 class="float-right" style="margin-right: 5px;">
          Status:
          <b-badge :variant="connected ? 'success' : 'danger'">
            <font-awesome-icon
              :icon="connected ? 'check-square' : 'times-circle'"
            />&nbsp; {{ connected ? "Connected" : "Not connected" }}
          </b-badge>
        </h4>
      </b-col>
    </b-row>
    <hr />
  </div>
</template>

<script>
export default {
  computed: {
    connected() {
      return this.$store.state.connected;
    }
  }
};
</script>

<style scoped>
.header {
  background-color: rgba(255, 255, 255, 0.65);
}
hr {
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 0px;
  margin-bottom: 10px;
}

h4 {
  margin-top: 8px;
}
</style>
