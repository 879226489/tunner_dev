<template>
  <div>
    <div class="pageTitle">
      <h4 class="titleFont">播发记录分类统计</h4>
    </div>
    <!-- <div class="filter-container">
      <div class="select-container" style="width:90%;">
        <Select style="width:200px;" v-model="type" @on-change="typeChange">
          <Option value="0">来源</Option>
          <Option value="1">模式</Option>
        </Select>
        <AreaSelect range="[5,4,3]" col="8" />
        <DatePicker
          type="daterange"
          split-panels
          placeholder="日期段选择"
          style="width: 200px"
          @on-change="dateChange"
        ></DatePicker>
      </div>
      <div class="function-container" style="width:10%;">
        <Button icon="md-cloud-upload">导出</Button>
      </div>
    </div> -->
    <div class="filter">
      <Row>
        <i-col span="4">
          <Select style="width:200px;" v-model="searchForm.flag">
            <Option :value="0">来源</Option>
            <Option :value="1">模式</Option>
          </Select>
        </i-col>
        <i-col span="10">
          <AreaSelect range="[5,4,3]" col="8" @change="getArea" />
        </i-col>
        <i-col span="4">
          <DatePicker
            type="daterange"
            split-panels
            placeholder="日期段选择"
            style="width: 200px"
            @on-change="dateChange"
          ></DatePicker>
        </i-col>
        <i-col span="6">
          <Button icon="md-cloud-upload" style="float: right;" @click="exportData">导出</Button>
        </i-col>
      </Row>
    </div>
    <div class="table-container">
      <Tabs :value="activeName" @on-click="getTabType">
        <TabPane label="表格" name="table">
          <div class="table-container">
            <div v-show="searchForm.flag == 0">
              <p>{{areaName}}总数： {{allTotal}}</p>
              <Table border stripe :columns="columns" :data="data" align="center" ></Table>
            </div>
            <div v-show="searchForm.flag == 1">
              <p style="marginBottom: 5px">{{areaName}}总数: {{allTotal}}</p>
              <p><span>日常广播总数： {{tDaily}}</span> <span style="marginLeft: 30px;">应急广播总数： {{tEmergency}}</span></p>
              <Table border stripe :columns="columns1" :data="data1" align="center"></Table>
            </div>
          </div>
        </TabPane>
        <TabPane label="图表" name="pictrue">
          <div>
            <Bar :value="chartData1" style="width: 100%; height: 60vh;" v-if="searchForm.flag == 0"/>
            <PatternBar :value="chartData2" style="width: 100%; height: 60vh" v-if="searchForm.flag == 1" />
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { bClassStatistics, bClassStatisticsExport, bClassStatisticsChart } from '@/api/dataTotal'
import AreaSelect from '@/components/commonComponent/areaSelect';
import Bar from './recordEchart/bar'
import PatternBar from './recordEchart/patternBar'
export default {
  components: {
    AreaSelect,
    Bar,
    PatternBar
  },
  data() {
    return {
      type: "0",
      //来源表格
      page: 1,
      total: 0,
      size: 10,
      //来源和模式flag
      flag: 0,
      areaId: "",
      startTime: "",
      endTime: "",
      show: true,
      columns: [
        {
          title: '所属区域',
          key: 'areaName'
        },
        {
          title: "市",
          key: "city"
        },
        {
          title: "县",
          key: "county"
        },
        {
          title: "镇",
          key: "town"
        },
        {
          title: "村",
          key: "village"
        },
        {
          title: "电话",
          key: "phone"
        },
        {
          title: "短信",
          key: "sm"
        }
      ],
      columnsCopy: [
        {
          title: '地区',
          key: 'areaName'
        },
        {
          title: "市",
          key: "city"
        },
        {
          title: "县",
          key: "county"
        },
        {
          title: "镇",
          key: "town"
        },
        {
          title: "村",
          key: "village"
        },
        {
          title: "电话",
          key: "phone"
        },
        {
          title: "短信",
          key: "sm"
        }
      ],
      data: [],
      //模式表格
      columns1: [
        {
          title: '所属区域',
          key: 'areaName'
        },
        {
          title: "日常广播",
          key: "daily"
        },
        {
          title: "应急广播",
          key: "emergency"
        }
      ],
      data1: [],
      provinceList: [],
      cityList: [],
      //   柱状图
      yData1: [],
      yData2: [],

      activeName: 'table',
      allTotal: 0,
      tDaily: 0,
      tEmergency: 0,
      areaName: '',
      level: 5,
      searchForm: {
        flag: 0,
        areaId: '',
        startTime: '',
        endTime: '',
      },
      chartData1: {},
      chartData2: []
    };
  },
  watch: {
    searchForm: {
      handler() {
        if(this.activeName == 'table') {
          this.getData();
        }else if(this.activeName == 'pictrue') {
          this.getChartsData();
        }
      },
      deep: true
    }
  },
  methods: {
    getList() {
      this.data = [];
      this.data1 = [];
      this.yData1 = [];
      this.yData2 = [];
      let data = {
        flag: this.flag,
        areaId: this.areaId,
        startTime: this.startTime,
        endTime: this.endTime
      };
      this.$axios({
        method: "get",
        url: "./statistics/bClassStatistics?" + qs.stringify(data)
      }).then(res => {
        if (res.data.code == 200) {
          this.data.push(res.data.data);
          this.data1.push(res.data.data);
          for (let key in res.data.data) {
            this.yData1.push(res.data.data[key]);
          }
          for (let key1 in res.data.data) {
            this.yData2.push(res.data.data[key1]);
          }
          console.log(this.yData1);
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    dateChange(time) {
      this.searchForm.startTime = time[0];
      this.searchForm.endTime = time[1];
    },

    getArea(val) {
      console.log(val);
      this.areaName = val.name;
      this.searchForm.areaId = val.id;
      this.level = val.type;
      if(val.type < 5) {
        this.columns = this.columns.filter(item => item.title != '市')
        console.log(this.columns);
      } else {
        this.columns = this.columnsCopy;
      }
    },
    getData() {
      bClassStatistics(this.searchForm).then(res => {
        console.log(res)
        if(this.searchForm.flag == 0) {
          this.data = res.data.data.dataList;
          this.allTotal = res.data.data.total;
        }else{
          this.data1 = res.data.data.dataList;
          this.tDaily = res.data.data.tDaily;
          this.allTotal = res.data.data.total;
          this.tEmergency = res.data.data.tEmergency;
        }
      })
    },
    exportData() {
      let href;
      let params;
      if(this.searchForm.flag == 0) {
        let list = JSON.parse(JSON.stringify(this.data));
        list[0].shortMessage = this.data[0].sm;
        delete list[0].sm
        params = {
          areaName: this.areaName,
          flag: this.searchForm.flag,
          level: this.level == 5 ? '省级' : this.level == 4 ? '市级' : '县级',
          list,
          total: this.allTotal
        }
        href = `areaName=${this.areaName}&flag=${this.searchForm.flag}&level=${this.level == 5 ? '省级' : this.level == 4 ? '市级' : '县级'}&list=${JSON.stringify(this.data)}&total=${this.allTotal}`
      }else if(this.searchForm.flag == 1) {
        params = {
          areaName: this.areaName,
          flag: this.searchForm.flag,
          level: this.level == 5 ? '省级' : this.level == 4 ? '市级' : '县级',
          list: this.data1,
          total: this.allTotal,
          tEmergency: this.tEmergency,
          tDaily: this.tDaily
        }
      }
      bClassStatisticsExport(`export=${JSON.stringify(params)}`);
    },
    getChartsData() {
      bClassStatisticsChart(this.searchForm).then(res => {
        console.log(res.data.data, 281);
        if(this.searchForm.flag == 0) {
          this.chartData1 = res.data.data;
        }else if(this.searchForm.flag == 1) {
          this.chartData2 = res.data.data;
        }
      })
    },
    getTabType(name) {
      this.activeName = name;
      if(name == 'table') {
        this.getData();
      }else if(name == 'pictrue') {
        this.getChartsData();
      }
    }
  },
  mounted() {
    //this.getList();
    this.getData();
  },
  // updated() {
  //   this.$nextTick(() => {
  //     var myChart1 = this.echarts.init(this.$refs.main1);
  //     // 绘制图表
  //     myChart1.setOption({
  //       title: {
  //         text: "来源柱状图"
  //       },
  //       tooltip: {
  //         formatter: "总数<br/>共计：{c}"
  //       },
  //       legend: {
  //         data: ["来源"]
  //       },
  //       xAxis: {
  //         name:"（来源类别）",
  //         data: ["市", "县", "镇", "电话", "短信"]
  //       },
  //       yAxis: {
  //         type: "value",
  //         name:"（事件个数）/件",
  //         min: 0, //y轴的最小值
  //         max: 200, //y轴最大值
  //         interval: 20, //值之间的间隔
  //         axisLabel: {
  //           show: true,
  //           interval: "auto",
  //           formatter: "{value}"
  //         },
  //         show: true
  //       },
  //       series: [
  //         {
  //           name: "来源",
  //           type: "bar",
  //           // barWidth: 100,
  //           data: this.yData1
  //         }
  //       ]
  //     });
  //     var myChart2 = this.echarts.init(this.$refs.main2);
  //     // 绘制图表
  //     myChart2.setOption({
  //       title: {
  //         text: "模式柱状图"
  //       },
  //       tooltip: {
  //         formatter: "总数<br/>共计：{c}"
  //       },
  //       legend: {
  //         data: ["模式"]
  //       },
  //       xAxis: {
  //         name:"（模式类别）",
  //         data: ["日常", "应急"]
  //       },
  //       yAxis: {
  //         name:"（事件个数）/件",
  //         type: "value",
  //         min: 0, //y轴的最小值
  //         max: 200, //y轴最大值
  //         interval: 20, //值之间的间隔
  //         axisLabel: {
  //           show: true,
  //           interval: "auto",
  //           formatter: "{value}"
  //         },
  //         show: true
  //       },
  //       series: [
  //         {
  //           name: "模式",
  //           type: "bar",
  //           // barWidth: 100,
  //           data: this.yData2
  //         }
  //       ]
  //     });
  //   });
  // }
};
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/common.scss";
.filter {
  width: 100%;
  background-color: #fff;
  padding: 10px;
}
</style>