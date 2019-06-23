<template>
  <view-header :id="id" height="400px" :element-name="name">
    <!-- <transition-group name="messages">
      <event-message v-for="message in messages" :key="message.i"/>
    </transition-group> -->
    <event-message
      event-title="New CFM Value"
      event-channel="New CFM"
      event-text="object object"
      event-timestamp="40 ms"
    ></event-message>
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
      height: 300
    };
  },
  computed: {
    events() {
      return this.$store.state.events;
    }
  },
  watch: {
    events: function(val) {
      console.log(val);
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style>
#id {
  overflow: scroll;
}
</style>
