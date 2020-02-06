import React from 'react'
import { Chart, Axis, Geom, Tooltip } from 'bizcharts'

export default function LineChart({data, scale}) {
  return (
    <Chart height={400} data={data} scale={scale} forceFit>
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
  )
}
