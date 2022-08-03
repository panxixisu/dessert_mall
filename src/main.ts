import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import "./assets/css/index.less";
import "element-plus/dist/index.css"
declare const BMap:any;
createApp(App).use(store).use(router).mount("#app");
