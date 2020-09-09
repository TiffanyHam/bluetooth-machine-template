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
      disabled: true,
      info: {
        errCode: "0",
        fileKey:
          "24fd2e02f1fc99f3c4f33a97ed22180d881b18ff0b5b4f4d7b4ad61973255dbf"
      },
      keyN: ""
    };
  },
  mounted() {},
  methods: {
    //下载
    downloadBtn() {
      window.downloadCallback = info => {
        // eslint-disable-next-line no-unused-vars
        let data = JSON.parse(info);
        console.log("下载操作响应数据：", info);
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
    //写入数据
    writeValue() {
      let that = this;
      window.hilink.writeBLECharacteristicValue(
        that.deviceId,
        that.serviceId,
        that.characteristicId,
        that.keyN,
        "writeBLECharacteristicValueCallBack"
      );
      console.log("666666", that.keyN);
      window.writeBLECharacteristicValueCallBack = res => {
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
  background: #007dff;
  border-radius: 6px;
  margin: 20px;
  color: #fff;
  font-size: 14px;
}
</style>
