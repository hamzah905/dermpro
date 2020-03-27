import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";

class Pieslice extends React.Component {
  render() {
    const { DataView } = DataSet;
    const data = [
    
      {
        item: "Pending",
        count: this.props.total
      },
      {
        item: "Done",
        count: this.props.percent
      },
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    const COLORS = ["#2BA2D6", "#8CC63F"];
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={dv}
          scale={cols}
          padding={[-300, 0, 0, 0]}
          forceFit
        >
          <Coord type="theta" radius={0.55} />
          <Axis name="percent" />
          <Legend
            position="right"
            offsetY={-window.innerHeight / 2 + 20}
            offsetX={-100}
          />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Geom
            type="intervalStack"
            position="percent"
            color={["item", COLORS]}
            tooltip={[
              "item*percent",
              (item, percent) => {
                percent = percent * 100 + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              offset={-20}
              textStyle={{
                rotate: 0,
                textAlign: "center",
                shadowBlur: 2,
                shadowColor: "rgba(0, 0, 0, .45)"
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Pieslice;
