<template>
  <div class="CoffeeIndex">
    <!-- 咖啡机信息 -->
    <div class="machineInfo wa">
      <!-- 咖啡机图片 -->
      <div class="machine-img">
        <img src="../assets/image/coffeeMachine.png" alt="咖啡机型号" />
      </div>
      <!-- 咖啡机链接情况 -->
      <div class="machine-connect">
        <div class="content">
          <div class="connect-status">
            {{
              machineInfo.statusValue[machineInfo.status ? "success" : "fail"]
            }}
          </div>
          <div class="connect-info" v-if="machineInfo.status">
            {{ machineInfo.machineModel }}
          </div>
        </div>
      </div>
      <!-- 咖啡机状态 -->
      <div class="machine-status">
        <!-- 设备状态 -->
        <div class="status-equipment">
          <div class="text">设备状态</div>
          <div class="sign-equipment">
            {{ machineInfo.equipmentIsOk ? "正常" : "异常，请检查！" }}
          </div>
        </div>
        <!-- 水量状态 -->
        <div class="status-water">
          <div class="text">剩余水量</div>
          <div class="sign-water">
            <div class="waterBall">
              <div
                class="water"
                v-if="machineInfo.water"
                :style="{ height: machineInfo.water + '%' }"
              ></div>
              <span
                class="text"
                :style="{ color: machineInfo.water >= 50 ? 'white' : 'black' }"
                >{{ machineInfo.water + "%" }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="boxContent">
      <div
        class="boxContent_item"
        @click="clickT(i)"
        v-for="(item, i) in listObj"
        :key="i"
        style="margin-right:6px"
      >
        <div class="item_list">
          <p>{{ item.name }}</p>
          <p>{{ i === 0 ? coffeeValue : waterSet }}</p>
        </div>
        <div class="sign-right">
          <img class="rightIcon" :src="item.imgs" />
        </div>
      </div>
    </div>
    <div class="boxContent" style="margin:6px 0">
      <div class="boxContent_item" @click="makeCoffee" style="margin-right:6px">
        <div class="item_list">
          <p>立即制作</p>
        </div>
        <div class="sign-right">
          <img class="rightIcon" src="@/assets/image/coffeeDefault.png" />
        </div>
      </div>
      <div class="boxContent_item">
        <div class="item_list">
          <p>更多设置</p>
        </div>
        <div class="sign-right">
          <img class="rightIcon" src="@/assets/image/setDefault.png" />
        </div>
      </div>
      <van-popup v-model="show" position="bottom" :overlay="true">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
      </van-popup>
      <div class="loading" v-show="loadingS">
        <van-loading type="spinner" color="#1989fa" vertical
          >制作中</van-loading
        >
      </div>
    </div>
    <div class="log">
      <div class="log-header flexBox">
        <span class="log-header-left">使用记录</span>
        <div class="log-header-right flexBox">
          <span>更多</span>
          <img class="rightIcon" src="@/assets/image/right.png" />
        </div>
      </div>

      <div class="log-main">
        <div class="date_title">
          <span>今天</span>
          <span>星期一</span>
        </div>
        <div class="item" v-for="item of list" :key="item.id">
          <div class="content">
            <div class="name">{{ item.name }}</div>
            <div class="time">{{ item.time }}</div>
          </div>
          <img src="@/assets/image/right.png" alt="" class="rightIcon" />
        </div>
      </div>
    </div>

    <div class="logoArea">
      <img src="@/assets/image/logo.png" alt="" class="logoImg" />
      <img src="@/assets/image/nespresso.png" alt="" class="logoImg nes" />
    </div>
  </div>
</template>
<script>
export default {
  name: "CoffeeIndex",
  data() {
    return {
      show: false,
      loadingS: false,
      columns: [],
      id: "",
      coffeeValue: "芮斯崔朵(25毫升)",
      waterSet: "温 warm",
      listObj: [
        {
          id: 1,
          name: "饮品选择",
          imgs: require("@/assets/image/waterDefault.png")
        },
        {
          id: 2,
          name: "温度设置",
          imgs: require("@/assets/image/tempDefault.png")
        }
      ],
      machineInfo: {
        status: true,
        statusValue: {
          success: "设备已连接",
          fail: "设备未连接"
        },
        machineModel: "雀巢咖啡机 Expert D80",
        water: 80,
        equipmentIsOk: true,
        errorMsg: {},
        isFlag: false
      },
      list: [
        { id: "01", name: "Expert D80", time: "07:00" },
        { id: "02", name: "Expert D80", time: "07:24" }
      ]
    };
  },
  mounted() {},
  methods: {
    // eslint-disable-next-line no-unused-vars
    clickT(id) {
      this.show = true;
      this.id = id;
      if (id === 0) {
        this.isFlag = true;
        this.columns = [
          "芮斯崔朵(25毫升)",
          "浓缩咖啡(40毫升)",
          "大杯咖啡(110毫升)",
          "美式咖啡(25毫升热水；125毫升咖啡)"
        ];
      } else {
        this.isFlag = false;
        this.columns = ["温 warm", "热 hot", "烫 extra hot"];
      }
    },
    onCancel() {
      this.show = false;
    },
    makeCoffee() {
      let that = this;
      that.loadingS = true;
      setTimeout(function() {
        that.loadingS = false;
      }, 3000);
    },
    onConfirm(picker) {
      this.show = false;
      if (this.isFlag === true) {
        this.coffeeValue = picker;
      } else {
        this.waterSet = picker;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.logoArea {
  margin-top: 6px;
  padding: 0.25rem 0.5rem;
  background: #ffffff;
  border-radius: 6px;
  .logoImg {
    vertical-align: middle;
    width: 70px;
  }
  .nes {
    padding-left: 25px;
    width: 120px;
  }
}
.boxContent {
  display: flex;
}
.CoffeeIndex {
  margin: 6px;
}
.boxContent_item {
  position: relative;
  flex: 1;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: #fff;
  width: 100%;
  .item_list:first-child {
    text-align: left;
  }
  .item_list:second-child {
    text-align: right;
  }
}
.item_list {
  width: 100%;
  padding: 0 0.5rem;
  box-sizing: border-box;
  p {
  }
  p:first-child {
    font-size: 16px;
  }
  p:nth-child(2) {
    color: rgba(0, 125, 255, 1);
    font-weight: bold;
  }
}
.sign-right {
  position: absolute;
  right: 20px;
  top: 50%;
  margin-top: -10px;
  width: 20px;
  height: 20px;
}
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.van-icon {
  font-size: 30px;
}
// 公用
html,
body,
#app {
  width: 100%;
  height: 100%;
}
.rightIcon {
  display: inline-block;
  width: 24px;
  height: 24px;
}
.flexBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

//自定义
.log {
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 0.25rem 0.5rem 0.5rem;
  .log-header {
    span {
      display: inline-block;
      height: 1rem;
      line-height: 1rem;
      font-size: 16px;
    }
    .log-header-right {
      width: 1.9rem;
    }
  }
  .log-main {
    text-align: left;
    .date_title {
      height: 1rem;
      line-height: 1rem;
      span {
        margin: 0 0.5rem 0 0;
      }
    }
    .date_simple {
      .log_history {
        height: 1.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
    .item {
      position: relative;
      box-sizing: border-box;
      padding: 0.25rem 1rem 0.25rem 0;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      margin-top: -1px;
      .content {
        position: relative;
        width: 100%;
        line-height: 24px;
        font-size: 12px;
        .name {
        }
        .time {
          position: absolute;
          right: 0;
          top: 0;
          text-align: right;
        }
      }
      .rightIcon {
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -12px;
        width: 24px;
        height: 24px;
      }
    }
  }
}
.machineInfo {
  * {
    box-sizing: border-box;
    // outline: 1px solid rgba(255, 0, 0, 0.4);
  }
  margin-bottom: 6px;
  box-sizing: border-box;
  position: relative;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  padding: 1rem 3rem 2rem 3rem;
  width: 100%;
  .machine-img {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .machine-connect {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2rem;
    width: 100%;
    padding: 5px 10px;
    z-index: 12;
    .content {
      width: 100%;
      padding: 5px 10px;
      border-radius: 10px;
      background-color: #ffffff;
      border: 0px solid #aaa;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      font-weight: bold;
      color: rgba(0, 125, 255, 1);
      .connect-info {
        font-weight: normal;
        color: rgba(0, 0, 0, 0.8);
        font-size: 14px;
      }
    }
  }
  .machine-status {
    position: absolute;
    top: 1rem;
    left: 0;
    width: 100%;
    line-height: 24px;
    .status-equipment {
      position: absolute;
      left: 0;
      top: 0;
      width: 3rem;
      .text {
        font-size: 14px;
      }
      .sign-equipment {
        padding-top: 5px;
        font-size: 16px;
        color: #25a915;
        font-weight: bold;
      }
    }
    .status-water {
      position: absolute;
      right: 0;
      top: 0;
      width: 3rem;
      .text {
        font-size: 14px;
      }
      .sign-water {
        padding-top: 5px;
      }
    }
  }
}
.waterBall {
  position: relative;
  overflow: hidden;
  width: 50px;
  height: 50px;
  margin: 0 auto;
  border-radius: 50%;
  border: 1px solid rgba(0, 125, 255, 1);
  .text {
    width: 100%;
    line-height: 20px;
    display: block;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    bottom: 30%;
    left: 0;
    position: absolute;
    z-index: 100;
  }
  .water {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 50%;
    box-sizing: border-box;
    background: rgba(0, 125, 255, 1);
  }
  .water:before {
    position: absolute;
    top: -45px;
    left: -5%;
    display: block;
    content: " ";
    background-image: url(../assets/image/waterBall.svg);
    background-repeat: no-repeat;
    background-position: 0 29px;
    background-size: 100%;
    width: 110%;
    height: 50px;
    z-index: 99;
  }
}
.waterBall:before {
  position: absolute;
  top: -15px;
  left: 0;
  display: block;
  content: " ";
}
</style>
