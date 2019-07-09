<template>
  <b-card class="shadow-sm">
    <b-row slot="header">
      <b-col class="vertical">
        <h5>{{ elementName }}</h5>
      </b-col>
      <b-col>
        <b-button
          variant="outline-secondary"
          size="sm"
          class="float-right"
          style="margin-left: 5px"
          @click="click"
        >
          <font-awesome-icon
            :icon="showCollapse ? 'minus-circle' : 'plus-circle'"
          />&nbsp;
          {{ showCollapse ? "Minimize" : "Expand" }}
        </b-button>
        <!-- <b-button variant="outline-secondary" size="sm" class="float-right" @click="fullscreen">
          <font-awesome-icon icon="expand-arrows-alt"/>&nbsp;Fullscreen
        </b-button> -->
      </b-col>
    </b-row>
    <b-collapse :id="elementName" v-model="showCollapse">
      <slot class="view-slot" />
    </b-collapse>
  </b-card>
</template>

<script>
import { store } from "../store/store";
export default {
  props: {
    elementName: {
      type: String,
      default: ""
    },
    id: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      showCollapse: true
    };
  },
  computed: {
    toggleMap() {
      return this.$store.state.toggleMap;
    }
  },
  methods: {
    click() {
      let index = this.id; // Get item by using the ID prop of each View
      let toggleMap = this.toggleMap; // Get current toggleMap from store
      toggleMap[index].visible = !toggleMap[index].visible; // Change toggle map to reflect new toggle change
      store.commit("updateToggleMap", toggleMap); // Commit toggle map to store
      this.showCollapse = !this.showCollapse; // Toggle view
      this.$emit("toggle-clicked"); // Send emit
    }
  }
};
</script>

<style scoped>
h5 {
  font-size: 20px;
  margin-bottom: 0px;
}

.card-header {
  padding-left: 12px;
  padding-right: 3px;
  padding-top: 3px;
  padding-bottom: 3px;
}

.card-body {
  padding: 6px;
  clear: both;
}

.vertical {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
