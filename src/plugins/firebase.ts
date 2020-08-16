import Vue from "vue";
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";

Vue.use(firestorePlugin);

export const firebaseApp = firebase.initializeApp({
  projectId: "YOUR_PROJECT_ID",
  databaseURL: "YOUR_DB_URL"
});

export const firestore = firebaseApp.firestore();
