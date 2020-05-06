<template>
  <div id="content">
    <Row v-show="showSelect">
      <i-col>
        <Select v-model="orgCode" style="width: 200px" filterable @on-change="getData()">
          <Option
            v-for="item in countyList"
            :value="item.orgCodea"
            :key="item.orgCodea"
          >{{item.name}}</Option>
        </Select>
      </i-col>
    </Row>
    <div class="bg">
      <canvas :width="width" :height="height" id="canvas" :style="{background: $attrs.background}"></canvas>
    </div>
  </div>
</template>

<script>
import { topologyShow } from "@/api/topo";
import { getCountyLevelArea } from "@/api/area";
export default {
  props: {
    width: {
      type: String,
      default() {
        return '1200px'
      }
    },
    height: {
      type: String,
      default() {
        return "580px"
      }
    },
    showSelect: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      countyList: [],
      canvas: null,
      stage: null,
      scene: null,
      src: require("./1.jpg"),
      orgCode: "",
      lineData: null
    };
  },
  methods: {
    getData() {
      topologyShow({ orgCode: this.orgCode }).then(res => {
        this.lineData = res.data.data;
        console.log(this.lineData);
        this.draw();
      });
    },
    draw() {
      var canvas = document.getElementById("canvas");
      var stage = new JTopo.Stage(canvas); // 创建一个舞台对象
      var scene = new JTopo.Scene(stage); // 创建一个场景对象
      let red = "255, 0, 0";
      let green = "0, 255, 0";

      function node(x, y, img, name) {
        var node = new JTopo.Node(name);
        node.setImage(img, true);
        node.setLocation(x, y);
        scene.add(node);
        return node;
      }

      function linkNode(nodeA, nodeZ, color) {
        var link = new JTopo.FoldLink(nodeA, nodeZ);
        link.lineWidth = 3;
        link.strokeColor = color;
        scene.add(link);
        return link;
      }

      var container = new JTopo.Container();
      container.textPosition = "Middle_Center";
      container.fontColor = "100,255,0";
      container.font = "18pt 微软雅黑";
      container.borderColor = "255,0,0";
      container.borderRadius = 30; // 圆角
      scene.add(container);

      let s1 = node(49, 41, require("@/assets/img/1.png"), "省级应急广播平台");
      let s2 = node(
        400,
        41,
        require("@/assets/img/5.png"),
        "村村响省级监管平台"
      );
      let s3 = node(
        800,
        41,
        require("@/assets/img/1.png"),
        "村村响省级广节目融合共享平台"
      );
      let s4 = node(400, 260, require("@/assets/img/4.png"), "县级村村响系统");
      let s5 = node(650, 260, require("@/assets/img/2.png"), "调频调制器");
      let s6 = node(
        900,
        260,
        require("@/assets/img/3.png"),
        "村村响监测适配器"
      );
      let s7 = node(650, 430, require("@/assets/img/2.png"), "编码控制器");

      container.add(s5);
      container.add(s7);

      linkNode(s1, s2, this.lineData.syj ? green : red);
      linkNode(s2, s3, this.lineData.ccxSRh ? green : red);
      linkNode(s3, s4, this.lineData.ccxSys ? green : red);
      linkNode(s4, s5, this.lineData.ccxModem ? green : red);
      linkNode(s5, s6, this.lineData.adapterModem ? green : red);
      linkNode(s2, s6, this.lineData.adapter ? green : red);
    },
    getCountry() {
      getCountyLevelArea().then(res => {
        this.countyList = res.data.data;
        this.orgCode = this.countyList[0].orgCodea;
        this.getData();
      });
    }
  },
  mounted() {
    this.getCountry();
    //this.draw();
  }
};
</script>

<style scoped lang="scss">
.content {
  width: 1200px;
  height: 580px;
  .bg {
    margin-top: 15px;
    text-align: center;
    width: 100%;
    height: 100%;
    #canvas {
      background: #ccc;
    }
  }
}
</style>