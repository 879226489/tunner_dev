<template>
  <div style="position: relative;">
    <div style="position: absolute; top: 20px; right: 50px; z-index: 999;">
      <!-- <Button @click="showSmall">武汉</Button> -->
      <RadioGroup v-model="searchForm.flag" type="button" @on-change="getData()">
        <Radio :label="1">终端</Radio>
        <Radio :label="0">平台</Radio>
      </RadioGroup>
    </div>
    <div class="modal">
      <h2>终端信息</h2>
      <p>
        终端总数
        <span>{{chartData.srvTotal}}</span>
      </p>
      <p>
        在线终端
        <span>{{chartData.onLine}}</span>
      </p>
      <p>
        离线终端
        <span>{{chartData.offLine}}</span>
      </p>
      <p>
        回传终端
        <span>123</span>
      </p>
      <p>
        回线率
        <span>123</span>
      </p>
    </div>
    <div ref="dom" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/utils/common";
import { zTMonitorEffect } from "@/api/compre";
import { getBoundarys } from "@/api/area";
import { spaceJson } from "./420000";
export default {
  name: "GISMap",
  data() {
    return {
      dom: null,
      searchForm: {
        flag: 1,
        level: 15
      },
      chartData: {},
      zoom: 1,       //控制缩放比例
      cityId: '',
    };
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
          ],

          moveLines: [
            {
              fromName: "武汉市",
              toName: "神农架林区",
              coords: [
                [114.298572, 30.584355],
                [110.671525, 31.744449]
              ]
            },
            {
              fromName: "武汉市",
              toName: "襄阳",
              coords: [
                [114.298572, 30.584355],
                [112.144146, 32.042426]
              ]
            },
            {
              fromName: "武汉市",
              toName: "咸宁市",
              coords: [
                [114.298572, 30.584355],
                [114.328963, 29.832798]
              ]
            }
          ]
        };
        let option = {
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
            roam: true,
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
              rippleEffect: {
                brushType: "stroke",
                period: 7,
                scale: 26
              },
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
              name: "线路",
              type: "lines",
              coordinateSystem: "geo",
              zlevel: 2,
              large: true,
              effect: {
                show: true,
                constantSpeed: 50,
                symbol: "pin", //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                symbolSize: 10,
                trailLength: 0
              },
              lineStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "RED"
                      },
                      {
                        offset: 1,
                        color: "RED"
                      }
                    ],
                    false
                  ),
                  width: 2,
                  opacity: 0.6,
                  curveness: 0.2
                }
              },
              data: allData.moveLines
            }
          ]
        };

        echarts.registerMap("湖北", spaceJson);
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option);

        this.dom.on("georoam", params => {
          if (params.zoom) {
            this.zoom = this.zoom * params.zoom;
            console.log(this.zoom);
          }
        });
        this.dom.on("mouseover", ev => {
          //console.log(ev.name);
          console.log(ev)
        });
      });
    },
    getData() {
      zTMonitorEffect(this.searchForm).then(res => {
        this.chartData = res.data.data;
        this.setData();
      });
    },
    showSmall() {
      getBoundarys({ids: "EF76CA3C70934DF08713661F4DC9673D"}).then(res => {
        console.log(res)
      })
    }
  },
  mounted() {
    this.getData();
    on(window, "resize", this.resize);
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>

<style lang="scss" scope>
.modal {
  width: 200px;
  height: 250px;
  border: 1px solid #ccc;
  position: absolute;
  top: 20px;
  left: 50px;
  padding: 15px;
  h2 {
    font-size: 25px;
    padding-left: 10px;
  }
  p {
    padding: 10px;
  }
}
</style>