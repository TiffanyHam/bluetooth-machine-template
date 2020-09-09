/*
 * @Descripttion:
 * @version:
 * @Author: Tiffany
 * @Date: 2020-08-26 17:41:01
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-09-09 10:44:45
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
      path: "/",
      name: "Home",
      component: () => import("../views/Home.vue")
    }
  ]
});
