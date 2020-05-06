<template>
  <div>
    <div class="pageTitle">
      <h4 class="titleFont">村村响终端状态统计</h4>
    </div>
    <div style="background: #fff; padding: 15px">
      <Row>
        <i-col span="12">
          <AreaSelect range="[5,4,3]" col="8" @change="searchForm.areaId = $event.id" />
        </i-col>
        <i-col span="4">
          <Select
            style="width:200px;"
            placeholder="终端种类"
            class="margin"
            v-model="searchForm.type"
            clearable
          >
            <Option v-for="item in srvTypeList" :value="item.id" :key="item.id">{{item.typeName}}</Option>
          </Select>
        </i-col>
        <i-col span="8">
          <Button icon="md-cloud-upload" style="float: right" @click="exportData">导出</Button>
        </i-col>
      </Row>
    </div>
    <div class="table-container">
      <Table border :columns="columns" :data="data" align="center" :row-class-name="rowClassName"></Table>
      <Table
        border
        stripe
        :columns="columns1"
        :data="data1"
        align="center"
        style="height:auto;margin-top:25px;"
      ></Table>
    </div>
    <Modal v-model="showTotal" title="告警信息统计" width="800px">
      <div>
        <Table :columns="alarmColumns" :data="alarmData"></Table>
      </div>
    </Modal>
  </div>
</template>

<script>
import qs from "qs";
import {
  querySrvStatistics,
  srvStatisticsExport,
  getAlarmRecord,
  getAlarm
} from "@/api/dataTotal";
import AreaSelect from "@/components/commonComponent/areaSelect";
import { mapActions } from "vuex";
export default {
  components: {
    AreaSelect
  },
  data() {
    return {
      type: "0",
      warnValue: "",
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "地区",
          align: "center",
          key: "areaName"
        },
        {
          title: "开机率",
          align: "center",
          render: (h, params) => {
            return h("div", `${params.row.upRate}%`);
          }
        },
        {
          title: "在线率",
          align: "center",
          render: (h, params) => {
            return h("div", `${params.row.onRate}%`);
          }
        },
        {
          title: "故障率",
          align: "center",
          render: (h, params) => {
            return h("div", `${params.row.faultRate}%`);
          }
        },
        {
          title: "终端种类",
          align: "center",
          key: "typeName"
        },
        {
          title: "告警记录",
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                on: {
                  click: () => {
                    this.showTotal = true;
                    this.alarmForm.id = params.row.id;
                    this.alarmForm.srvTypeId = params.row.type;
                    this.getInfo();
                  }
                }
              },
              "详情"
            );
          }
        }
      ],
      data: [],
      //终端状态分析
      columns1: [
        {
          title: "终端种类",
          key: "typeName"
        },
        {
          title: "平均故障率",
          key: "faultRate",
          render: (h, params) => {
            return h("div", `${params.row.faultRate}%`);
          }
        },
        {
          title: "开机率",
          key: "upRate",
          render: (h, params) => {
            return h("div", `${params.row.upRate}%`);
          }
        },
        {
          title: "平均在线率",
          key: "onRate",
          render: (h, params) => {
            return h("div", `${params.row.onRate}%`);
          }
        }
      ],
      data1: [],
      searchForm: {
        areaId: "",
        type: ""
      },
      showTotal: false,
      alarmForm: {
        id: "",
        srvTypeId: ""
      },
      alarmColumns: [
        {
          type: "index"
        },
        {
          title: "告警信息",
          key: "alarmInfo"
        }
      ],
      alarmData: []
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
        this.getData();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(["setSrvType"]),
    getData() {
      querySrvStatistics(this.searchForm).then(res => {
        if (res.data.code == 200) {
          this.data = res.data.page.list;
          this.data1 = res.data.statistics;
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    exportData() {
      srvStatisticsExport(`export=${JSON.stringify(this.data)}`);
    },
    getInfo() {
      getAlarmRecord(this.alarmForm).then(res => {
        this.alarmData = res.data.data;
      });
    },
    rowClassName(row, index) {
      if (row.onRate >= this.warnValue) {
        return "demo-table-info-row";
      } else {
        return "demo-table-error-row";
      }
      return "";
    }
  },
  mounted() {
    this.getData();
    this.setSrvType();
    getAlarm().then(res => {
      this.warnValue = res.data.data.onlineWarnValue;
    });
  }
};
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/common.scss";

.ivu-table .demo-table-info-row td {
  
}
.ivu-table .demo-table-error-row td {
  background-color: #ff6600;
  color: #fff;
}
</style>