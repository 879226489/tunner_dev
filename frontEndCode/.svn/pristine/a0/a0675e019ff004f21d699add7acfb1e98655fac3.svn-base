import axios from '@/utils/api.request.js'
import config from '../config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

//村村响播发记录分类统计列表
export const bClassStatistics = (params) => {
    return axios.request({
        url: `/statistics/bClassStatistics`,
        method: 'get',
        params
    })
}

//播发记录分类统计导出
export const bClassStatisticsExport = (href) => {
    window.open(`${baseUrl}/statistics/bClassStatisticsExport?${href}`)
}

//村村响播发记录分类统计柱状图
export const bClassStatisticsChart = (params) => {
    return axios.request({
        url: `/statistics/bClassStatisticsChart`,
        method: 'get',
        params
    })
}

//播发时间统计
export const broadcastStatistics = (params) => {
    return axios.request({
        url: `/statistics/broadcastStatistics`,
        method: 'get',
        params
    })
}

//村村响终端状态统计列表
export const querySrvStatistics = (params) => {
    return axios.request({
        url: `/statistics/querySrvStatistics`,
        method: 'get',
        params
    })
}

//村村响终端状态统计导出
export const srvStatisticsExport = (href) => {
    window.open(`${baseUrl}/statistics/srvStatisticsExport?${href}`)
}

//查询警告信息
export const getAlarm = (params) => {
    return axios.request({
        url: `/alarm/getAlarm`,
        method: 'get',
        params
    })
}

//告警设置
export const saveAlarmSetting = (data) => {
    return axios.request({
        url: `/alarm/saveAlarmSetting`,
        method: 'post',
        data,
        heads: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        upload: true
    })
}

//告警信息统计
export const alarmInfoStatistics = (params) => {
    return axios.request({
        url: `/statistics/alarmInfoStatistics`,
        method: 'get',
        params
    })
}

//获取告警记录
export const getAlarmRecord = (params) => {
    return axios.request({
        url: `/statistics/getAlarmRecord`,
        method: 'get',
        params
    })
}