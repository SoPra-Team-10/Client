import Vue from "vue";
import App from "./App.vue";
import store from "./store/store";

Vue.config.productionTip = false;

// import SVG-icons from the Fontawesome package as needed
import {
  faPlay,
  faPause,
  faVolumeMute,
  faVolumeUp,
  faStreetView,
  faUsers,
  faCircle,
  faFlagCheckered,
  faUndoAlt,
  faFistRaised,
  faExclamationCircle,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// adding SVG-icons to local library

library.add(faPlay);
library.add(faPause);
library.add(faVolumeMute);
library.add(faVolumeUp);
library.add(faStreetView);
library.add(faUsers);
library.add(faCircle);
library.add(faFlagCheckered);
library.add(faUndoAlt);
library.add(faFistRaised);
library.add(faExclamationCircle);
library.add(faExclamationTriangle);

// registering Fontawesome as global component
Vue.component("font-awesome-icon", FontAwesomeIcon);

// instantiate main Vue instance
new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
