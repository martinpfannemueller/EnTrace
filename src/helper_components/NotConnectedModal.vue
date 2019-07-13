<template>
  <b-modal
    ref="notConnectedModal"
    title="No message send"
    size="sm"
    cancel-disabled
  >
    <span
      >No message was sent to the connector because there is no
      connection.</span
    >
    <template slot="modal-footer" slot-scope="{ ok }">
      <b-button variant="primary" @click="ok()">
        OK
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {};
</script>

<style></style>
