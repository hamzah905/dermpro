// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Coord, Geom, Guide, Shape } from 'bizcharts';

const { Html, Arc, Line } = Guide;

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
        lineWidth: 5,
        lineCap: 'round',
      },
    });
    return group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 12,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff',
      },
    });
  },
});


class Gauge extends React.Component {
  render() {

const data = [
    { value: this.props.percent / 10 },
  ];
  const cols = {
    value: {
      min: 0,
      max: 9,
      ticks: [2.25, 3.75, 5.25, 6.75],
      nice: false,
    },
  };

    return (
      <Chart height={600} data={data} scale={cols} padding={[0, 0, 320, 0]} forceFit >
        <Coord type="polar" startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.65} />
        <Axis
          name="value"
          zIndex={2}
          line={null}
          label={{
            offset: -20,
            formatter: (val) => {
              if (val === '2.25') {
                return '15';
              } else if (val === '3.75') {
                return '30';
              } else if (val === '5.25') {
                return '60';
              }
              return '75';
            },
            textStyle: {
              fontSize: 24,
              fill: 'rgba(0, 0, 0, 0.65)',
              textAlign: 'center',
            },
          }}
        />
        <Axis name="1" visible={false} />
        <Guide>
          <Line
            start={[3, 0.905]}
            end={[3.0035, 0.85]}
            lineStyle={{
              stroke: '#19AFFA', // 线的颜色
              lineDash: null, // 虚线的设置
              lineWidth: 3,
            }}
          />
          <Line
            start={[4.5, 0.905]}
            end={[4.5, 0.85]}
            lineStyle={{
              stroke: '#19AFFA', // 线的颜色
              lineDash: null, // 虚线的设置
              lineWidth: 3,
            }}
          />
          <Line
            start={[6, 0.905]}
            end={[6.0035, 0.85]}
            lineStyle={{
              stroke: '#19AFFA', // 线的颜色
              lineDash: null, // 虚线的设置
              lineWidth: 3,
            }}
          />
          <Arc
            zIndex={0}
            start={[0, 0.965]}
            end={[9, 0.965]}
            style={{ // 底灰色
              stroke: '#000',
              lineWidth: 18,
              opacity: 0.09,
            }}
          />
          <Arc
            zIndex={1}
            start={[0, 0.965]}
            end={[data[0].value, 0.965]}
            style={{ // 底灰色
              stroke: '#8cc63f',
              lineWidth: 18,
            }}
          />
          <Html
            position={['50%', '95%']}
            html={() => (`<div style="width: 200px;text-align: center;font-size: 12px!important;"><p style="font-size: 1.75em; color: rgba(0,0,0,0.43);margin: 0;">Patients</p><p style="font-size: 3em;color: rgba(0,0,0,0.85);margin: 0;">${this.props.percent}%</p></div>`)}
          />
        </Guide>
        <Geom
          type="point"
          position="value*1"
          shape="pointer"
          color="#2BA2D6"
          active={false}
          style={{ stroke: '#fff', lineWidth: 1 }}
        />
      </Chart>
    );
  }
}

export default Gauge;