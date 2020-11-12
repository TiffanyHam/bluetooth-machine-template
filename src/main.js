/*
 * @Descripttion:
 * @version:
 * @Author: Tiffany
 * @Date: 2020-08-26 17:41:01
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-11-12 10:30:06
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "lib-flexible";
import "@/style/common.scss"; /*引入公共样式*/
import "@/components/index"; //使用自动注册的插件
import eruda from "eruda/eruda.js"; // 测试工具
import globalData from "@/utils/index"; //引入全局组件
// 引入国际化
import i18n from "./i18n/index";
Vue.prototype.GLOBAL = globalData; //修改原型

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
eruda.init(); // eruda初始化
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

//title国际化
export const setPageTitleTxt = meta => {
  const { label } = meta;
  if (label) {
    document.title = i18n.t(label);
  }
};

// 当路由跳转结束后
router.afterEach((to, form) => {
  // 设置title
  setPageTitleTxt(to.meta);
});
