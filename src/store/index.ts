import Vue from "vue";
import Vuex from "vuex";
import { createDirectStore } from "direct-vuex";
import calendar from "@/store/calendar";
import { ToDirectStore } from "direct-vuex/types/direct-types";

Vue.use(Vuex);

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
} = createDirectStore({
  modules: {
    calendar
  }
});

// Export the direct-store instead of the classic Vuex store.
export default store;
// The following exports will be used to enable types in the
// implementation of actions.
export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
};

export type AppStore = typeof store;
declare module "vuex" {
  interface Store<S> {
    direct: AppStore;
  }
}
