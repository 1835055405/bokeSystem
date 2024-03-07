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
// 引入Element Plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./styles/dark/css-vars.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.mount("#app");
