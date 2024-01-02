import {LinearAxisLeft} from "../../shared/LinearAxisLeft";
import {AxisBottom} from "../../shared/AxisBottom";
import {useState} from "react";
import * as d3 from "d3";
import {CircleMarks} from "../../shared/CircleMarks";

export const MultilineChart = ({
                                   data,
                                   xScale,
                                   xValue,
                                   yScale,
                                   yValue,
                                   innerWidth,
                                   innerHeight,
                                   xTickFormat,
                                   yTickFormat,
                                   colorScale,
                                   colorValue,
                                   marksRadius
                               }) => {

    const [hovered, setHovered] = useState(false);
    const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]

    const disorders = new Set(data.map(d => d.disorder));

    const data_by_disorder = [...disorders].map(d => {
        return data.filter(x => x.disorder === d);
    });

    const line = d3.line()
        .x(d => xScale(new Date(d.year, 0)))
        .y(d => yScale(d.cases));

    const handleMouseMove = (e) => {
        if (hovered) {
            let x = e.clientX;
            let year = xScale.invert(x).getFullYear()-13
            console.log(year)
        }
    }

    return (
        <>
            <rect width={innerWidth} height={innerHeight} fill="white" opacity={0} onMouseOver={(e) => setHovered(true)}
                  onMouseMove={(e) => handleMouseMove(e)}
                  onMouseLeave={() => setHovered(false)}/>
            <LinearAxisLeft
                yScale={yScale}
                innerWidth={innerWidth}
                tickFormat={yTickFormat}
            />
            <AxisBottom
                xScale={xScale}
                innerHeight={innerHeight}
                tickFormat={xTickFormat}
            />
            {data_by_disorder.map((d, i) =>
                <path key={i} fill="none" stroke={colorScale(colorValue(d[0]))} d={line(d)}/>
            )}
            <CircleMarks data={data_by_disorder.flat()}
                         xScale={xScale}
                         xValue={xValue}
                         yScale={yScale}
                         yValue={yValue}
                         radius={marksRadius}
                         colorScale={colorScale}
                         colorValue={colorValue}
                         tooltip={false}
            />
            ));

        </>
    )
}


// <g transform={`translate(${500},0)`}>
//     {data.map((d, i) => (
//         <path key={i} fill="none" stroke="black" d={lineChart(d)}/>
//     ))}
// </g>