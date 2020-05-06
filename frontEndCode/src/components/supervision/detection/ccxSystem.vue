<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/common.scss";
.main-container {
  margin-top: 15px;
}
</style>
<template>
  <div>
    <div class="pageTitle">
      <h4 class="titleFont">村村响系统</h4>
    </div>
    <!-- <div class="filter-container">
      <div class="select-container">
        <Select
          clearable
          style="width:200px;"
          placeholder="请选择市级"
          class="margin"
          v-model="cityId"
          @on-change="areaCityChange"
        >
          <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <Select
          clearable
          style="width:200px;margin-right:25px;"
          placeholder="请选择县级"
          v-model="townId"
          @on-change="areaTownChange"
        >
          <Option v-for="item in townList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <Select style="width:200px;" v-model="selectValue" v-show="!flag" @on-change="changeSelect">
          <Option value="kj">开机率</Option>
          <Option value="gz">故障率</Option>
        </Select>
      </div>
      <div class="function-container">
        <div class="search-box" v-if="flag" style="width:100%;">
          <Input
            search
            enter-button
            v-model="keyword"
            @on-search="search"
            placeholder="根据系统名称搜索..."
          />
        </div>
      </div>
    </div>-->
    <div style="background: #fff; padding: 15px;">
      <Row>
        <i-col span="12">
          <AreaSelect
            range="[5,4,3]"
            col="8"
            @change="searchForm.areaId = $event.id; chartForm.areaId = $event.id"
          />
        </i-col>
        <i-col span="12">
          <!-- <Select
            v-model="chartForm.type"
            style="width:200px"
            v-show="currentTab == 'pictrue'"
            @on-change="getChartData()"
          >
            <Option :value="0">故障率</Option>
            <Option :value="1">开机率</Option>
          </Select> -->
          <Input
            v-if="currentTab == 'table'"
            style="float: right; width: 300px;"
            v-model="searchForm.keyword"
            placeholder="根据系统名称搜索..."
          />
        </i-col>
      </Row>
    </div>
    <!-- 表格图表区域 -->
    <div class="main-container">
      <Tabs @on-click="chooseTabs" v-model="currentTab">
        <TabPane label="表格" name="table">
          <div class="table-container">
            <Table border stripe :columns="columns" :data="tableData" align="center"></Table>
            <Page
              style="text-align:center;margin-top:20px;"
              :total="total"
              size="small"
              :page-size="size"
              :page-size-opts="[10,15,20]"
              show-elevator
              show-sizer
              show-total
              @on-change="searchPage.pageNum = $event"
              @on-page-size-change="searchPage.pageSize = $event"
            />
            <Table
              border
              stripe
              :columns="columns1"
              :data="data1"
              align="center"
              style="height:auto;"
            ></Table>
          </div>
        </TabPane>
        <TabPane label="图表" name="pictrue">
          <Bar :value="chartData" style="width: 80vw; height: 60vh" v-show="flag1" v-if="currentTab == 'pictrue'" />
          <!-- <div ref="main1" style="width: 80vw;height:70vh;margin:0 auto;" v-show="flag1"></div>
          <div v-show="!flag1" ref="main2" style="width: 80vw;height:70vh;margin:0 auto;"></div>-->
        </TabPane>
      </Tabs>
    </div>
    <Modal v-model="modal1" width="800px">
      <DatePicker
        type="daterange"
        split-panels
        placeholder="日期段选择"
        @on-change="timeChange"
        ref="timeLine"
        style="width: 280px"
      ></DatePicker>
      <Table border stripe :columns="columns2" :data="data2" align="center"></Table>
      <Page
        style="text-align:center;margin-top:20px;"
        :total="total1"
        size="small"
        :page-size="size1"
        :page-size-opts="[10,15,20]"
        show-elevator
        show-sizer
        show-total
        @on-change="powerForm.pageNum = $event;estateShow()"
        @on-page-size-change="powerForm.pageSize = $event; estateShow()"
      />
    </Modal>
    <Modal v-model="modal2" width="500px" title="系统详情">
      <Form :model="ccxInfo" label-position="left" :label-width="100">
        <FormItem label="IP地址">{{ccxInfo.ipAddress}}</FormItem>
        <FormItem label="端口号">{{ccxInfo.port}}</FormItem>
        <FormItem label="接口地址">{{ccxInfo.interfaceAddress}}</FormItem>
        <FormItem label="产商">{{ccxInfo.manufacturer}}</FormItem>
        <FormItem
          label="平台状态"
        >{{ccxInfo.status == 1 ? '开机/运行正常' : ccxInfo.status == 2 ? '关机/停止运行' : ccxInfo.status == 3 ? '故障' : ccxInfo.status == 4 ? '故障恢复' : ccxInfo.status == 5 ? '播发中' : '未知状态'}}</FormItem>
        <FormItem label="资源编码">{{ccxInfo.resourceCode}}</FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import qs from "qs";
import {
  villageSysMonitorList,
  villageSysDetail,
  queryPowersBySysId,
  vSysMonitorChart
} from "@/api/monitor";
import AreaSelect from "@/components/commonComponent/areaSelect";
import Bar from "./systemCharts/ccxSystemBar";
export default {
  components: {
    AreaSelect,
    Bar
  },
  data() {
    return {
      //当选择表格显示或者图标显示时的flag
      flag: true,
      //当选择开机率还是故障率时的flag
      flag1: true,
      //电力情况modal
      modal1: false,
      //系统详情modal
      modal2: false,
      //select框初始值为开机
      selectValue: "kj",
      //初始的tab标签的指定name
      currentTab: "table",
      cityId: "",
      townId: "",
      areaId: "",
      keyword: "",
      cityList: [],
      townList: [],
      // 保存系统id
      estateId: "",
      // 村村响系统列表
      page: 1,
      size: 10,
      total: 0,
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "系统名称",
          align: "center",
          key: "platformName"
        },
        {
          title: "系统地址",
          align: "center",
          key: "areaStruct"
        },
        {
          title: "播发状态",
          align: "center",
          key: "status"
        },
        {
          title: "终端总数",
          align: "center",
          key: "total"
        },
        {
          title: "终端总故障率",
          align: "center",
          key: "faultRate",
          render: (h, params) => {
            return h("span", {
              style: {
                cursor: "pointer"
              },
              domProps: {
                innerHTML: params.row.faultRate + "%"
              }
            });
          }
        },
        {
          title: "终端总开机率",
          align: "center",
          key: "upRate",
          render: (h, params) => {
            return h("span", {
              style: {
                cursor: "pointer"
              },
              domProps: {
                innerHTML: params.row.upRate + "%"
              }
            });
          }
        },
        {
          title: "电力状态",
          key: "estate",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  size: "small"
                },
                on: {
                  click: () => {
                    this.powerForm.id = params.row.id;
                    this.powerForm.pageNum = 1;
                    this.estateShow();
                    this.modal1 = true;
                  }
                }
              },
              "电力详情"
            );
          }
        },
        {
          title: "系统详情",
          key: "addetail",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.getDetails(params.row.id);
                    // /rtMonitor/villageSysDetail
                    // this.modal2 = true;
                  }
                }
              },
              "查看详情"
            );
          }
        }
      ],
      tableData: [],
      //平局开机率、平均故障率表格
      columns1: [
        {
          title: "终端总数",
          align: "center",
          key: "srvTotal"
        },
        {
          title: "平均故障率",
          align: "center",
          key: "avgFaultRate",
          render: (h, params) => {
            return h("div", `${params.row.avgFaultRate}%`);
          }
        },
        {
          title: "平均开机率",
          key: "avgUpRate",
          render: (h, params) => {
            return h("div", `${params.row.avgUpRate}%`);
          }
        }
      ],
      data1: [{ srvTotal: 0, avgFaultRate: 0, avgUpRate: 0 }],
      //电力状态详情
      page1: 1,
      size1: 10,
      total1: 0,
      startTime: "",
      endTime: "",
      columns2: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "日期",
          align: "center",
          key: "time"
        },
        {
          title: "对相电压",
          align: "center",
          key: "phaseVoltage，"
        },
        {
          title: "相电压",
          align: "center",
          key: "lineVoltage"
        },
        {
          title: "电流",
          align: "center",
          key: "electricity"
        },
        {
          title: "功率指标",
          align: "center",
          key: "powerIndex"
        }
      ],
      data2: [],
      // 开机率横坐标纵坐标
      xData1: [],
      yData1: [],
      // 故障率横坐标纵坐标
      xData2: [],
      yData2: [],

      searchForm: {
        areaId: "",
        keyword: ""
      },
      searchPage: {
        pageNum: 1,
        pageSize: 10
      },
      ccxInfo: {},
      powerForm: {
        id: "",
        startTime: "",
        endTime: "",
        pageNum: 1,
        pageSize: 10
      },
      chartForm: {
        areaId: "",
        type: "",
      },
      chartData: []
    };
  },
  watch: {
    searchForm: {
      handler() {
        if (this.currentTab == "table") {
          this.searchPage.pageNum = 1;
          this.getData();
        }else if(this.currentTab == 'pictrue') {
          this.getChartData();
        }
      },
      deep: true
    },
    searchPage: {
      handler() {
        this.getData();
      },
      deep: true
    }
  },
  methods: {
    // 获取系统表格
    getSysList() {
      this.xData1 = [];
      this.yData1 = [];
      this.xData2 = [];
      this.yData2 = [];
      let data = {
        areaId: this.areaId,
        pageNum: this.page,
        pageSize: this.size,
        keyword: this.keyword
      };
      this.$axios({
        method: "get",
        url: "./rtMonitor/villageSysMonitorList?" + qs.stringify(data)
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 200) {
          this.total = res.data.data.total;
          this.data = res.data.data.list;
          //计算终端总数，平均开机率，平均故障率并为图表data赋值
          let sum = 0;
          let faultRate = 0;
          let upRate = 0;
          this.data.forEach(item => {
            sum += item.total;
            faultRate += item.faultRate;
            upRate += item.upRate;
            this.xData1.push(item.platformName);
            this.yData1.push(item.upRate);
            this.xData2.push(item.platformName);
            this.yData2.push(item.faultRate);
          });
          this.data1[0].sum = sum;
          //必要可以tofixed()保留小数点
          this.data1[0].faultRate = faultRate / this.total + "%";
          this.data1[0].upRate = upRate / this.total + "%";
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    //搜索
    search() {
      this.page = 1;
      this.getSysList();
    },
    pageChange(page) {
      this.page = page;
      if (this.keyword == "") {
        this.getSysList();
      } else {
        this.search();
      }
    },
    pageSizeChange(size) {
      this.size = size;
      if (this.keyword == "") {
        this.getSysList();
      } else {
        this.search();
      }
    },
    //电力状态获取
    estateShow() {
      queryPowersBySysId(this.powerForm).then(res => {
        this.total1 = res.data.data.total;
        this.data2 = res.data.data.list;
      });
      // this.page1 = 1;
      // let data = {
      //   pageNum: this.page1,
      //   pageSize: this.size1,
      //   id: this.estateId,
      //   startTime: this.startTime,
      //   endTime: this.endTime
      // };
      // this.$axios({
      //   method: "get",
      //   url: "./rtMonitor/queryPowersBySysId?" + qs.stringify(data)
      // }).then(res => {
      //   if (res.data.code == 200) {
      //     this.total1 = res.data.data.total;
      //     this.data2 = res.data.data.list;
      //   } else {
      //     this.$Message.error(res.data.msg);
      //   }
      // });
    },
    //时间段状态选择刷新列表
    timeChange(date) {
      this.powerForm.pageNum = 1;
      this.powerForm.startTime = date[0];
      this.powerForm.endTime = date[1];
      this.estateShow();
    },
    pageChange1(page) {
      this.page = page;
      this.estateShow();
    },
    pageSizeChange1(size) {
      this.size = size;
      this.estateShow();
    },
    // 当关闭modal框时需要重置时间选择器
    deleteTimeLine() {
      this.$refs.timeLine.handleClear();
    },
    // 获取系统详情
    getDetails(id) {
      villageSysDetail(id).then(res => {
        this.ccxInfo = res.data.data;
        this.modal2 = true;
        console.log(this.ccxInfo);
      });
    },
    //选择tab标签时触发的事件（监听name值）
    chooseTabs(name) {
      if (name == "table") {
        this.flag = true;
        this.getData();
      } else if (name == "pictrue") {
        this.flag = false;
        this.getChartData();
      }
    },
    //选择slelect标签时触发的事件（监听select的value值）
    changeSelect(value) {
      console.log(value);
      if (value == "kj") {
        this.flag1 = true;
      } else if (value == "gz") this.flag1 = false;
    },
    //获取地区列表
    getCityList() {
      this.cityList = [];
      this.cityList = "";
      let data = { id: this.areaId };
      this.$axios({
        method: "get",
        url: "./area/getAreasByParentId?" + qs.stringify(data)
      }).then(res => {
        if (res.data.code == 200) {
          this.cityList = res.data.data;
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    getTownList() {
      this.townList = [];
      this.townId = "";
      let data = { id: this.areaId };
      this.$axios({
        method: "get",
        url: "./area/getAreasByParentId?" + qs.stringify(data)
      }).then(res => {
        if (res.data.code == 200) {
          this.townList = res.data.data;
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    //
    areaCityChange(value) {
      this.areaId = value;
      this.getTownList();
      this.getSysList();
    },
    areaTownChange(value) {
      this.areaId = value;
      this.getSysList();
    },

    getData() {
      villageSysMonitorList(
        Object.assign(this.searchForm, this.searchPage)
      ).then(res => {
        console.log(res);
        this.tableData = res.data.data.page.list;
        this.total = res.data.data.page.total;
        this.data1 = [
          {
            srvTotal: res.data.data.srvTotal,
            avgUpRate: res.data.data.avgUpRate,
            avgFaultRate: res.data.data.avgFaultRate
          }
        ];
      });
    },
    getChartData() {
      vSysMonitorChart(this.chartForm).then(res => {
        console.log(res);
        this.chartData = res.data.data.list
      });
    }
  },
  mounted() {
    // this.getSysList();
    // this.getCityList();
    this.getData();
  }
  // 实时更新ecahrts表单数据，也可以用watch监听option中的series，重绘表单
  // updated() {
  //   //也可以用watch监听series的值得变化 动态渲染页面
  //   this.$nextTick(() => {
  //     var myChart1 = this.echarts.init(this.$refs.main1);
  //     // 绘制图表
  //     myChart1.setOption({
  //       title: {
  //         text: "开机率"
  //       },
  //       tooltip: {
  //         formatter: "{b}<br/>{a}：{c}%"
  //       },
  //       legend: {
  //         data: ["开机率"]
  //       },
  //       xAxis: {
  //         data: this.xData1
  //       },
  //       yAxis: {
  //         type: "value",
  //         axisLabel: {
  //           show: true,
  //           interval: "auto",
  //           formatter: "{value}%"
  //         },
  //         show: true
  //       },
  //       series: [
  //         {
  //           name: "开机率",
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
  //         text: "故障率"
  //       },
  //       tooltip: {
  //         formatter: "{b}<br/>{a}：{c}%"
  //       },
  //       legend: {
  //         data: ["故障率"]
  //       },
  //       xAxis: {
  //         data: this.xData2
  //       },
  //       yAxis: {
  //         type: "value",
  //         axisLabel: {
  //           show: true,
  //           interval: "auto",
  //           formatter: "{value}%"
  //         },
  //         show: true
  //       },
  //       series: [
  //         {
  //           name: "故障率",
  //           type: "bar",
  //           // barWidth: 100,
  //           data: this.yData2,
  //           itemStyle: { color: "#4ad2ff" }
  //         }
  //       ]
  //     });
  //   });
  // }
};
</script>