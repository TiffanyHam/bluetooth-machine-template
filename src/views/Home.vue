<template>
  <div class="home">
    <button @click="openBtn">打开</button>
    <button @click="closeBtn">关闭</button>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    openBtn() {},
    closeBtn() {}
  }
};
// //1监听蓝牙状态变化的事件
// window.hilink.onBluetoothAdapterStateChange();
// //2监听低功耗蓝牙连接状态的改变事件。
// window.hilink.onBLEConnectionStateChange();
// //3获取本机蓝牙模块状态;
// window.hilink.getBluetoothAdapterState();
// //4.蓝牙是否打开 当前设备缓存信息
// let flag; //打开状态
// if (flag) {
//   window.hilink.getCurrentRegisteredDevice();
// } else {
//   //请求打开蓝牙
//   window.hilink.openBluetoothAdapter();
// }

// //5.开始扫描蓝牙设备
// window.hilink.onBluetoothDeviceFound();
// //开始扫描
// window.hilink.startBluetoothDevicesDiscovery();

// //6  Android ios

// //7
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
