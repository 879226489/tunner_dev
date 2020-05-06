<template>
  <div>
    <div class="pageTitle">
      <h4 class="titleFont">应急广播播发记录</h4>
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
      </div>
      <div class="function-container">
        <Input search enter-button placeholder="请输入关键字" @on-search="search" v-model="keyword" />
      </div>
    </div>-->
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
    <!-- 表格图表区域 -->
    <div class="main-container">
      <Table border stripe :columns="columns" :data="tableData" align="center"></Table>
      <Page
        style="text-align:center;margin-top:20px;"
        :total="tableTotal"
        size="small"
        :page-size-opts="[10,15,20]"
        show-elevator
        show-sizer
        show-total
        @on-change="searchPage.pageNum = $event"
        @on-page-size-change="searchPage.pageSize = $event"
      />
    </div>
    <!-- 音频modal框 -->
    <Modal title="录音文件播放" v-model="modal" class-name="vertical-center-modal">
      <audio :src="videoSrc" controls>您的浏览器不支持 audio 标签。</audio>
    </Modal>
    <!-- 效果评估modal框 -->

    <Modal v-model="modal1" width="1000px">
      <Tabs :animated="false" v-model="name">
        <TabPane label="时效性" name="time">
          <!-- <div class="filter-container">
            <div class="select-container">
              <Select clearable style="width:200px;" placeholder="请选择省份">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.value }}</Option>
              </Select>
              <Select clearable style="width:200px;" placeholder="请选择市级" class="margin">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.value }}</Option>
              </Select>
              <Select clearable style="width:200px;" placeholder="请选择县级">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.value }}</Option>
              </Select>
              <Select
                style="width:200px;"
                v-model="showKind"
                @on-change="changeSelect"
                class="margin"
              >
                <Option :value="0">村村响平台</Option>
                <Option :value="1">村村响终端</Option>
              </Select>
            </div>
            <div class="function-container"></div>
          </div> -->
          <!-- <div class="show-box">
            <Table border stripe :columns="columns1" :data="data1" align="center" v-show="flag"></Table>
            <Page
              style="text-align:center;margin-top:20px;"
              :total="total"
              size="small"
              :page-size="size1"
              :page-size-opts="[10,15,20]"
              show-elevator
              show-sizer
              show-total
              @on-change="pageChange"
              @on-page-size-change="pageSizeChange"
              v-show="flag"
            />
            <Table border stripe :columns="columns2" :data="data2" align="center" v-show="!flag"></Table>
            <Page
              style="text-align:center;margin-top:20px;"
              :total="total1"
              size="small"
              :page-size="size1"
              :page-size-opts="[10,15,20]"
              show-elevator
              show-sizer
              show-total
              @on-change="pageChange"
              @on-page-size-change="pageSizeChange"
              v-show="!flag"
            />
            <div class="time-box">
              <div class="time-title">平均时间间隔</div>
              <div class="time-value">{{averageTime}}</div>
            </div>
          </div> -->
          
          <TimeLiness :id="searchId" />
        </TabPane>
        <TabPane label="发布率" name="release">
          <!-- <div class="filter-container">
            <div class="select-container">
              <Select clearable style="width:200px;" placeholder="请选择省份">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.value }}</Option>
              </Select>
              <Select clearable style="width:200px;" placeholder="请选择市级" class="margin">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.value }}</Option>
              </Select>
            </div>
            <div class="function-container">
              <Button type="primary" ghost @click="flag1=false">图表</Button>
              <Button type="primary" ghost @click="flag1=true" class="margin">表格</Button>
            </div>
          </div>
          <div class="category-container">
            <transition-group appear tab="div">
              <div class="category-item" v-show="flag1" key="0">
                <Table border stripe :columns="columns3" :data="data3" align="center"></Table>
                <Page
                  style="text-align:center;margin-top:20px;"
                  :total="total2"
                  size="small"
                  :page-size="size2"
                  :page-size-opts="[10,15,20]"
                  show-elevator
                  show-sizer
                  show-total
                  @on-change="pageChange"
                  @on-page-size-change="pageSizeChange"
                />
                <Table
                  border
                  stripe
                  :columns="columns4"
                  :data="data4"
                  align="center"
                  style="height:auto;"
                ></Table>
              </div>
              <div class="category-item" v-show="!flag1" key="1">
                <div ref="mychart" style="width:500px;height:500px;margin:15px auto;"></div>
              </div>
            </transition-group>
          </div> -->
          <Release :id="searchId"/>
        </TabPane>
        <TabPane label="覆盖率" name="cover">
          <!-- <div class="filter-container">
            <div class="select-container">
              <Select clearable style="width:200px;" placeholder="请选择省份">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.value }}</Option>
              </Select>
              <Select clearable style="width:200px;" placeholder="请选择市级" class="margin">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.value }}</Option>
              </Select>
            </div>
            <div class="function-container">
              <Button type="primary" ghost @click="flag2=false">图表</Button>
              <Button type="primary" ghost @click="flag2=true" class="margin">表格</Button>
            </div>
          </div>
          <div class="category-container">
            <transition-group appear tab="div">
              <div class="category-item" v-show="flag2" key="0">
                <Table border stripe :columns="columns5" :data="data5" align="center"></Table>
                <Page
                  style="text-align:center;margin-top:20px;"
                  :total="total3"
                  size="small"
                  :page-size="size3"
                  :page-size-opts="[10,15,20]"
                  show-elevator
                  show-sizer
                  show-total
                  @on-change="pageChange"
                  @on-page-size-change="pageSizeChange"
                />
              </div>
              <div class="category-item" v-show="!flag2" key="1">
                <div class="container-box">
                  <div id="container"></div>
                  <div id="r-result" style="position:absolute;left:10px;bottom:10px;z-index:999;">
                    <input type="button" @click="openHeatmap" value="显示热力图" />
                    <input type="button" @click="closeHeatmap" value="关闭热力图" />
                  </div>
                </div>
              </div>
            </transition-group>
          </div> -->
          <Cover :id="searchId"/>
        </TabPane>
      </Tabs>
    </Modal>
  </div>
</template>

<script>
import qs from "qs";
import { msgBroadcastRecords } from "@/api/record";
import TimeLiness from './province/timeLiness';
import Release from './province/release';
import Cover from './province/cover'
export default {
  components: {
    TimeLiness,
    Release,
    Cover
  },
  data() {
    return {
      name: 'time',
      modal: false,
      modal1: false,
      // 时间分析的村村响系统还是村村响终端
      flag: true,
      //发布率是表格还试图
      flag1: true,
      flag2: true,
      dateRange: "",
      //搜索
      keyword: "",
      videoSrc: "",
      //时间id
      id: "",
      cityList: [{ value: "杭州" }],
      //应急播发记录列表
      page: 1,
      size: 10,
      total: 0,
      startTime: "",
      endTime: "",
      data: [],
      // 时效性列表村村响平台
      page1: 1,
      size1: 10,
      total1: 0,
      columns1: [
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
      data1: [],
      //判断平台还是终端
      showKind: 0,
      // 平均时间
      averageTime: "",
      // 时效性列表村村响终端
      page2: 1,
      size2: 10,
      total2: 0,
      columns2: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "平台名称",
          key: "name"
        },
        {
          title: "平台地址",
          key: "class"
        },
        {
          title: "接收时间",
          key: "long"
        },
        {
          title: "播出时间",
          key: "place"
        },
        {
          title: "时间间隔",
          key: "people"
        }
      ],
      data2: [],
      //发布率
      ifTable: 0,
      page3: 1,
      size3: 10,
      total3: 0,
      columns3: [
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
      data3: [],
      push: 0,
      noPush: 0,
      columns4: [
        {
          title: "系统总数",
          align: "center",
          key: "amount"
        },
        {
          title: "成功发布总数",
          align: "center",
          key: "sum"
        },
        {
          title: "发布率",
          align: "center",
          key: "ifPush"
        }
      ],
      data4: [{ amount: 0, sum: 0, ifPush: "0%" }],
      //覆盖率
      page4: 1,
      size4: 10,
      total4: 0,
      columns5: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "系统名称",
          key: "name"
        },
        {
          title: "终端总数",
          key: "class"
        },
        {
          title: "响应总数",
          key: "ifPush"
        },
        {
          title: "目标覆盖区域",
          key: "ifPush"
        },
        {
          title: "实际覆盖区域",
          key: "ifPush"
        },
        {
          title: "目标覆盖人口",
          key: "ifPush"
        },
        {
          title: "实际覆盖人口",
          key: "ifPush"
        },
        {
          title: "终端覆盖率",
          key: "ifPush"
        },
        {
          title: "覆盖区域率",
          key: "ifPush"
        },
        {
          title: "覆盖人口率",
          key: "ifPush"
        }
      ],
      data5: [],
      //百度地图
      heatmapOverlay: "",

      searchForm: {
        flag: 0,
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
      tableData: [],
      tableTotal: 0,
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "事件名称",
          align: "center",
          key: "name"
        },
        {
          title: "消息等级",
          align: "center",
          key: "msgLevel"
        },
        {
          title: "播发时长",
          align: "center",
          key: "bfLength",
          render: (h, params) => {
            return h("span", {
              domProps: {
                innerHTML: this.formatSeconds(params.row.bfLength)
              }
            });
          }
        },
        {
          title: "覆盖区域",
          align: "center",
          key: "regions",
          render: (h, params) => {
            return h("span", {
              domProps: {
                innerHTML: params.row.regions + "万平方公里"
              }
            });
          }
        },
        {
          title: "覆盖人口",
          align: "center",
          key: "population",
          render: (h, params) => {
            return h("span", {
              domProps: {
                innerHTML: params.row.population + "万人"
              }
            });
          }
        },
        {
          title: "播发时间",
          align: "center",
          key: "startTime"
        },
        {
          title: "录音文件",
          align: "center",

          render: (h, params) => {
            return h("span", {
              style: {
                cursor: "pointer",
                color: '#2D8CF0'
              },
              on: {
                click: () => {
                  this.videoShow(params.row.mediaSource);
                }
              }
            }, '点击播放');
          }
        },
        {
          title: "效果评估",
          key: "effect",
          render: (h, params) => {
            return h("Button", {
              props: {
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.effectShow(params.row.id);
                }
              }
            }, '查看详情');
          }
        }
      ],
      searchId: '',
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
    // 获取时间范围
    dateChange(time) {
      // this.dateRange = dateRange;
      // this.startTime = dateRange[0];
      // this.endTime = dateRange[1];
      // this.getList();
      this.searchForm.startTime = time[0];
      this.searchForm.endTime = time[1];
    },
    // 获取事件列表
    getList() {
      let data = {
        flag: 0,
        pageNum: this.page,
        pageSize: this.size,
        keyword: this.keyword,
        startTime: this.startTime,
        endTime: this.endTime
      };
      this.$axios({
        method: "get",
        url: "./message/msgBroadcastRecords?" + qs.stringify(data)
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
    // 录音文件播放
    videoShow(mediaSource) {
      this.modal = true;
      this.videoSrc = mediaSource;
    },
    effectShow(id) {
      this.searchId = id
      this.id = id;
      // // 时效性
      // this.getTimeList();
      // //发布率
      // this.getPushList();
      // //覆盖率
      // this.getCoverList();
      this.modal1 = true;
      // /message/publishRates
    },
    // 时效性数据
    getTimeList() {
      if (this.showKind == 0) {
        this.page1 = 1;
        let data = { pageNum: this.page1, pageSize: this.size1, id: this.id };
        this.$axios({
          method: "get",
          url: "./message/timeliness?" + qs.stringify(data)
        }).then(res => {
          if (res.data.code == 200) {
            this.total1 = res.data.data.total;
            this.data1 = res.data.data.page.list;
            this.CountAverageTime(res.data.data.page.list);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
        //当是终端的时候
      } else if (this.showKind == 1) {
        this.page2 = 1;
        let data = { pageNum: this.page2, pageSize: this.size2, id: this.id };
        this.$axios({
          method: "get",
          url: "./message/timeliness?" + qs.stringify(data)
        }).then(res => {
          if (res.data.code == 200) {
            this.total2 = res.data.data.total;
            this.data2 = res.data.data.page.list;
            this.CountAverageTime(res.data.data.page.list);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
      }
    },
    //发布率列表
    getPushList() {
      this.page3 = 1;
      let data1 = {
        pageNum: this.page3,
        pageSize: this.size3,
        id: this.id,
        flag: this.ifTable
      };
      this.$axios({
        method: "get",
        url: "./message/publishRates?" + qs.stringify(data1)
      }).then(res => {
        if ((res.data.code = 200)) {
          this.data3 = res.data.data.page.list;
          let sum = 0;
          this.data4[0].amount = this.data3.length;
          this.data3.forEach(item => {
            if (item.status == "是") sum++;
          });
          this.push = (sum / this.data3.length) * 100;
          this.noPush = (this.data3.length - sum) * 100;
          this.data4[0].sum = sum;
          this.data4[0].ifPush =
            (sum / this.data4[0].amount).toFixed(4) * 100 + "%";
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    //覆盖率列表
    getCoverList() {
      this.page4 = 1;
      let data2 = { pageNum: this.page4, pageSize: this.size4, id: this.id };
      this.$axios({
        method: "get",
        url: "./message/coverRates?" + qs.stringify(data2)
      }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    // 求平均值时间
    CountAverageTime(data) {
      let alltime = [];
      let timeLength = data.length;
      data.forEach(item => {
        let timeArr = item.time.split(":");
        let minute = Number(timeArr[0]);
        let second = Number(timeArr[1]);
        let seconds = minute * 60 + second;
        alltime.push(seconds);
      });
      // 获取所有的秒数
      var timeSum =
        alltime.reduce((a, b) => {
          return a + b;
        }) / timeLength;
      // console.log(timeSum)
      this.averageTime = this.formatSeconds(parseInt(timeSum));
    },
    // 把秒数转化为几分几秒格式
    formatSeconds(value) {
      var secondTime = parseInt(value); // 秒
      var minuteTime = 0; // 分
      var hourTime = 0; // 小时
      if (secondTime > 60) {
        //如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
          //获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60);
          //获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60);
        }
      }
      var result = "" + parseInt(secondTime) + "秒";

      if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
      }
      if (hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
      }
      return result;
    },
    changeSelect(value) {
      if (value == 0) {
        this.flag = true;
      } else if (value == 1) {
        this.flag = false;
      }
    },
    //是否显示热力图
    openHeatmap() {
      this.heatmapOverlay.show();
    },
    closeHeatmap() {
      this.heatmapOverlay.hide();
    },
    //百度地图
    draw() {
      var map = new BMap.Map("container"); // 创建地图实例

      var point = new BMap.Point(116.4035, 39.935);
      map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(); // 允许滚轮缩放

      var points = [
        { lng: 116.418261, lat: 39.921984, count: 50 },
        { lng: 116.423332, lat: 39.916532, count: 51 },
        { lng: 116.419787, lat: 39.930658, count: 15 },
        { lng: 116.418455, lat: 39.920921, count: 40 },
        { lng: 116.418843, lat: 39.915516, count: 100 },
        { lng: 116.42546, lat: 39.918503, count: 6 },
        { lng: 116.423289, lat: 39.919989, count: 18 },
        { lng: 116.418162, lat: 39.915051, count: 80 },
        { lng: 116.422039, lat: 39.91782, count: 11 },
        { lng: 116.41387, lat: 39.917253, count: 7 },
        { lng: 116.41773, lat: 39.919426, count: 42 },
        { lng: 116.421107, lat: 39.916445, count: 4 },
        { lng: 116.417521, lat: 39.917943, count: 27 },
        { lng: 116.419812, lat: 39.920836, count: 23 },
        { lng: 116.420682, lat: 39.91463, count: 60 },
        { lng: 116.415424, lat: 39.924675, count: 8 },
        { lng: 116.419242, lat: 39.914509, count: 15 },
        { lng: 116.422766, lat: 39.921408, count: 25 },
        { lng: 116.421674, lat: 39.924396, count: 21 },
        { lng: 116.427268, lat: 39.92267, count: 1 },
        { lng: 116.417721, lat: 39.920034, count: 51 },
        { lng: 116.412456, lat: 39.92667, count: 7 },
        { lng: 116.420432, lat: 39.919114, count: 11 },
        { lng: 116.425013, lat: 39.921611, count: 35 },
        { lng: 116.418733, lat: 39.931037, count: 22 },
        { lng: 116.419336, lat: 39.931134, count: 4 },
        { lng: 116.413557, lat: 39.923254, count: 5 },
        { lng: 116.418367, lat: 39.92943, count: 3 },
        { lng: 116.424312, lat: 39.919621, count: 100 },
        { lng: 116.423874, lat: 39.919447, count: 87 },
        { lng: 116.424225, lat: 39.923091, count: 32 },
        { lng: 116.417801, lat: 39.921854, count: 44 },
        { lng: 116.417129, lat: 39.928227, count: 21 },
        { lng: 116.426426, lat: 39.922286, count: 80 },
        { lng: 116.421597, lat: 39.91948, count: 32 },
        { lng: 116.423895, lat: 39.920787, count: 26 },
        { lng: 116.423563, lat: 39.921197, count: 17 },
        { lng: 116.417982, lat: 39.922547, count: 17 },
        { lng: 116.426126, lat: 39.921938, count: 25 },
        { lng: 116.42326, lat: 39.915782, count: 100 },
        { lng: 116.419239, lat: 39.916759, count: 39 },
        { lng: 116.417185, lat: 39.929123, count: 11 },
        { lng: 116.417237, lat: 39.927518, count: 9 },
        { lng: 116.417784, lat: 39.915754, count: 47 },
        { lng: 116.420193, lat: 39.917061, count: 52 },
        { lng: 116.422735, lat: 39.915619, count: 100 },
        { lng: 116.418495, lat: 39.915958, count: 46 },
        { lng: 116.416292, lat: 39.931166, count: 9 },
        { lng: 116.419916, lat: 39.924055, count: 8 },
        { lng: 116.42189, lat: 39.921308, count: 11 },
        { lng: 116.413765, lat: 39.929376, count: 3 },
        { lng: 116.418232, lat: 39.920348, count: 50 },
        { lng: 116.417554, lat: 39.930511, count: 15 },
        { lng: 116.418568, lat: 39.918161, count: 23 },
        { lng: 116.413461, lat: 39.926306, count: 3 },
        { lng: 116.42232, lat: 39.92161, count: 13 },
        { lng: 116.4174, lat: 39.928616, count: 6 },
        { lng: 116.424679, lat: 39.915499, count: 21 },
        { lng: 116.42171, lat: 39.915738, count: 29 },
        { lng: 116.417836, lat: 39.916998, count: 99 },
        { lng: 116.420755, lat: 39.928001, count: 10 },
        { lng: 116.414077, lat: 39.930655, count: 14 },
        { lng: 116.426092, lat: 39.922995, count: 16 },
        { lng: 116.41535, lat: 39.931054, count: 15 },
        { lng: 116.413022, lat: 39.921895, count: 13 },
        { lng: 116.415551, lat: 39.913373, count: 17 },
        { lng: 116.421191, lat: 39.926572, count: 1 },
        { lng: 116.419612, lat: 39.917119, count: 9 },
        { lng: 116.418237, lat: 39.921337, count: 54 },
        { lng: 116.423776, lat: 39.921919, count: 26 },
        { lng: 116.417694, lat: 39.92536, count: 17 },
        { lng: 116.415377, lat: 39.914137, count: 19 },
        { lng: 116.417434, lat: 39.914394, count: 43 },
        { lng: 116.42588, lat: 39.922622, count: 27 },
        { lng: 116.418345, lat: 39.919467, count: 8 },
        { lng: 116.426883, lat: 39.917171, count: 3 },
        { lng: 116.423877, lat: 39.916659, count: 34 },
        { lng: 116.415712, lat: 39.915613, count: 14 },
        { lng: 116.419869, lat: 39.931416, count: 12 },
        { lng: 116.416956, lat: 39.925377, count: 11 },
        { lng: 116.42066, lat: 39.925017, count: 38 },
        { lng: 116.416244, lat: 39.920215, count: 91 },
        { lng: 116.41929, lat: 39.915908, count: 54 },
        { lng: 116.422116, lat: 39.919658, count: 21 },
        { lng: 116.4183, lat: 39.925015, count: 15 },
        { lng: 116.421969, lat: 39.913527, count: 3 },
        { lng: 116.422936, lat: 39.921854, count: 24 },
        { lng: 116.41905, lat: 39.929217, count: 12 },
        { lng: 116.424579, lat: 39.914987, count: 57 },
        { lng: 116.42076, lat: 39.915251, count: 70 },
        { lng: 116.425867, lat: 39.918989, count: 8 }
      ];
      if (!isSupportCanvas()) {
        alert(
          "热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~"
        );
      }
      //详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
      //参数说明如下:
      /* visible 热力图是否显示,默认为true
        * opacity 热力的透明度,1-100
        * radius 势力图的每个点的半径大小   
        * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
        *	{
          .2:'rgb(0, 255, 255)',
          .5:'rgb(0, 110, 255)',
          .8:'rgb(100, 0, 255)'
        }
        其中 key 表示插值的位置, 0~1. 
            value 为颜色值. 
        */
      this.heatmapOverlay = new BMapLib.HeatmapOverlay({ radius: 50 });
      map.addOverlay(this.heatmapOverlay);
      this.heatmapOverlay.setDataSet({ data: points, max: 100 });
      this.closeHeatmap();
      function setGradient() {
        /*格式如下所示:
        {
            0:'rgb(102, 255, 0)',
          .5:'rgb(255, 170, 0)',
            1:'rgb(255, 0, 0)'
        }*/
        var gradient = {};
        var colors = document.querySelectorAll("input[type='color']");
        colors = [].slice.call(colors, 0);
        colors.forEach(function(ele) {
          gradient[ele.getAttribute("data-key")] = ele.value;
        });
        this.heatmapOverlay.setOptions({ gradient: gradient });
      }
      //判断浏览区是否支持canvas
      function isSupportCanvas() {
        var elem = document.createElement("canvas");
        return !!(elem.getContext && elem.getContext("2d"));
      }
    },

    getData() {
      msgBroadcastRecords(Object.assign(this.searchForm, this.searchPage)).then(
        res => {
          console.log(res.data.data);
          this.tableData = res.data.data.list;
          this.tableTotal = res.data.data.total;
        }
      );
    }
  },
  mounted() {
    // this.getList();
    // this.$nextTick(() => {
    //   // 百度地图API功能
    //   this.draw();
    // });

    this.getData();
  }
  // updated() {
  //   this.$nextTick(() => {
  //     var myChart = this.echarts.init(this.$refs.mychart);
  //     // 绘制图表
  //     myChart.setOption({
  //       title: {
  //         text: "发布率统计",
  //         subtext: "纯属虚构",
  //         x: "center"
  //       },
  //       tooltip: {
  //         trigger: "item",
  //         formatter: "{a} <br/>{b} : {c}%"
  //       },
  //       legend: {
  //         type: "scroll",
  //         orient: "vertical",
  //         right: 0,
  //         top: 20,
  //         bottom: 20,
  //         data: ["未发布", "已发布"]
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
  //           name: "比率",
  //           type: "pie",
  //           radius: "55%",
  //           center: ["50%", "50%"],
  //           data: [
  //             { name: "未发布", value: this.noPush },
  //             { name: "已发布", value: this.push }
  //           ],
  //           itemStyle: {
  //             emphasis: {
  //               shadowBlur: 10,
  //               shadowOffsetX: 0,
  //               shadowColor: "rgba(0, 0, 0, 0.5)"
  //             }
  //           }
  //         }
  //       ]
  //     });
  //   });
  // }
};
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/common.scss";
.main-container {
  margin-top: 15px;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  .ivu-modal {
    top: 0;
  }
}
.time-box {
  margin-top: 15px;
  height: 50px;
  width: 100%;
  border: 1px solid #e8eaec;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  .time-title {
    width: 30%;
  }
  .time-value {
    width: 20%;
    text-align: center;
  }
}
.container-box {
  width: 80%;
  height: 500px;
  margin: 15px auto;
  position: relative;
}
#container {
  width: 100%;
  height: 500px;
  margin: 15px auto;
}
</style>