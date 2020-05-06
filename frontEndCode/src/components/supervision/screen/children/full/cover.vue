<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/utils/common";
import { spaceJson } from "../420000.js";
export default {
  name: "cover",
  data() {
    return {
      dom: null,
      coverData: []
    };
  },
  computed: {
    singleCover() {
      return this.$store.state.wheelSetting.singleCover;
    },
    coverSetting() {
      return this.$store.state.wheelSetting.coverSetting;
    }
  },
  watch: {
    singleCover(cur) {
      this.coverData = cur;
      this.setData();
    },
    coverSetting(cur) {
      console.log(cur);
      this.setData();
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
                  color: "#F2F2F2"
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
        var testData = [
          {
            name: "武汉市",
            value: 5
          },
          {
            name: "襄阳市",
            value: 4
          },
          {
            name: "荆门市",
            value: 3
          },
          {
            name: "随州市",
            value: 3
          },
          {
            name: '宜昌市',
            value: 2
          },
          {
            name: '咸宁市',
            value: 1
          },
          {
            name: '孝感市',
            value: 2
          }
        ];
        let data = this.coverData.map(item => {
          let value = 1;
          if(item.pRate == 0) {
            value = 1;
          }else if(item.pRate > coverSetting.lowStartValue && item.pRate <= coverSetting.lowEndValue) {
            value = 2;
          }else if(item.pRate > coverSetting.inStartValue && item.pRate <= coverSetting.inStartValue) {
            value = 3;
          }else if(item.pRate > coverSetting.highStartValue && item.pRate <= coverSetting.highStartValue) {
            value = 4;
          }else if(item.pRate > coverSetting.highStartValue) {
            value = 5;
          }
          return {
            name: item.name,
            value
          }
        })
        let option = {
          title: {
            text: "",
            left: "center",
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
          visualMap: {
            min: 0,
            max: 11,
            left: "3%",
            bottom: "10%",
            showLabel: !0,
            calculable: false,
            show: false,
            itemWidth: "20",
            itemHeight: "16",
            outOfRange: {
              color: 'skyblue'
            },
            pieces: [
              {
                value: 5,
                label: `已覆盖(>${this.coverSetting.highEndValue})`,
                color: "rgba(231,210,99,1)"
              },
              {
                value: 4,
                label: `覆盖率高(${this.coverSetting.highStartValue}~${this.coverSetting.highEndValue})`,
                color: "rgba(50,60,236,1)"
              },
              {
                value: 3,
                label: `覆盖率中(${this.coverSetting.inStartValue}~${this.coverSetting.inEndValue})`,
                color: "rgba(2,150,151,1)"
              },
              {
                value: 2,
                label: `覆盖率低(${this.coverSetting.lowStartValue}~${this.coverSetting.lowEndValue})`,
                color: "green"
              },
              {
                value: 1,
                label: `未覆盖(0)`,
                color: "rgba(200,200,151,1)"
              }
            ],
            show: !0,
            textStyle: {
              color: "rgba(150,173,255,1)",
              fontSize: "20"
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
                    fontSize: 17
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
            },
            {
              name: "湖北",
              type: "map",
              geoIndex: 0,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              data: data,
              tooltip: {
                trigger: "item",
                triggerOn: "mousemove",
                backgroundColor: "rgba(0,0,0,.8)",
                borderColor: "#3574c8",
                borderWidth: "2",
                extraCssText:
                  "padding:10px;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
                show: false,
                formatter: function(params) {
                  var res;
                  if (params.value > 0) {
                    res = params.data.value2 + "<br/>";
                    res += params.data.value3;
                  } else {
                    res = "";
                  }
                  return res;
                }
              }
            }
          ]
        };

        echarts.registerMap("湖北", spaceJson);
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option);
      });
    }
  },
  mounted() {
    on(window, "resize", this.resize);
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>

<style>
</style>