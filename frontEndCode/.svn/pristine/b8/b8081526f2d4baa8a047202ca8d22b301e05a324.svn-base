<template>
  <div>
    <div class="search-table">
      <Row>
        <i-col span="12">
          <AreaSelect range="[5,4,3]" col="8" @change="searchForm.areaId = $event.id" />
        </i-col>
        <i-col span="12">
          <Select v-model="searchForm.status" style="width: 200px" placeholder="播发状态" clearable>
            <Option :value="1">正在播发</Option>
            <Option :value="2">未播发</Option>
          </Select>
        </i-col>
      </Row>
    </div>
    <div>
      <Table :columns="tableColumns" :data="tableData"></Table>
    </div>
    <p style="margin-top: 15px;">当前播放：</p>
    <div style="padding: 15px; border: 1px solid #ccc; margin-top: 15px;">
      <Row>
        <i-col span="4" style="line-height: 60px;">序号</i-col>
        <i-col span="4" style="line-height: 60px;">所属地区</i-col>
        <i-col span="4" style="line-height: 60px;">播发状态</i-col>
        <i-col span="12">
          <audio
            :src="src"
            controls="controls"
            style="float: right;"
          >Your browser does not support the audio element.</audio>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
import AreaSelect from "@/components/commonComponent/areaSelect";
import { queryAudioList } from "@/api/monitor";
export default {
  name: "live",
  components: {
    AreaSelect
  },
  data() {
    return {
      src: "",
      index: "",
      total: 0,
      searchForm: {
        areaId: "",
        status: ""
      },
      searchPage: {
        pageNum: 1,
        pageSize: 10
      },
      tableColumns: [
        {
          type: "index"
        },
        {
          title: "所属地区",
          key: "areaName"
        },
        {
          title: "播发状态",
          render: (h, params) => {
              console.log(params.row.mgsStatus);
            return h("div", params.row.mgsStatus == 2 ? "正在播发" : "播发结束");
          }
        },
        {
          title: "操作",
          render: (h, params) => {
            let stop = h("Icon", {
              props: {
                type: "md-volume-off"
              },
              style: {
                cursor: "pointer"
              },
              on: {
                click: () => {
                  console.log(params.row);
                  this.src = params.row.url;
                  this.index = params.index;
                }
              }
            });
            let play = h("Icon", {
              props: {
                type: "md-volume-up"
              },
              style: {
                cursor: "pointer"
              },
              on: {
                click: () => {
                  this.index = "";
                }
              }
            });
            return this.index === params.index ? [play] : [stop];
          }
        }
      ],
      tableData: []
    };
  },
  watch: {
    searchForm: {
      handler() {
        this.searchPage = 1;
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
      queryAudioList(Object.assign(this.searchForm, this.searchPage)).then(
        res => {
          this.tableData = res.data.data.list;
          console.log(this.tableData);
        }
      );
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