import React from 'react';

export const LinearAxisLeft = ({yScale, innerWidth, tickFormat}) =>
    yScale.ticks().map(tickValue => (
        <g className="tick" key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
            <line x2={innerWidth} />
            <text style={{textAnchor: 'end'}} dy="0.4em" dx="-0.35em">
                {tickFormat(tickValue)}
            </text>
        </g>
    ))