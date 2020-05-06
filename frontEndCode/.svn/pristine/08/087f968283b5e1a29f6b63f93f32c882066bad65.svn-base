<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/utils/common";
export default {
  name: "patternBar",
  props: {
    value: Array
  },
  data() {
    return {
      dom: null
    };
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
    resize() {
      this.dom.resize();
    },
    setData() {
      let arr = [["product", "日常广播", "应急广播"]];
      this.value.forEach(item => {
        let arrItem = [];
        Object.keys(item).forEach(k => {
          arrItem.push(k);
          arrItem.push(item[k].daily);
          arrItem.push(item[k].emergency);
        });
        arr.push(arrItem);
      });
      console.log(arr);
      this.$nextTick(() => {
        let option = {
          legend: {},
          tooltip: {},
          dataset: {
            source: arr
          },
          xAxis: { type: "category" },
          yAxis: {
            minInterval: 1
          },
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