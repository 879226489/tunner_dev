<template>
  <div style="width: 100%; height: 100%">
    <div id="container"></div>
    <div id="r-result" style="position:absolute;left:10px;bottom:10px;z-index:999;">
      <RadioGroup v-model="type" type="button" @on-change="draw()">
        <Radio :label="0">终端分布</Radio>
        <Radio :label="1">终端在线</Radio>
      </RadioGroup>
    </div>
  </div>
</template>

<script>
export default {
  name: "heatMap",
  props: {
    value: Object
  },
  data() {
    return {
      heatmapOverlay: "",
      type: 0
    };
  },
  watch: {
    value: {
      handler(oldValue, newValue) {
        this.draw();
      },
      deep: true
    }
  },
  methods: {
    draw() {
      var map = new BMap.Map("container"); // 创建地图实例

      var point = new BMap.Point(
        this.value.centreLng || 116.404,
        this.value.centreLat || 39.915
      );
      map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
      // var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
      // map.addControl(top_left_navigation);
      map.enableScrollWheelZoom(); // 允许滚轮缩放
      var points = [];

      if (this.type == 0) {
        points = this.value.srvDis.map(item => {
          return {
            lng: item.lng,
            lat: item.lat,
            count: item.onLine
          };
        });
      } else if (this.type == 1) {
        points = this.value.srvOnLine.map(item => {
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
    }
  },
  mounted() {
    this.draw();
  },
  beforeDestroy() {
    this.heatmapOverlay = null;
  }
};
</script>