// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Coord, Geom, Guide, Shape } from 'bizcharts';

const { Html, Arc } = Guide;

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
Shape.registerShape('point', 'pointer', {
  drawShape(cfg, group) {
    let point = cfg.points[0]; // 获取第一个标记点
    point = this.parsePoint(point);
    const center = this.parsePoint({ // 获取极坐标系下画布中心点
      x: 0,
      y: 0,
    });
    // 绘制指针
    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y - 20,
        stroke: cfg.color,
        lineWidth: 2,
        lineCap: 'round',
      },
    });
    return group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 6,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff',
      },
    });
  },
});

const data = [
  { value: 5.6 },
];
const cols = {
  value: {
    min: 0,
    max: 9,
    tickInterval: 1,
    nice: false,
  },
};

export default class Gauge extends React.Component {
  render() {
    const { source, font } = this.props
    const data = [{
      value: Number(source)
    }]
    return (
      <Chart width={200} height={300} data={data} scale={cols} padding={[-100, 0, 0, 0]} forceFit>
        <Coord type="polar" startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.75} />
        <Axis
          name="value"
          zIndex={2}
          line={null}
          label={{
            offset: -16,
            textStyle: {
              fontSize: 18,
              textAlign: 'center',
              textBaseline: 'middle',
            },
          }}
          subTickCount={4}
          subTickLine={{
            length: -8,
            stroke: '#fff',
            strokeOpacity: 1,
          }}
          tickLine={{
            length: -18,
            stroke: '#fff',
            strokeOpacity: 1,
          }}
        />
        <Axis name="1" visible={false} />
        <Guide>
          <Arc
            zIndex={0}
            start={[0, 0.965]}
            end={[9, 0.965]}
            style={{ // 底灰色
              stroke: '#CBCBCB',
              lineWidth: 9,
            }}
          />
          <Arc
            zIndex={1}
            start={[0, 0.965]}
            end={[data[0].value, 0.965]}
            style={{
              stroke: '#1890FF',
              lineWidth: 9,
            }}
          />
          <Html
            position={['50%', '95%']}
            html={() => (`
            <div style="width: 300px;text-align: center;font-size: 12px!important; margin-top: -50px">
              <p style="font-size: 1.75em; color: rgba(0,0,0,0.43);margin: 0;">${font}</p>
              <p style="font-size: 3em;color: rgba(0,0,0,0.85);margin: 0;">
                ${(data[0].value * 10).toFixed(2)}%
              </p>
            </div>`)}
          />
        </Guide>
        <Geom
          type="point"
          position="value*1"
          shape="pointer"
          color="#1890FF"
          active={false}
          style={{ stroke: '#fff', lineWidth: 1 }}
        />
      </Chart>
    );
  }
}
