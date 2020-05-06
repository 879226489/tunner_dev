import axios from '@/utils/api.request.js'

//信息接入查询
export const queryInforAccessList = (params) =>{
    return axios.request({
        url: `/inforAccess/queryInforAccessList`,
        method: 'get',
        params
    })
}

//保存信息接入
export const saveInforAccess = (data) => {
    return axios.request({
        url: `/inforAccess/saveInforAccess`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        upload: true
    })
}

//通过id获取信息接入
export const getInforAccessById = (id) => {
    return axios.request({
        url: `/inforAccess/getInforAccessById/${id}`,
        method: 'get',
    })
}

//通过id删除信息接入
export const delInforAccessById = (id) => {
    return axios.request({
        url: `/inforAccess/delInforAccessById/${id}`,
        method: 'delete'
    })
}