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
                                tooltip = true
                            }) =>
    data.map((d, idx) => (
        <circle
            key={idx}
            className="mark"
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={radius}
            fill={colorScale(colorValue(d))}
        >
            {tooltip && <title>{yValue(d)}</title>}
        </circle>
    ));