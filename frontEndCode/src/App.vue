<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
html body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.ivu-table {
  th {
    background: #6283ae !important;
    color: #fff;
    font-size: 16px;
    text-align: center;
  }
  td {
    text-align: center;
  }
}
.ivu-table-header thead tr th {
  height: 50px;
}
</style>
