/*
 * @Descripttion:
 * @version:
 * @Author: Tiffany
 * @Date: 2020-08-26 17:41:01
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-09-25 17:42:53
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/coffeeIndexNew",
      name: "CoffeeIndexNew",
      component: () => import("../views/CoffeeIndexNew.vue")
    },
    {
      path: "/CoffeeIndexOld",
      name: "coffeeIndexOld",
      component: () => import("../views/CoffeeIndexOld.vue")
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("../views/Home.vue")
    },
    {
      path: "/",
      name: "Temperature",
      component: () => import("../views/Temperature.vue")
    },
    {
      path: "/openApp",
      name: "openApp",
      component: () => import("../views/openApp.vue")
    }
  ]
});
