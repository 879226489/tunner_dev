import axios from '@/utils/api.request.js'
import config from '../config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

//终端列表
export const deviceList = (params) => {
    return axios.request({
        url: `/device/queryDeviceList`,
        method: 'get',
        params
    })
}

// 终端导出
export const srvExport = (href) => {
    window.open(`${baseUrl}/device/srvExport?${href}`)
}

//终端导入
export const srvImport = (data) => {
    return axios.request({
        url: `/device/srvImport`,
        method: 'post',
        data,
        upload: true
    })
}

//删除终端设备信息
export const delSrvById = (params) => {
    return axios.request({
        url: `/device/delSrvById/${params}`,
        method: 'delete'
    })
}

//保存终端设备信息
export const saveSrv = (data) => {
    return axios.request({
        url: `/device/saveSrv`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        upload: true
    })
}

//通过id获取终端设备信息
export const getSrvById = (params) => {
    return axios.request({
        url: `/device/getSrvById/${params}`,
        method: 'get'
    })
}

//适配器导出
export const adapterExport = (href) => {
    window.open(`${baseUrl}/device/adapterExport?${href}`)
}

//适配器导入
export const adapterImport = (data) => {
    return axios.request({
        url: `/device/adapterImport`,
        method: 'post',
        data,
        upload: true
    })
}

//保存适配器信息
export const saveAdapter = (data) => {
    return axios.request({
        url: `/device/saveAdapter`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        upload: true
    })
}

//通过ID删除适配器信息
export const delAdapterById = (params) => {
    return axios.request({
        url: `/device/delAdapterById/${params}`,
        method: 'delete'
    })
}

//通过ID获取适配器信息
export const getAdapterById = (id) => {
    return axios.request({
        url: `/device/getAdapterById/${id}`,
        method: 'get'
    })
}

//村村响平台信息列表
export const queryPlatformSysList = (params) => {
    return axios.request({
        url: `/platform/queryPlatformSysList`,
        method: 'get',
        params
    })
}

//获取村村响平台信息 (搜索用)
export const getVillagePlatform = (params) => {
    return axios.request({
        url: `/platform/getVillagePlatform`,
        method: 'get',
        params
    })
}

//村村响系统导出
export const platformExport = (href) => {
    window.open(`${baseUrl}/platform/platformExport?${href}`)
}

//保存平台系统信息
export const savePlatformInfoSys = (data) => {
    return axios.request({
        url: `/platform/savePlatformInfoSys`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        upload: true
    })
}

//通过id获取平台系统信息
export const getPlatformSysById = (id) => {
    return axios.request({
        url: `/platform/getPlatformSysById/${id}`,
        method: 'get'
    })
}

//通过id删除平台系统信息
export const delPlatformSysById = (id) => {
    return axios.request({
        url: `/platform/delPlatformSysById/${id}`,
        method: 'delete'
    })
}

//村村响系统导入
export const platformImport = (data) => {
    return axios.request({
        url: `/platform/platformImport`,
        method: 'post',
        data,
        upload: true
    })
}


//终端类型列表
export const querySrvTypeList = (params) => {
    return axios.request({
        url: `/device/querySrvTypeList`,
        method: 'get',
        params
    })
}


//获取终端类型 (搜索用)
export const getSrvType = (params) =>{
    return axios.request({
        url: `/device/getSrvType`,
        method: 'get',
        params
    })
}

//保存终端类型信息
export const saveSrvType = (data) => {
    return axios.request({
        url: `/device/saveSrvType`,
        method: 'post',
        data,
        headers: {
            'Content-type': 'application/json;charset=UTF-8'
        },
        upload: true
    })
}

//终端类列名称唯一性校验
export const verifyTypeName = (data) => {
    return axios.request({
        url: `/device/verifyTypeName`,
        method: 'post',
        data
    })
}

//删除终端类型信息
export const delSrvType = (id) => {
    return axios.request({
        url: `device/delSrvType/${id}`,
        method: 'delete'
    })
}

//获取资源编码字典数据
export const getResourceBase = (params) => {
    return axios.request({
        url: `/base/getResourceBase`,
        method: 'get',
        params
    })
}
