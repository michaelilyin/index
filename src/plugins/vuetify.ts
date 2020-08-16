import Vue from "vue";
import Vuetify from "vuetify/lib";
import en from "vuetify/src/locale/en";
import ru from "vuetify/src/locale/ru";

Vue.use(Vuetify);

const currentLocale =
  navigator.language ??
  (navigator as { userLanguage?: string }).userLanguage ??
  "en";

export default new Vuetify({
  lang: {
    locales: {
      en,
      ru
    },
    current: currentLocale
  }
});
