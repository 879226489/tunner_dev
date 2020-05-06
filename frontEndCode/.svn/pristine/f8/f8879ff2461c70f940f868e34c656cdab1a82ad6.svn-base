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
      <h4 class="titleFont">村村响适配器</h4>
    </div>
    <!-- <div class="filter-container">
      <div class="select-container">
        <Select clearable style="width:200px;" placeholder="请选择省份">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select clearable style="width:200px;" placeholder="请选择市级" class="margin">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select clearable style="width:200px;margin-right:25px;" placeholder="请选择县级">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="function-container">
        <div class="search-box" style="width:100%;">
          <Input search enter-button placeholder="按资源编码搜索" v-model="keyword" @on-search="search" />
        </div>
      </div>
    </div> -->
    <div style="background: #fff; padding: 15px;">
      <Row>
        <i-col span="12">
          <AreaSelect range="[5,4,3]" col="8" @change="searchForm.areaId = $event.id" />
        </i-col>
        <i-col span="12">
          <Input placeholder="按资源编码搜索" v-model="searchForm.keyword" style="width: 300px;float:right"/>
        </i-col>
      </Row>
    </div>
    <!-- 表格图表区域 -->
    <div class="main-container">
      <Table border stripe :columns="columns" :data="data" align="center"></Table>
      <Page
        style="text-align:center;margin-top:20px;"
        :total="total"
        size="small"
        :page-size="size"
        :page-size-opts="[10,15,20]"
        show-elevator
        show-sizer
        show-total
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
      />
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { queryAdapterList } from "@/api/monitor";
import AreaSelect from '@/components/commonComponent/areaSelect'
export default {
  components: {
    AreaSelect
  },
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      //地区ID
      areaId: "",
      keyword: "",
      searchForm: {
        areaId: "",
        keyword: ""
      },
      searchPage: {
        pageNum: 1,
        pageSize: 10
      },
      cityList: [],
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "所属系统",
          key: "platformName"
        },
        {
          title: "适配器位置",
          key: "detailAddr"
        },
        {
          title: "资源编码",
          key: "ebrId"
        },
        {
          title: "IP地址",
          key: "ipAddress"
        },
        {
          title: "应急播发启用",
          key: "isEnable"
        },
        {
          title: "在线状态",
          key: "status"
        }
      ],
      data: []
    };
  },
  watch: {
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
    //获取适配器列表
    getList() {
      console.log(1);
      let data = {
        areaId: this.areaId,
        pageNum: this.page,
        pageSize: this.size,
        keyword: this.keyword
      };
      this.$axios({
        method: "get",
        url: "./rtMonitor/queryAdapterList?" + qs.stringify(data)
      }).then(res => {
        this.total = res.data.data.total;
        this.data = res.data.data.list;
      });
    },
    search() {
      this.page = 1;
      this.getList();
    },
    pageChange(page) {
      this.page = page;
      if (this.keyword == "") {
        this.getList();
      } else {
        this.search();
      }
    },
    pageSizeChange(size) {
      this.size = size;
      if (this.keyword == "") {
        this.getList();
      } else {
        this.search();
      }
    },
    getData() {
      queryAdapterList(Object.assign(this.searchForm, this.searchPage)).then(res => {
        this.total = res.data.data.total;
        this.data = res.data.data.list;
      })
    }
  },
  mounted() {
    //this.getList();
    this.getData();
  }
};
</script>