<template>
  <div style="position: relative">
    <Select
      v-model="setList.type"
      style="width: 200px; position: absolute; right: 0; top 0;z-index: 99"
      @on-change="saveData()"
    >
      <Option value="4*3">4*3</Option>
      <Option value="1*3">1*3</Option>
    </Select>
    <Tabs :animated="false" v-model="activeName">
      <TabPane label="终端分布热力图" name="term">
        <TermHeatMap v-if="activeName == 'term'" height="600px" />
      </TabPane>
      <TabPane label="广播播发密度热力图" name="play">
        <PlayHeatMap v-if="activeName == 'play'" height="600px" />
      </TabPane>
      <TabPane label="全省村村响总体监测效果GIS地图" name="gis">
        <GISMap style="width: 100%; height: 500px" v-if="activeName == 'gis'" />
      </TabPane>
      <TabPane label="实时音频" name="real"> 
        <RealTime v-if="activeName == 'real'" />
      </TabPane>
      <TabPane label="全事件数据统计" name="full">
        <FullEvent
          v-if="activeName == 'full'"
          :setting="setting"
          @allIsWheel="setting.allIsWheel = $event;saveData()"
          @allWheelSpeed="setting.allWheelSpeed = $event;saveData()"
        />
      </TabPane>
      <TabPane label="区域数据统计" name="record">
        <Record
          v-if="activeName == 'record'"
          :setting="setting"
          @openIsWheel="setting.openIsWheel = $event;saveData()"
          @openWheelSpeed="setting.openWheelSpeed = $event;saveData()"
        />
      </TabPane>
      <TabPane label="电力监测" name="power">
        <Power />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import TermHeatMap from "./children/termHeatMap";
import PlayHeatMap from "./children/palyHeatMap";
import GISMap from "./children/GISMap";
import Record from "./children/record";
import RealTime from "./children/realTime";
import FullEvent from "./children/fullEvent";
import Power from './children/power'
import { findScreenSetting, saveScreenSetting } from "@/api/compre";
import { mapActions } from "vuex";
export default {
  name: "screen",
  components: {
    TermHeatMap,
    PlayHeatMap,
    GISMap,
    Record,
    RealTime,
    FullEvent,
    Power
  },
  data() {
    return {
      activeName: "full",
      setting: {
        id: "",
        allIsWheel: "",
        allWheelSpeed: "",
        openIsWheel: "",
        openWheelSpeed: "",
        type: ""
      }
    };
  },
  computed: {
    setList() {
      return this.$store.state.wheelSetting.setList;
    }
  },
  methods: {
    ...mapActions([
      "getSetting",
      "saveSetting"
    ]),
    saveData() {
      let data = JSON.parse(JSON.stringify(this.setList));
      data.allIsWheel = data.allIsWheel == 1 ? true : false;
      data.openIsWheel = data.openIsWheel == 1 ? true : false;
      this.saveSetting(data);
    }
  },
  mounted() {
    this.getSetting();
  }
};
</script>

<style scoped>
</style>