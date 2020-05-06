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
      },
      deep: true
    }
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    setData() {
      let xData = [];
      let yData = [];
      xData = this.value.map(item => item.msgCategory);
      yData = this.value.map(item => item.num);
      this.$nextTick(() => {
        let option = {
          backgroundColor: "#00265f",
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {
            top: "15%",
            right: "3%",
            left: "5%",
            bottom: "12%"
          },
          xAxis: [
            {
              type: "category",
              data: xData,
              axisLine: {
                lineStyle: {
                  color: "rgba(255,255,255,0.12)"
                }
              },
              axisLabel: {
                margin: 10,
                color: "#e2e9ff",
                textStyle: {
                  fontSize: 14
                }
              }
            }
          ],
          yAxis: [
            {
              name: '(件)',
              nameTextStyle: {
                  color: '#fff'
              },
              axisLabel: {
                formatter: "{value}",
                color: "#e2e9ff"
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(255,255,255,0.12)"
                }
              }
            }
          ],
          series: [
            {
              type: "bar",
              data: yData,
              barWidth: "20px",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "rgba(0,244,255,1)" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "rgba(0,77,167,1)" // 100% 处的颜色
                      }
                    ],
                    false
                  ),
                  barBorderRadius: [30, 30, 30, 30],
                  shadowColor: "rgba(0,160,221,1)",
                  shadowBlur: 4
                }
              },
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

<style>
</style>