<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/utils/common";
export default {
  name: "bar",
  props: {
    value: Object
  },
  data() {
    return {
      dom: null,
      valueType: {
        city: "市",
        county: "县",
        town: "镇",
        village: "村",
        phone: "电话",
        sm: "短信"
      }
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
      let xData = Object.keys(this.value).map(k => this.valueType[k])
      let yData = Object.keys(this.value).map(k => this.value[k])
      this.$nextTick(() => {
        let option = {
          title: {
            text: "来源柱状图"
          },
          tooltip: {
            formatter: "总数<br/>共计：{c}"
          },
          legend: {
            data: ["来源"]
          },
          xAxis: {
            name: "（来源类别）",
            data: xData
          },
          yAxis: {
            type: "value",
            name: "数量",
            interval: 20, //值之间的间隔
            axisLabel: {
              show: true,
              interval: "auto",
              formatter: "{value}"
            },
            show: true
          },
          series: [
            {
              name: "来源",
              type: "bar",
              data: yData
            }
          ]
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
