<template>
  <div class="real-time">
    <div></div>
    <ul v-if="tableData.length != 0">
      <li class="item" v-for="(item, index) in tableData" :key="index">
        <Row>
          <i-col span="2">{{index + 1}}</i-col>
          <i-col span="2">{{item.areaName}}</i-col>
          <i-col span="4">
            <Icon type="md-volume-up" size="25" style="cursor: pointer" />
          </i-col>
          <i-col span="16">
            <VAudio />
          </i-col>
        </Row>
      </li>
    </ul>
    <div v-else class="no-data">暂无数据...</div>
  </div>
</template>

<script>
import VAudio from "@/components/commonComponent/vAudio";
export default {
  components: {
    VAudio
  },
  props: {
    tableData: Array
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.real-time {
  width: 100%;
  height: 880px;
  overflow-y: scroll;
  ul {
    padding: 80px 50px 80px 50px;
    .item {
      width: 100%;
      line-height: 100px;
      padding-left: 100px;
      box-sizing: border-box;
      &:nth-child(odd) {
        background-image: linear-gradient(
          to right,
          #000224 5%,
          #183145 35%,
          #183145 85%,
          #000224
        );
      }
    }
  }
  .no-data {
    padding: 80px 50px 80px 50px;
    font-size: 30px;
    text-align: center;
  }
}
::-webkit-scrollbar {
  width: 10px;
  height: 4px;
  background-color: #f5f5f5;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background: #fff;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(7, 170, 247, 0.7);
}
::-webkit-scrollbar-thumb:hover {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(7, 170, 247, 1);
}
</style>