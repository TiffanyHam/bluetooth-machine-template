<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-09-25 17:33:45
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-11-09 19:46:31
-->
<template>
  <div class="temperature">
    <button
      :disabled="disabled1"
      :class="disabled1 === true ? 'colorChange' : 'btnColor'"
      @click="writeValue"
    >
      写入数据
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      disabled1: false,
      deviceId: "",
      data: "010941000A",
      serviceId: "0000ffb0-0000-1000-8000-00805f9b34fb",
      characteristicId: "0000ffb1-0000-1000-8000-00805f9b34fb",
      services: [
        "0000ffb0-0000-1000-8000-00805f9b34fb",
        "0000ffb1-0000-1000-8000-00805f9b34fb",
        "0000ffb2-0000-1000-8000-00805f9b34fb"
      ]
    };
  },
  created() {},
  mounted() {
    let that = this;
    window.getCurrentUnregisteredDeviceCallback =
      that.getCurrentUnregisteredDeviceCallback;

    window.onBluetoothDeviceFoundCallback = that.onBluetoothDeviceFoundCallback;

    // 获取宫格页面中选择的已注册的设备
    window.hilink.getCurrentRegisteredDevice(
      "getCurrentUnregisteredDeviceCallback"
    );

    window.hilink.onBluetoothDeviceFound("onBluetoothDeviceFoundCallback");
    let a = window.hilink.startBluetoothDevicesDiscovery([], true, 0);
    console.log(a);
  },
  methods: {
    /**
     * @description: 获取宫格页面中选择的已注册的设备
     * @param {*} res
     */
    getCurrentUnregisteredDeviceCallback(res) {
      let data = JSON.parse(res);
      this.deviceId = data.deviceId;
    },

    /**
     * @description: 监听寻找到新设备回调
     * @param {*} res
     */

    onBluetoothDeviceFoundCallback(res) {
      let data = JSON.parse(res);
      console.log("扫描的数据：", data);
      if (data[0].deviceId == this.deviceId) {
        let sta1 = window.hilink.stopBluetoothDevicesDiscovery(); //停止扫描
        let sta = window.hilink.createBLEConnection(this.deviceId); //连接蓝牙
        console.log("deviceId匹配:", data[0].deviceId == this.deviceId);
        console.log("停止扫描:", sta1);
        console.log("连接蓝牙:", sta);
      }
    },
    /**
     * 写入数据
     */
    writeValue() {
      this.disabled1 = true;
      window.writeBLECharacteristicValueCallBack = this.writeBLECharacteristicValueCallBack;
      window.hilink.writeBLECharacteristicValue(
        this.deviceId, //F0:00:22:22:00:00
        this.serviceId, //0000ffb0-0000-1000-8000-00805f9b34fb
        this.characteristicId, //0000ffb1-0000-1000-8000-00805f9b34fb
        this.data, //010941000A
        "writeBLECharacteristicValueCallBack"
      );
      console.log(
        "参数打印：",
        "deviceId:" + this.deviceId,
        "serviceId:" + this.serviceId,
        "characteristicId:" + this.characteristicId,
        "data:" + this.data
      );
    },
    /**
     * @description: 回调
     * @param {*} res
     */
    writeBLECharacteristicValueCallBack(res) {
      this.disabled1 = false;
      let result = JSON.parse(res);
      console.log("writeBLECharacteristicValueCallBack:", result);
    }
  }
};
</script>
<style lang="scss" scoped>
.temperature {
  button {
    width: 70px;
    height: 30px;
    border: none;
    border-radius: 6px;
    margin: 20px;
    color: #fff;
    font-size: 14px;
  }
  .btnColor {
    background: #007dff;
  }
  .colorChange {
    background: #ccc;
  }
}
</style>
