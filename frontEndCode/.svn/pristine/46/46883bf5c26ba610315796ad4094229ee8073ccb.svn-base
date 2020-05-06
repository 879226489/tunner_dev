<template>
  <div class="event-list">
    <ul class="content">
      <li
        v-for="(item,index) in tableData"
        :key="index"
        :class="{'font': item.status !='电力正常' ? true : false}"
      >
        <Row class="status">
          <i-col span="6" style="text-align: left;">{{item.name}}</i-col>
          <i-col span="10">{{item.time}}</i-col>
          <i-col span="6">{{item.status}}</i-col>
        </Row>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.event-list {
  width: 100%;
  height: calc(100% - 50px);
  .content {
    overflow: auto;
    width: 100%;
    height: 100%;
    .font {
        color: #F62157;
    }
    li {
      width: 100%;
      line-height: 50px;
      padding-left: 20px;
      color: #fff;
      .status {
        text-align: right;
      }
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
}
</style>