<template>
  <div class="home">
    <button @click="openBtn('打开')">打开</button>
    <button @click="closeBtn('关闭')">关闭</button>
    <div>{{ msg }}</div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      msg: ""
    };
  },
  mounted() {},
  methods: {
    openBtn(e) {
      this.msg = e;
    },
    closeBtn(e) {
      this.msg = e;
    }
  }
};
</script>
<style lang="scss" scoped>
.home button {
  width: 70px;
  height: 30px;
  border: none;
  line-height: 30px;
  background: #007dff;
  border-radius: 6px;
  margin: 20px;
  color: #fff;
  font-size: 14px;
}
</style>
