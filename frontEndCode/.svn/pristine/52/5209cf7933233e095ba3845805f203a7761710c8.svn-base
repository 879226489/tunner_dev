<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/utils/common";
export default {
  name: "timeLine",
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
      let xData = [];
      let yData = [];
      let yData2 = [];
      let { chartData, broTimeDate } = this.value;
      if (chartData.length == 24) {
        xData = [
          "1时",
          "2时",
          "3时",
          "4时",
          "5时",
          "6时",
          "7时",
          "8时",
          "9时",
          "10时",
          "11时",
          "12时",
          "13时",
          "14时",
          "15时",
          "16时",
          "17时",
          "18时",
          "19时",
          "20时",
          "21时",
          "22时",
          "23时",
          "24时"
        ];
      } else if (chartData.length > 24) {
        xData = [
          "1号",
          "2号",
          "3号",
          "4号",
          "5号",
          "6号",
          "7号",
          "8号",
          "9号",
          "10号",
          "11号",
          "12号",
          "13号",
          "14号",
          "15号",
          "16号",
          "17号",
          "18号",
          "19号",
          "20号",
          "21号",
          "22号",
          "23号",
          "24号",
          "25号",
          "26号",
          "27号",
          "28号",
          "29号",
          "30号",
          "31号"
        ];
      } else if (chartData.length == 12) {
        xData = [
          "一月份",
          "二月份",
          "三月份",
          "四月份",
          "五月份",
          "六月份",
          "七月份",
          "八月份",
          "九月份",
          "十月份",
          "十一月份",
          "十二月份"
        ];
      }

      chartData.forEach(item => {
        Object.keys(item).forEach(k => {
          yData.push(item[k]);
        });
      });
      broTimeDate.forEach(item => {
        Object.keys(item).forEach(k => {
          yData2.push(item[k]);
        });
      });
      this.$nextTick(() => {
        let option = {
          title: {
            text: "播发时长/次数统计趋势图",
            textStyle: {
              align: "center",
              fontSize: 20
            },
            top: "3%",
            left: "10%"
          },
          //backgroundColor: "#0f375f",
          grid: {
            top: "25%",
            bottom: "10%" //也可设置left和right设置距离来控制图表的大小
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              label: {
                show: true
              }
            }
          },
          legend: {
            data: ["播发次数", "播发时长"],
            top: "15%",
            textStyle: {
              //color: "#ffffff"
            }
          },
          xAxis: {
            data: xData,
            axisLine: {
              show: true, //隐藏X轴轴线
              lineStyle: {
                //color: "#01FCE3"
              }
            },
            axisTick: {
              show: true //隐藏X轴刻度
            },
            axisLabel: {
              show: true,
              textStyle: {
                //color: "#ebf8ac" //X轴文字颜色
              }
            }
          },
          yAxis: [
            {
              type: "value",
              name: "时长",
              nameTextStyle: {
                //color: "#ebf8ac"
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: true
              },
              axisLine: {
                show: true,
                lineStyle: {
                  //color: "#FFFFFF"
                }
              },
              axisLabel: {
                show: true,
                textStyle: {
                  //color: "#ebf8ac"
                }
              }
            },
            {
              type: "value",
              name: "次数",
              nameTextStyle: {
                //color: "#ebf8ac"
              },
              position: "right",
              axisLabel: {
                show: true,
                formatter: "{value}", //右侧Y轴文字显示
                textStyle: {
                  //color: "#ebf8ac"
                }
              }
            },
            {
              type: "value",
              gridIndex: 0,
              min: 50,
              max: 100,
              splitNumber: 8,
              splitLine: {
                show: false
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              splitArea: {
                show: true,
                areaStyle: {
                  //color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
                }
              }
            }
          ],
          series: [
            {
              name: "播发次数",
              type: "line",
              yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
              showAllSymbol: true, //显示所有图形。
              symbol: "circle", //标记的图形为实心圆
              symbolSize: 10, //标记的大小
              itemStyle: {
                //折线拐点标志的样式
                color: "#058cff"
              },
              lineStyle: {
                color: "#058cff"
              },
              areaStyle: {
                color: "rgba(5,140,255, 0.2)"
              },
              data: yData
            },
            {
              name: "播发时长",
              type: "line",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#00FFE3"
                    },
                    {
                      offset: 1,
                      color: "#4693EC"
                    }
                  ])
                }
              },
              data: yData2
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