<template>
  <div class="full-event">
    <div style="margin-top: 15px;">
      <Form label-position="left" :label-width="100">
        <Row>
          <i-col span="8">
            <FormItem label="是否轮播：">
              <Select
                transfer
                v-model="setList.allIsWheel"
                style="width:180px"
                @on-change="changeLoop"
              >
                <Option :value="1">是</Option>
                <Option :value="0">否</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="8">
            <FormItem label="轮播速度：">
              <Select
                transfer
                v-model="setList.allWheelSpeed"
                style="width:180px"
                @on-change="changeTime"
              >
                <Option :value="5">5秒</Option>
                <Option :value="10">10秒</Option>
                <Option :value="60">1分钟</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="8">
            <FormItem label="手动轮播：">
              <Button @click="$refs.wheel.prev()">上一个</Button>
              <Button @click="$refs.wheel.next()">下一个</Button>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </div>
    <div>
      <div class="header">
        <div class="header-top"></div>
        <div class="header-title">全事件数据统计</div>
        <div class="header-type">
          <RadioGroup v-model="searchForm.flag" @on-change="getData()">
            <Radio :label="0">全事件</Radio>
            <Radio :label="1">村村响</Radio>
            <Radio :label="2">省应急</Radio>
          </RadioGroup>
        </div>
      </div>
      <div>
        <div class="content-change">
          <div
            :class="{button: true, 'button-active': change=='charts'}"
            @click="change = 'charts'"
          >图表</div>
          <div :class="{button: true, 'button-active': change=='list'}" @click="change = 'list'">列表</div>
          <div :class="{button: true, 'button-active': change=='type'}" @click="change = 'type'">类型图</div>
        </div>
        <div class="content" v-if="change == 'type'">
          <FullBar style="width: 100%; height: 100%;" :value="typeData" />
        </div>
        <div class="content" v-show="change == 'list'">
          <div class="content-one" ref="one">
            <Wheel :value="listData" :setList="setList" ref="wheel" v-if="listData.length != 0" />
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
              <div style="margin-top: 30px;">
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
    </div>
    <div style="margin-top: 15px;">
      <div class="header">
        <div class="header-top"></div>
        <div class="header-title">单一事件覆盖效果</div>
        <div class="header-type">
          <Icon
            type="md-settings"
            size="25"
            style="margin-right: 20px; cursor: pointer"
            @click="showSetting = true; getCoverData()"
          />
        </div>
      </div>
      <div class="content">
        <Cover style="width:100%; height: 500px;" />
      </div>
    </div>
    <Modal v-model="showSetting" title="人口覆盖率阈值设置" @on-ok="submit">
      <Form :model="coverForm" label-position="right" :label-width="100">
        <FormItem label="覆盖率低">
          <InputNumber :min="0" v-model="coverForm.lowStartValue" /> ~ <InputNumber :min="0" v-model="coverForm.lowEndValue" />
        </FormItem>
        <FormItem label="覆盖率中">
          <InputNumber :min="0" v-model="coverForm.inStartValue" /> ~ <InputNumber :min="0" v-model="coverForm.inEndValue" />
        </FormItem>
        <FormItem label="覆盖率高">
          <InputNumber :min="0" v-model="coverForm.highStartValue" /> ~ <InputNumber :min="0" v-model="coverForm.highEndValue" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  fullEventStatistics,
  getPCoverageSetting,
  pCoverageSetting
} from "@/api/compre";
import { Move } from "@/utils/common";
import Calendar from "vue-calendar-component";
import FullBar from "./full/fullBar";
import PieOne from "./full/pieOne";
import PieTwo from "./full/pieTwo";
import PieThree from "./full/pieThree";
import Wheel from "./full/wheel";
import FullTop from "./fullTop";
import Cover from "./full/cover";
export default {
  components: {
    Calendar,
    FullBar,
    PieOne,
    PieTwo,
    PieThree,
    Wheel,
    FullTop,
    Cover
  },
  data() {
    return {
      type: "apple",
      change: "list",
      searchForm: {
        flag: 0,
        startTime: "",
        endTime: ""
      },
      markDate: [],
      listData: [],
      typeData: [],
      chartData: {},
      pullData: [],
      move: null,
      showSetting: false,
      coverForm: {
        id: "",
        lowStartValue: 0,
        lowEndValue: 0,
        inStartValue: 0,
        inEndValue: 0,
        highStartValue: 0,
        highEndValue: 0,
      }
    };
  },
  computed: {
    setList() {
      return this.$store.state.wheelSetting.setList;
    }
  },
  methods: {
    ...mapActions(["getSetting", "saveSetting", "setCoverSetting"]),
    getData() {
      fullEventStatistics(this.searchForm).then(res => {
        this.listData = [
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
    },
    changeLoop(val) {
      this.saveData();
    },
    changeTime(val) {
      this.saveData();
    },
    saveData() {
      let data = JSON.parse(JSON.stringify(this.setList));
      data.allIsWheel = data.allIsWheel == 1 ? true : false;
      data.openIsWheel = data.openIsWheel == 1 ? true : false;
      this.saveSetting(data);
    },
    getCoverData() {
      getPCoverageSetting().then(res => {
        let {id, coverLowValue, coverInValue, coverHighValue} = res.data.data;
        this.coverForm.id = id;
        this.coverForm.lowStartValue = Number(coverLowValue.split("~")[0]);
        this.coverForm.lowEndValue = Number(coverLowValue.split("~")[1]);
        this.coverForm.inStartValue = Number(coverInValue.split("~")[0]);
        this.coverForm.inEndValue = Number(coverInValue.split("~")[1]);
        this.coverForm.highStartValue = Number(coverHighValue.split("~")[0]);
        this.coverForm.highEndValue = Number(coverHighValue.split("~")[1]);
        this.setCoverSetting({...this.coverForm});
      })
    },
    submit() {
      let params = {
        id: this.coverForm.id,
        coverLowValue: `${this.coverForm.lowStartValue}~${this.coverForm.lowEndValue}`,
        coverInValue: `${this.coverForm.inStartValue}~${this.coverForm.inEndValue}`,
        coverHighValue: `${this.coverForm.highStartValue}~${this.coverForm.highEndValue}`
      }
      pCoverageSetting(params).then(res => {
        if(res.data.code == 200) {
          this.$Message.success("保存成功");
          this.getCoverData();
        }
      })
    }
  },
  mounted() {
    this.getData();
    this.getCoverData();
  }
};
</script>

<style lang="scss" scope>
.full-event {
  position: relative;
  .header {
    display: flex;
    width: 100%;
    height: 50px;
    background: #3f2e5b;
    background-image: linear-gradient(to right, #2d8cf0, #3f2e5b);
    color: #fff;
    .header-top {
      flex: 1;
      min-width: 15px;
      max-width: 15px;
      height: 100%;
      background: rgb(140, 140, 248);
    }
    .header-title {
      flex: 1;
      line-height: 50px;
      margin-left: 15px;
    }
    .header-type {
      line-height: 50px;
    }
  }
  .content-change {
    position: absolute;
    top: 110px;
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
    height: 500px;
    background: yellow;
    background-image: radial-gradient(#2d8cf0, #3f2e5b);
    position: relative;
    .content-one {
      min-width: 700px;
      max-width: 700px;
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
.full-event {
  .wh_content_all {
    background: none;
  }
  .wh_content_item .wh_isToday {
    background: #ccc;
  }
}
</style>