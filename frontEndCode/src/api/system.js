import axios from '@/utils/api.request.js'


//查询平台信息
export const getPlatformInfo = (params) => {
    return axios.request({
        url: `/platform/getPlatformInfo`,
        method: 'get',
        params
    })
}

//保存平台信息
export const savePlatformInfo = (data) => {
    return axios.request({
        url: `/platform/savePlatformInfo`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        upload: true
    })
}

//部门信息查询
export const queryDepartList = (params) => {
    return axios.request({
        url: `/department/queryDepartList`,
        method: 'get',
        params
    })
}