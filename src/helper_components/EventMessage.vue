<template>
  <b-card>
    <h4>
      <b-badge variant="info">{{ eventChannel }}</b-badge
      >&nbsp;{{ eventTitle }}
    </h4>
    <b-card-text>{{ eventText }} </b-card-text>
    <div slot="footer">
      <p class="text-muted">Timestamp: {{ eventTimestamp }}</p>
    </div>
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
    }
  }
};
</script>

<style scoped>
h4 {
  font-size: 14px;
  margin-bottom: 3px;
}

h6 {
  font-size: 10px;
  margin: 0px;
}

p {
  font-size: 10px;
  margin: 0px;
}

.card-subtitle {
  margin-bottom: 0px;
}

.card-body {
  padding: 7px;
}

.card-footer {
  padding-left: 7px;
  padding-right: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>
