<template>
  <div>
    <ul v-if="recordList.length != 0">
      <li v-for="(item,index) in recordList" :key="index" class="ali">
        <Row>
          <i-col span="20">{{item.startTime}}——{{item.endTime}}</i-col>
          <i-col span="4" class="btn">
            <Icon type="md-volume-off" :size="30" style="cursor: pointer" />
          </i-col>
        </Row>
      </li>
    </ul>
    <div v-else class="no-data">
        暂无数据...
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recordList: Array
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.ali {
  padding: 20px;
  font-size: 25px;
  .btn {
    text-align: center;
  }
}
.no-data {
    font-size: 30px;
    text-align: center;
}
</style>