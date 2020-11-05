<template>
  <div class="home">
    <button
      @click="downloadBtn"
      :disabled="disabled"
      :class="disabled === true ? 'colorChange' : 'btnColor'"
    >
      下载
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
  name: "Home",
  data() {
    return {
      serviceId: "0000FFB0-0000-1000-8000-00805F9B34FB",
      characteristicId: "0000FFB2-0000-1000-8000-00805F9B34FB",
      writeCharacteristicId: "0000FFB1-0000-1000-8000-00805F9B34FB",
      deviceId: "",
      disabled: false,
      disabled1: false,
      //   info: {
      //     errCode: "0",
      //     fileKey:
      //       "24fd2e02f1fc99f3c4f33a97ed22180d881b18ff0b5b4f4d7b4ad61973255dbf"
      //   },
      keyN: ""
    };
  },
  mounted() {
    //this.getUnRegisterDeviceFun();
    let times = 2020 + "-" + 10 + "-" + 21 + " " + 14 + ":0" + 8 + ":0" + 8;
    // console.log(times);
    //时间转时间戳：
    var date = new Date(times.replace(/-/g, "/"));
    let time3 = Date.parse(date);
    //console.log("时间转时间戳：", time3);

    // console.log("时间戳转时间：", this.getYMDHMS());

    let data = "";
    let highData = this.substrData(data, 28);
    console.log("highData", highData);
  },
  methods: {
    substrData(data, offset) {
      if (data) {
        let valueData = data.substr(offset, 2);
        return parseInt(valueData, 16);
      }
    },
    //时间戳转时间：
    getYMDHMS() {
      let time = new Date(1603260488000);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let date = time.getDate();
      let hours = time.getHours();
      let minute = time.getMinutes();
      let second = time.getSeconds();

      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minute +
        ":" +
        second
      );
    },
    /**
     * 下载
     */
    downloadBtn() {
      this.disabled = true;
      window.downloadCallback = info => {
        this.disabled = false;
        // eslint-disable-next-line no-unused-vars
        let data = JSON.parse(info);
        console.log("下载操作---响应数据：", info);
        this.getData(data.fileKey);
      };
      window.hilink.downloadFile(
        "http://5g.roaman.vip/uploadfilegujian/20200909/20200909161648.zip",
        "Cube.bin",
        "downloadCallback"
      );
    },
    getData(KEY) {
      this.keyN = window.hilink.getStorageSync(KEY);
      console.log("获取data数据：", this.keyN);
    },

    /**
     * 获取当前页面被选中的未注册的设备
     */
    getUnRegisterDeviceFun() {
      window.getCurrentUnregisteredDeviceCallback = res => {
        let data = JSON.parse(res);
        this.deviceId = data.deviceId;
        console.log("获取A的MAC地址(ios的uuid)：", data.deviceId);
      };
      window.hilink.getCurrentUnregisteredDevice(
        "getCurrentUnregisteredDeviceCallback"
      );
    },

    /**
     * 写入数据
     */

    writeValue() {
      this.disabled1 = true;
      window.hilink.writeBLECharacteristicValue(
        this.deviceId,
        this.serviceId,
        this.characteristicId,
        this.keyN,
        "writeBLECharacteristicValueCallBack"
      );
      console.log("测试：", this.characteristicId);
      window.writeBLECharacteristicValueCallBack = res => {
        this.disabled1 = false;
        // let data = JSON.parse(res);
        console.log("writeBLECharacteristicValueCallBack:", res);
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.home button {
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
</style>
