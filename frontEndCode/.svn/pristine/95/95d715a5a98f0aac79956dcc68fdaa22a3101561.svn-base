<template>
  <div>
    <div class="search-table">
      <Row>
        <i-col :span="12">
          <AreaSelect range="[5,4,3]" col="8" @change="searchForm.areaId = $event.id" />
        </i-col>
        <i-col :span="12">
          <DatePicker
            type="daterange"
            split-panels
            placeholder="日期段选择"
            style="width: 250px"
            @on-change="searchForm.startTime = $event[0]; searchForm.endTime = $event[1]"
          ></DatePicker>
          <Select v-model="searchForm.status" style="width: 250px" placeholder="请选择告警状态" clearable>
            <Option :value="0">未确认</Option>
            <Option :value="1">已确认</Option>
          </Select>
        </i-col>
      </Row>
    </div>
    <div>
      <Table :columns="alarmColumns" :data="alarmData"></Table>
    </div>
  </div>
</template>

<script>
import { alarmInfoStatistics } from "@/api/dataTotal";
import AreaSelect from "@/components/commonComponent/areaSelect";
export default {
  name: "alarmTotal",
  components: {
    AreaSelect
  },
  data() {
    return {
      searchForm: {
        status: "",
        areaId: "",
        startTime: "",
        endTime: ""
      },
      alarmColumns: [
        {
          title: "地区",
          key: "areaName"
        },
        {
          title: "告警源",
          key: "platformName"
        },
        {
          title: "告警记录",
          key: "alarmInfo"
        },
        {
          title: "开始时间",
          key: "startTime"
        },
        {
          title: "结束时间",
          key: "endTime"
        },
        {
          title: "确认状态",
          key: "confirmStatus",
          render: (h, params) => {
            let text =
              params.row.confirmStatus == 0
                ? "未确认"
                : params.row.confirmStatus == 1
                ? "已确认"
                : "未知状态";
            return h("div", text);
          }
        }
      ],
      alarmData: []
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
    getData() {
      alarmInfoStatistics(this.searchForm).then(res => {
        console.log(res);
        this.alarmData = res.data.data;
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/common.scss";
</style>