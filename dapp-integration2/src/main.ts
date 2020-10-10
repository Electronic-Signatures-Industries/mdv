// @ts-nocheck
// @ts-ignore
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/base";
import "./plugins/chartist";
import "./plugins/vee-validate";
import vuetify from "./plugins/vuetify";
import "./plugins/appconfig";

import Vuethereum from "vuethereum";
import { initMiddleware, MiddlewareOptions, initOffchainMiddleware } from "./libs";

Vue.use(Vuethereum);

Vue.config.productionTip = false;

Vue.prototype.$loadOnchainDependencies = function(options: MiddlewareOptions) {
  return initMiddleware(options);
};

Vue.prototype.$loadOffchainDependencies = function(options: MiddlewareOptions) {
  return initOffchainMiddleware(options);
};

// @ts-ignore
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
