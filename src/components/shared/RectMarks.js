import React from 'react';

export const RectMarks = ({
                              data, xScale, yScale, xValue, yValue, tooltipFormat, valueFormat
                          }) =>
    data.map((d, i) => {
        return (
            <g className="tick" key={i}>
                <rect
                    key={i}
                    x={0}
                    y={yScale(yValue(d))}
                    width={xScale(xValue(d))}
                    height={yScale.bandwidth()}
                    className="mark mark--rect"
                >
                    <title>{!valueFormat && valueFormat(xValue(d))}</title>
                </rect>
                {valueFormat &&
                    <text
                          style={{textAnchor: 'start'}}
                          dy={".75em"}
                          y={yScale(yValue(d)) + yScale.bandwidth() / 2}
                          x={xScale(xValue(d)) + 10}
                    >
                        {valueFormat(xValue(d))}
                    </text>
                }
            </g>
        )
    })