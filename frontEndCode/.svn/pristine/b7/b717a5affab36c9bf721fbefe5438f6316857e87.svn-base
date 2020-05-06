<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/utils/common";
export default {
  name: "termBar",
  props: {
    value: Array,
    type: Number,
    level: Number
  },
  data() {
    return {
      dom: null
    };
  },
  methods: {
    resize() {
      this.dom.resize();
    }
  },
  watch: {
    value: {
      handler(oldValue, newValue) {
        this.setData();
      },
      deep: true
    }
  },
  methods: {
    setData() {
      // let xData = [];
      // let yData = [];
      // if (this.level >= 4) {
      //   if (this.type == 0) {
      //     this.value.forEach(item => {
      //       xData.push(item.areaName);
      //       yData.push(item.onlineRate);
      //     });
      //   } else if (this.type == 1) {
      //     this.value.forEach(item => {
      //       xData.push(item.areaName);
      //       yData.push(item.faultRate);
      //     });
      //   } else if (this.type == 2) {
      //     this.value.forEach(item => {
      //       xData.push(item.areaName);
      //       yData.push(item.upRate);
      //     });
      //   }
      // }else if(this.level < 4) {
      //   if (this.type == 0) {
      //     this.value.forEach(item => {
      //       xData.push(item.typeName);
      //       yData.push(item.onlineRate);
      //     });
      //   } else if (this.type == 1) {
      //     this.value.forEach(item => {
      //       xData.push(item.typeName);
      //       yData.push(item.faultRate);
      //     });
      //   } else if (this.type == 2) {
      //     this.value.forEach(item => {
      //       xData.push(item.typeName);
      //       yData.push(item.upRate);
      //     });
      //   }
      // }

      console.log(this.value);
      let source = [["product", "在线率", "故障率", "开机率"]];

      this.value.forEach(item => {
        source.push([
          `${item.areaName}`,
          `${item.onlineRate}`,
          `${item.faultRate}`,
          `${item.upRate}`
        ]);
      });

      this.$nextTick(() => {
        let option = {
          legend: {},
          tooltip: {},
          dataset: {
            source
          },
          xAxis: {
            name: "地区",
            type: "category"
          },
          yAxis: {},
          series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
        };
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option);
      });
    }
  },
  mounted() {
    this.setData();
    on(window, "resize", this.resize);
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>