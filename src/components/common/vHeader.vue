<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-10-12 15:50:25
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-10-12 16:16:30
-->
<template>
  <div class="header">
    <!-- 返回箭头 -->
    <div class="header_arrow" @click="getBack">
      <img :src="iconImg" width="24" height="24" alt />
    </div>
    <!-- 中间标题问题 -->
    <div class="header_title">
      <span>{{ pageName }}</span>
    </div>
    <!-- 点击事件 -->
    <div class="header_setting" @click="setProper" v-if="hasIcon">
      <img :src="iconUrl" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "VHeader",

  /**
   *@description:头部导航组件需要接收的参数
   *
   *@param {String} pageName 头部标题
   *@param {Boolean} hasIcon 是否含有右侧icon
   *@param {String} iconUrl icon地址
   *@param {String} routePath 路由路径
   *
   */
  props: {
    pageName: {
      type: String,
      required: true
    },
    hasIcon: {
      type: Boolean,
      default() {
        return false;
      }
    },
    iconUrl: String,
    iconImg: String,
    routePath: String
  },
  created() {
    this.iconImg = require("@/assets/image/public/ic_public_close.png");
  },
  methods: {
    // 返回上一页
    getBack() {
      this.$router.back(-1);
    },
    setProper() {
      this.$router.push({ path: this.routePath });
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.666667rem 16px 0 16px;
  box-sizing: border-box;
}
// 左中右布局, 直接给中间的盒子设置flex:1;
.header .header_title {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin-left: 16px;
  align-items: center;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.8);
}
.header_arrow,
.header_setting {
  width: 24px;
  height: 100%;
  display: flex;
  align-items: center;
}

.header_setting > img {
  display: inline-block;
  vertical-align: middle;
}
</style>
