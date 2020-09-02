import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "lib-flexible";
import "@/style/common.scss"; /*引入公共样式*/
import eruda from "eruda/eruda.js"; // 测试工具
Vue.config.productionTip = false;
eruda.init(); // eruda初始化
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
