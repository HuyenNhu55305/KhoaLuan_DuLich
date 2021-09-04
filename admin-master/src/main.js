import Vue from "vue";
import DashboardPlugin from "./plugins/dashboard-plugin";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// import Router from "vue-router";
Vue.use(VueRouter);

Vue.use(VueAxios, axios);
// router setup
import router from "./routes/routes";
// plugin setup
Vue.use(DashboardPlugin);

import { VueEditor } from "vue2-editor";
Vue.use(VueEditor);


import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router
});
