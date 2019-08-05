import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { store } from "./store/store";
import { connectToConnector } from "./connector/mqtt-connector";
import {
  faExpand,
  faCheck,
  faCheckSquare,
  faTimesCircle,
  faInfoCircle,
  faRulerHorizontal,
  faCalculator,
  faArrowsAltH,
  faMapPin,
  faWeight,
  faPalette,
  faMinusCircle,
  faPlusCircle,
  faCogs,
  faLink,
  faHashtag,
  faTools,
  faSignInAlt,
  faSignOutAlt,
  faClock,
  faTrashAlt,
  faPlug,
  faPowerOff,
  faDownload
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Import all necessary icons
library.add(faPlusCircle);
library.add(faMinusCircle);
library.add(faExpand);
library.add(faCheck);
library.add(faCheckSquare);
library.add(faTimesCircle);
library.add(faInfoCircle);
library.add(faRulerHorizontal);
library.add(faCalculator);
library.add(faArrowsAltH);
library.add(faMapPin);
library.add(faWeight);
library.add(faPalette);
library.add(faCogs);
library.add(faLink);
library.add(faHashtag);
library.add(faTools);
library.add(faClock);
library.add(faSignInAlt);
library.add(faSignOutAlt);
library.add(faTrashAlt);
library.add(faPlug);
library.add(faPowerOff);
library.add(faDownload);

// Initialize icon component
Vue.component("font-awesome-icon", FontAwesomeIcon);
// Initialize VueX
Vue.use(Vuex);
// Initialize Bootstrap elements
Vue.use(BootstrapVue);

// Connect to CoalaViz connector
connectToConnector();

// Create new instance of Vue
new Vue({
  el: "#app",
  store: store,
  render: h => h(App)
});
