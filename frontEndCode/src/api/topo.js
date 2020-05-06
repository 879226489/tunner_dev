import axios from '@/utils/api.request.js'

//拓扑图展示
export const topologyShow = (params) => {
    return axios.request({
        url: `/sysTopology/topologyShow`,
        method: 'get',
        params
    })
}