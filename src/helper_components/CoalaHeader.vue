<template>
  <div>
    <b-row class="header">
      <b-col cols="9">
        <h4>
          🐨
          <strong>CoalaViz.<span style="color: #007bff;">js</span></strong
          >: Enhanced Traceability in Adaptive Communication Systems
        </h4>
      </b-col>
      <b-col cols="3">
        <h4 class="float-right">
          <b-button variant="outline-secondary" size="sm" @click="showModal()">
            <font-awesome-icon icon="cogs" />
          </b-button>
          Status:
          <b-badge :variant="connected ? 'success' : 'danger'">
            <font-awesome-icon
              :icon="connected ? 'check-square' : 'times-circle'"
            />&nbsp; {{ connected ? "Connected" : "Disconnected" }}
          </b-badge>
        </h4>
      </b-col>
    </b-row>
    <hr />
    <b-modal ref="settingsModal" title="CoalaViz Settings" size="sm">
      <b-row>
        <b-col>
          <h6>Connect and disconnect</h6>
          <b-button
            variant="success"
            size="sm"
            :disabled="connected"
            @click="connectToConnector()"
            ><font-awesome-icon icon="check-square" />&nbsp;Connect</b-button
          >
          <b-button
            variant="danger"
            size="sm"
            :disabled="!connected"
            @click="disconnectFromConnector()"
            ><font-awesome-icon icon="times-circle" />&nbsp;Disconnect</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <hr class="hr-settings" />
          <h6>Change MQTT channel</h6>
          <b-input-group size="sm">
            <b-form-input
              v-model="senderChannelEdit"
              :state="checkState()"
            ></b-form-input>
            <b-input-group-append
              ><b-button variant="primary" @click="changeSenderChannel()"
                ><font-awesome-icon icon="check" />&nbsp;Set</b-button
              ></b-input-group-append
            >
          </b-input-group>
          <div style="margin-top: 0px" class="text-muted interface-text">
            Set MQTT channel for sending messages to adaptation logic
          </div>
        </b-col>
      </b-row>
      <b-row
        ><b-col>
          <hr class="hr-settings" />
          <h6>Change mouseover color</h6>
          <input v-model="hoverColorEdit" type="color" />
          <span class="interface-text">Hover color</span>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="changeHoverColor()"
          >
            <font-awesome-icon icon="check" />&nbsp;Set
          </b-button>
          <div style="margin-top: 0px" class="text-muted interface-text">
            Change the hover color for Configuration View, Network View, and
            State View
            <br />
            <span
              v-show="hoverColorChanged"
              style="color: #28a745"
              class="interface-text-small"
              ><font-awesome-icon icon="check" />&nbsp;Hover color
              changed!</span
            >
          </div>
        </b-col></b-row
      >
      <template slot="modal-footer" slot-scope="{ ok }">
        <b-button variant="primary" @click="ok()">
          OK
        </b-button>
      </template>
    </b-modal>
    <b-modal ref="notConnectedModal" title="Connection failed" size="sm">
      <span>{{ this.$store.state.connectionFailedErrorMessage }}</span>
      <template slot="modal-footer" slot-scope="{ ok }">
        <b-button variant="primary" @click="ok()">
          OK
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {
  connectToConnector,
  disconnectFromConnector
} from "../connector/mqtt-connector.js";
export default {
  data() {
    return {
      senderChannelEdit: "",
      channelChanged: false,
      hoverColorEdit: "",
      hoverColorChanged: false
    };
  },
  computed: {
    connected() {
      return this.$store.state.connected;
    },
    senderChannel() {
      return this.$store.state.senderChannel;
    },
    hoverColor() {
      return this.$store.state.hoverColor;
    }
  },
  // Intializes the senderChannelEdit variable to match the one from the store
  mounted() {
    this.senderChannelEdit = this.senderChannel;
    this.hoverColorEdit = this.hoverColor;
  },
  methods: {
    // Used to call MQTT function to connect to the connector
    connectToConnector() {
      // Use callback to only check after connection-try has worked--or not
      connectToConnector(
        () =>
          function() {
            if (!this.connected) {
              this.$refs["notConnectedModal"].show();
            }
          }
      );
    },
    // Used to cisconnect from the connector
    disconnectFromConnector() {
      disconnectFromConnector();
    },
    // Opens the settings menu
    showModal() {
      this.senderChannelEdit = this.senderChannel;
      this.channelChanged = false;
      this.hoverColorEdit = this.hoverColor;
      this.hoverColorChanged = false;
      this.$refs["settingsModal"].show();
    },
    // Changes the sender channel in the store
    changeSenderChannel() {
      this.$store.commit("changeSenderChannel", this.senderChannelEdit);
      this.channelChanged = true;
    },
    // Used to display green checkmark when channel has been changed
    checkState() {
      if (this.channelChanged) {
        return true;
      } else {
        return null;
      }
    },
    // Used to change hover color in the store
    changeHoverColor() {
      this.hoverColorChanged = true;
      this.$store.commit("changeHoverColor", this.hoverColorEdit);
    }
  }
};
</script>

<style scoped>
.header {
  background-color: rgba(255, 255, 255, 0.65);
}
hr {
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 0px;
  margin-bottom: 5px;
}

.hr-settings {
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
}

h4 {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
