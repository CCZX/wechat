import React, { Component } from 'react'
import { userApi } from './../../../api'
import { Card, Row, Col, Alert, DatePicker } from 'antd'
import { View } from '@antv/data-set'
import moment from 'moment'
import { formatDate, lastMonth } from './../../../utils'
import MapGeo from './components/Map'
import PieChar from './../../../components/BizChart/Pie'
import Histogram from './../../../components/BizChart/Histogram'
import LineChart from './../../../components/BizChart/Line'
import './index.scss'

const { MonthPicker } = DatePicker

const defaultMonth = formatDate(new Date(), 'YYYY-MM')

const signUserCardTitle = that => (
  <div style={{'display': 'flex', 'justifyContent': 'space-between'}}>
    <span>用户注册趋势</span>
    <MonthPicker placeholder="Select Month" defaultValue={moment(defaultMonth)} onChange={(moment, date) => that.handlerMonthChange(date)} />
  </div>
)
class StatisticsUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sexPipeData: [],
      ageData: [],
      signUpTimeData: [],
      userNumTotal: 0,
      selectMonth: defaultMonth
    }
    this.signUserCardTitle = signUserCardTitle(this)
  }
  handlerMonthChange = (e) => {
    this.setState({
      selectMonth: e
    }, () => {
      this.getUserBySignTime()
    })
  }
  getUserBySignTime = () => {
    const { getUserBySignTime } = userApi
    const { selectMonth } = this.state
    const nextmonth = selectMonth.split('-')
    const lt = nextmonth[1] === '12' ? Number(nextmonth[0]) + 1 + '-' + 1 : Number(nextmonth[0]) + '-' + (Number(nextmonth[1]) + 1)
    const params = {
      gt: selectMonth,
      lt
    }
    getUserBySignTime(params).then(res => {
      const { data, status } = res.data
      if (status === 2000) {
        const signUpTimeList = data.map(item => {
          return formatDate(new Date(item.signUpTime), 'YYYY-MM-DD')
        })
        const lastMonthList = lastMonth(selectMonth)
        signUpTimeList.forEach(item => {
          let index = lastMonthList.findIndex(y => {
            return y.time === item
          })
          index >= 0 && lastMonthList[index].count++
        })
        this.setState({
          signUpTimeData: lastMonthList
        })
      }
    })
  }
  render() {
    const sexDv = new View()
    sexDv.source(this.state.sexPipeData).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    })
    const sexCols = {
      percent: {
        formatter: val => {
          val = ( val * 100 ).toFixed(2) + '%'
          return val
        }
      }
    }
    const ageData = this.state.ageData
    const ageCols = {
      count: {
        tickInterval: 1
      }
    }
    const signData = this.state.signUpTimeData
    const signCols = {
      count: {
        min: 0
      },
      time: {
        range: [0, 1]
      }
    }
    return (
      <div className="user-statistics-page">
        <Alert message={`用户总量：${this.state.userNumTotal}`} type="success" />
        <Row gutter={10}>
          <Col span={12}>
            <Card title="用户性别分布图" className='card-item'>
              <PieChar data={sexDv} scale={sexCols} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="用户年龄分布图" className="card-item">
              <Histogram data={ageData} scale={ageCols} />
            </Card>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={24}>
            <Card title={this.signUserCardTitle} className="card-item">
              <LineChart data={signData} scale={signCols} />
            </Card>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}>
            <Card title="用户地图分布" className="card-item">
              <MapGeo></MapGeo>
            </Card>
          </Col>
        </Row>
        
      </div>
    )
  }
  componentDidMount() {
    const { getAllUser } = userApi
    getAllUser().then(res => {
      const { data, status } = res.data
      if (status === 2000) {
        const sexRes = [
          {item: '男', count: 0},
          {item: '女', count: 0},
          {item: '未知', count: 0}
        ]
        const ageRes = [
          {age: '<=15', count: 0},
          {age: '15~30', count: 0},
          {age: '30~50', count: 0},
          {age: '>=50', count: 0},
        ]
        const sexList = data.map(dataItem => {
          return dataItem.sex
        })
        const ageList = data.map(item => {
          return Number(item.age)
        })
        sexList.forEach(item => {
          if (item === '0') {
            sexRes[0].count ++
          } else if (item === '1') {
            sexRes[1].count ++
          } else {
            sexRes[2].count ++
          }
        })
        ageList.forEach(item => {
          if (item <= 15) {
            ageRes[0].count ++
          } else if (item > 15 && item < 30) {
            ageRes[1].count ++
          } else if (item >= 30 && item < 50) {
            ageRes[2].count ++            
          } else {
            ageRes[3].count ++
          }
        })
        this.setState({
          sexPipeData: sexRes,
          ageData: ageRes,
          userNumTotal: data.length
        })
      }
    })
    this.getUserBySignTime()
  }
}

export default StatisticsUser
