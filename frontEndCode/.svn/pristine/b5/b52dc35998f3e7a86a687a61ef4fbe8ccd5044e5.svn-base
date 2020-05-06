<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/utils/common";
export default {
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
      handler() {
        this.setData();
      }
    },
    deep: true
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    setData() {
      let legend = this.value.map(item => item.name);
      let data = this.value.map(item => {
          return {
              name: item.name,
              value: item.num
          }
      })
      this.$nextTick(() => {
        let option = {
          backgroundColor: "#031845",
          title: {
            text: "消息发布来源",
            left: "center",
            top: 100,
            textStyle: {
              color: "#ccc"
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            right: 10,
            top: "center",
            data: legend,
            textStyle: {
              color: "#ccc"
            }
          },
          series: [
            {
              type: "pie",
              radius: ["40%", "50%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center"
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "30",
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: false
              },
              data: data
            }
          ]
        };
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option);
      });
    }
  },
  mounted() {
    console.log(123456);
    this.setData();
    on(window, "resize", this.resize);
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>

<style>
</style>