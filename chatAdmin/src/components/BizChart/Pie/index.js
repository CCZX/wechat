import React from 'react'
import { Chart, Axis, Geom, Tooltip, Coord, Label, Legend } from 'bizcharts'

export default function PieChart({data, scale}) {
  return (
    <Chart height={400} data={data} scale={scale} forceFit padding={[80, 100, 80, 80]}>
      <Coord type='theta' radius={0.75}/>
      <Axis name="percent"/>
      {/* <Legend position='top' offsetY={100} offsetX={0}/> */}
      <Legend position='top' offsetY={0}/>
      <Tooltip
        showTitle={false}
        itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      />
      <Geom
        type="intervalStack"
        position="percent"
        color='item'
        tooltip={['item*percent', (item, percent) => {
          percent = (percent * 100).toFixed(2) + '%'
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
  )
}
