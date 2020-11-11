<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-09-25 17:33:45
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-11-10 16:31:32
-->
<template>
  <div class="temperature">
    <button
      @click="readValue"
      :disabled="disabled"
      :class="disabled === true ? 'colorChange' : 'btnColor'"
    >
      读取数据
    </button>
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
      isIOS: false,
      disabled1: false,
      disabled: false,
      deviceId: "",
      data: "010941000A",
      serviceId: "0000ffb0-0000-1000-8000-00805f9b34fb",
      writeCharacteristicId: "0000ffb1-0000-1000-8000-00805f9b34fb",
      readCharacteristicId: "0000ffb2-0000-1000-8000-00805f9b34fb"
      //   services: [
      //     "0000ffb0-0000-1000-8000-00805f9b34fb",
      //     "0000ffb1-0000-1000-8000-00805f9b34fb",
      //     "0000ffb2-0000-1000-8000-00805f9b34fb"
      //   ]
    };
  },
  created() {},
  mounted() {
    let that = this;
    window.onBluetoothAdapterStateChangeCallback =
      that.onBluetoothAdapterStateChangeCallback;

    window.onBLEConnectionStateChangeCallback =
      that.onBLEConnectionStateChangeCallback;

    window.getBluetoothAdapterStateCallback =
      that.getBluetoothAdapterStateCallback;

    // window.getCurrentRegisteredDeviceCallback =
    //   that.getCurrentRegisteredDeviceCallback;

    //  window.onBluetoothDeviceFoundCallback = that.onBluetoothDeviceFoundCallback;

    //监听蓝牙状态变化，在手机上开启或关闭蓝牙时会触发
    window.hilink.onBluetoothAdapterStateChange(
      "onBluetoothAdapterStateChangeCallback"
    );
    //监听连接蓝牙设备的结果，在创建蓝牙设备连接时，可以得到连接结果。
    window.hilink.onBLEConnectionStateChange(
      "onBLEConnectionStateChangeCallback"
    );
    //获取当前蓝牙模块状态，判断当前蓝牙是否处于打开状态
    window.hilink.getBluetoothAdapterState("getBluetoothAdapterStateCallback");

    // 获取宫格页面中选择的已注册的设备
    // window.hilink.getCurrentRegisteredDevice(
    //   "getCurrentRegisteredDeviceCallback"
    // );
    // window.hilink.closeBLEConnection(that.deviceId); //断开之前蓝牙连接
    // window.hilink.stopBluetoothDevicesDiscovery(); //清空之前扫描的结果
    //  window.hilink.onBluetoothDeviceFound("onBluetoothDeviceFoundCallback"); //监听寻找到新设备的事件
    //  window.hilink.startBluetoothDevicesDiscovery([], false, 1); //搜寻附近的蓝牙外围设备
  },
  methods: {
    /**
     * @description: 打开蓝牙
     * @param {*}
     */
    openBlueTooth() {
      window.hilink.openBluetoothAdapter();
    },
    /**
     * @description: 监听蓝牙变化
     * @param {*}
     */

    onBluetoothAdapterStateChangeCallback(res) {
      let data = JSON.parse(res);
      console.log("1.监听蓝牙变化:");
    },
    /**
     * @description: 监听连接蓝牙设备的结果回调
     * @param {*} res
     */

    onBLEConnectionStateChangeCallback(res) {
      let data = JSON.parse(res);
      console.log("2.监听蓝牙结果:", data);
    },
    getBluetoothAdapterStateCallback(res) {
      let data = JSON.parse(res);
      console.log("3.蓝牙是否处于打开状态:", data);
      if (data.available) {
        this.getCurrentRegister();
      } else {
        this.openBlueTooth();
      }
    },
    /**
     * @description: 获取宫格页面中选择的已注册的设备
     * @param {*}
     */
    getCurrentRegister() {
      window.hilink.getCurrentRegisteredDevice(
        "getCurrentRegisteredDeviceCallback"
      );
      window.getCurrentRegisteredDeviceCallback = res => {
        let data = JSON.parse(res);
        this.deviceId = data.deviceId;
        console.log("4.获取MAC:", data.deviceId);
        this.onBluetoothDevice();
      };
    },
    /**
     * @description: 监听寻找到新设备回调
     * @param {*} res
     */

    onBluetoothDevice() {
      window.hilink.onBluetoothDeviceFound("onBluetoothDeviceFoundCallback");
      window.hilink.startBluetoothDevicesDiscovery([], false, 1); //搜寻附近的蓝牙外围设备
      window.onBluetoothDeviceFoundCallback = res => {
        let data = JSON.parse(res);
        console.log("5.扫描的数据：", data);
        if (data[0].deviceId == this.deviceId) {
          let sta1 = window.hilink.stopBluetoothDevicesDiscovery(); //停止扫描
          let sta = window.hilink.createBLEConnection(this.deviceId); //连接蓝牙
          console.log("deviceId匹配:", data[0].deviceId == this.deviceId);
          console.log("停止扫描:", sta1);
          console.log("连接蓝牙:", sta);
        }
      };
    },

    /**
     * @description: 对蓝牙设备写入数据
     * @param {*}
     */

    writeValue() {
      this.disabled1 = true;
      window.writeBLECharacteristicValueCallBack = this.writeBLECharacteristicValueCallBack;
      window.hilink.writeBLECharacteristicValue(
        this.deviceId, //F0:00:22:22:00:00
        this.serviceId, //0000ffb0-0000-1000-8000-00805f9b34fb
        this.writeCharacteristicId, //0000ffb1-0000-1000-8000-00805f9b34fb
        this.data, //010941000A
        "writeBLECharacteristicValueCallBack"
      );
    },
    writeBLECharacteristicValueCallBack(res) {
      this.disabled1 = false;
      let result = JSON.parse(res);
      console.log("writeBLECharacteristicValueCallBack:", result);
    },
    /**
     * @description:通知低功耗蓝牙设备的特征值的值
     * @param {*}
     */

    readValue() {
      this.disabled = true;
      let status = window.hilink.notifyBLECharacteristicValueChange(
        this.deviceId,
        this.serviceId,
        this.readCharacteristicId,
        true
      );
      console.log(
        "特征值",
        this.deviceId,
        this.serviceId,
        this.readCharacteristicId,
        status
      );
      window.hilink.onBLECharacteristicValueChange(
        "onBLECharacteristicValueChangeCallback"
      );
      window.onBLECharacteristicValueChangeCallback = res => {
        this.disabled = false;
        let result = JSON.parse(res);
        console.log(
          "onBLECharacteristicValueChangeCallback特征值回调:",
          result
        );
      };
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
