/**
 * 在bizChart中用到的常量数据
 */
// 饼图数据
import { View } from '@antv/data-set'
export const pieChartData = (data) => {
  const dataDv = new View()
  dataDv.source(data).transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent'
  })
  return dataDv
}

// 饼图配置
export const pieChartCols = {
  percent: {
    formatter: val => {
      val = ( val * 100 ).toFixed(2) + '%'
      return val
    }
  }
}

// 直方图配置
export const histogramCols = {
  count: {
    tickInterval: 3
  }
}

// 折线图配置
export const lineChartCols = {
  count: {
    min: 0
  },
  time: {
    range: [0, 1]
  }
}
