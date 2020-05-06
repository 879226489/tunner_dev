<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/utils/common";
export default {
  name: "relesePie",
  props: {
    value: Object
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
      this.$nextTick(() => {
        let option = {
          title: {
            text: "",
            left: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: ["发布成功", "未发布"]
          },
          series: [
            {
              name: "发布率",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: this.value.supRate, name: "发布成功" },
                { value: this.value.unpRate, name: "未发布" }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
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