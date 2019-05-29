import Vue from "vue"
import App from "./App.vue"
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

// client = new Paho.MQTT.Client("localhost", Number(1883), "mqttCoala");

// function onConnect() {
//   console.log("Connected!");
// }

// client.onMessageArrived = function (message) {
//   console.log("Message Arrived: " + message.payloadString);
// }

// client.connect({
//   onSuccess: onConnect
// });

Vue.use(BootstrapVue);
var vm = new Vue({
  el: '#app',
  render: h => h(App)
})
