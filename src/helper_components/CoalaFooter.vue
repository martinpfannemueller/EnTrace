<template>
  <div>
    <b-button
      variant="outline-secondary"
      size="sm"
      class="float-right"
      style="margin-right: 5px;"
    >
      <font-awesome-icon icon="power-off" />&nbsp;Turn off
    </b-button>
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

<style scoped></style>
