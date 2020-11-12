<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-08-26 17:41:01
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-11-11 18:43:50
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

    // this.dark = window.hilink && window.hilink.getDarkMode() === 2;
    // window.isDark = this.dark;
    // createCb(this, ['rescb']);
    // callHilinkFn('getDarkMode', ['0', 'rescb']);
  },
  methods: {
    // createCb(res) {}
  }
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
