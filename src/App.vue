<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-08-26 17:41:01
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-12-18 10:08:16
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { getLanguage } from "./utils/tool";

export default {
  data() {
    return {};
  },
  created() {
    this.$i18n.locale = getLanguage();
    document.title =
      this.$i18n.locale === "zh"
        ? "欧姆龙U32K电子血压计"
        : "OMRON U32K Electronic Blood Pressure Monitor";
  },
  methods: {}
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  color: #dddddd;
}
theme-dark {
  a {
    color: #000;
  }
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
