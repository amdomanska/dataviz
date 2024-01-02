import {LinearAxisLeft} from "../../shared/LinearAxisLeft";
import {AxisBottom} from "../../shared/AxisBottom";
import React from "react";
import * as d3 from "d3";

export const MultilineChart = ({
                                   data,
                                   xScale,
                                   xValue,
                                   yScale,
                                   yValue,
                                   innerWidth,
                                   innerHeight,
                                   xTickFormat,
                                   yTickFormat
                               }) => {

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
            <path d={line(data)} />
        </>
    )
}


// <g transform={`translate(${500},0)`}>
//     {data.map((d, i) => (
//         <path key={i} fill="none" stroke="black" d={lineChart(d)}/>
//     ))}
// </g>