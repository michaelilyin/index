import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/plugins/firebase";

Vue.config.productionTip = false;

const original = store.original;

new Vue({
  router,
  store: original,
  vuetify,
  render: h => h(App)
}).$mount("#app");
