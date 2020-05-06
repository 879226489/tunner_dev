<template>
  <div>
    <AreaSelect @change="areaId = $event.id" col="4" range="[5,4]" style="margin-bottom: 10px;" />
    <Row>
      <i-col span="16">
        <PowerMap style="width: 100%; height: 500px;" :tableData="tableData" />
      </i-col>
      <i-col span="8">
        <div class="event">
          <div class="header">
            <div class="header-top"></div>
            <div class="header-title">电力事件</div>
          </div>
          <PowerList :tableData="tableData" />
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import PowerMap from "./power/powerMap";
import PowerList from "./power/powerList";
import AreaSelect from "@/components/commonComponent/areaSelect";
import { machinePowerMonitor } from '@/api/compre'
export default {
  components: {
    PowerMap,
    PowerList,
    AreaSelect
  },
  data() {
    return {
      areaId: "E58C861987374483A5E64F4B1D7F046B",
      tableData: [],
    };
  },
  watch: {
      areaId() {
          this.getData()
      }
  },
  methods: {
      getData() {
          machinePowerMonitor({areaId: this.areaId}).then(res => {
              console.log(res);
              this.tableData = res.data.data;
          })
      }
  },
  mounted() {
      this.getData();
  }
};
</script>

<style lang="scss" scoped>
.event {
  width: 100%;
  height: 500px;
  background: #3f2e5b;
  .header {
    display: flex;
    width: 100%;
    height: 50px;
    background: #3f2e5b;
    background-image: linear-gradient(to right, #2d8cf0, #3f2e5b);
    color: #fff;
    .header-top {
      flex: 1;
      min-width: 15px;
      max-width: 15px;
      height: 100%;
      background: rgb(140, 140, 248);
    }
    .header-title {
      flex: 1;
      line-height: 50px;
      margin-left: 15px;
    }
  }
}
</style>