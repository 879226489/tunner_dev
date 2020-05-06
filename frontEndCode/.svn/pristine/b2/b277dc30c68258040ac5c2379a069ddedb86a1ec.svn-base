<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/utils/common";
import { bNumStatistics, bTimeStatistics, srvClassStatistics } from '@/api/compre'
export default {
  data() {
    return {
      dom: null,
      numberData: {},
      srvData: {},
      lineData: {}
    };
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    setData() {
      this.$nextTick(() => {
        let { emerg, daily, phone } = this.lineData;
        let emergData = Object.keys(emerg).map(k => emerg[k][`${Number(k)+1}`]);
        let dailyData = Object.keys(emerg).map(k => daily[k][`${Number(k)+1}`]);
        let phoneData = Object.keys(emerg).map(k => phone[k][`${Number(k)+1}`]);
        let option = {
          backgroundColor: "#000224",
          color: ["#ffd285", "#ff733f", "#ec4863"],
          title: [
            {
              text: "分类播发时长统计",
              left: "50%",
              top: "1%",
              textAlign: "center",
              textStyle: {
                color: "#fff"
              }
            },
            {
              text: "终端分类统计",
              left: "23%",
              top: "60%",
              textAlign: "center",
              textStyle: {
                color: "#fff"
              }
            },
            {
              text: "分类播发次数统计",
              left: "68%",
              top: "60%",
              textAlign: "center",
              textStyle: {
                color: "#fff"
              }
            }
          ],
          tooltip: {
            trigger: "axis"
          },
          legend: [
            {
              left: "65%",
              top: "3%",
              textStyle: {
                color: "#ffd285"
              },
              data: ["应急", "日常", "电话"]
            },
            {
              left: "40%",
              top: "70%",
              textStyle: {
                color: "#ffd285"
              },
              orient: 'vertical',
              data: ["收扩机", "控制器", "音柱", "在线", "离线"]
            },
            {
              right: "0%",
              top: "70%",
              textStyle: {
                color: "#ffd285"
              },
              orient: 'vertical',
              data: ["应急广播次数", "日常广播次数", "电话广播次数", "应急广播时长", "日常广播时长", "电话广播时长"]
            }
          ],
          grid: {
            left: "10%",
            right: "10%",
            top: "10%",
            bottom: "50%",
            containLabel: true
          },
          toolbox: {
            show: false,
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#FF4500"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            },
            boundaryGap: false,
            data: [
              "一月",
              "二月",
              "三月",
              "四月",
              "五月",
              "六月",
              "七月",
              "八月",
              "九月",
              "十月",
              "十一月",
              "十二月"
            ]
          },
          yAxis: {
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#fff"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            },
            type: "value"
          },
          series: [
            {
              name: "应急",
              smooth: true,
              type: "line",
              symbolSize: 8,
              symbol: "circle",
              data: emergData
            },
            {
              name: "日常",
              smooth: true,
              type: "line",
              symbolSize: 8,
              symbol: "circle",
              data: dailyData
            },
            {
              name: "电话",
              smooth: true,
              type: "line",
              symbolSize: 8,
              symbol: "circle",
              data: phoneData
            },
            {
              type: "pie",
              center: ["23%", "82%"],
              radius: ["25%", "30%"],
              data: [
                {
                  value: this.srvData.onRate,
                  name: "在线",
                  itemStyle: {
                    normal: {
                      color: "#ff733f"
                    }
                  },
                  label: {
                    normal: {
                      formatter: "{d} %",
                      textStyle: {
                        color: "#ff733f",
                        fontSize: 12
                      }
                    }
                  }
                },
                {
                  value: this.srvData.offRate,
                  name: "离线",
                  tooltip: {
                    show: false
                  },
                  itemStyle: {
                    normal: {
                      color: "#87CEFA"
                    }
                  },
                  label: {
                    normal: {
                      formatter: "{d} %",
                      textStyle: {
                        color: "#87CEFA",
                        fontSize: 12
                      }
                    }
                  }
                }
              ]
            },
            // {
            //   type: "pie",
            //   center: ["23%", "82%"],
            //   radius: "20%",
            //   label: {
            //     position: 'inner'
            //   },
            //   data: [
            //     {
            //       value: 435,
            //       name: "音柱",
            //       itemStyle: {
            //         normal: {
            //           color: "#4D8AB3"
            //         }
            //       },
            //       label: {
            //         normal: {
            //           formatter: "{d} %",
            //           textStyle: {
            //             color: "#ccc",
            //             fontSize: 12
            //           }
            //         }
            //       }
            //     },
            //     {
            //       value: 170,
            //       name: "在线",
            //       tooltip: {
            //         show: false
            //       },
            //       itemStyle: {
            //         normal: {
            //           color: "#7DC969"
            //         }
            //       },
            //       label: {
            //         normal: {
            //           formatter: "{d} %",
            //           textStyle: {
            //             color: "#ccc",
            //             fontSize: 12
            //           }
            //         }
            //       }
            //     },
            //     {
            //       value: 130,
            //       name: "离线",
            //       tooltip: {
            //         show: false
            //       },
            //       itemStyle: {
            //         normal: {
            //           color: "yellow"
            //         }
            //       },
            //       label: {
            //         normal: {
            //           formatter: "{d} %",
            //           textStyle: {
            //             color: "#ccc",
            //             fontSize: 12
            //           }
            //         }
            //       }
            //     }
            //   ]
            // },
            {
              type: "pie",
              center: ["68%", "82%"],
              radius: ["25%", "30%"],
              data: [
                {
                  value: this.numberData.emergRate,
                  name: "应急广播次数",
                  itemStyle: {
                    normal: {
                      color: "#ffd285"
                    }
                  },
                  label: {
                    normal: {
                      formatter: "{d} %",
                      textStyle: {
                        color: "#ffd285",
                        fontSize: 12
                      }
                    }
                  }
                },
                {
                  value: this.numberData.dailyRate,
                  name: "日常广播次数",
                  tooltip: {
                    show: false
                  },
                  itemStyle: {
                    normal: {
                      color: "#87CEFA"
                    }
                  },
                  label: {
                    normal: {
                      formatter: "{d} %",
                      textStyle: {
                        color: "#ffd285",
                        fontSize: 12
                      }
                    }
                  }
                },
                {
                  value: this.numberData.phoneRate,
                  name: "电话广播次数",
                  tooltip: {
                    show: false
                  },
                  itemStyle: {
                    normal: {
                      color: "#D39E4E"
                    }
                  },
                  label: {
                    normal: {
                      formatter: "{d} %",
                      textStyle: {
                        color: "#ffd285",
                        fontSize: 12
                      }
                    }
                  }
                }
              ]
            },
            {
              type: "pie",
              center: ["68%", "82%"],
              radius: "20%",
              label: {
                position: 'inner',
              },
              data: [
                {
                  value: this.numberData.emergTRate,
                  name: "应急广播时长",
                  itemStyle: {
                    normal: {
                      color: "#C45D72"
                    }
                  },
                  label: {
                    normal: {
                      formatter: "{d} %",
                      textStyle: {
                        color: "#ffd285",
                        fontSize: 12
                      }
                    }
                  }
                },
                {
                  value: this.numberData.dailyTRate,
                  name: "日常广播时长",
                  tooltip: {
                    show: false
                  },
                  itemStyle: {
                    normal: {
                      color: "#BD9A65"
                    }
                  },
                  label: {
                    normal: {
                      formatter: "{d} %",
                      textStyle: {
                        color: "#ffd285",
                        fontSize: 12
                      }
                    }
                  }
                },
                {
                  value: this.numberData.phoneTRate,
                  name: "电话广播时长",
                  tooltip: {
                    show: false
                  },
                  itemStyle: {
                    normal: {
                      color: "#667B99"
                    }
                  },
                  label: {
                    normal: {
                      formatter: "{d} %",
                      textStyle: {
                        color: "#ffd285",
                        fontSize: 12
                      }
                    }
                  }
                }
              ]
            }
          ]
        };

        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option);
      });
    },
    getData(areaId) {
      Promise.all([bNumStatistics({areaId}), bTimeStatistics({areaId}), srvClassStatistics({areaId})]).then(res => {
        this.numberData = res[0].data.data;
        this.srvData = res[2].data.data;
        this.lineData = res[1].data.data;
        this.setData();
      })
    }
  },
  mounted() {
    this.getData("EF76CA3C70934DF08713661F4DC9673D");
    //this.setData();
    on(window, "resize", this.resize);
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
    window.clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style>
</style>