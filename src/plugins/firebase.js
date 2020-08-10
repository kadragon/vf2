import Vue from "vue";
import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firebase-database";
import "firebase/firebase-storage";

import runtimeconfig from "../../.runtimeconfig";

firebase.initializeApp(runtimeconfig);

Vue.prototype.$firebase = firebase;
