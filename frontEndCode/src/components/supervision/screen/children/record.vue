<template>
  <div class="record">
    <div>
      <Row>
        <i-col span="8">
          {{chartsForm.areaId}}
          <AreaSelect range="[5,4]" col="4" @change="chartsForm.areaId = $event.id" />
        </i-col>
        <i-col span="16">
          <Form label-position="left" :label-width="100">
            <Row>
              <i-col span="8">
                <FormItem label="区域是否轮播">
                  <Select v-model="setList.openIsWheel" style="width:180px" @on-change="saveData()">
                    <Option :value="1">是</Option>
                    <Option :value="0">否</Option>
                  </Select>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="区域轮播速度">
                  <Select
                    v-model="setList.openWheelSpeed"
                    style="width:180px"
                    @on-change="saveData()"
                  >
                    <Option :value="5">5秒</Option>
                    <Option :value="10">10秒</Option>
                    <Option :value="60">1分钟</Option>
                  </Select>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="区域手动轮播">
                  <Button @click="prev">上一个</Button>
                  <Button @click="next">下一个</Button>
                </FormItem>
              </i-col>
            </Row>
          </Form>
        </i-col>
      </Row>
    </div>
    <Row style="margin-top: 15px;">
      <i-col span="12">
        <div class="map">
          <Spin fix v-if="!chartData" size="large"></Spin>
          <RecordMap
            ref="map"
            v-else
            :chartData="chartData"
            style="width: 100%; height: 500px"
            @change="changeTable"
          />
        </div>
        <div style="width: 100%; height: 500px; margin-top: 15px;">
          <RecordTotal style="width: 100%; height: 500px" />
        </div>
      </i-col>
      <i-col span="12">
        <Table :columns="tableColumns" :data="tableData" height="1000px"></Table>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { bRecordMap } from "@/api/compre";
import { setGeoJSON } from "@/utils/common";
import AreaSelect from "@/components/commonComponent/areaSelect";
import RecordMap from "./records/recordMap";
import RecordTotal from './records/recordTotal'
export default {
  components: {
    AreaSelect,
    RecordMap,
    RecordTotal
  },
  props: {
    setting: Object
  },
  data() {
    return {
      loading: true,
      src: "",
      index: "",
      chartsForm: {
        areaId: ""
      },
      tableColumns: [
        {
          title: "时间段",
          width: 360,
          render: (h, params) => {
            let text = `${params.row.startTime}—${params.row.endTime}`;
            return h("div", text);
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
      tableData: [],
      mapSelect: {
        loop: this.setting.openIsWheel ? 1 : 0,
        time: this.setting.openWheelSpeed
      },
      mapData: [],
      name: "武汉市",
      chartData: null
    };
  },
  computed: {
    setList() {
      return this.$store.state.wheelSetting.setList;
    }
  },
  watch: {
    setting: {
      handler() {
        this.mapSelect.loop = this.setting.openIsWheel ? 1 : 0;
        this.mapSelect.time = this.setting.openWheelSpeed;
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(["getSetting", "saveSetting"]),
    getChartsData() {
      bRecordMap(this.chartsForm).then(res => {
        this.mapData = res.data.mapData;
        this.chartData = setGeoJSON(this.mapData);
        this.tableData = this.mapData.filter(
          item => item.name == this.name
        )[0].listData;
      });
    },
    prev() {
      this.$refs.map.prev();
    },
    next() {
      this.$refs.map.next();
    },
    changeTable(name) {
      this.name = name;
      if (this.mapData.length != 0) {
        this.tableData = this.mapData.filter(
          item => item.name == name
        )[0].listData;
      } else {
        this.tableData = [];
      }
    },
    saveData() {
      let data = JSON.parse(JSON.stringify(this.setList));
      data.allIsWheel = data.allIsWheel == 1 ? true : false;
      data.openIsWheel = data.openIsWheel == 1 ? true : false;
      this.saveSetting(data);
    }
  },
  mounted() {
    this.getChartsData();
  }
};
</script>

<style lang="scss" scope>
.record {
  .map {
    width: 100%;
    height: 500px;
    position: relative;
  }
}
</style>