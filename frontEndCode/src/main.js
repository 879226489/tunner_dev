// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import ViewUI from 'view-design'
import axios from 'axios'
import store from './vuex/store.js'
import Echarts from 'echarts'
Vue.prototype.$axios = axios
// axios.defaults.baseURL = 'https://192.168.4.91:8086/';
axios.defaults.baseURL = 'http://192.168.4.102:8099/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.echarts = Echarts
Vue.use(Echarts)
// import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: 'VTwGTResiuBZPmyQGZz6tAH747gbH8C2'
// })
import 'view-design/dist/styles/iview.css'
import './assets/css/reset.css'
Vue.config.productionTip = false
Vue.use(ViewUI);
Vue.prototype._ = 'admin'
Date.prototype.format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
