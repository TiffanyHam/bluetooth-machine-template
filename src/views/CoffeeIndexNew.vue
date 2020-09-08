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
          <!-- <div class="connect-status">
            {{
              machineInfo.statusValue[machineInfo.status ? "success" : "fail"]
            }}
          </div> -->
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

    <!-- 基本操作 -->
    <div class="boxContent">
      <div class="boxContent_item" @click="makeCoffee" style="margin-right:6px">
        <div class="item_list">
          <p>立即制作</p>
        </div>
        <div class="sign-right">
          <img class="rightIcon" src="@/assets/image/start.png" />
        </div>
      </div>
      <div class="boxContent_item" @click="toggleSettings">
        <div class="item_list">
          <p>设置</p>
        </div>
        <div class="sign-right">
          <img class="rightIcon" src="@/assets/image/setDefault.png" />
        </div>
      </div>
      <div class="loading" v-show="loadingS">
        <van-loading type="spinner" color="#1989fa" vertical
          >制作中</van-loading
        >
      </div>
    </div>

    <!-- 设置 -->
    <transition name="collapse">
      <div class="settingList" v-if="isShowSettings">
        <!-- 设置项 -->
        <div class="settingBox" v-for="(set, i) in settings" :key="i">
          <div class="content">
            <!-- 文本图标 -->
            <div class="labelArea">
              <div class="icon">
                <img :src="set.icon" class="image" />
              </div>
              <div class="title">{{ set.title }}</div>
              <div class="value">{{ set.choice[set.value] }}</div>
            </div>
            <!-- 选择 -->
            <div class="selectArea">
              <div class="scaleBox">
                <div
                  class="scale"
                  v-for="(item, j) in set.choice"
                  :key="j"
                  :style="{
                    left:
                      j === 0 ? 0 : (100 * j) / (set.choice.length - 1) + '%'
                  }"
                ></div>
              </div>
              <van-slider
                v-model="set.value"
                :min="0"
                :max="set.choice.length - 1"
                :step="1"
                :inactive-color="'#eeeeee'"
                :bar-height="3"
              >
                <template #button>
                  <div class="slider-button">
                    <div class="tips">{{ set.choice[set.value] }}</div>
                  </div>
                </template>
              </van-slider>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div class="log">
      <div @click="showLog" class="log-header flexBox">
        <span class="flexBox up_down">
          <span class="log-header-left">使用记录</span>
        </span>
        <div class="log-header-right flexBox">
          <!-- <img
            src="@/assets/image/showUp.png"
            alt
            class="rightIcon"
            v-if="fold"
          /> -->
          <van-icon name="arrow-up" v-if="fold" />
          <van-icon name="arrow-down" v-else />
          <!-- <img src="@/assets/image/showDown.png" alt class="rightIcon" v-else /> -->
        </div>
      </div>
      <transition name="fade">
        <div v-show="fold" class="log-main">
          <div class="date_title">
            <span>今天</span>
            <span>星期一</span>
          </div>
          <div class="item" v-for="item of list" :key="item.id">
            <div class="content">
              <div class="name">{{ item.name }}</div>
              <div class="time">{{ item.time }}</div>
            </div>
            <!-- <img src="@/assets/image/right.png" alt class="rightIcon" /> -->
          </div>
        </div>
      </transition>
    </div>

    <div class="logoArea">
      <img src="@/assets/image/logo.png" alt class="logoImg" />
      <img src="@/assets/image/nespresso.png" alt class="logoImg nes" />
    </div>
  </div>
</template>
<script>
export default {
  name: "CoffeeIndex",
  data() {
    return {
      fold: false,
      show: false,
      loadingS: false,
      id: "",
      activeNames: ["1"],
      machineInfo: {
        status: true,
        statusValue: {
          success: "设备已连接",
          fail: "设备未连接"
        },
        machineModel: "雀巢咖啡机 Expert D80",
        water: 80,
        equipmentIsOk: true,
        errorMsg: {}
      },
      list: [
        { id: "01", name: "Expert D80", time: "07:00" },
        { id: "02", name: "Expert D80", time: "07:24" }
      ],
      isShowSettings: true,
      settings: [
        {
          title: "饮品类别",
          value: 0,
          choice: ["芮斯崔朵", "浓缩咖啡", "大杯咖啡", "美式咖啡", "热水"],
          icon: require("@/assets/image/coffeeDefault.png")
        },
        {
          title: "温度设置",
          value: 0,
          choice: ["温", "热", "烫"],
          icon: require("@/assets/image/tempDefault.png")
        },
        {
          title: "自动关机时间",
          value: 0,
          choice: ["9分钟", "30分钟", "2小时", "8小时"],
          icon: require("@/assets/image/time.png")
        },
        {
          title: "水质硬度",
          value: 0,
          choice: ["等级 0", "等级 1", "等级 2", "等级 3", "等级 4"],
          icon: require("@/assets/image/waterDefault.png")
        }
      ]
    };
  },
  mounted() {},
  methods: {
    toggleSettings() {
      this.isShowSettings = !this.isShowSettings;
    },
    showLog() {
      this.fold = !this.fold;
    },
    settingModal() {},
    // eslint-disable-next-line no-unused-vars
    makeCoffee() {
      let that = this;
      that.loadingS = true;
      setTimeout(function() {
        that.loadingS = false;
      }, 1000);
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
  padding-bottom: 8px;
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
  z-index: 999;
}
.van-icon {
  font-size: 25px;
  color: rgba(0, 0, 0, 0.4);
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
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.fade-enter-active {
  transition: all 1s ease;
}
.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.fade-leave-to {
  transform: translateY(1rem);
  opacity: 0;
}
.log {
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 0.25rem 0.5rem 0.25rem;
  .log-header {
    span {
      display: inline-block;
      height: 1rem;
      line-height: 1rem;
      font-size: 16px;
    }
    // .log-header-right {
    //   width: 1.9rem;
    // }
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
  padding: 0.75rem 3rem 1rem 3rem;
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
    height: 1rem;
    width: 100%;
    padding: 2px 10px;
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
.settingList {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 0 0 5px;
  overflow: hidden;
}
.collapse-leave,
.collapse-enter-active {
  max-height: 100000rem; // 由于折叠面板内容一般不知道高度，所以用max-height, 而不是height
  opacity: 1;
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1); // 注意这里的打开和折叠的动画时间是不同的
}
.collapse-enter,
.collapse-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
  max-height: 0;
  opacity: 0;
}
.settingBox {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 3px 0 0;
  .content {
    background: #ffffff;
    position: relative;
    border-radius: 5px;
    padding: 10px 10px 10px 130px;
    height: 40px;
    .labelArea {
      width: 120px;
      position: absolute;
      left: 10px;
      top: 10px;
      height: 40px;
      line-height: 20px;
      text-align: left;
      font-size: 12px;
      box-sizing: border-box;
      padding-left: 25px;
      .icon {
        position: absolute;
        left: 0;
        top: 10px;
        width: 20px;
        height: 20px;
        .image {
          width: 20px;
        }
      }
      .title {
        font-size: 14px;
      }
      .value {
        color: rgba(0, 125, 255, 1);
        font-weight: bold;
      }
    }
    .selectArea {
      position: relative;
      width: 100%;
      height: 40px;
      padding: 25px 20px 15px;
      box-sizing: border-box;
      .scaleBox {
        position: absolute;
        top: 18px;
        left: 20px;
        width: calc(100% - 40px);
        text-align: left;
        .scale {
          position: absolute;
          width: 0;
          font-size: 0;
          height: 10px;
          border-right: 1px solid rgba(0, 0, 0, 0.2);
        }
      }
      .slider-button {
        position: relative;
        background: rgba(70, 160, 255, 0.9);
        border: 2px solid #ddd;
        border-radius: 50%;
        padding: 10px;
        vertical-align: top;
        white-space: nowrap;
        .tips {
          position: absolute;
          width: 100px;
          top: -20px;
          left: -41px;
          text-align: center;
          line-height: 20px;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
}
</style>
