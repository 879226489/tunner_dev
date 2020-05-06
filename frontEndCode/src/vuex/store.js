import Vue from 'vue'
import Vuex from 'vuex'
import device from './module/device'
import area from './module/area'
import wheelSetting from './module/wheelSetting'

Vue.use(Vuex)

const state = {
    information: JSON.parse(localStorage.getItem('information')) || '',
}
const actions = {}
const mutations = {
    handleUserName: (state, information) => {
        state.information = information
        // 把登录的用户的名保存到localStorage中，防止页面刷新导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
        localStorage.setItem('information',JSON.stringify(information))
    }
}

const getters = {
    information: (state) => state.information
}

const store = new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
    modules: {
        device,
        area,
        wheelSetting
    }
})
export default  store;