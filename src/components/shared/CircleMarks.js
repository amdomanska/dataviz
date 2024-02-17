import React from 'react';

export const CircleMarks = ({
                                data,
                                xScale,
                                xValue,
                                yScale,
                                yValue,
                                radius,
                                colorScale,
                                colorValue,
                                marked = null,
                                tooltip = true
                            }) =>
    data.map((d, idx) => (
        <circle
            key={idx}
            className="mark"
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={marked === xValue(d) ? radius+2 : radius}
            fill={colorScale ? colorScale(colorValue(d)) : colorValue}
        >
            {tooltip && <title>{yValue(d)}</title>}
        </circle>
    ));