<template>
  <b-container fluid>
    <coala-header/>
    <grid-layout
      :layout.sync="layout"
      :col-num="2"
      :row-height="1"
      :is-draggable="true"
      :is-resizable="true"
      :margin="[5, 5]"
      :responsive="true"
      :autoSize="true"
      :breakpoints="{ lg: 1200, md: 800, sm: 400, xs: 300, xxs: 0 }"
      :cols="{ lg: 2, md: 2, sm: 1, xs: 1, xxs: 1 }"
      ref="GridInstance"
    >
      <grid-item
        v-for="(item) in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        :isResizable="item.isResizable"
        :dragIgnoreFrom="'a, button, .card-body'"
      >
        <component :is="item.view"/>
      </grid-item>
    </grid-layout>
    <!-- <coala-footer/> -->
  </b-container>
</template>

<script>
import CoalaHeader from "./helper_components/CoalaHeader";
import CoalaFooter from "./helper_components/CoalaFooter";
import NetworkView from "./views/NetworkView.vue";
import MetricView from "./views/MetricView.vue";
import ContextFeaureModel from "./views/ContextFeatureModel.vue";
import PerformanceView from "./views/PerformanceView.vue";
import StateView from "./views/StateView.vue";
import EventView from "./views/EventView.vue";
import VueGridLayout from "vue-grid-layout";
import { store } from "./store/store";

export default {
  components: {
    "coala-header": CoalaHeader,
    "coala-footer": CoalaFooter,
    "network-view": NetworkView,
    "metric-view": MetricView,
    "context-feature-model": ContextFeaureModel,
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
          x: 0,
          y: 0,
          w: 1,
          h: 76,
          i: "0",
          isResizable: false,
          view: "network-view"
        },
        {
          x: 0,
          y: 1,
          w: 1,
          h: 51,
          i: "1",
          isResizable: false,
          view: "metric-view"
        },
        {
          x: 1,
          y: 0,
          w: 1,
          h: 66,
          i: "2",
          isResizable: false,
          view: "context-feature-model"
        },
        {
          x: 1,
          y: 2,
          w: 1,
          h: 51,
          i: "3",
          isResizable: false,
          view: "state-view"
        },
        {
          x: 1,
          y: 1,
          w: 1,
          h: 21,
          i: "4",
          isResizable: false,
          view: "performance-view"
        },
        {
          x: 1,
          y: 3,
          w: 1,
          h: 41,
          i: "5",
          isResizable: false,
          view: "event-view"
        }
      ]
    };
  },
  computed: {
    toggleMap() {
      return this.$store.state.toggleMap;
    } 
  },
  mounted() {
    store.subscribe((mutation, state) => {
      // TODO: Fix that this funciton is called so often i.e. use watch
      if (mutation.type == "updateToggle") {
        let toggleAll = this.toggleAll;
        console.log("Layout changed");
        toggleAll();
      }
    });
  },
  methods: {
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
.vue-grid-item.vue-grid-placeholder {
  background: radial-gradient(
    circle,
    rgba(252, 254, 255, 1) 0%,
    rgba(233, 244, 254, 1) 100%
  );
  border: dashed black 2px;
  border-radius: 5px;
}

* {
  box-sizing: border-box;
}

.interface-text {
  font-size: 14px;
  user-select: none;
}

h5 {
  font-size: 20px;
  margin-bottom: 0px;
}

</style>

    <!-- <b-row>
      <b-col class="main">
        <network-view/>
        <state-view/>
      </b-col>
      <b-col class="main">
        <metric-view/>
        <context-feature-model/>
        <performance-view/>
      </b-col>
    </b-row>-->