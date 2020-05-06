<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/utils/common";
export default {
  name: "ccxSystemBar",
  props: {
    value: Array
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
      console.log(this.value);
      let source = [["product", "开机率", "故障率"]]

      this.value.forEach(item => {
        source.push([`${item.areaStruct}`, `${item.upRate}`, `${item.faultRate}`])
      })

      this.$nextTick(() => {
        let option = {
          legend: {},
          tooltip: {},
          dataset: {
            source
          },
          xAxis: { 
            type: "category" ,
            name: '地区'
          },
          yAxis: {},
          series: [{ type: "bar" }, { type: "bar" }]
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