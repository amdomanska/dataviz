import React from 'react';
import {useState, useEffect} from 'react';
import * as d3 from 'd3';

const width = window.innerWidth * 0.75;
const height = window.innerHeight * 0.75;
const centerX = width / 2;
const centerY = height / 2;

const pieArc = d3.arc()
    .innerRadius(0)
    .outerRadius(height)

export const Colors = ({url}) => {
    //data keys: "specification, Keyword, RGB hex value"
    const [data, setData] = useState(null)

    useEffect(() => {
        d3.csv(url).then(data => {
            setData(data)
        })
    }, []);
    if (!data) {
        return <p>Loading...</p>
    }

    const colorPie = d3.pie().value(1)

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${centerX},${centerY})`}>
                {colorPie(data).map(((d, idx) => {
                    console.log(d);
                    return (
                        <path
                            key={idx}
                            fill={d.data['RGB hex value']}
                            d={pieArc(d)}
                        >
                            {d.data['RGB hex value']}
                        </path>
                    )
                }))}
            </g>
        </svg>
    );
}