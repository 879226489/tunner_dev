<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/common.scss";
</style>
<template>
  <div>
    <div class="pageTitle">
      <h4 class="titleFont">村村响广播播发记录</h4>
    </div>
    <!-- <div class="filter-container">
      <div class="select-container">
        <DatePicker
          type="daterange"
          @on-change="dateChange"
          split-panels
          placeholder="日期段选择"
          style="width: 432px"
        ></DatePicker>
        <Select clearable style="width:200px;" placeholder="请选择播发来源" class="margin" v-model="selectOne" @on-change="selectChange1">
          <Option v-for="(item,key) in resource" :value="key" :key="key">{{ item }}</Option>
        </Select>
        <Select clearable style="width:200px;" placeholder="请选择来源级别" v-model="selectTwo" @on-change="selectChange2">
          <Option v-for="(item,key) in kind" :value="item" :key="key">{{ item }}</Option>
        </Select>
      </div>
      <div class="function-container">
        <Input search enter-button v-model="keyword" @on-search="search" placeholder="请输入关键字" />
      </div>
    </div> -->
    <div class="search-table">
      <Row>
        <i-col span="18">
          <DatePicker
            type="daterange"
            @on-change="dateChange"
            split-panels
            placeholder="日期段选择"
            style="width: 230px"
          ></DatePicker>
          <Select v-model="searchForm.source" placeholder="播发来源" style="width:230px" clearable>
            <Option :value="0">本地播发</Option>
            <Option :value="1">上级播发</Option>
            <Option :value="2">电话插播</Option>
            <Option :value="3">短信插播</Option>
          </Select>
          <Select v-model="searchForm.level" placeholder="来源级别" style="width:230px" clearable>
            <Option :value="0">未知级别</Option>
            <Option :value="1">红色预警</Option>
            <Option :value="2">橙色预警</Option>
            <Option :value="3">黄色预警</Option>
            <Option :value="4">蓝色预警</Option>
          </Select>
        </i-col>
        <i-col span="6">
          <Input
            placeholder="请输入关键字"
            v-model="searchForm.keyword"
            style="width: 300px; float: right;"
          />
        </i-col>
      </Row>
    </div>
    <div class="main-container">
      <Table border stripe :columns="columns" :data="tableData" align="center"></Table>
      <Page
        style="text-align:center;margin-top:20px;"
        :total="tableTotal"
        size="small"
        :page-size="size"
        :page-size-opts="[10,15,20]"
        show-elevator
        show-sizer
        show-total
        @on-change="searchPage.pageNum = $event"
        @on-page-size-change="searchPage.pageSize = $event"
      />
    </div>
    <!-- 音频modal框 -->
    <Modal title="录音文件播放" v-model="modal" class-name="vertical-center-modal" style="text-align:center">
      <audio :src="videoSrc" controls>您的浏览器不支持 audio 标签。</audio>
    </Modal>
  </div>
</template>

<script>
import qs from "qs";
import { msgBroadcastRecords } from '@/api/record'
export default {
  data() {
    return {
      //音频文件弹出框
      modal: false,
      dateRange: [],
      startTime: "",
      endTime: "",
      cityList: [],
      keyword: "",
      total:0,
      page:1,
      size:10,
      videoSrc:"",
      //来源选择框
      selectOne:"",
      resource:['本地播发','上级播发','电话插播','短信插播'],
      //来源级别选择框
      selectTwo:"",
      kind:['省级','市级','县级','镇级','村级'],
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "消息类别",
          align:'center',
          key: "msgType"
        },
        {
          title: "播发来源",
          align: "center",
          key: "msgSource"
        },
        {
          title: "来源级别",
          align: "center",
          key: "orgClass"
        },
        {
          title: "播发时长",
          align:'center',
          key: "bfLength"
        },
        {
          title: "目标覆盖区域",
          align:'center',
          key: "targetRegion"
        },
        {
          title: "实际覆盖区域",
          align:'center',
          key: "regions"
        },
        {
          title: "录音文件",
          align:'center',
          key: "audio",
          render: (h, params) => {
            return h("span", {
              style: {
                cursor: "pointer"
              },
              domProps: {
                innerHTML: "点击播放"
              },
              on: {
                click: () => {
                  this.videoShow(params.index)
                }
              }
            });
          }
        },
        {
          title: "播出时间",
          align:'center',
          key: "startTime"
        }
      ],
      data: [],
      searchForm: {
        flag: 1,
        startTime: "",
        endTime: "",
        keyword: "",
        level: "",
        source: ""
      },
      searchPage: {
        pageNum: 1,
        pageSize: 10
      },
      tableTotal: 0,
      tableData: [],
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
    //获取列表数据
    getList() {
     let data = {
        flag: 1,
        pageNum: this.page,
        pageSize: this.size,
        keyword: this.keyword,
        startTime: this.startTime,
        endTime: this.endTime,
        level:this.selectTwo,
        source:this.selectOne
      };
      this.$axios({
        method: "get",
        url:
          "./message/msgBroadcastRecords?" +
          qs.stringify(data)
      }).then(res => {
        if (res.data.code == 200) {
          this.total = res.data.data.total;
          this.data = res.data.data.list;
        } else {
          this.$Message.error(res.data.msg);
        }
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
    selectChange1(data){
      this.page = 1;
      this.selectOne = data;
      this.getList();
    },
    selectChange2(data){
      this.page = 1;
      this.selectTwo = data;
      this.getList();
    },
    // 录音
    videoShow(index){
      this.modal = true;
      this.videoSrc = this.data[index].mediaSource;
    },
    
    getData() {
      msgBroadcastRecords(Object.assign(this.searchForm, this.searchPage)).then(
        res => {
          this.tableData = res.data.data.list;
          this.tableTotal = res.data.data.total;
        }
      );
    },
    dateChange(dateRange) {
      this.searchForm.startTime = dateRange[0];
      this.searchForm.endTime = dateRange[1];
    },
  },
  created(){
    //this.getList();
    this.getData();
  }
};
</script>