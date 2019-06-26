import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

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

Vue.component("font-awesome-icon", FontAwesomeIcon);

//var websocket;
new Vue({
  render: h => h(App)
}).$mount("#app");

/*
"@fortawesome/fontawesome-svg-core": "^1.2.19",
    "@fortawesome/free-solid-svg-icons": "^5.9.0",
    "@fortawesome/vue-fontawesome": "^0.1.6",
*/
