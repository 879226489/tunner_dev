<template>
  <div class="container-box" :style="{height: $attrs.height}">
    <div id="container1"></div>
    <div id="r-result" style="position:absolute;left:10px;bottom:10px;z-index:999;">
      <RadioGroup v-model="type" type="button" @on-change="draw()">
        <Radio :label="0">终端分布</Radio>
        <Radio :label="1">终端在线</Radio>
      </RadioGroup>
    </div>
  </div>
</template>

<script>
import { sPHeatMap } from "@/api/compre";
export default {
  name: "termHeatMap",
  data() {
    return {
      heatmapOverlay: "",
      type: 0,
      searchForm: {
        level: "省级"
      },
      mapLevel: 15,
      chartData: {}
    };
  },
  watch: {
    'searchForm.level': {
      handler() {
        this.getData();
      }
    }
  },
  methods: {
    draw() {
      var map = new BMap.Map("container1"); // 创建地图实例

      let { centreLat, centreLng, srvDis, srvOnLine } = this.chartData;

      var point = new BMap.Point(centreLng || 116.404, centreLat || 39.915);
      map.centerAndZoom(point, this.mapLevel); // 初始化地图，设置中心点坐标和地图级别

      map.enableScrollWheelZoom(); // 允许滚轮缩放

      map.addEventListener("zoomend", (e)=>{
        this.mapLevel = map.getZoom();
        if(map.getZoom() > 15) {
          this.searchForm.level = "县级"
        }else if(map.getZoom() > 10) {
          this.searchForm.level = "市级"
        }else if(map.getZoom() > 7) {
          this.searchForm.level = "省级级"
        }
      })

      let points;
      if (this.type == 0) {
        points = srvDis.map(item => {
          return {
            lng: item.lng,
            lat: item.lat,
            count: item.onLine
          };
        });
      } else if (this.type == 1) {
        points = srvOnLine.map(item => {
          return {
            lng: item.lng,
            lat: item.lat,
            count: item.onLine
          };
        });
      }
      if (!isSupportCanvas()) {
        alert(
          "热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~"
        );
      }
      this.heatmapOverlay = new BMapLib.HeatmapOverlay({ radius: 50 });
      map.addOverlay(this.heatmapOverlay);
      this.heatmapOverlay.setDataSet({ data: points, max: 100 });
      //this.closeHeatmap();
      function setGradient() {
        /*格式如下所示:
        {
            0:'rgb(102, 255, 0)',
          .5:'rgb(255, 170, 0)',
            1:'rgb(255, 0, 0)'
        }*/
        var gradient = {};
        var colors = document.querySelectorAll("input[type='color']");
        colors = [].slice.call(colors, 0);
        colors.forEach(function(ele) {
          gradient[ele.getAttribute("data-key")] = ele.value;
        });
        this.heatmapOverlay.setOptions({ gradient: gradient });
      }
      //判断浏览区是否支持canvas
      function isSupportCanvas() {
        var elem = document.createElement("canvas");
        return !!(elem.getContext && elem.getContext("2d"));
      }
    },
    getData() {
      sPHeatMap(this.searchForm).then(res => {
        this.chartData = res.data;
        this.draw();
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style>
.container-box {
  width: 100%;
  min-height: 300px;
  height: 500px;
  margin: 15px auto;
  position: relative;
}
#container1 {
  width: 100%;
  height: 100%;
  margin: 15px auto;
}
</style>