<template>
  <div class="wheel" ref="wheel">
    <div class="wheel-info" :style="{marginTop: $attrs.top}">
      <div v-show="showInfo">
        <p>
          <span class="name">事件名称：</span>
          <span>{{selectData.name}}</span>
        </p>
        <p>
          <span class="name">消息类别：</span>
          <span>{{selectData.msgCategory}}</span>
        </p>
        <p>
          <span class="name">覆盖区域：</span>
          <span>{{selectData.regions}}</span>
        </p>
        <p>
          <span class="name">覆盖人口：</span>
          <span>{{selectData.population}}</span>
        </p>
        <p>
          <span class="name">部门：</span>
          <span>{{selectData.depName}}</span>
        </p>
        <p>
          <span class="name">负责人：</span>
          <span>{{selectData.depPerson}}</span>
        </p>
        <div
          class="status"
        >{{selectData.status == 0 ? '未处理' : selectData.status == 1 ? '等待播发' : selectData.status == 2 ? '播发中' : selectData.status == 3 ? '播发成功' : selectData.status == 4 ? '播发失败' : '播发取消'}}</div>
      </div>
      <transition name="projection">
        <img v-show="show" :src="tx" class="tx-img" />
      </transition>
    </div>
    <div class="wheel-content" ref="tab"></div>
  </div>
</template>

<script>
import { Move2 } from "@/utils/common";
import { mapActions } from "vuex";
export default {
  props: {
    value: Array
  },
  data() {
    return {
      move: null,
      selectData: {},
      tx: require("@/assets/img/tx.png"),
      show: false,
      showInfo: false
    };
  },
  watch: {
    "move.selectData": {
      handler(data) {
        this.show = false;
        this.showInfo = false;
        setTimeout(() => {
          this.show = true;
        }, 1000);
        setTimeout(() => {
          this.showInfo = true;
        }, 1500);
        this.selectData = data;
        this.setSelectData(data);
        this.setCover({ id: data.ebmId });
      },
      deep: true
    },
    setList: {
      handler(data) {
        this.move.time = data.allWheelSpeed * 1000;
        if (data.allIsWheel == 1) {
          this.move.setInt();
        } else {
          this.move.clearTimer();
        }
      },
      deep: true
    }
  },
  computed: {
    setList() {
      return this.$store.state.wheelSetting.setList;
    }
  },
  methods: {
    ...mapActions(["setCover", "setSelectData"]),
    setData() {
      this.$nextTick(() => {
        this.move = new Move2(
          this.$refs.wheel.scrollWidth / 2 - 48,
          this.$refs.wheel.scrollHeight / 2 - 30,
          this.$attrs.width || 280,
          this.$attrs.height || 130
        );
        this.move.init(this.value, this.$refs.tab);
        if (this.setList.allIsWheel == 1) {
          this.move.setInt();
        } else {
          this.move.clearTimer();
        }
        this.move.time = this.setList.allWheelSpeed * 1000;
      });
    },
    next() {
      this.move.next();
    },
    prev() {
      this.move.prev();
    }
  },
  mounted() {
    this.setData();
  }
};
</script>

<style lang="scss" scope>
.wheel {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .wheel-info {
    position: relative;
    width: 400px;
    height: 200px;
    background: #043759;
    box-shadow: 0px 5px 5px 0px #0095e0 inset, -5px 0px 5px 0px #0095e0 inset,
      5px 0px 5px 0px #0095e0 inset, 0px -5px 5px 0px #0095e0 inset;
    border-radius: 5px;
    z-index: 3;
    margin: 30px auto;
    padding: 10px;
    color: #ccc;
    p {
      padding: 5px;
      .name {
        display: inline-block;
        width: 80px;
      }
    }
    .status {
      display: inline-block;
      width: 80px;
      line-height: 30px;
      text-align: center;
      background: rgb(57, 212, 57);
      color: #fff;
      border-radius: 5px;
      position: absolute;
      right: 15px;
      bottom: 15px;
    }
    .tx-img {
      width: 100%;
      height: 200px;
      position: absolute;
      top: 200px;
      left: 0px;
      z-index: 2;
    }
  }
  .wheel-content {
    .parent {
      position: absolute;
      width: 90px;
      height: 90px;
      transition: 1s all ease;
      .title {
        position: absolute;
        top: -30px;
        right: -40px;
      }
      .title-content {
        position: absolute;
        top: -20px;
        left: 10px;
        color: #ccc;
      }
    }
  }
}

.projection-enter-active {
  transition: opacity 0.5s;
}
.projection-enter {
  opacity: 0;
}
</style>

<style>
</style>