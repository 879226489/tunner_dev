<template>
  <div>
    <div>
      <Row>
        <i-col span="12">
          <AreaSelect range="[5,4]" col="8" @change="searchForm.areaId = $event.id" />
        </i-col>
        <i-col span="12">
          <RadioGroup v-model="type" type="button" style="float: right;" @on-change="getType">
            <Radio :label="0">表格</Radio>
            <Radio :label="1">热力图</Radio>
          </RadioGroup>
        </i-col>
      </Row>
    </div>
    <div>
      <div v-if="type == 0">
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
            <i-col span="4" style="text-align: center;">系统总数</i-col>
            <i-col span="4" style="text-align: center;">响应总数</i-col>
            <i-col span="4" style="text-align: center;">目标覆盖区域</i-col>
            <i-col span="4" style="text-align: center;">实际覆盖区域</i-col>
            <i-col span="4" style="text-align: center;">目标覆盖人口</i-col>
            <i-col span="4" style="text-align: center;">实际覆盖人口</i-col>
          </Row>
          <Row style="margin-top: 15px;">
            <i-col span="4" style="text-align: center;">{{srvTotal}}</i-col>
            <i-col span="4" style="text-align: center;">{{respTotal}}</i-col>
            <i-col span="4" style="text-align: center;">{{region}}</i-col>
            <i-col span="4" style="text-align: center;">{{realRegion}}</i-col>
            <i-col span="4" style="text-align: center;">{{population}}</i-col>
            <i-col span="4" style="text-align: center;">{{realPopulation}}</i-col>
          </Row>
        </div>
      </div>
      <div v-else>
          <HeatMap :value="chartData" style="widhth: 100%: height: 400px" />
      </div>
    </div>
  </div>
</template>

<script>
import { coverRates, heatMap } from "@/api/record";
import AreaSelect from "@/components/commonComponent/areaSelect";
import HeatMap from './heatMap'
export default {
  name: "cover",
  components: {
    AreaSelect,
    HeatMap
  },
  props: {
    id: String
  },
  data() {
    return {
      type: 0,
      searchForm: {
        id: "",
        areaId: ""
      },
      searchPage: {
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "系统名称",
          key: "platformName"
        },
        {
          title: "终端总数",
          key: "total"
        },
        {
          title: "响应总数",
          key: "respTotal"
        },
        {
          title: "目标覆盖区域",
          key: "region"
        },
        {
          title: "实际覆盖区域",
          key: "realRegion"
        },
        {
          title: "目标覆盖人口",
          key: "population"
        },
        {
          title: "实际覆盖人口",
          key: "realPopulation"
        },
        {
          title: "响应率",
          key: "respRate",
          render: (h, params) => {
            return h("div", `${params.row.respRate}%`);
          }
        },
        {
          title: "覆盖区域率",
          key: "regionRate",
          render: (h, params) => {
            return h("div", `${params.row.regionRate}%`);
          }
        },
        {
          title: "覆盖人口率",
          key: "pRate",
          render: (h, params) => {
            return h("div", `${params.row.pRate}%`);
          }
        }
      ],
      srvTotal: 0,
      realRegion: 0,
      respTotal: 0,
      region: 0,
      realPopulation: 0,
      population: 0,
      chartData: {
        srvDis: [],
        srvOnLine: []
      }
    };
  },
  watch: {
    id() {
      this.searchPage.pageNum = 1;
      this.searchForm.id = this.id;
    },
    searchForm: {
      handler() {
        if (this.type == 0) {
          this.searchPage.pageNum = 1;
          this.getData();
        } else {
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
    getType(type) {
        if(type == 0) {
            this.getData();
        }else if(type == 1) {
            this.getChartData();
        }
    },
    getData() {
      coverRates(Object.assign(this.searchForm, this.searchPage)).then(res => {
        console.log(res);
        this.tableData = res.data.data.page.list;
        this.total = res.data.data.page.total;
        console.log(this.tableData);
        this.srvTotal = res.data.data.srvTotal;
        this.realRegion = res.data.data.realRegion;
        this.respTotal = res.data.data.respTotal;
        this.region = res.data.data.region;
        this.realPopulation = res.data.data.realPopulation;
        this.population = res.data.data.population;
      });
    },
    getChartData() {
      heatMap(this.searchForm).then(res => {
        console.log(res, 193);
        this.chartData = res.data;
      });
    }
  }
};
</script>