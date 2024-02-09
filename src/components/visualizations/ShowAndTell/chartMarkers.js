import React from 'react';
import {line} from "d3";

export const ChartMarkers = ({
                                 data,
                                 xScale,
                                 xValue,
                                 yScale,
                                 yValue,
                                 radius,
                                 color,
                                 tooltip = true
                             }) => {
    const chartLine = line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)));

    return (
        <>
            <path fill="none" stroke={color} strokeWidth={1.5} d={chartLine(data)}/>
            {
                data.map((d, i) => (
                    <circle
                        key={"circle" + i}
                        className="mark"
                        cx={xScale(xValue(d))}
                        cy={yScale(yValue(d))}
                        r={radius}
                        fill={color}
                    >
                        {tooltip && <title>{yValue(d)}</title>}
                    </circle>
                ))
            }
        </>
    )
}