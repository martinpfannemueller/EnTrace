<template>
  <div>
    <b-row class="header">
      <b-col>
        <h4>
          🐨
          <strong>CoalaViz</strong>: Enhanced Traceability in Adaptive
          Communication Systems
        </h4>
      </b-col>
      <b-col cols="3">
        <h4 class="float-right" style="margin-right: 5px;">
          Status:
          <b-badge v-if="connected" variant="success">
            <font-awesome-icon icon="check-square" />&nbsp;Connected
          </b-badge>
          <b-badge v-else variant="danger">
            <font-awesome-icon icon="times-circle" />&nbsp;Not connected
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
  padding-top: 8px;
}
hr {
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 2px;
  margin-bottom: 10px;
}
</style>
