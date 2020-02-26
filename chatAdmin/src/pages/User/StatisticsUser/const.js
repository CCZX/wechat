// 根据模板生成相关数据

import { formatDate } from './../../../utils'

const genderPieChartTemplate = [
  {item: '男👨', count: 0},
  {item: '女👩', count: 0},
  {item: '未知', count: 0}
]

/**
 * 
 * @param {Array} data 此处data是通过API获取到的user数组
 */
export const genderSource = (data) => {
  const genderArr = data.map(item => item.sex)
  genderArr.forEach(item => {
    if (item === '0') {
      genderPieChartTemplate[0].count ++
    } else if (item === '1') {
      genderPieChartTemplate[1].count ++
    } else {
      genderPieChartTemplate[2].count ++
    }
  })
  return genderPieChartTemplate
}


const ageHistogramTemplate = [
  {age: '小于15岁 <=15', count: 0},
  {age: '15至30岁 15~30', count: 0},
  {age: '30至50岁 30~50', count: 0},
  {age: '大于50岁 >=50', count: 0},
]

/**
 * 
 * @param {Array} data 此处data是通过API获取到的user数组
 */
export const ageSource = (data) => {
  const ageArr = data.map(item => Number(item.age))
  ageArr.forEach(item => {
    if (item <= 15) {
      ageHistogramTemplate[0].count ++
    } else if (item > 15 && item < 30) {
      ageHistogramTemplate[1].count ++
    } else if (item >= 30 && item < 50) {
      ageHistogramTemplate[2].count ++            
    } else {
      ageHistogramTemplate[3].count ++
    }
  })
  return ageHistogramTemplate
}


const lastLoginTimeLineChartTemplate = [
  {time: '凌晨 00:00-05:59', count: 0},
  {time: '早晨 06:00-08:59', count: 0},
  {time: '上午 09:00-10:59', count: 0},
  {time: '中午 11:00-12:59', count: 0},
  {time: '下午 13:00-16:59', count: 0},
  {time: '傍晚 17:00-16:59', count: 0},
  {time: '晚上 19:00-23:59', count: 0}
]

/**
 * 
 * @param {Array} data 此处data是通过API获取到的user数组
 */
export const lastLoginTimeSource = (data) => {
  const lastLoginTimeArr = data.map(item => {
    return Number(formatDate(new Date(item.lastLoginTime), 'HH'))
  })
  lastLoginTimeArr.forEach(item => {
    if (0 < item && item <6) {
      lastLoginTimeLineChartTemplate[0].count++
    } else if (6 < item && item < 9) {
      lastLoginTimeLineChartTemplate[1].count++
    } else if (9 < item && item <11) {
      lastLoginTimeLineChartTemplate[2].count++
    } else if (11 < item && item <13) {
      lastLoginTimeLineChartTemplate[3].count++
    } else if (13 < item && item <17) {
      lastLoginTimeLineChartTemplate[4].count++
    } else if (17 < item && item <19) {
      lastLoginTimeLineChartTemplate[5].count++
    } else if (19 < item && item < 24) {
      lastLoginTimeLineChartTemplate[6].count++
    }
  })
  return lastLoginTimeLineChartTemplate
}


const browserPieChartTemplate = [
  {item: 'Chrome', count: 0},
  {item: 'FireFox', count: 0},
  {item: 'Opera', count: 0},
  {item: 'Safari', count: 0},
  {item: 'Edge/IE', count: 0},
]

export const browserSource = (data) => {
  const borwserArr = data.map(item => item.loginSetting && item.loginSetting).filter(item => item).map(item => item.browser).filter(item => item)
  borwserArr.forEach(item => {
    if (item === 'Opera') {
      browserPieChartTemplate[2].count++
    } else if (item === 'Chrome') {
      browserPieChartTemplate[0].count++            
    } else if (item === 'Safari') {
      browserPieChartTemplate[3].count++            
    } else if (item === 'FireFox') {
      browserPieChartTemplate[1].count++            
    } else if (item === 'IE' || item === 'Edge') {
      browserPieChartTemplate[4].count++            
    }
  })
  return browserPieChartTemplate
}
