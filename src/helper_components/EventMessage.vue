<template>
  <b-card style="margin-bottom: 5px">
    <b-row>
      <b-col class="vertical" cols="3">
        <b-badge> {{ eventChannel }}</b-badge>
      </b-col>
      <b-col class="vertical" cols="9" style="border-left: 1px solid grey">
        <p>
          <font-awesome-icon icon="stopwatch" />
          &nbsp;Timestamp:
          <strong class="important-text">{{ eventTimestamp }}</strong
          >&nbsp;| <strong>{{ eventTitle }}: </strong>
          {{ eventText }}
        </p>
      </b-col>
    </b-row>
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
p {
  font-size: 10px;
  margin: 0px;
}

.card-body {
  padding: 7px;
}

.vertical {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
