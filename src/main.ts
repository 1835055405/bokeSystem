import { createApp } from "vue";
import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/style.scss";
// ! ---- 引入仓库 ----
import { store } from "./stores/index";
import "./router/router-config";
// ! ---- 引入路由 ----
import router from "./router";
// ！---- 引入mysql ----
import mysql from "mysql";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
