import { getResourceBase, getSrvType } from '@/api/device'

export default {
    state: {
        resourceId: [],
        resourceType: [],
        resourceChildType: [],
        srvTypeList: [],
    },
    mutations: {
        setResourceId(state, args) {
            state.resourceId = args;
        },
        setResourceType(state, args) {
            state.resourceType = args;
        },
        setResourceChildType(state, args) {
            state.resourceChildType = args;
        },
        setSrvType(state, args) {
            state.srvTypeList = args;
        }
    },
    actions: {
        setResourceId({state, commit}) {
            if(state.resourceId.length == 0) {
                getResourceBase({type: 0}).then(res =>{
                    commit("setResourceId", res.data.data)
                })
            }
        },
        setResourceType({state, commit}) {
            if(state.resourceType.length == 0) {
                getResourceBase({type: 1}).then(res =>{
                    commit("setResourceType", res.data.data)
                })
            }
        },
        setResourceChildType({state, commit}) {
            if(state.resourceChildType.length == 0) {
                getResourceBase({type: 2}).then(res =>{
                    console.log(res.data.data);
                    commit("setResourceChildType", res.data.data)
                })
            }
        },
        setSrvType({state, commit}) {
            getSrvType().then(res =>{
                commit("setSrvType", res.data.data)
            })
        }
    }
}