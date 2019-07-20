<template>
  <b-container fluid>
    <coala-header class="header" />
    <grid-layout
      ref="GridInstance"
      :layout.sync="layout"
      :col-num="2"
      :row-height="1"
      :is-draggable="true"
      :is-resizable="true"
      :margin="[5, 5]"
      :responsive="true"
      :auto-size="true"
      :breakpoints="{ lg: 1200, md: 800, sm: 400, xs: 300, xxs: 0 }"
      :cols="{ lg: 2, md: 2, sm: 1, xs: 1, xxs: 1 }"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :is-resizable="item.isResizable"
        :drag-ignore-from="'a, button, .card-body'"
      >
        <component :is="item.view" />
      </grid-item>
    </grid-layout>
  </b-container>
</template>

<script>
import CoalaHeader from "./helper_components/CoalaHeader";
import NetworkView from "./views/NetworkView.vue";
import MetricView from "./views/MetricView.vue";
import ConfigurationView from "./views/Configuration View.vue";
import PerformanceView from "./views/PerformanceView.vue";
import StateView from "./views/StateView.vue";
import EventView from "./views/EventView.vue";
import VueGridLayout from "vue-grid-layout";
import { store } from "./store/store";

export default {
  components: {
    "coala-header": CoalaHeader,
    "network-view": NetworkView,
    "metric-view": MetricView,
    "configuration-view": ConfigurationView,
    "performance-view": PerformanceView,
    "state-view": StateView,
    "event-view": EventView,
    "grid-layout": VueGridLayout.GridLayout,
    "grid-item": VueGridLayout.GridItem
  },
  data: function() {
    return {
      layout: [
        {
          view: "network-view",
          i: 0,
          x: 0,
          y: 0,
          w: 1,
          h: NaN,
          isResizable: false,
          visible: true
        },
        {
          view: "metric-view",
          i: 1,
          x: 1,
          y: 2,
          w: 1,
          h: NaN,
          isResizable: false,
          visible: true
        },
        {
          view: "configuration-view",
          i: 2,
          x: 0,
          y: 1,
          w: 1,
          h: NaN,
          isResizable: false,
          visible: true
        },
        {
          view: "state-view",
          i: 3,
          x: 1,
          y: 1,
          w: 1,
          h: NaN,
          isResizable: false,
          visible: true
        },
        {
          view: "performance-view",
          i: 4,
          x: 0,
          y: 2,
          w: 1,
          h: NaN,
          isResizable: false,
          visible: true
        },
        {
          view: "event-view",
          i: 5,
          x: 1,
          y: 0,
          w: 1,
          h: NaN,
          isResizable: false,
          visible: true
        }
      ]
    };
  },
  computed: {
    toggleMap() {
      return this.$store.state.dashboard.toggleMap;
    }
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    store.subscribe((mutation, state) => {
      // TODO: Fix that this funciton is called so often i.e. use watch
      if (mutation.type == "updateToggleMap") {
        let toggleAll = this.toggleAll;
        toggleAll();
      }
    });
    // Adapt height values for layout based on toggleMap variable from store
    let layout = this.layout;
    this.toggleMap.forEach(function(element, i) {
      layout[i].h = element.h;
      layout[i].h0 = element.h0;
    });
    this.layout = layout;
  },
  methods: {
    // Toggles ("expand", "minimize") the views, calls layoutUpdate to change the height of the layout
    toggleAll() {
      let layout = this.layout;
      this.toggleMap.forEach(function(element, i) {
        if (element.visible) {
          layout[i].h = element.h;
        } else {
          layout[i].h = element.h0;
        }
      });
      this.layout = layout;
      this.$refs.GridInstance.layoutUpdate();
    }
  }
};
</script>

<style>
.header {
  position: sticky;
  top: 0;
  z-index: 1;
}

.interface-text {
  font-size: 14px;
  user-select: none;
}

.interface-text-small {
  font-size: 11px;
}

.important-text {
  color: rgb(0, 123, 255);
  font-weight: bold;
}

.vue-grid-item.vue-grid-placeholder {
  background: radial-gradient(
    circle,
    rgba(252, 254, 255, 1) 0%,
    rgba(233, 244, 254, 1) 100%
  );
  border: dashed black 2px;
  border-radius: 5px;
}
</style>
