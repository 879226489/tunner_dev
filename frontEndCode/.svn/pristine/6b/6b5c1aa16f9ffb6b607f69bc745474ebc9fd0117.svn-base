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
      <h4 class="titleFont">村村响终端</h4>
    </div>
    <div style="background: #fff; padding: 15px">
      <Row>
        <i-col span="20">
          <AreaSelect
            range="[5,4,3,2,1]"
            col="4"
            @change="searchForm.areaId = $event.id; chartForm.areaId = $event.id; level = $event.type"
          />
        </i-col>
        <i-col span="4">
          <Select
            style="width:180px;"
            placeholder="终端类型"
            @on-change="searchForm.type = $event || ''"
            v-show="currentTab == 'table'"
            class="margin"
            clearable
          >
            <Option v-for="item in srvTypeList" :value="item.id" :key="item.id">{{item.typeName}}</Option>
          </Select>
        </i-col>
      </Row>
    </div>
    <!-- 表格图表区域 -->
    <div class="main-container">
      <Tabs @on-click="chooseTabs" v-model="currentTab">
        <TabPane label="表格" name="table">
          <div class="table-container">
            <Table border stripe :columns="columns" :data="tableData" align="center"></Table>
          </div>
        </TabPane>
        <TabPane label="图表" name="pictrue">
          <TermBar
            :level="level"
            :type="chartForm.type"
            :value="chartData"
            style="width: 80vw;height: 60vh"
            v-if="currentTab == 'pictrue'"
          />
        </TabPane>
      </Tabs>
    </div>
    <Modal v-model="modal1" width="800px">
      <DatePicker
        type="daterange"
        split-panels
        placeholder="日期段选择"
        ref="timeLine"
        @on-change="timeChange"
        style="width: 230px"
      ></DatePicker>
      <Table border stripe :columns="recordColumns" :data="recordData" align="center"></Table>
      <Page
        style="text-align:center;margin-top:20px;"
        :total="recordTotal"
        size="small"
        :page-size="size1"
        :page-size-opts="[5,10,15,20]"
        show-elevator
        show-sizer
        show-total
        @on-change="recordForm.pageNum = $event; getRecordData()"
        @on-page-size-change="recordForm.pageSize = $event; getRecordData()"
      />
    </Modal>
  </div>
</template>

<script>
import qs from "qs";
import {
  querySrvList,
  maintainRecord,
  srvChartStatistics
} from "@/api/monitor";
import { deviceType } from "@/utils/common";
import AreaSelect from "@/components/commonComponent/areaSelect";
import TermBar from "./termCharts/termBar";
import { mapActions } from 'vuex'
export default {
  components: {
    AreaSelect,
    TermBar
  },
  data() {
    return {
      //当选择表格显示或者图标显示时的flag
      flag: true,
      //当选择开机率还是故障率时的flag
      flag1: true,
      flag2: false,
      flag3: false,
      //维护记录modal
      modal1: false,
      //select终端种类值
      selectValue: "0",
      //select终端开机率关机率故障率
      select1Value: "0",
      //初始的tab标签的指定name
      currentTab: "table",
      cityList: [],
      //搜索框输入值
      keyword: "",
      //终端列表
      total: 0,
      page: 1,
      size: 10,
      type: null,
      areaId: "",
      total1: 0,
      page1: 1,
      size1: 10,
      startTime: "",
      endTime: "",
      orgCode: "",
      data2: [],
      //在线率
      yData1: [],
      //故障率
      yData2: [],
      //开机率
      yData3: [],

      deviceType,
      searchForm: {
        areaId: "",
        keyword: "",
        type: ""
      },
      searchPage: {
        pageNum: 1,
        pageSize: 10
      },
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "终端安装地址",
          key: "detailAddr"
        },
        {
          title: "所属系统",
          key: "platformName"
        },
        {
          title: "维护记录",
          key: "state",
          render: (h, params) => {
            this.orgCode = params.row.orgCode;
            this.type = params.row.type;
            return h(
              "span",
              {
                style: {
                  cursor: "pointer",
                  color: "#2D8CF0"
                },
                attrs: {
                  title: "点击查看维护记录详情"
                },
                on: {
                  click: () => {
                    console.log(params.row);
                    this.recordForm.orgCode = params.row.orgCode;
                    this.recordForm.type = params.row.type;
                    this.recordForm.pageNum = 1;
                    this.getRecordData();
                    //this.fixShow();
                    this.modal1 = true;
                  }
                }
              },
              "详情"
            );
          }
        },
        {
          title: "终端种类",
          key: "type"
        },
        {
          title: "终端状态",
          key: 'status'
        },
        {
          title: "资源码",
          key: 'ebrId'
        },
        {
          title: "物理码",
          key: 'physicalCode'
        }
      ],
      tableData: [],
      recordForm: {
        pageNum: 1,
        pageSize: 10,
        orgCode: "",
        type: "",
        startTime: "",
        endTime: ""
      },
      recordData: [],
      recordTotal: 0,
      recordColumns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "维护时间",
          key: "maintainTime"
        },
        {
          title: "维护人员",
          key: "maintainStaff"
        },
        {
          title: "维护内容",
          key: "maintainContent"
        }
      ],
      chartForm: {
        areaId: "",
        type: ""
      },
      level: 5,
      chartData: []
    };
  },
  computed: {
    srvTypeList() {
      return this.$store.state.device.srvTypeList;
    }
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
    ...mapActions([
      'setSrvType'
    ]),
    //维护记录时间段选择处理函数
    timeChange(time) {
      // this.page = 1;
      // this.startTime = time[0];
      // this.endTime = time[1];
      // this.fixShow();
      this.recordForm.pageNum = 1;
      this.recordForm.startTime = time[0];
      this.recordForm.endTime = time[1];
      this.getRecordData();
    },
    deleteTime() {
      this.startTime = "";
      this.endTime = "";
      this.$refs.timeLine.handleClear();
    },
    //选择tab标签时触发的事件（监听name值）
    chooseTabs(name) {
      console.log(name);
      if (name == "table") {
        this.flag = true;
        this.getData();
      } else if (name == "pictrue") {
        this.flag = false;
        this.getChartData();
      }
    },

    getData() {
      console.log(this.searchForm);
      querySrvList(Object.assign(this.searchForm, this.searchPage)).then(
        res => {
          console.log(res.data.data);
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        }
      );
    },
    getRecordData() {
      maintainRecord(this.recordForm).then(res => {
        console.log(res);
        this.recordData = res.data.data.list;
        this.recordTotal = res.data.data.total;
      });
    },
    getChartData() {
      srvChartStatistics(this.chartForm).then(res => {
        console.log(res);
        this.chartData = res.data.data.list;
      });
    }
  },
  mounted() {
    this.getData();
    this.setSrvType(); 
  }
};
</script>