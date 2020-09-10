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
    this.getUnRegisterDeviceFun();
  },
  methods: {
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
