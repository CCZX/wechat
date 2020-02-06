import React from 'react'
import { Chart, Axis, Geom, Tooltip } from 'bizcharts'

export default function Histogram({data, scale}) {
  return (
    <Chart height={400} data={data} scale={scale} forceFit>
      <Axis name="age"></Axis>
      <Axis name="count"></Axis>
      <Tooltip 
        crosshairs={{
          type: "y"
        }}
      ></Tooltip>
      <Geom type="interval" position="age*count"></Geom>
    </Chart>
  )
}
