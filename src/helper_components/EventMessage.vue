<template>
  <b-card style="margin-bottom: 6px">
    <p class="interface-text-small">
      <!-- Finalize -->
      <font-awesome-icon
        v-if="eventSuccess || eventWarn"
        :icon="specialEvent(eventSuccess, eventWarn)"
      />
      <strong>{{ eventTitle }}: </strong>
      {{ eventText }}
    </p>
    <div slot="footer">
      <p class="interface-text-small">
        <span>
          <b-badge style="font-size: 11px">
            <!-- eslint-disable-next-line prettier/prettier -->
          <font-awesome-icon icon="clock" />&nbsp;{{ eventTimestamp }}</b-badge>
        </span>
        <span style="text-align: right;">
          <!-- eslint-disable-next-line prettier/prettier -->
        <b-badge style="font-size: 11px" :variant="eventSystemEvent ? 'info' : 'primary'">
            <!-- eslint-disable-next-line prettier/prettier -->
          <font-awesome-icon :icon="eventSystemEvent ? 'sign-in-alt' : 'sign-out-alt'"/>
            &nbsp;{{ eventChannel }}
          </b-badge>
        </span>
      </p>
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
    },
    eventSystemEvent: {
      type: Boolean,
      default: true
    },
    eventSuccess: {
      type: Boolean,
      default: false
    },
    eventWarn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    specialEvent(success, warn) {
      // return "check-square";
      if (success) return "check-square";
      if (warn) return "times-circle";
      return "info-circle";
    }
  }
};
</script>

<style scoped>
p {
  margin: 0px;
  width: 100%;
}

.special {
  color: white;
}

.card-body {
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 6px;
  padding-right: 4px;
}

.card-footer {
  padding: 4px;
}
</style>
