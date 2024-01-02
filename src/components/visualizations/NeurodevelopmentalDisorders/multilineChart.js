import {LinearAxisLeft} from "../../shared/LinearAxisLeft";
import {AxisBottom} from "../../shared/AxisBottom";
import React from "react";
import * as d3 from "d3";
import {CircleMarks} from "../Iris/CircleMarks";

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
                                   colorValue
                               }) => {

    const colors = ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"]

    const disorders = new Set(data.map(d => d.disorder));

    const data_by_disorder = [...disorders].map(d => {
        return data.filter(x => x.disorder === d);
    });
    console.log(data_by_disorder)

    const line = d3.line()
        .x(d => xScale(new Date(d.year,0)))
        .y(d => yScale(d.cases));

    return (
        <>
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
            {data_by_disorder.map((d,i) =>
                <path key={i} fill="none" stroke={colors[i]} d={line(d)}/>
            )}
            {data_by_disorder.flat().map((d, i) => {
                return (<circle
                    key={i}
                    className="mark"
                    cx={xScale(xValue(d))}
                    cy={yScale(yValue(d))}
                    r={2}
                >
                </circle>
                )
            })}
            ));
            {/*<CircleMarks data={data_by_disorder}*/}
            {/*             xScale={xScale}*/}
            {/*             xValue={xValue}*/}
            {/*             yScale={yScale}*/}
            {/*             yValue={yValue}*/}
            {/*             radius={3}*/}
            {/*             colorScale={colorScale}*/}
            {/*             colorValue={colorValue}*/}
            {/*/>*/}
        </>
    )
}


// <g transform={`translate(${500},0)`}>
//     {data.map((d, i) => (
//         <path key={i} fill="none" stroke="black" d={lineChart(d)}/>
//     ))}
// </g>