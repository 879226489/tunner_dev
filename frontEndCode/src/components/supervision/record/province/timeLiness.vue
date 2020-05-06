<template>
  <div>
    <div style="backgrund: #fff; padding: 15px;">
      <Row>
        <!-- <i-col span="6">
          <RadioGroup v-model="type" type="button">
            <Radio :label="0">村村响平台</Radio>
            <Radio :label="1">村村响终端</Radio>
          </RadioGroup>
        </i-col> -->
        <i-col span="12">
          <AreaSelect range="[5,4,3]" col="8" @change="searchForm.areaId = $event.id" />
        </i-col>   
      </Row>
    </div>
    <div>
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
      <div style="padding: 15px; border: 1px solid #ccc; margin-top: 20px;">
        <span>平均时间间隔:</span>
        <span style="float: right;">{{average}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getTimeliness } from "@/api/record";
import AreaSelect from "@/components/commonComponent/areaSelect";
export default {
  components: {
    AreaSelect
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
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "平台名称",
          align: "center",
          key: "platformName"
        },
        {
          title: "平台地址",
          align: "center",
          key: "ipAddress"
        },
        {
          title: "接收时间",
          align: "center",
          key: "receiveTime"
        },
        {
          title: "播出时间",
          align: "center",
          key: "broadcastTime"
        },
        {
          title: "时间间隔",
          align: "center",
          key: "time"
        }
      ],
      total: 0,
      average: "",
      tableData: []
    };
  },
  watch: {
    id() {
      this.searchForm.id = this.id;
      this.searchPage.pageNum = 1;
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
      getTimeliness(Object.assign(this.searchForm, this.searchPage)).then(
        res => {
          this.average = res.data.data.average;
          this.tableData = res.data.data.page.list;
          this.total = res.data.data.page.total;
        }
      );
    }
  }
};
</script>