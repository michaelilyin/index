import Vue from "vue";
import VueFire from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";

Vue.use(VueFire);
export default firebase.initializeApp({
  projectId: "YOUR_PROJECT_ID",
  databaseURL: "YOUR_DB_URL"
});
