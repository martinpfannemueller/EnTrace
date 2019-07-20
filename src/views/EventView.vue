<template>
  <view-header :id="id" :element-name="name">
    <b-row>
      <b-col cols="3" class="interface-text-small" style="padding-right: 6px">
        <b-card class="event-holder">
          <strong>Filter events by channel</strong>
          <br />
          <b-form-group>
            <b-form-checkbox-group
              v-model="selectedChannel"
              class="verical"
              :options="optionsChannel"
            ></b-form-checkbox-group>
          </b-form-group>
          <b-button
            variant="outline-danger"
            size="sm"
            :disabled="filteredEvents.length == 0"
            @click="clearEvents()"
          >
            <font-awesome-icon icon="trash-alt" />&nbsp;Clear events
          </b-button>
        </b-card>
      </b-col>
      <b-col style="padding-left: 0px">
        <div class="event-holder">
          <event-message
            v-for="(event, index) in filteredEvents"
            :key="index"
            :event-title="event.eventTitle"
            :event-channel="event.eventChannel"
            :event-text="event.eventText"
            :event-timestamp="event.eventTimestamp"
            :event-incomming="event.eventIncomming"
            :event-success="event.eventSuccess"
            :event-warn="event.eventWarn"
          ></event-message>
        </div>
      </b-col>
    </b-row>
  </view-header>
</template>

<script>
import ViewHeader from "../helper_components/ViewHeader";
import EventMessage from "../helper_components/EventMessage";
export default {
  components: {
    "view-header": ViewHeader,
    "event-message": EventMessage
  },
  data() {
    return {
      name: "Event View",
      id: 5,
      selectedChannel: [
        "General",
        "State View",
        "Configuration View",
        "Performance View",
        "Metric View"
      ],
      optionsChannel: [
        "General",
        "Configuration View",
        "State View",
        "Performance View",
        "Metric View"
      ]
    };
  },
  computed: {
    filteredEvents() {
      let selectedChannel = this.selectedChannel;
      return this.$store.state.eventView.events.filter(function(event) {
        return selectedChannel.includes(event.eventChannel);
      });
    }
  },
  methods: {
    clearEvents() {
      this.$store.commit("clearEvents");
    }
  }
};
</script>

<style>
.event-holder {
  display: block;
  height: 247px;
  overflow-y: auto;
}

.card-body {
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 6px;
  padding-right: 4px;
}

.custom-control,
.custom-control-inline,
.custom-checkbox {
  margin-right: 0px;
}
</style>
