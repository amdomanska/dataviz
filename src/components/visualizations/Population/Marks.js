import React from 'react';

export const Marks = ({
                          data, xScale, yScale, xValue, yValue, tooltipFormat
                      }) =>
    data.map(d => {
        return (<rect
            key={yValue(d)}
            x={0}
            y={yScale(yValue(d))}
            width={xScale(xValue(d))}
            height={yScale.bandwidth()}
            className="mark mark--rect"
        >
            <title>{tooltipFormat(xValue(d))}</title>
        </rect>)
    })