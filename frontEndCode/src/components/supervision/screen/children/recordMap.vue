<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/utils/common";
import { spaceJson } from "./420000";
export default {
  props: {
    chartData: Object
  },
  data() {
    return {
      dom: null,
      citysName: [],
      timer: null,
      index: 0
    };
  },
  computed: {
    setList() {
      return this.$store.state.wheelSetting.setList;
    }
  },
  watch: {
    setList: {
      handler() {
        window.clearInterval(this.timer);
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
        var allData = {
          citys: [
            {
              name: "武汉市",
              value: [114.298572, 30.584355],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: "#F2F2F2",
                }
              }
            },
            {
              name: "黄石市",
              value: [115.077048, 30.220074],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: "#F2F2F2"
                }
              }
            },
            {
              name: "十堰市",
              value: [110.787916, 32.646907],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: "#F2F2F2"
                }
              }
            },
            {
              name: "宜昌市",
              value: [111.290843, 30.702636],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: "#F2F2F2"
                }
              }
            },
            {
              name: "襄阳市",
              value: [112.144146, 32.042426],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: "#F2F2F2"
                }
              }
            },
            {
              name: "鄂州市",
              value: [114.890593, 30.396536],
              symbolSize: 5,
              itemStyle: {
                normal: {
                  color: "#F2F2F2"
                }
              }
            },
            {
              name: "荆门市",
              value: [112.204251, 31.03542],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: "#F2F2F2"
                }
              }
            },
            {
              name: "孝感市",
              value: [113.926655, 30.926423],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: "#F2F2F2"
                }
              }
            },
            {
              name: "荆州市",
              value: [112.23813, 30.326857],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: "#F2F2F2"
                }
              }
            },
            {
              name: "黄冈市",
              value: [114.879365, 30.447711],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: "#F2F2F2"
                }
              }
            },
            {
              name: "咸宁市",
              value: [114.328963, 29.832798],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: "#F2F2F2"
                }
              }
            },
            {
              name: "随州市",
              value: [113.37377, 31.717497],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: "#F2F2F2"
                }
              }
            },
            {
              name: "仙桃市",
              value: [113.453974, 30.364953],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: "#F2F2F2"
                }
              }
            },
            {
              name: "潜江市",
              value: [112.896866, 30.421215],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: "#F2F2F2"
                }
              }
            },
            {
              name: "天门市",
              value: [113.165862, 30.653061],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: "#F2F2F2"
                }
              }
            },
            {
              name: "恩施土家族苗族自治州",
              value: [109.48699, 30.283114],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: "#F2F2F2"
                }
              }
            },
            {
              name: "神农架林区",
              value: [110.671525, 31.744449],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: "#F2F2F2"
                }
              }
            }
          ]
        };
        this.citysName = allData.citys.map(item => item.name);
        let option = {
          backgroundColor: "rgba(128, 128, 128, 0.1)", //rgba设置透明度0.1
          title: {
            text: "",
            left: "center",
            textStyle: {
              color: "#fff"
            }
          },
          legend: {
            show: false,
            orient: "vertical",
            top: "auto",
            left: "right",
            data: ["地点", "线路"],
            textStyle: {
              color: "#fff"
            }
          },
          geo: {
            map: "湖北",
            label: {
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            roam: false,
            itemStyle: {
              normal: {
                areaColor: "#0D74DD",
                borderColor: "#F2F2F2"
              },
              emphasis: {
                areaColor: "#2a333d"
              }
            }
          },
          series: [
            {
              name: "地点",
              type: "effectScatter",
              coordinateSystem: "geo",
              zlevel: 1,
              label: {
                normal: {
                  show: true,
                  position: "right",
                  formatter: "{b}",
                  textStyle: {
                    fontSize: 12
                  }
                },
                emphasis: {
                  show: true,
                  position: "right",
                  formatter: "{b}"
                }
              },
              symbolSize: 2,
              showEffectOn: "render",
              itemStyle: {
                normal: {
                  color: "#46bee9"
                }
              },
              data: allData.citys
            }
          ]
        };

        echarts.registerMap("湖北", this.chartData);
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option);

        this.dom.on("click", (params) => {
          this.index = this.citysName.findIndex(i => i == params.name);
          this.setHighLight();
        });
        this.dom.on("mouseover", ev => {
          //console.log(ev.name);
          console.log(ev)
        });
        if (this.setList.openIsWheel == 1) {
          this.setHighLight(this.index);
          this.timer = setInterval(() => {
            this.index = this.index + 1;
            if (this.index >= this.citysName.length) {
              this.index = 0;
            }
            this.setHighLight();
          }, this.setList.openWheelSpeed * 1000);
        } else {
          this.citysName.forEach(item => {
            this.dom.dispatchAction({
              type: "geoUnSelect",
              name: item
            });
          });
        }
      });
    },
    next() {
      this.index = this.index + 1;
      if (this.index >= this.citysName.length) {
        this.index = 0;
      }
      this.setHighLight();
    },
    prev() {
      this.index = this.index - 1;
      if (this.index < 0) {
        this.index = this.citysName.length - 1;
      }
      this.setHighLight();
    },
    setHighLight() {
      this.$emit("change",this.citysName[this.index])
      this.citysName.forEach(item => {
        this.dom.dispatchAction({
          type: "geoUnSelect",
          name: item
        });
      });
      this.dom.dispatchAction({
        type: "geoSelect",
        name: this.citysName[this.index]
      });
    }
  },
  mounted() {
    this.setData();
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