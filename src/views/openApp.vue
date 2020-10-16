<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-09-17 10:31:16
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-09-17 16:04:13
-->
<template>
  <div class="home">
    <button
      @click="openBtn"
      :disabled="disabled"
      :class="disabled === true ? 'colorChange' : 'btnColor'"
    >
      click me to app
    </button>
  </div>
</template>
<script>
export default {
  name: "openApp",
  data() {
    return {
      disabled: false
    };
  },
  mounted() {},
  methods: {
    //判断终端设备
    // getSystemInfo() {
    //   var u = navigator.userAgent;
    //   var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    //   var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    //   if (isiOS) {
    //     return "isiOS";
    //   } else if (isAndroid) {
    //     return "isAndroid";
    //   }
    // },
    openBtn() {
      var u = navigator.userAgent;
      var isWeixin = u.toLowerCase().indexOf("micromessenger") !== -1; // 微信内
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

      // 微信内
      if (isWeixin) {
        console.log("请在浏览器上打开");
      } else {
        //android端
        if (isAndroid) {
          //安卓app的scheme协议
          window.location.href = "taobao://taobao.com/";
          setTimeout(function() {
            let hidden =
              window.document.hidden ||
              window.document.mozHidden ||
              window.document.msHidden ||
              window.document.webkitHidden;
            if (typeof hidden == "undefined" || hidden == false) {
              //应用宝下载地址
              window.location.href = "https://www.baidu.com";
            }
          }, 2000);
        }
        //ios端
        if (isIOS) {
          //ios的scheme协议
          //   var parameter = window.location.href;
          //   var ios_parmeter = parameter.substring(7, parameter.length);
          window.location.href = "taobao://taobao.com/";
          setTimeout(function() {
            let hidden =
              window.document.hidden ||
              window.document.mozHidden ||
              window.document.msHidden ||
              window.document.webkitHidden;
            if (typeof hidden == "undefined" || hidden == false) {
              //App store下载地址
              window.location.href = "https://itunes.apple.com/cn/app/";
            }
          }, 2000);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.home button {
  width: auto;
  height: 30px;
  border: none;
  border-radius: 6px;
  margin: 20px;
  color: #fff;
  font-size: 14px;
  padding: 2px 8px;
}
.btnColor {
  background: #007dff;
}
.colorChange {
  background: #ccc;
}
</style>
