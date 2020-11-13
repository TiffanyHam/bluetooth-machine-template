<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-09-25 17:33:45
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-11-13 15:09:41
-->
<template>
  <div class="temperature">
    <!-- Header -->
    <!-- <v-header pageName="测量" :iconImg="iconImg" :hasIcon="false"></v-header> -->
    <!-- image -->
    <div class="temperature_data">
      {{ temperature_data }}<span>{{ $t("text.uint") }}</span>
    </div>
    <div class="info">
      <img src="@/assets/image/public/omron.png" width="80%" alt="" />
    </div>
    <!-- text -->
    <div class="steps">
      <!-- <p>{{ $t("text.connect") }}</p> -->
      <ul>
        <li>{{ $t("text.list_t1") }}</li>
        <li>
          {{ $t("text.list_t2") }}
        </li>
        <li>
          {{ $t("text.list_t3") }}
        </li>
        <li>{{ $t("text.list_t4") }}</li>
      </ul>
      <!-- <div>{{ $t("text.wait") }}</div> -->
    </div>
    <!-- 历史记录 -->
    <div class="history_list">
      <button @click="getRecords">{{ $t("text.history") }}</button>
    </div>
    <van-dialog v-model="show" title="">
      <div class="connect">{{ $t(connectBle) }}</div>
    </van-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      iconImg: "",
      deviceId: "",
      temperature_data: "--/--",
      getHighData: "",
      getLowData: "",
      serviceId: "00001810-0000-1000-8000-00805f9b34fb", //0x1810
      characteristicId: "00002a35-0000-1000-8000-00805f9b34fb", //0x2a35
      readCharacteristicId: "00002a49-0000-1000-8000-00805f9b34fb",
      show: true,
      connectBle: ""
    };
  },
  created() {
    this.iconImg = require("@/assets/image/public/ic_public_close.png");
  },
  update() {},
  mounted() {
    // var t = setInterval(function() {
    //   console.log(88888);
    let that = this;
    that.deviceId = window.hilink.getDeviceId();
    window.onBluetoothAdapterStateChangeCallback =
      that.onBluetoothAdapterStateChangeCallback;

    window.changeBleConnectionStateCallback =
      that.changeBleConnectionStateCallback;

    window.onBLEServicesDiscoveredCallback =
      that.onBLEServicesDiscoveredCallback;

    window.getBluetoothAdapterStateCallback =
      that.getBluetoothAdapterStateCallback;
    window.onBLECharacteristicValueChangeCallback =
      that.onBLECharacteristicValueChangeCallback;

    //监听蓝牙状态变化，在手机上开启或关闭蓝牙时会触发
    window.hilink.onBluetoothAdapterStateChange(
      "onBluetoothAdapterStateChangeCallback"
    );
    //监听连接蓝牙设备的结果，在创建蓝牙设备连接时，可以得到连接结果。
    window.hilink.onBLEConnectionStateChange(
      "changeBleConnectionStateCallback"
    );
    //注册发现服务的回调
    window.hilink.onBLEServicesDiscovered("onBLEServicesDiscoveredCallback");
    //监听特征值变化的回调
    window.hilink.onBLECharacteristicValueChange(
      "onBLECharacteristicValueChangeCallback"
    );
    //创建蓝牙连接
    window.hilink.createBLEConnection(that.deviceId);
    // }, 3000);
  },
  methods: {
    /**
     * @description: 获取蓝牙状态
     * @param {*} res
     */
    getBluetoothAdapterStateCallback(res) {
      let data = JSON.parse(res);
      console.log("100000000000000000000000.蓝牙当前状态", data);
    },
    /**
     * @description: 监听蓝牙连接状态的改变事件的回调函数
     * @param {res} 返回值
     */
    changeBleConnectionStateCallback(res) {
      let data = JSON.parse(res);
      console.log("2.连接监听结果", data);
      if (data.connected) {
        this.connectBle = "蓝牙已连接";
        this.show = false;
      } else {
        this.connectBle = "蓝牙已断开";
        this.show = true;
      }
    },
    /**
     * @description: 监听服务发现状态
     * @param {res} 返回值
     */
    onBLEServicesDiscoveredCallback(res) {
      let that = this;
      let data = JSON.parse(res);
      console.log("3.发现服务", res);
      if (data.errCode === "0") {
        let status = window.hilink.notifyBLECharacteristicValueChange(
          that.deviceId,
          that.GLOBAL.INFO.SERVICE_ID,
          that.GLOBAL.INFO.CHARACTERISTIC_ID,
          true
        );
        console.log(
          "deviceId:" + that.deviceId,
          "serviceId2222:" + that.GLOBAL.INFO.SERVICE_ID,
          "characteristicId333:" + that.GLOBAL.INFO.CHARACTERISTIC_ID
        );
        console.log("特征值:", status);
        // window.hilink.onBLECharacteristicValueChange(
        //   "onBLECharacteristicValueChangeCallback"
        // );
        // window.onBLECharacteristicValueChangeCallback = res => {
        //   let result = JSON.parse(res);
        //   console.log("4.特征值回调:", result);
        //   this.parseData(result.data);
        // };
      }
    },
    /**
     * 特征值变化的回调函数
     * @param {res} 返回值
     */
    onBLECharacteristicValueChangeCallback(res) {
      let result = JSON.parse(res);
      console.log("4.特征值回调:", result);
      if (
        result &&
        result.characteristicId === this.GLOBAL.INFO.CHARACTERISTIC_ID &&
        result.data &&
        result.data.length > 14
      ) {
        //开始解析数据
        this.parseData(result.data);
      } else {
        console.log("changeCharacteristicsState fail:" + res);
      }
    },
    /**
     * @description: 解析数据
     * @param {data}
     */
    parseData(data) {
      //解析bit第1位, 代表高压;
      let highData = this.substrData(data, 2);
      //解析第3位，代表低压
      let lowData = this.substrData(data, 6);
      localStorage.setItem("getHighData", highData);
      localStorage.setItem("getLowData", lowData);
      //解析第14位，代表脉搏
      let pulseBeat = this.substrData(data, 28);
      //年月日时分秒
      let year = new Date().getFullYear();
      let months = this.substrData(data, 18);
      let days = this.substrData(data, 20);
      let hours = this.substrData(data, 22);
      let minus = this.substrData(data, 24);
      let seconds = this.substrData(data, 26);
      let times =
        year +
        "-" +
        months +
        "-" +
        days +
        " " +
        hours +
        ":" +
        minus +
        ":" +
        seconds;
      console.log("获取时间：", times);
      //时间转时间戳：
      var dates = new Date(times.replace(/-/g, "/"));
      let timestamp = Date.parse(dates);
      console.log("时间转时间戳：", timestamp);
      //保存测量接口到数据平台
      var dataParams = {
        type: this.GLOBAL.INFO.TEMPERAT_TYPE,
        dataTypeName: "com.huawei.instantaneous.blood_pressure",
        startTime: timestamp,
        endTime: timestamp,
        value: {
          systolic: highData, //收缩压（高压）
          diastolic: lowData, //舒张压（低压）
          pulse: pulseBeat //脉搏
        }
      };
      console.log(JSON.stringify(dataParams));
      this.getHighData = localStorage.getItem("getHighData");
      this.getLowData = localStorage.getItem("getLowData");
      this.temperature_data = this.getHighData + "/" + this.getLowData;
      console.log("温度2" + (this.getHighData + "/" + this.getLowData));
      window.saveFunctionCallback = this.saveFunctionCallback;
      window.hilink.saveHealthData(
        JSON.stringify(dataParams),
        "saveFunctionCallback"
      );
    },
    /**
     * 跳转到血压计二级页面
     * @param {type}
     */
    saveFunctionCallback(res) {
      let result = JSON.parse(res);
      console.log("5.saveHealthData回调:", result);
      //   window.location.href =
      //     "huaweischeme://healthapp/basicHealth?healthType=9";
      //   window.JsInteraction.closeWeb();
    },
    getRecords() {
      window.location.href =
        "huaweischeme://healthapp/basicHealth?healthType=9";
    },
    /**
     * @description:解析私有协议函数
     * @param {data} 返回数据值
     * @param {offset} 十六进制下标
     */
    substrData(data, offset) {
      if (data) {
        let valueData = data.substr(offset, 2);
        return parseInt(valueData, 16);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.temperature {
  background: #fff;
  .info {
    width: 100%;
    margin: 0px auto;
    // margin-top: 80px;
  }
  .steps > p {
    color: #000;
    font-size: 20px;
    font-weight: 600;
    margin: 50px 0 10px 0;
  }
  .steps > ul {
    text-align: left;
    margin: 20px 30px 30px 30px;
    line-height: 28px;
    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
  }
  .steps > div {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    margin: 0px 30px 0px 30px;
  }
  .history_list {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    background: #fff;
    left: 0;
    right: 0;
    height: 60px;
  }
  .history_list button {
    background: #fe5401;
    color: #fff;
    border-radius: 20px;
    border: 0;
    height: 40px;
    padding: 0 45px;
    margin-top: 10px;
    font-size: 16px;
  }
  .temperature_data {
    height: 40px;
    line-height: 40px;
    color: #fb5f19;
    font-size: 28px;
    margin: 30px 0 20px 0;
  }
  .temperature_data span {
    font-size: 14px;
    margin-left: 6px;
  }
  .connect {
    padding: 20px;
  }
}
</style>
