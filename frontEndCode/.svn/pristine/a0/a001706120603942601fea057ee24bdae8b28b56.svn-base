<template>
  <div class="screen">
    <div class="header">
      <p class="header-title">湖北 "村村响" 省级监管平台</p>
    </div>
    <div class="content">
      <Row>
        <i-col span="16">
          <Row>
            <i-col span="12">
              <Row>
                <i-col span="12">
                  <div class="box border">
                    <header class="deep">
                      <span></span>
                      <span>终端分布热力图</span>
                    </header>
                    <div>
                      <TermHeatMap height="850px" />
                    </div>
                  </div>
                </i-col>
                <i-col span="12">
                  <div class="box border">
                    <header class="deep">
                      <span></span>
                      <span>广播播发密度热力图</span>
                    </header>
                    <div>
                      <PlayHeatMap height="850px" />
                    </div>
                  </div>
                </i-col>
              </Row>
              <Row>
                <i-col span="16">
                  <div class="box border">
                    <header class="shallow">
                      <span></span>
                      <span>机房电力监测地图</span>
                    </header>
                    <div>
                      <PowerMap style="width: 100%; height: 850px;" :tableData="tableData" />
                    </div>
                  </div>
                </i-col>
                <i-col span="8">
                  <div class="box border">
                    <header class="shallow">
                      <span></span>
                      <span>电力事件</span>
                    </header>
                    <div>
                      <PowerList :tableData="tableData" />
                    </div>
                  </div>
                </i-col>
              </Row>
            </i-col>
            <i-col span="12">
              <div class="center-map border">
                <GISMap style="width: 100%; height: 100%;" />
              </div>
            </i-col>
          </Row>
          <Row>
            <i-col span="8">
              <div class="box border">
                <header class="shallow">
                  <span></span>
                  <span>音频实时监听</span>
                </header>
                <div>
                  <Row>
                    <i-col span="4" style="padding-top: 80px; padding-left: 50px; color: #616161">
                      <Treeselect
                        v-model="realValue"
                        :options="options"
                        placeholder="请选择地区"
                        :normalizer="normalizer"
                        :load-options="loadOptions"
                        @input="getRealData"
                        noChildrenText="暂无更多数据"
                      ></Treeselect>
                    </i-col>
                    <i-col span="20">
                      <BackTime :tableData="realTimeList" />
                    </i-col>
                  </Row>
                </div>
              </div>
            </i-col>
            <i-col span="8">
              <div class="box border">
                <header class="shallow">
                  <span></span>
                  <span>音频回溯监听</span>
                </header>
                <div>
                  <BackTime :tableData="backList" />
                </div>
              </div>
            </i-col>
            <i-col span="8">
              <div class="box border">
                <header class="shallow">
                  <span></span>
                  <span>拓扑图</span>
                </header>
                <div>
                  <Topo
                    background="#000224"
                    :width="topoWidth"
                    :height="topoHeight"
                    :showSelect="false"
                  />
                </div>
              </div>
            </i-col>
          </Row>
        </i-col>
        <i-col span="8">
          <Row>
            <i-col span="24">
              <div class="right-top border">
                <header class="shallow">
                  <span></span>
                  <span>全事件数据统计</span>
                  <div class="header-type">
                    <RadioGroup v-model="fullForm.flag" @on-change="$refs.full.getData($event)">
                      <Radio :label="0">全事件</Radio>
                      <Radio :label="1">村村响</Radio>
                      <Radio :label="2">省应急</Radio>
                    </RadioGroup>
                  </div>
                </header>
                <div>
                  <FullTop ref="full" />
                </div>
              </div>
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              <div class="box border">
                <header class="shallow">
                  <span></span>
                  <span>数据统计</span>
                </header>
                <div>
                  <RecordTotal style="width: 100%; height: 850px" />
                </div>
              </div>
            </i-col>
            <i-col span="12">
              <div class="box border">
                <header class="shallow">
                  <span></span>
                  <span>单一事件覆盖效果——{{selectData.name}}</span>
                </header>
                <div>
                  <Cover style="width:100%; height: 850px;" />
                </div>
              </div>
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              <div class="right-bottom border">
                <header class="shallow">
                  <span></span>
                  <span>开停播记录</span>
                </header>
                <div>
                  <RecordMap
                    v-if="recordData"
                    :chartData="recordData"
                    style="width: 100%; height: 950px"
                    @change="changeTable"
                  />
                </div>
              </div>
            </i-col>
            <i-col span="12">
              <div class="right-bottom border">
                <header class="shallow">
                  <span></span>
                  <span>{{cityName}}开停播列表</span>
                </header>
                <div style="padding: 80px 50px 80px 50px">
                  <RecordTable :recordList="recordList" />
                </div>
              </div>
            </i-col>
          </Row>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
import GISMap from "./children/GISMap";
import PlayHeatMap from "./children/palyHeatMap";
import TermHeatMap from "./children/termHeatMap";
import PowerMap from "./children/power/powerMap";
import PowerList from "./children/power/powerList";
import RecordMap from "./children/records/recordMap";
import RecordTotal from "./children/records/recordTotal";
import FullTop from "./children/fullTop";
import Cover from "./children/full/Cover";
import RecordTable from "./children/records/recordTable";
import Topo from "@/components/supervision/topology/topology";
import RealTime from "./children/all/realTime";
import BackTime from "./children/all/backTime";
import {
  machinePowerMonitor,
  bRecordMap,
  realTimeAudio,
  getPCoverageSetting
} from "@/api/compre";
import { getAreasByParentId } from "@/api/area";
import { setGeoJSON } from "@/utils/common";
import { mapActions } from "vuex";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: {
    GISMap,
    PlayHeatMap,
    TermHeatMap,
    PowerMap,
    PowerList,
    RecordMap,
    RecordTotal,
    FullTop,
    Cover,
    RecordTable,
    Topo,
    RealTime,
    BackTime,
    Treeselect
  },
  data() {
    return {
      header: require("@/assets/img/header.png"),
      areaId: "E58C861987374483A5E64F4B1D7F046B",
      tableData: [],
      recordData: null,
      recordForm: {
        areaId: ""
      },
      cityName: "武汉市",
      recordList: [],
      topoWidth: "1500px",
      topoHeight: "800px",
      fullForm: {
        flag: 0
      },
      realValue: null,
      options: [],
      realTimeList: [],
      backList: []
    };
  },
  computed: {
    selectData() {
      return this.$store.state.wheelSetting.selectData;
    }
  },
  methods: {
    ...mapActions(["getSetting", "setCoverSetting"]),
    getData() {
      machinePowerMonitor({ areaId: this.areaId }).then(res => {
        this.tableData = res.data.data;
      });
    },
    changeTable(name) {
      this.cityName = name;
      if (this.mapData.length != 0) {
        this.recordList = this.mapData.filter(
          item => item.name == name
        )[0].listData;
      } else {
        this.recordList = [];
      }
    },
    getRecordData() {
      bRecordMap(this.recordForm).then(res => {
        this.mapData = res.data.mapData;
        this.recordData = setGeoJSON(this.mapData);
        this.recordList = this.mapData.filter(
          item => item.name == this.cityName
        )[0].listData;
      });
    },
    getAreaById(id) {
      getAreasByParentId({ id }).then(res => {
        this.options = res.data.data.map(item => {
          return {
            ...item,
            children: null
          };
        });
      });
    },
    normalizer(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.children
      };
    },
    loadOptions({ action, parentNode, callback }) {
      if (action == "LOAD_CHILDREN_OPTIONS") {
        getAreasByParentId({ id: parentNode.id }).then(res => {
          parentNode.children = res.data.data.map(item => {
            return {
              ...item,
              children: null
            };
          });
          callback();
        });
      }
    },
    getRealData(val) {
      this.getAudio(val || "");
    },
    getAudio(areaId) {
      realTimeAudio({ areaId }).then(res => {
        this.realTimeList = res.data.realTimeList;
        this.backList = res.data.backList.map(item => {
          return {
            ...item,
            status: false
          }
        });
        console.log(this.backList);
      });
    },
    getCoverData() {
      let coverForm = {};
      getPCoverageSetting().then(res => {
        let { id, coverLowValue, coverInValue, coverHighValue } = res.data.data;
        coverForm.id = id;
        coverForm.lowStartValue = Number(coverLowValue.split("~")[0]);
        coverForm.lowEndValue = Number(coverLowValue.split("~")[1]);
        coverForm.inStartValue = Number(coverInValue.split("~")[0]);
        coverForm.inEndValue = Number(coverInValue.split("~")[1]);
        coverForm.highStartValue = Number(coverHighValue.split("~")[0]);
        coverForm.highEndValue = Number(coverHighValue.split("~")[1]);
        this.setCoverSetting(coverForm);
      });
    }
  },
  mounted() {
    this.getData();
    this.getRecordData();
    this.getSetting();
    this.getAreaById("");
    this.getAudio("");
    this.getCoverData();
  }
};
</script>

<style lang="scss" scoped>
.screen {
  width: 7680px;
  height: 3240px;
  background: #000224;
  color: #fff;
  .header {
    position: relative;
    width: 100%;
    height: 238px;
    background: url("~@/assets/img/header.png") no-repeat;
    background-size: 100% 100%;
    .header-title {
      text-align: center;
      font-size: 60px;
      line-height: 158px;
    }
  }
  .content {
    width: 100%;
    height: 3000px;
    .box {
      height: 980px;
    }
    .deep {
      width: 100%;
      height: 100px;
      display: flex;
      line-height: 100px;
      background-image: linear-gradient(to right, #20457c, #070f1a);
      span {
        flex: 1;
      }
      span:nth-child(1) {
        min-width: 30px;
        max-width: 30px;
        height: 100%;
        background: #3878d0;
        margin-right: 20px;
      }
    }
    .shallow {
      width: 100%;
      height: 100px;
      display: flex;
      line-height: 100px;
      background-image: linear-gradient(to right, #20457c, #142e51);
      span {
        flex: 1;
      }
      span:nth-child(1) {
        min-width: 30px;
        max-width: 30px;
        height: 100%;
        background: #3878d0;
        margin-right: 20px;
      }
    }
    .center-map {
      height: 1990px;
    }
    .right-top {
      height: 890px;
    }
    .right-bottom {
      height: 1080px;
    }
    .border {
      margin: 10px;
      border: 1px solid #fff;
      box-sizing: border-box;
    }
  }
}
</style>


<style lang="scss">
.screen {
  .vue-treeselect__control {
    background: #265293;
  }
  .vue-treeselect__single-value {
    color: #fff;
  }
  .vue-treeselect__menu {
    background: #265293;
    color: #ccc;
  }
}
</style>