import React from 'react';

export const AxisBottom = ({xScale, innerHeight, tickFormat}) =>
    xScale.ticks().map((tickValue,i) => (
        <g className="tick" key={i} transform={`translate(${xScale(tickValue)},0)`}>
            <line y2={innerHeight} strokeDasharray="5,5"/>
            {tickFormat  &&
                <text style={{ textAnchor: 'middle' }} dy="1.2em" y={innerHeight + 3}>
                    {tickFormat(tickValue)}
                </text>
            }
        </g>
    ))