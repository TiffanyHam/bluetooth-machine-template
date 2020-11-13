/*
 * @Descripttion:
 * @version:
 * @Author: Tiffany
 * @Date: 2020-08-26 17:41:01
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-11-12 16:24:57
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
      path: "/Home",
      name: "Home",
      component: () => import("../views/Home.vue")
    },
    {
      path: "/",
      name: "broodPressure",
      component: () => import("../views/broodPressure.vue"),
      meta: {
        title: "欧姆龙血压计",
        label: "router.broodPressure"
      }
    },
    {
      path: "/openApp",
      name: "openApp",
      component: () => import("../views/openApp.vue")
    },
    {
      path: "/toothbrush",
      name: "toothbrush",
      component: () => import("../views/toothbrush.vue")
    }
  ]
});
