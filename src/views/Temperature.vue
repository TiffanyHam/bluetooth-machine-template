<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-09-25 17:33:45
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-10-16 17:22:27
-->
<template>
  <div class="temperature">
    <!-- Header -->
    <div class="header">
      <v-header
        pageName="测量"
        :iconImg="iconImg"
        @operation="getProper"
        :hasIcon="true"
      ></v-header>
    </div>
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
      deviceId: "",
      serviceId: "00001810-0000-1000-8000-00805f9b34fb", //0x1810
      characteristicId: "00002a35-0000-1000-8000-00805f9b34fb" //0x2a35
    };
  },
  mounted() {
    let that = this;
    that.deviceId = window.hilink.getDeviceId();
    //console.log("deviceId:" + that.deviceId);

    window.changeBleConnectionStateCallback =
      that.changeBleConnectionStateCallback;

    window.onBLEServicesDiscoveredCallback =
      that.onBLEServicesDiscoveredCallback;

    window.getBluetoothAdapterStateCallback =
      that.getBluetoothAdapterStateCallback;

    window.onBLECharacteristicValueChangeCallback =
      that.onBLECharacteristicValueChangeCallback;

    //判断手机蓝牙状态
    window.hilink.getBluetoothAdapterState("getBluetoothAdapterStateCallback");
    //注册蓝牙连接的回调方法
    window.hilink.onBLEConnectionStateChange(
      "changeBleConnectionStateCallback"
    );
    //注册发现服务的回调方法
    window.hilink.onBLEServicesDiscovered("onBLEServicesDiscoveredCallback");

    window.hilink.onBLECharacteristicValueChange(
      "onBLECharacteristicValueChangeCallback"
    );
    //连接蓝牙
    window.hilink.createBLEConnection(that.deviceId);
  },
  methods: {
    getProper() {},
    /*
     * 获取蓝牙状态
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
      // let that = this;
      let data = JSON.parse(res);
      console.log("2.连接监听结果", data);
      if (data.connectState) {
        console.log("已连接");
        //let timer = null;
        //clearInterval(timer);
        //timer = setInterval(() => {
        // let status = window.hilink.notifyBLECharacteristicValueChange(
        //   that.deviceId,
        //   that.serviceId,
        //   that.characteristicId,
        //   true
        // );
        // console.log(
        //   "deviceId:" + that.deviceId,
        //   "serviceId:" + that.serviceId,
        //   "characteristicId:" + that.characteristicId
        // );
        // console.log("特征值899999988888888:", status);
        // }, 200);
      } else {
        console.log("连接失败");
      }
    },
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
      //     deviceId: "93176c87-118d-4b7d-a5e2-732b8939ef1f",
      //     serviceId: "",
      //     characteristicId: "00002a35-0000-1000-8000-00805f9b34fb",
      //     data: "1e5f0040004a00e4070a101007274e00010000"
      //     }
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
    parseData(data) {
      //解析第13位, 代表单位;
      let unit = data.substr(12, 1);
      //.解析第14位
      let highData = data.substr(13, 1);
      //.解析第15~16位
      let lowData = data.substr(14, 2);
      if (parseInt(unit, 16) === 0) {
        highData = parseInt(highData, 16);
        lowData = parseInt(lowData, 16);
        this.tempData = (highData * 256 + lowData) / 10;
        console.log("parseData.tempData: " + this.tempData);
        //保存测量接口到数据平台
        var dataParams = {
          type: this.GLOBAL.INFO.TEMPERAT_TYPE,
          value: {
            temp: this.tempData,
            unit: ""
          }
        };
        window.saveFunctionCallback = this.saveFunctionCallback;
        window.hilink.saveHealthData("saveFunctionCallback");
        this.jsInjection.saveMeasure(JSON.stringify(dataParams), "saveFuncti");
      }
    }

    /**
     * 跳转到血压计二级页面
     * @param {type}
     */
    // saveFunctionCallback() {
    //   window.location.href =
    //     "huaweischeme://healthapp/basicHealth?healthType=2";
    //   this.jsInjection.conseWeb();
    // }
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
