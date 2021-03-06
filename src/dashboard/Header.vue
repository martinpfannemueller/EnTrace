<template>
  <div>
    <b-row class="header">
      <b-col cols="8">
        <h4>
          <strong>EnTrace</strong>: Enhanced Traceability
        </h4>
      </b-col>
      <b-col cols="4">
        <h4 class="float-right">
          <b-button
            variant="outline-success"
            size="sm"
            :disabled="connected"
            @click="connectToConnector()"
            >&nbsp;<font-awesome-icon icon="plug" />&nbsp;Connect</b-button
          >
          <b-button
            variant="outline-danger"
            size="sm"
            :disabled="!connected"
            @click="disconnectFromConnector()"
            >&nbsp;<font-awesome-icon
              icon="times-circle"
            />&nbsp;Disconnect</b-button
          >
          <b-button variant="outline-danger" size="sm" @click="resetStore()">
            &nbsp;<font-awesome-icon icon="trash-alt" />&nbsp;
          </b-button>
          <b-button variant="outline-secondary" size="sm" @click="showModal()">
            <font-awesome-icon icon="cogs" />
          </b-button>
          Status:
          <b-badge :variant="connected ? 'success' : 'danger'">
            <font-awesome-icon
              :icon="connected ? 'check-square' : 'times-circle'"
            />
          </b-badge>
        </h4>
      </b-col>
    </b-row>
    <hr />
    <b-modal ref="settingsModal" title="EnTrace Settings" size="sm">
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
          <h6>Evaluation log file</h6>
          <b-button variant="info" size="sm" @click="saveFile()"
            ><font-awesome-icon icon="download" />&nbsp;Save
            evaluation</b-button
          >
          <div style="margin-top: 0px" class="text-muted interface-text">
            Download a .txt file with the JSON objects of the evaluation
          </div>
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
      <span>{{
        this.$store.state.dashboard.connectionFailedErrorMessage
      }}</span>
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
// eslint-disable-next-line no-unused-vars
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      FileSaver: undefined,
      text: "",
      senderChannelEdit: "",
      channelChanged: false,
      hoverColorEdit: "",
      hoverColorChanged: false
    };
  },
  computed: {
    connected() {
      return this.$store.state.dashboard.connected;
    },
    senderChannel() {
      return this.$store.state.settings.senderChannel;
    },
    hoverColor() {
      return this.$store.state.settings.hoverColor;
    }
  },
  mounted() {
    // Intializes the senderChannelEdit variable to match the one from the store
    this.senderChannelEdit = this.senderChannel;
    this.hoverColorEdit = this.hoverColor;
    // Initilaizes file saver to export evaluation log as .txt file
    this.FileSaver = require("file-saver");
  },
  methods: {
    // Save file allows exporting the evaluation log as a .txt file for easier evaluations
    saveFile() {
      this.text = new Blob(
        [JSON.stringify(this.$store.state.evaluation.evaluationLogger)],
        {
          type: "text/plain;charset=utf-8"
        }
      );
      let measurementText = "measeurement " + new Date().toLocaleTimeString();
      this.FileSaver.saveAs(this.text, measurementText);
    },
    // Used to call MQTT function to connect to the connector
    connectToConnector() {
      // Callback function to ensure conneciton try is finished
      connectToConnector(() => {
        if (this.connected == false) {
          this.$refs["notConnectedModal"].show();
        }
      });
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
    },
    // Calls the mutation which resets all store properties to their default value
    resetStore() {
      this.$store.commit("resetStore");
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
