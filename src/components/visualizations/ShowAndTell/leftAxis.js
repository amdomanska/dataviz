import React from "react";

export const LeftAxis = ({yScale, casesFormat, innerWidth}) =>
    yScale.ticks().map((tickValue) => (
        <g className="tick" key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
            <line x2={innerWidth}/>
            <text style={{textAnchor: 'end'}} dy="0.4em" dx="-0.35em">
                {casesFormat(tickValue)}
            </text>
        </g>
    ))
