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
          <font-awesome-icon v-if="showCollapse" icon="chevron-down" />
          <font-awesome-icon v-else icon="chevron-right" />&nbsp;Toggle
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
  props: ["elementName", "id"],
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
    click(d) {
      let index = this.id; // Get item by using the ID prop of each View
      let toggleMap = this.toggleMap; // Get current toggleMap from store
      toggleMap[index].visible = !toggleMap[index].visible; // Change toggle map to reflect new toggle change
      store.commit("updateToggle", toggleMap); // Commit toggle map to store
      this.showCollapse = !this.showCollapse; // Toggle view
      this.$emit("toggle-clicked"); // Send emit
    },
    fullscreen(d) {
      console.log(d);
    }
  }
};
</script>

<style scoped>
#view-slot {
  overflow: hidden;
}

.card-header {
  padding-left: 12px;
  padding-right: 3px;
  padding-top: 3px;
  padding-bottom: 3px;
}

.card-title {
  padding-top: 1px;
  padding-bottom: 1px;
  /* margin-bottom: 8px; */
}

.card-subtitle {
  margin-bottom: 4px;
}

.card-body {
  padding: 8px;
  clear: both;
}

.card-footer {
  padding-top: 1px;
  padding-bottom: 1px;
}

.vertical {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
