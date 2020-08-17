import Vue from "vue";
import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firebase-database";
import "firebase/firebase-storage";

import runtimeconfig from "../../.runtimeconfig";

import store from "../store/";

firebase.initializeApp(runtimeconfig);

firebase.auth().onAuthStateChanged(fu => store.commit("setFireUser", fu));

Vue.prototype.$firebase = firebase;
