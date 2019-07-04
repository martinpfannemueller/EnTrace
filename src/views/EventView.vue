<template>
  <view-header :id="id" height="400px" :element-name="name">
    <b-row class="interface-text">
      <b-col>
        <strong style="margin-left: 3px">Channels: </strong>
      </b-col>
      <b-col cols="10">
        <b-form-group>
          <b-form-checkbox-group
            v-model="selected"
            :options="options"
          ></b-form-checkbox-group>
        </b-form-group>
      </b-col>
    </b-row>
    <div class="event-holder">
      <event-message
        v-for="event in events"
        :key="event.eventTimestamp"
        :event-title="event.eventTitle"
        :event-channel="event.eventChannel"
        :event-text="event.eventText"
        :event-timestamp="event.eventTimestamp"
      ></event-message>
    </div>
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
  watch: {
    events: function(val) {
      console.log("New events arrived");
      console.log(val);
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style>
.event-holder {
  display: block;
  height: 200px;
  margin: 3px;
  overflow-y: auto;
}
</style>
