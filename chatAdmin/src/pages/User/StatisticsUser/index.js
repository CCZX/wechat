import React, { Component } from 'react'
import { userApi } from './../../../api'
import { Chart, Axis, Geom, Tooltip, Coord, Label, Legend } from 'bizcharts'
import { Card, Row, Col } from 'antd'
import { View } from '@antv/data-set'
import { formatTime, lastMonth } from './../../../utils'
import MapGeo from './components/Map'
import './index.scss'

class StatisticsUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sexPipeData: [],
      ageData: [],
      signUpTimeData: []
    }
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
          val = ( val * 100 ) + '%'
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
        <Row gutter={10}>
          <Col span={12}>
            <Card title="用户性别分布图" className='card-item'>
              <Chart height={400} data={sexDv} scale={sexCols} forceFit padding={[80, 100, 80, 80]}>
                <Coord type='theta' radius={0.75}/>
                <Axis name="percent"/>
                {/*<Legend position='right' offsetY={-80} offsetX={-100}/>*/}
                <Legend position='right' offsetY={-80}/>
                <Tooltip
                  showTitle={false}
                  itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                />
                <Geom
                  type="intervalStack"
                  position="percent"
                  color='item'
                  tooltip={['item*percent', (item, percent) => {
                    percent = percent * 100 + '%'
                    return {
                      name: item,
                      value: percent
                    }
                  }]}
                  style={{lineWidth: 1, stroke: '#fff'}}
                >
                  <Label content='percent' formatter={(val, item) => {
                    return item.point.item + ': ' + val
                  }}/>
                </Geom>
              </Chart>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="用户年龄分布图" className="card-item">
              <Chart height={400} data={ageData} scale={ageCols} forceFit>
                <Axis name="age"></Axis>
                <Axis name="count"></Axis>
                <Tooltip 
                  crosshairs={{
                    type: "y"
                  }}
                ></Tooltip>
                <Geom type="interval" position="age*count"></Geom>
              </Chart>
            </Card>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}>
            <Card title="近一个月用户注册数量" className="card-item">
              <Chart height={400} data={signData} scale={signCols} forceFit>
                <Axis name="time"></Axis>
                <Axis name="count"></Axis>
                <Tooltip
                  crosshairs={{
                    type: "y"
                  }}
                />
                <Geom type="line" position="time*count" size={2} />
                <Geom
                  type="point"
                  position="time*count"
                  size={4}
                  shape={"circle"}
                  style={{
                    stroke: "#fff",
                    lineWidth: 1
                  }}
                />
              </Chart>
            </Card>
          </Col>
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
    const { getAllUser, getUserBySignTime } = userApi
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
          ageData: ageRes
        })
      }
    })
    getUserBySignTime().then(res => {
      const { data, status } = res.data
      if (status === 2000) {
        const signUpTimeList = data.map(item => {
          return formatTime(new Date(item.signUpTime), false)
        })
        const lastMonthList = lastMonth()
        signUpTimeList.forEach(item => {
          let index = lastMonthList.findIndex(y => {
            return y.time === item
          })
          lastMonthList[index].count++
        })
        this.setState({
          signUpTimeData: lastMonthList
        })
      }
    })
  }
}

export default StatisticsUser
