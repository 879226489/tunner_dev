<template>
  <div>
    <div>
      <Row>
        <i-col :span="12">
          <AreaSelect range="[5,4]" col="8" @change="searchForm.areaId = $event.id" />
        </i-col>
        <i-col :span="12">
          <RadioGroup v-model="searchForm.flag" type="button" style="float: right;">
            <Radio :label="0">表格</Radio>
            <Radio :label="1">图表</Radio>
          </RadioGroup>
        </i-col>
      </Row>
    </div>
    <div>
      <div v-if="searchForm.flag == 0">
        <Table :columns="columns" :data="tableData"></Table>
        <Page
          :total="total"
          size="small"
          show-total
          show-elevator
          show-sizer
          class="search-page"
          @on-change="searchPage.pageNum = $event"
          @on-page-size-change="searchPage.pageSize = $event"
        />
        <div style="border: 1px solid #ccc; padding: 15px; margin-top: 15px;">
            <Row>
                <i-col span="8" style="text-align: center;">系统总数</i-col>
                <i-col span="8" style="text-align: center;">发布成功总数</i-col>
                <i-col span="8" style="text-align: center;">发布率</i-col>
            </Row>
            <Row style="margin-top: 15px;">
                <i-col span="8" style="text-align: center;">{{allTotal}}</i-col>
                <i-col span="8" style="text-align: center;">{{suPublish}}</i-col>
                <i-col span="8" style="text-align: center;">{{pRate}}%</i-col>
            </Row>
        </div>
      </div>
      <div v-else>
        <Pie :value="chartData" style="width: 100%; height: 400px; margin-top: 20px;" />
      </div>
    </div>
  </div>
</template>

<script>
import { publishRates } from "@/api/record";
import AreaSelect from "@/components/commonComponent/areaSelect";
import Pie from "./relesePie";
export default {
  name: "release",
  components: {
    AreaSelect,
    Pie
  },
  props: {
    id: String
  },
  data() {
    return {
      searchForm: {
        id: "",
        flag: 0,
        areaId: ""
      },
      searchPage: {
        pageNum: 1,
        pageSize: 10
      },
      columns: [
        {
          type: "index",
          width: 60
        },
        {
          title: "系统名称",
          align: "center",
          key: "platformName"
        },
        {
          title: "系统地址",
          align: "center",
          key: "ipAddress"
        },
        {
          title: "是否发布",
          align: "center",
          key: "status"
        }
      ],
      tableData: [],
      total: 0,
      chartData: {},
      allTotal: 0,
      suPublish: 0,
      pRate: 0
    };
  },
  watch: {
    id() {
      this.searchForm.id = this.id;
    },
    searchForm: {
      handler() {
        this.searchPage.pageNum = 1;
        this.getData();
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
    getData() {
      publishRates(Object.assign(this.searchForm, this.searchPage)).then(
        res => {
          if (this.searchForm.flag == 0) {
            this.tableData = res.data.data.page.list;
            this.total = res.data.data.page.total;
            this.allTotal = res.data.data.total;
            this.suPublish = res.data.data.suPublish;
            this.pRate = res.data.data.pRate;
          } else if (this.searchForm.flag == 1) {
            this.chartData = res.data.data;
          }
        }
      );
    }
  }
};
</script>