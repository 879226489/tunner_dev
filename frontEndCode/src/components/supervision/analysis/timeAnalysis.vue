<template>
  <div>
    <div class="pageTitle">
      <h4 class="titleFont">播发时间统计</h4>
    </div>
    <!-- <div class="filter-container">
      <div class="select-container" style="width:90%;">
        <Select style="width:200px;" placeholder="请选择省级">
          <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
        <Select style="width:200px;" placeholder="请选择市级" class="margin">
          <Option v-for="item in cityList" :value="item.id" :key="item">1</Option>
        </Select>
        <DatePicker
          type="daterange"
          split-panels
          placeholder="日期段选择"
          style="width: 250px"
          v-model="timeRange"
          :value="timeRange"
          @on-change="timeChange"
        ></DatePicker>
      </div>
      <div class="function-container" style="width:10%;">
        <Button icon="md-cloud-upload">
          <span style="position:relative;bottom:6px;">导出</span>
        </Button>
      </div>
    </div>-->
    <div style="background: #fff; padding: 15px;">
      <Row>
        <i-col span="8">
          <AreaSelect range="[5,4]" col="12" @change="searchForm.areaId = $event.id" />
        </i-col>
        <i-col span="4">
          <DatePicker
            type="daterange"
            split-panels
            placeholder="日期段选择"
            style="width: 250px"
            v-model="timeRange"
            :value="timeRange"
            @on-change="timeChange"
          ></DatePicker>
        </i-col>
        <i-col span="12">
          <RadioGroup v-model="searchForm.flag" type="button" style="float: right">
            <Radio :label="0">趋势图</Radio>
            <Radio :label="1">散点图</Radio>
          </RadioGroup>
        </i-col>
      </Row>
    </div>
    <div class="table-container">
      <!-- <div ref="main" style="width: 80vw;height:70vh;margin:25px auto;"></div> -->
      <TimeLine v-if="searchForm.flag == 0" :value="chartData" style="width: 100%; height: 60vh" />
      <TimeScatter v-if="searchForm.flag == 1" :value="scatterData" style="width: 100%; height: 60vh" />
      <!-- <Table border stripe :columns="columns" :data="tableData" align="center" style="height:auto;"></Table> -->
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { broadcastStatistics } from "@/api/dataTotal";
import AreaSelect from "@/components/commonComponent/areaSelect";
import TimeLine from "./timeEchart/timeLine";
import TimeScatter from './timeEchart/timeScatter'
export default {
  components: {
    AreaSelect,
    TimeLine,
    TimeScatter
  },
  data() {
    return {
      areaId: "",
      startTime: "",
      endTime: "",
      timeRange: [],
      provinceList: [],
      cityList: [],
      // 折线图数据
      xData: [],
      yData: [],
      columns: [],
      //小时时间段
      hour: [
        {
          title: "播发时间段",
          key: "title"
        },
        {
          title: "0时-1时",
          key: "1"
        },
        {
          title: "1时-2时",
          key: "2"
        },
        {
          title: "2时-3时",
          key: "3"
        },
        {
          title: "3时-4时",
          key: "4"
        },
        {
          title: "4时-5时",
          key: "5"
        },
        {
          title: "5时-6时",
          key: "6"
        },
        {
          title: "6时-7时",
          key: "7"
        },
        {
          title: "7时-8时",
          key: "8"
        },
        {
          title: "8时-9时",
          key: "9"
        },
        {
          title: "9时-10时",
          key: "10"
        },
        {
          title: "10时-11时",
          key: "11"
        },
        {
          title: "11时-12时",
          key: "12"
        },
        {
          title: "12时-13时",
          key: "13"
        },
        {
          title: "13时-14时",
          key: "14"
        },
        {
          title: "14时-15时",
          key: "15"
        },
        {
          title: "15时-16时",
          key: "16"
        },
        {
          title: "16时-17时",
          key: "17"
        },
        {
          title: "17时-18时",
          key: "18"
        },
        {
          title: "18时-19时",
          key: "19"
        },
        {
          title: "19时-20时",
          key: "20"
        },
        {
          title: "20时-21时",
          key: "21"
        },
        {
          title: "21时-22时",
          key: "22"
        },
        {
          title: "22时-23时",
          key: "23"
        },
        {
          title: "23时-24时",
          key: "24"
        }
      ],
      //天数时间段
      day: [
        {
          title: "播发时间段",
          key: "title"
        },
        {
          title: "1号",
          key: "1"
        },
        {
          title: "2号",
          key: "2"
        },
        {
          title: "3号",
          key: "3"
        },
        {
          title: "4号",
          key: "4"
        },
        {
          title: "5号",
          key: "5"
        },
        {
          title: "6号",
          key: "6"
        },
        {
          title: "7号",
          key: "7"
        },
        {
          title: "8号",
          key: "8"
        },
        {
          title: "9号",
          key: "9"
        },
        {
          title: "10号",
          key: "10"
        },
        {
          title: "11号",
          key: "11"
        },
        {
          title: "12号",
          key: "12"
        },

        {
          title: "13号",
          key: "13"
        },
        {
          title: "14号",
          key: "14"
        },
        {
          title: "15号",
          key: "15"
        },
        {
          title: "16号",
          key: "16"
        },
        {
          title: "17号",
          key: "17"
        },
        {
          title: "18号",
          key: "18"
        },
        {
          title: "19号",
          key: "19"
        },
        {
          title: "20号",
          key: "20"
        },
        {
          title: "21号",
          key: "21"
        },
        {
          title: "22号",
          key: "22"
        },
        {
          title: "23号",
          key: "23"
        },
        {
          title: "24号",
          key: "24"
        },
        {
          title: "25号",
          key: "25"
        },
        {
          title: "26号",
          key: "26"
        },
        {
          title: "27号",
          key: "27"
        },
        {
          title: "28号",
          key: "28"
        },
        {
          title: "29号",
          key: "29"
        },
        {
          title: "30号",
          key: "30"
        },
        {
          title: "31号",
          key: "31"
        }
      ],
      //月份时间段
      month: [
        {
          title: "播发时间段",
          key: "title"
        },
        {
          title: "1月份",
          key: "1"
        },
        {
          title: "2月份",
          key: "2"
        },
        {
          title: "3月份",
          key: "3"
        },
        {
          title: "4月份",
          key: "4"
        },
        {
          title: "5月份",
          key: "5"
        },
        {
          title: "6月份",
          key: "6"
        },
        {
          title: "7月份",
          key: "7"
        },
        {
          title: "8月份",
          key: "8"
        },
        {
          title: "9月份",
          key: "9"
        },
        {
          title: "10月份",
          key: "10"
        },
        {
          title: "11月份",
          key: "11"
        },
        {
          title: "12月份",
          key: "12"
        }
      ],
      data: [],

      searchForm: {
        areaId: "",
        startTime: "",
        endTime: "",
        flag: 0
      },
      chartData: {
        chartData: [],
        broTimeDate: []
      },
      scatterData: {
        dayList: [],
        hourList: []
      },
      tableData: []
    };
  },
  watch: {
    searchForm: {
      handler() {
        this.getData();
      },
      deep: true
    }
  },
  methods: {
    // getList() {
    //   let data = {
    //     areaId: this.areaId,
    //     startTime: this.startTime,
    //     endTime: this.endTime
    //   };
    //   // 当页面刷新时表格规则、折线图、横坐标纵坐标置为空
    //   this.columns = [];
    //   this.xData = [];
    //   this.xData = [];
    //   this.data = [];
    //   this.$axios({
    //     method: "get",
    //     url: "./statistics/broadcastStatistics?" + qs.stringify(data)
    //   }).then(res => {
    //     if (res.data.code == 200) {
    //       var chartData = res.data.data.chartData;
    //       const source = {};
    //       //当返回为hour时间时
    //       if (chartData.length == 24) {
    //         this.hour.forEach(item => {
    //           this.columns.push(item);
    //         });
    //         //this.xData = ["0~1时","1~2时","2~3时","3~4时","4~5时","5~6时","6~7时","7~8时","8~9时","9~10时","10~11时","11~12时","12~13时","13~14时","14~15时","15~16时","16~17时","17~18时","18~19时","19~20时","20~21时","21~22时","22~23时","23~24时"]
    //         this.xData = [
    //           "1时",
    //           "2时",
    //           "3时",
    //           "4时",
    //           "5时",
    //           "6时",
    //           "7时",
    //           "8时",
    //           "9时",
    //           "10时",
    //           "11时",
    //           "12时",
    //           "13时",
    //           "14时",
    //           "15时",
    //           "16时",
    //           "17时",
    //           "18时",
    //           "19时",
    //           "20时",
    //           "21时",
    //           "22时",
    //           "23时",
    //           "24时"
    //         ];
    //         //当返回为几号几号时
    //       } else if (chartData.length > 24) {
    //         this.day.forEach(item => {
    //           this.columns.push(item);
    //           this.xData = [
    //             "1号",
    //             "2号",
    //             "3号",
    //             "4号",
    //             "5号",
    //             "6号",
    //             "7号",
    //             "8号",
    //             "9号",
    //             "10号",
    //             "11号",
    //             "12号",
    //             "13号",
    //             "14号",
    //             "15号",
    //             "16号",
    //             "17号",
    //             "18号",
    //             "19号",
    //             "20号",
    //             "21号",
    //             "22号",
    //             "23号",
    //             "24号",
    //             "25号",
    //             "26号",
    //             "27号",
    //             "28号",
    //             "29号",
    //             "30号",
    //             "31号"
    //           ];
    //         });
    //         //当返回为月份时
    //       } else if (chartData.length == 12) {
    //         this.month.forEach(item => {
    //           this.columns.push(item);
    //           this.xData = [
    //             "一月份",
    //             "二月份",
    //             "三月份",
    //             "四月份",
    //             "五月份",
    //             "六月份",
    //             "七月份",
    //             "八月份",
    //             "九月份",
    //             "十月份",
    //             "十一月份",
    //             "十二月份"
    //           ];
    //         });
    //       }
    //       //为表格data赋值
    //       let newObj = { title: "总时长(小时)" };
    //       for (var i = 0; i < chartData.length; i++) {
    //         Object.assign(newObj, chartData[i + 1], chartData[i]);
    //       }
    //       this.data.push(newObj);
    //       //为yData赋值
    //       res.data.data.chartData.forEach(item => {
    //         for (var key in item) {
    //           this.yData.push(item[key]);
    //         }
    //       });
    //       console.log(this.yData);
    //     } else {
    //       this.$Message.error(res.data.msg);
    //     }
    //   });
    // },
    timeChange(time) {
      this.searchForm.startTime = time[0];
      this.searchForm.endTime = time[1];
    },

    getData() {
      broadcastStatistics(this.searchForm).then(res => {
        if (res.data.code == 200 && JSON.stringify(res.data.data) != "{}") {
          if (this.searchForm.flag == 0) {
            this.chartData = res.data.data;
          }else if(this.searchForm.flag == 1) {
            this.scatterData = res.data.data;
          }
          // let broTimeDate = res.data.data.broTimeDate;
          // if (broTimeDate.length == 24) {
          //   this.columns = this.hour;
          // } else if (broTimeDate.length > 24) {
          //   this.columns = this.day;
          // } else if (broTimeDate.length == 12) {
          //   this.columns = this.month;
          // }
          // let newObj = { title: "总时长(小时)" };

          // broTimeDate.forEach(item => {
          //   Object.assign(newObj, item);
          // });
          // console.log(newObj);
          // this.tableData = [newObj];
        }
      });
    }
  },
  mounted() {
    //this.getList();
    this.getData();
  }
};
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/common.scss";
</style>