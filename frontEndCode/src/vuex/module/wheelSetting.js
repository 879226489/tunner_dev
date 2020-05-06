import { findScreenSetting, saveScreenSetting, singleEventCoverage } from "@/api/compre";
export default {
    state: {
        setList: {
            id: '',
            allIsWheel: 0,
            allWheelSpeed: 5,
            openIsWheel: 0,
            openWheelSpeed: 5,
            type: ''
        },
        singleCover: [],
        coverSetting: {},
        selectData: {}
    },
    mutations: {
        getSetting(state, args) {
            state.setList = args;
        },
        setCover(state, args) {
            state.singleCover = args
        },
        setCoverSetting(state, args) {
            state.coverSetting = args;
        },
        setSelectData(state, arg) {
            state.selectData = arg;
        }
    },
    actions: {
        getSetting({commit}, args) {
            findScreenSetting().then(res => {
                let data = res.data.data;
                data.allIsWheel = data.allIsWheel ? 1 : 0;
                data.openIsWheel = data.openIsWheel ? 1 : 0;
                commit("getSetting", res.data.data);
            })
        },
        saveSetting({dispatch}, args) {
            saveScreenSetting(args).then(res => {
               dispatch('getSetting')
            })
        },
        setCover({commit}, args) {
            singleEventCoverage(args).then(res => {
                commit("setCover", res.data.data);
            })
        },
        setSelectData({commit}, args) {
            commit("setSelectData", args);
        },
        setCoverSetting({commit}, args) {
            commit("setCoverSetting", args);
        }
    }
}