<template>
  <view-header :id="id" height="400px" :element-name="name">
    <b-row>
      <!-- <b-col cols="2" class="interface-text">
        Channels:
        <b-form-group>
          <b-form-checkbox-group
            v-model="selected"
            :options="options"
          ></b-form-checkbox-group>
        </b-form-group>
      </b-col> -->
      <b-col>
        <div class="event-holder">
          <event-message
            v-for="(event, index) in events"
            :key="index"
            :event-title="event.eventTitle"
            :event-channel="event.eventChannel"
            :event-text="event.eventText"
            :event-timestamp="event.eventTimestamp"
            :event-incomming="event.eventIncomming"
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
      width: 650,
      height: 300,
      selected: ["Reconfigurations", "Network events", "Performance changes"],
      options: ["Reconfigurations", "Network events", "Performance changes"]
    };
  },
  computed: {
    events() {
      return this.$store.state.events;
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>

<style>
.event-holder {
  display: block;
  height: 242px;
  margin: 3px;
  overflow-y: auto;
}
</style>
