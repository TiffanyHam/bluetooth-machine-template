<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-09-25 17:33:45
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-10-23 11:43:31
-->
<template>
  <div class="temperature">
    <!-- Header -->
    <!-- <div class="header">
      <v-header
        pageName="测量"
        :iconImg="iconImg"
        @operation="getProper"
        :hasIcon="true"
      ></v-header>
    </div> -->
    <!-- image -->
    <div class="info">
      <img src="@/assets/image/public/omron.png" width="80%" alt="" />
    </div>
    <!-- text -->
    <div class="steps">
      <p>已连接，准备测量</p>
      <ul>
        <li>1.将左臂伸入袖带，袖带空气管朝向手掌内侧。</li>
        <li>
          2.上肘关节内侧往上10mm~20mm。
        </li>
        <li>
          3.使袖带空气管位于身体内侧。
        </li>
        <li>4.按测量键，发出‘滴’声，测量完成。</li>
      </ul>
      <div>完成以上操作后，请静待测量结果</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      iconImg: "",
      deviceId: ""
      // serviceId: "00001810-0000-1000-8000-00805f9b34fb", //0x1810
      // characteristicId: "00002a35-0000-1000-8000-00805f9b34fb" //0x2a35
    };
  },
  mounted() {
    let that = this;
    // that.hilink.setTitle(that.$t(''))
    that.deviceId = window.hilink.getDeviceId();

    window.changeBleConnectionStateCallback =
      that.changeBleConnectionStateCallback;

    window.onBLEServicesDiscoveredCallback =
      that.onBLEServicesDiscoveredCallback;

    window.getBluetoothAdapterStateCallback =
      that.getBluetoothAdapterStateCallback;

    window.onBLECharacteristicValueChangeCallback =
      that.onBLECharacteristicValueChangeCallback;

    //判断手机蓝牙状态的回调
    window.hilink.getBluetoothAdapterState("getBluetoothAdapterStateCallback");
    //注册蓝牙连接的回调
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
  },
  methods: {
    /**
     * @description: 获取蓝牙状态
     * @param {*} res
     */
    getBluetoothAdapterStateCallback(res) {
      let data = JSON.parse(res);
      console.log("1.蓝牙当前状态", data);
    },
    /**
     * @description: 监听蓝牙连接状态的改变事件的回调函数
     * @param {res} 返回值
     */
    changeBleConnectionStateCallback(res) {
      let data = JSON.parse(res);
      console.log("2.连接监听结果", data);
      if (data.connectState) {
        console.log("已连接");
      } else {
        console.log("连接失败");
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
      }
    },
    /**
     * 特征值变化的回调函数
     * @param {res} 返回值
     */
    onBLECharacteristicValueChangeCallback(res) {
      let result = JSON.parse(res);
      console.log("4.特征值回调:", result);
      //    {
      //  deviceId: "93176c87-118d-4b7d-a5e2-732b8939ef1f",
      //  serviceId: "",
      //  characteristicId: "00002a35-0000-1000-8000-00805f9b34fb",
      //  data: "1e5f003c004700e4070a130e15075900010600"  高压95   低压60 ，脉搏89
      //     }
      //this.parseData();
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
     * 测量结果解析存储
     * @param {data}
     */
    // parseData() {
    //保存测量接口到数据平台
    //   var dataParams = {
    //     type: 10002,
    //     dataTypeName: "com.huawei.instantaneous.blood_pressure",
    //     startTime: 1488297600000,
    //     endTime: 1488297600000,
    //     value: {
    //       diastolic: 99,
    //       systolic: 99,
    //       pulse: 98
    //     }
    //   };
    //   console.log(JSON.stringify(dataParams));
    //   window.saveFunctionCallback = this.saveFunctionCallback;
    //   window.hilink.saveHealthData(
    //     JSON.stringify(dataParams),
    //     "saveFunctionCallback"
    //   );
    // },
    /**
     * @description:解析函数
     * @param {data} 返回数据值
     * @param {offset} 十六进制下标
     */
    substrData(data, offset) {
      if (data) {
        let valueData = data.substr(offset, 2);
        return parseInt(valueData, 16);
      }
    },
    parseData(data) {
      //代表单位
      //let units = parseInt(data.substr(0, 2), 16).toString(2);
      //   //解析bit第1位, 代表高压;
      //   let highData = data.substr(2, 2);
      //   //解析第3位，代表低压
      //   let lowData = data.substr(6, 2);
      //   //解析第14位，代表脉搏
      //   let pulseBeat = data.substr(28, 2);
      //   //时间
      //   let year = new Date().getFullYear();
      //   let months = data.substr(18, 2);
      //   let days = data.substr(20, 2);
      //   let hours = data.substr(22, 2);
      //   let minus = data.substr(24, 2);
      //   let seconds = data.substr(26, 2);

      //   //  if (("000" + units).substr(0, 1) == 0) {
      //   highData = parseInt(highData, 16);
      //   console.log("高压: ", highData);
      //   lowData = parseInt(lowData, 16);
      //   console.log("低压: ", lowData);
      //   pulseBeat = parseInt(pulseBeat, 16);
      //   console.log("脉搏: ", pulseBeat);
      //   //年月日时分秒
      //   months = parseInt(months, 16);
      //   days = parseInt(days, 16);
      //   hours = parseInt(hours, 16);
      //   minus = parseInt(minus, 16);
      //   seconds = parseInt(seconds, 16);
      let highData = this.substrData(data, 2);
      let lowData = this.substrData(data, 6);
      let pulseBeat = this.substrData(data, 28);
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
      window.saveFunctionCallback = this.saveFunctionCallback;
      window.hilink.saveHealthData(
        JSON.stringify(dataParams),
        "saveFunctionCallback"
      );
      //  }
    },
    /**
     * 跳转到血压计二级页面
     * @param {type}
     */
    saveFunctionCallback(res) {
      let result = JSON.parse(res);
      console.log("5.saveHealthData回调:", result);
      window.location.href =
        "huaweischeme://healthapp/basicHealth?healthType=9";
      window.JsInteraction.closeWeb();
    }
  }
};
</script>
<style lang="scss" scoped>
.temperature {
  background: #fff;
  .info {
    width: 100%;
    margin: 20px auto;
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
    font-size: 14px;
  }
  .steps > div {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
  }
}
</style>
