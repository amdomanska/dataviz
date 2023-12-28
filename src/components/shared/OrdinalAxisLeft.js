import React from 'react';

export const OrdinalAxisLeft = ({yScale}) =>
    yScale.domain().map(tickValue => (
        <g className="tick" key={tickValue}>
            <text
                key={tickValue}
                style={{textAnchor: 'end'}}
                x={-5}
                dy={".75em"}
                y={yScale(tickValue) + yScale.bandwidth() / 2}
            >
                {tickValue}
            </text>
        </g>
    ));
