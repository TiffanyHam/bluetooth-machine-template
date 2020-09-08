<template>
  <div class="home">
    <button @click="downloadBtn">下载</button>
    <button @click="writeValue">写入数据</button>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      serviceId: "0000180a-0000-1000-8000-00805f9b34fb",
      characteristicId: "00002a23-0000-1000-8000-00805f9b34fb",
      deviceId: "",
      disabled: true
    };
  },
  mounted() {},
  methods: {
    downloadBtn() {
      window.downloadCallback = info => {
        // eslint-disable-next-line no-unused-vars
        let data = JSON.parse(info);
        console.log("下载", info);
      };
      window.hilink.downloadFile(
        "https://192.168.1.119:8443/download/1.jar",
        "Cube.bin",
        "downloadCallback"
      );
    },
    writeValue() {
      let that = this;
      window.hilink.writeBLECharacteristicValue(
        that.deviceId,
        that.serviceId,
        that.characteristicId,
        "010941000A",
        "writeBLECharacteristicValueCallBack"
      );
      window.writeBLECharacteristicValueCallBack = res => {
        let data = JSON.parse(res);
        console.log("writeBLECharacteristicValueCallBack:", data);
        //deviceId = data.deviceId;
      };
    },
    getSystemInfo() {
      //设备信息
      window.getSystemInfoSyncCallBack = info => {
        let data = JSON.parse(info);
        if (data.platform == "iOS") {
          console.log("iOS设备");
        } else {
          console.log("andorid设备");
        }
      };
      window.hilink.getSystemInfoSync("getSystemInfoSyncCallBack");
    }
  }
};
</script>
<style lang="scss" scoped>
.home button {
  width: 70px;
  height: 30px;
  border: none;
  background: #007dff;
  border-radius: 6px;
  margin: 20px;
  color: #fff;
  font-size: 14px;
}
</style>
