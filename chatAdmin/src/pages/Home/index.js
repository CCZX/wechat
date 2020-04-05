import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd'
import { systemApi } from './../../api'
import DashBoard from './../../components/BizChart/DashBoard'
import './index.scss'

function Home() {
  const [systemInfo, setSystemInfo] = useState({
    cpuUsage: 0,
    MemUsage: 0
  })
  useEffect(() => {
    systemApi.getSystemInfo().then(res => {
      const { data } = res
      if (data.status === 2000) {
        setSystemInfo(data.data)
      }
    })
  }, [])
  return (
    <div className="home-page">
      <div className="system-info">
        <div className="item">
          <DashBoard source={systemInfo.cpuUsage} font="CPU使用率" />
        </div>
        <div className="item">
          <DashBoard source={systemInfo.MemUsage} font="内存使用率" />
        </div>
      </div>
      <Carousel autoplay>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    </div>

  )
}

export default Home
