<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-09-25 17:33:45
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-12-08 11:14:07
-->
<template>
  <div class="temperature">
    <div class="info">
      <img src="@/assets/image/public/omron.png" width="80%" alt="" />
    </div>
    <!-- text -->
    <div class="steps">
      <p>
        <span>{{ $t("text.connect") }}</span>
      </p>
      <ul>
        <li>{{ $t("text.list_t1") }}</li>
        <li>
          {{ $t("text.list_t2") }}
        </li>
        <li>
          {{ $t("text.list_t3") }}
        </li>
        <li>{{ $t("text.list_t4") }}</li>
        <li>{{ $t("text.list_t5") }}</li>
      </ul>
    </div>
    <!-- <div @click="getRecords">44444444444</div> -->
    <!-- Dialog -->
    <!-- <v-dialog
      :dialogContent="connectDes"
      :showDialog="dialog"
      :isBtn="isBtn"
      :centerBtnText="confirmBtn"
      :centerBtnEvent="centerBtnEvent"
    ></v-dialog> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      //   dialog: false,
      //   isBtn: false,
      //    connectDes: this.$t("text.offBle"),
      //   confirmBtn: this.$t("text.confirmBtn"),
      iconImg: "",
      deviceId: "",
      serviceId: "", //0x1810
      characteristicId: "", //0x2a35
      timers: null,
      flag: false
    };
  },
  created() {
    this.iconImg = require("@/assets/image/public/ic_public_close.png");
  },
  mounted() {
    let that = this;
    console.log(44);
    that.deviceId = window.hilink.getDeviceId();
    window.getBluetoothAdapterStateCallback =
      that.getBluetoothAdapterStateCallback;
    window.changeBleConnectionStateCallback =
      that.changeBleConnectionStateCallback;
    window.onBLEServicesDiscoveredCallback =
      that.onBLEServicesDiscoveredCallback;
    window.onBLECharacteristicValueChangeCallback =
      that.onBLECharacteristicValueChangeCallback;
    // window.saveFunctionCallback = this.saveFunctionCallback;
    that.initData();
    // clearInterval(this.timers);
    // this.timers = setInterval(() => {
    //   this.initData();
    // }, 1000);
  },
  //   beforeDestroy() {
  //     console.log(66666);
  //     // 断开蓝牙连接
  //     window.hilink.closeBleConnection(this.deviceId);
  //     if (this.timers) {
  //       clearInterval(this.timers);
  //     }
  //   },
  methods: {
    /**
     * @description: 弹窗确认按钮
     * @param {*}
     */

    centerBtnEvent() {
      this.dialog = false;
    },
    initData() {
      // 判断手机蓝牙状态
      //   window.hilink.getBluetoothAdapterState(
      //     "getBluetoothAdapterStateCallback"
      //   );
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
      window.hilink.createBLEConnection(this.deviceId);
    },
    /**
     * 手机蓝牙状态回调：判断手机蓝牙是否打开，未打开则显示连接失败
     *
     * @param {Object} res 返回值
     */
    // getBluetoothAdapterStateCallback(res) {
    //   let result = JSON.parse(res);
    //   if (result) {
    //     console.log("BluetoothState = " + result.available);
    //   }
    //   if (result.available !== true) {
    //     console.log(9090);
    //     this.dialog = true;
    //   } else {
    //     this.dialog = false;
    //   }
    // },
    /**
     * @description: 监听蓝牙连接状态的改变事件的回调函数
     * @param {res} 返回值
     */
    changeBleConnectionStateCallback(res) {
      let data = JSON.parse(res);
      console.log("1.连接监听结果", data);
      if (data.connected == false) {
        // if (this.flag) return;
        this.initData();
        // clearInterval(this.timers);
      } else {
        console.log(333);
        // this.flag = true;
      }
    },
    /**
     * @description: 监听服务发现状态
     * @param {res} 返回值
     */
    onBLEServicesDiscoveredCallback(res) {
      let that = this;
      let data = JSON.parse(res);
      console.log("2.发现服务", res);
      if (data.errCode == 0) {
        that.serviceId = "00001810-0000-1000-8000-00805f9b34fb";
        that.characteristicId = "00002a35-0000-1000-8000-00805f9b34fb";
        let status = window.hilink.notifyBLECharacteristicValueChange(
          that.deviceId,
          that.serviceId,
          that.characteristicId,
          true
        );
        console.log("2.1.特征值:", status);
      }
    },
    /**
     * 特征值变化的回调函数
     * @param {res} 返回值
     */
    onBLECharacteristicValueChangeCallback(res) {
      let result = JSON.parse(res);
      if (result) {
        console.log(333);
      }
      console.log("3.特征值回调:", result);
      if (
        result &&
        result.characteristicId === this.GLOBAL.INFO.CHARACTERISTIC_ID &&
        result.data &&
        result.data.length > 14
      ) {
        //拿到血压数据  开始解析数据
        this.parseData(result.data);
      }
    },
    /**
     * @description: 解析血压计数据
     * @param {data}
     */
    parseData(newData) {
      //解析bit第1位, 代表高压;
      let highData = this.substrData(newData, 2);
      //解析第3位，代表低压
      let lowData = this.substrData(newData, 6);
      console.log("血压:" + (highData + "/" + lowData));
      //解析第14位，代表脉搏
      let pulseBeat = this.substrData(newData, 28);
      //年月日时分秒
      //   let year = parseInt(newData.substr(0, 4), 16);
      let year = new Date().getFullYear();
      console.log("nian", year);
      let months = this.substrData(newData, 18);
      let days = this.substrData(newData, 20);
      let hours = this.substrData(newData, 22);
      let minus = this.substrData(newData, 24);
      let seconds = this.substrData(newData, 26);
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
      if (dataParams) {
        window.location.href =
          "huaweischeme://healthapp/basicHealth?healthType=9";
        window.JsInteraction.closeWeb();
      }
      //   window.hilink.saveHealthData(
      //     JSON.stringify(dataParams),
      //     "saveFunctionCallback"
      //   );
    },
    /**
     * 跳转到血压计二级页面
     * @param {type}
     */
    // saveFunctionCallback(res) {
    //   let result = JSON.parse(res);
    //   console.log("4.saveHealthData回调:", result);
    //   window.location.href =
    //     "huaweischeme://healthapp/basicHealth?healthType=9";
    //   window.JsInteraction.closeWeb();
    // },
    // getRecords() {
    //   window.location.href =
    //     "huaweischeme://healthapp/basicHealth?healthType=9";
    // },
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
  }
  .steps > p {
    color: rgba(0, 0, 0, 0.9);
    font-size: 16px;
    font-weight: 600;
    margin: 24px 0 0px 0;
    font-weight: 600;
  }
  .steps > ul {
    text-align: left;
    margin: 16px 24px 0px 24px;
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    font-weight: 400;
  }
  .steps > ul > li {
    margin-top: 8px;
  }
  .steps > div {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    margin: 0px 24px 0px 24px;
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
