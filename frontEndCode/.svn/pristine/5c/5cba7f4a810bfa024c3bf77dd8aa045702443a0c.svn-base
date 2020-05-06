<template>
  <div class="full-top">
    <div class="content-change">
      <div :class="{button: true, 'button-active': change=='charts'}" @click="change = 'charts'">图表</div>
      <div :class="{button: true, 'button-active': change=='list'}" @click="change = 'list'">列表</div>
      <div :class="{button: true, 'button-active': change=='type'}" @click="change = 'type'">类型图</div>
    </div>
    <div class="content" v-if="change == 'type'">
      <FullBar style="width: 100%; height: 100%;" :value="typeData" />
    </div>
    <div class="content" v-show="change == 'list'">
      <div class="content-one" ref="one">
        <Wheel
          :value="listData"
          :setList="setList"
          ref="wheel"
          v-if="listData.length != 0"
          width="500"
          height="160"
          top="220px"
        />
      </div>
      <div class="content-two">
        <div class="time-line">
          <div class="time-item" v-for="(item,index) in listData" :key="index">
            <span class="radio"></span>
            <span class="item-content">{{item.name}}</span>
            <span v-if="index !== listData.length - 1" class="item-line"></span>
          </div>
        </div>
      </div>
      <div class="content-three">
        <div class="three-header">
          <div style="margin-top: 50px;">
            <Calendar @choseDay="choseDay" :markDate="markDate" />
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-if="change == 'charts'">
      <div
        style="position: absolute; left: 10px; top: 10px; color: #a4acbf; z-index: 999; font-size: 2rem;"
      >
        <span>
          未处理预警：
          <span>{{chartData.untreated}}</span>
        </span>
        <span>
          消息总数：
          <span>{{chartData.msgTotal}}</span>
        </span>
      </div>
      <div style="flex: 1">
        <PieOne style="width: 100%; height: 100%;" :value="chartData.source" />
      </div>
      <div style="flex: 1">
        <PieTwo style="width: 100%; height: 100%;" :value="chartData.level" />
      </div>
      <div style="flex: 1">
        <PieThree style="width: 100%; height: 100%" :value="pullData" />
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "vue-calendar-component";
import FullBar from "./full/fullBar";
import PieOne from "./full/pieOne";
import PieTwo from "./full/pieTwo";
import PieThree from "./full/pieThree";
import Wheel from "./full/wheel";
import { fullEventStatistics } from "@/api/compre";
export default {
  components: {
    Calendar,
    FullBar,
    PieOne,
    PieTwo,
    PieThree,
    Wheel
  },
  data() {
    return {
      change: "list",
      searchForm: {
        flag: 0,
        startTime: "",
        endTime: ""
      },
      listData: [],
      typeData: [],
      chartData: {},
      pullData: [],
      markDate: []
    };
  },
  computed: {
    setList() {
      return this.$store.state.wheelSetting.setList;
    }
  },
  methods: {
    getData(flag) {
      if (flag !== undefined) {
        this.searchForm.flag = flag;
      }
      fullEventStatistics(this.searchForm).then(res => {
        this.listData = [
          ...res.data.list,
          ...res.data.list,
          ...res.data.list,
          ...res.data.list,
          ...res.data.list,
          ...res.data.list
        ];
        this.typeData = res.data.type;
        this.chartData = res.data.chart;
        this.pullData = [res.data.chart.unPublish, res.data.chart.publish];
      });
    },
    choseDay(day) {
      if (this.markDate.length > 1) {
        this.markDate = [];
      }
      if (this.markDate.length == 1) {
        if (new Date(day).getTime() > new Date(this.markDate[0]).getTime()) {
          this.markDate.push(day);
        } else {
          this.markDate.unshift(day);
        }
      } else {
        this.markDate.push(day);
      }
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.full-top {
  position: relative;
  .content-change {
    position: absolute;
    right: 10px;
    z-index: 999;
    .button {
      display: inline-block;
      width: 80px;
      text-align: center;
      line-height: 25px;
      border: 1px solid #ccc;
      border-radius: 3px;
      color: #ccc;
      background: #3f2e5b;
      cursor: pointer;
      margin-left: 10px;
    }
    .button-active {
      color: #000;
      background: #c1d4e9;
    }
  }
  .content {
    display: flex;
    min-width: 1200px;
    height: 790px;
    //background-image: radial-gradient(#2d8cf0, #3f2e5b);
    position: relative;
    .content-one {
      min-width: 700px;
      flex: 3;
    }
    .content-two {
      flex: 1;
      .time-line {
        position: relative;
        width: 90%;
        height: 90%;
        margin: 10px auto;
        border: 1px solid #fff;
        box-shadow: 0 0 15px #4e4e4e;
        color: #fff;
        .time-item {
          margin-top: 10px;
          padding: 3px;
          margin-left: 20px;
          .radio {
            position: absolute;
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: blue;
            z-index: 999;
          }
          .item-content {
            margin-left: 30px;
            display: inline-block;
            line-height: 20px;
          }
          .item-line {
            position: absolute;
            z-index: 1;
            left: 32px;
            display: inline-block;
            width: 3px;
            height: 50px;
            background-color: #fff;
          }
        }
      }
    }
    .content-three {
      flex: 1;
      padding: 5px;
    }
  }
}
</style>

<style lang="scss">
.full-top {
  .wh_content_all[data-v-2ebcbc83] {
    background: none;
  }
  .wh_content_item .wh_isToday[data-v-2ebcbc83] {
    background: #ccc;
  }
  .wh_content_item[data-v-2ebcbc83] {
    height: 90px;
  }
}
</style>

