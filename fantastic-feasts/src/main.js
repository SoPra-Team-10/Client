import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import {
  faPlay,
  faPause,
  faVolumeMute,
  faVolumeUp
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlay);
library.add(faPause);
library.add(faVolumeMute);
library.add(faVolumeUp);

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
