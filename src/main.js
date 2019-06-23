import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { store } from "./store/store";
import { connectToConnector } from "./connector/mqtt-connector";
import {
  faChevronDown,
  faExpandArrowsAlt,
  faExpand,
  faCheck,
  faChevronRight,
  faCheckSquare,
  faTimesCircle,
  faPowerOff,
  faInfoCircle,
  faRulerHorizontal,
  faCalculator,
  faArrowsAltH,
  faMapPin,
  faWeight,
  faPalette
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { VueContext } from "vue-context";

library.add(faPowerOff);
library.add(faChevronDown);
library.add(faChevronRight);
library.add(faExpandArrowsAlt);
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

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("vue-context", VueContext);
Vue.com;
Vue.use(Vuex);
Vue.use(BootstrapVue);

// Connec to CoalaViz connector
connectToConnector();

// eslint-disable-next-line no-unused-vars
var vm = new Vue({
  el: "#app",
  store: store,
  render: h => h(App)
});
