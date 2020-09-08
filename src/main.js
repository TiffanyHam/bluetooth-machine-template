/*
 * @Descripttion:
 * @version:
 * @Author: Tiffany
 * @Date: 2020-08-26 17:41:01
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-09-07 17:16:07
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "lib-flexible";
import "@/style/common.scss"; /*引入公共样式*/
// import eruda from "eruda/eruda.js"; // 测试工具

import {
  Icon,
  Popup,
  Picker,
  Loading,
  Collapse,
  CollapseItem,
  Slider
} from "vant";
import "vant/lib/index.css";

Vue.use(Picker);
Vue.use(Popup);
Vue.use(Loading);
Vue.use(Icon);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Slider);
Vue.config.productionTip = false;
// eruda.init(); // eruda初始化
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
