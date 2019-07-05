<template>
  <b-card style="margin-bottom: 5px">
    <p>
      <span>
        <b-badge style="font-size: 12px;">
          <!-- eslint-disable-next-line prettier/prettier -->
          <font-awesome-icon icon="clock" />&nbsp;{{ eventTimestamp }}</b-badge>
      </span>
      <span style="text-align: right;">
        <!-- eslint-disable-next-line prettier/prettier -->
        <b-badge style="font-size: 12px;" :variant="eventIncomming ? 'info' : 'primary'">
          <!-- eslint-disable-next-line prettier/prettier -->
          <font-awesome-icon :icon="eventIncomming ? 'sign-in-alt' : 'sign-out-alt'"/>
          &nbsp;{{ eventChannel }}
        </b-badge>
      </span>
    </p>
    <p>
      <strong>{{ eventTitle }}: </strong> {{ eventText }}
    </p>
  </b-card>
</template>

<script>
export default {
  props: {
    eventTitle: {
      type: String,
      default: ""
    },
    eventText: {
      type: String,
      default: ""
    },
    eventChannel: {
      type: String,
      default: ""
    },
    eventTimestamp: {
      type: String,
      default: ""
    },
    eventIncomming: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
h4 {
  font-size: 12px;
  margin: 0px;
}

p {
  font-size: 12px;
  margin: 0px;
  width: 100%;
}

.card-body {
  padding: 4px;
}
</style>
