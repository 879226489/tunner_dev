<template>
  <div class="map">
    <div class="legend">
      <div class="title">
        电力恢复
        <div class="blue"></div>
      </div>
      <br />
      <div class="title">
        断电
        <div class="red"></div>
      </div>
    </div>
    <div ref="dom" style="widht: 100%; height: 100%;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/utils/common";
import { spaceJson } from "../420000";
import { setGeoJSON } from "@/utils/common";
export default {
  props: {
    tableData: {
      type: Array
    }
  },
  data() {
    return {
      dom: null,
      list: []
    };
  },
  watch: {
    tableData(cur) {
      this.setData();
    }
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    setData() {
      this.$nextTick(() => {
        let mapData = setGeoJSON(this.tableData);

        // var geoCoordMap = {
        //   武汉市: [114.298572, 30.584355],
        //   黄石市: [115.077048, 30.220074],
        //   十堰市: [110.787916, 32.646907],
        //   宜昌市: [111.290843, 30.702636],
        //   襄阳市: [112.144146, 32.042426],
        //   鄂州市: [114.890593, 30.396536],
        //   荆门市: [112.204251, 31.03542],
        //   孝感市: [113.926655, 30.926423],
        //   荆州市: [112.23813, 30.326857],
        //   黄冈市: [114.879365, 30.447711],
        //   咸宁市: [114.328963, 29.832798],
        //   随州市: [113.37377, 31.717497],
        //   仙桃市: [113.453974, 30.364953],
        //   潜江市: [112.896866, 30.421215],
        //   天门市: [113.165862, 30.653061],
        //   恩施土家族苗族自治州: [109.48699, 30.283114],
        //   神农架林区: [110.671525, 31.744449]
        // };

        // var data = [
        //   {
        //     name: "武汉市"
        //   },
        //   {
        //     name: "黄石市"
        //   },
        //   {
        //     name: "十堰市"
        //   },
        //   {
        //     name: "宜昌市"
        //   },
        //   {
        //     name: "襄阳市"
        //   },
        //   {
        //     name: "鄂州市"
        //   },
        //   {
        //     name: "荆门市"
        //   },
        //   {
        //     name: "孝感市"
        //   },
        //   {
        //     name: "荆州市"
        //   },
        //   {
        //     name: "黄冈市"
        //   },
        //   {
        //     name: "咸宁市"
        //   },
        //   {
        //     name: "随州市"
        //   },
        //   {
        //     name: "仙桃市"
        //   },
        //   {
        //     name: "潜江市"
        //   },
        //   {
        //     name: "天门市"
        //   },
        //   {
        //     name: "恩施土家族苗族自治州"
        //   },
        //   {
        //     name: "神农架林区"
        //   }
        // ];

        let geoCoordMap = {};
        this.tableData.forEach(item => {
          geoCoordMap[item.name] = [item.longitude, item.latitude];
        });

        let data = this.tableData.map(item => {
          return {
            name: item.name
          };
        });

        let data3 = this.tableData
          .filter(item => item.status != "电力正常")
          .map(item => {
            return {
              name: item.name
            };
          });

        var convertData = function(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          // 有数据的地区的名称和value值
          return res;
        };
        var series = [];
        [["湖北", data]].forEach(function(item, i) {
          series.push(
            {
              name: "定位点",
              type: "effectScatter", // 散点图
              coordinateSystem: "geo", // 使用地理坐标系
              hoverAnimation: "false",
              legendHoverLink: "false",
              rippleEffect: {
                period: 4,
                brushType: "stroke",
                scale: 3
              },
              data: convertData(item[1]),
              symbolSize: 10,
              itemStyle: {
                normal: {
                  color: "#5599E4"
                }
              },
              zlevel: 1
            },
            {
              type: "map",
              map: "湖北",
              zlevel: 0,
              itemStyle: {
                normal: {
                  areaColor: "#323c48",
                  borderColor: "#111"
                },
                emphasis: {
                  areaColor: "#2a333d"
                }
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: "#ddb926",
                    fontSize: 10
                  }
                },
                emphasis: {
                  textStyle: {
                    color: "#ddb926",
                    fontSize: 10
                  }
                }
              }
              //data: data
            },
            {
              name: "点",
              type: "effectScatter",
              coordinateSystem: "geo",
              symbolSize: 15,
              label: {
                normal: {
                  show: false,
                  textStyle: {
                    color: "#fff",
                    fontSize: 9
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: "#F62157" //标志颜色
                }
              },
              zlevel: 6,
              data: convertData(data3)
            }
          );
        });

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
          series: series
        };
        echarts.registerMap("湖北", mapData);
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

<style lang="scss" scoped>
.map {
  position: relative;
  .legend {
    position: absolute;
    top: 10px;
    left: 20px;
    .title {
      display: inline-block;
      margin-top: 10px;
      .blue {
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #5599e4;
      }
      .red {
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #f62157;
      }
    }
  }
}
</style>