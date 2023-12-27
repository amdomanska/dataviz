import React from 'react';
import {useState, useEffect} from 'react';
import {csv, arc, pie} from 'd3';

import { AreaContext } from "../../AreaContext"


export const Colors = ({url}) => {
    //data keys: "specification, Keyword, RGB hex value"
    const [data, setData] = useState(null)
    const {width, height, centerX, centerY} = React.useContext(AreaContext)

    const pieArc = arc()
        .innerRadius(0)
        .outerRadius(height * 2)

    useEffect(() => {
        csv(url).then(data => {
            setData(data)
        })
    }, [url]);

    if (!data) {
        return <p>Loading...</p>
    }

    const colorPie = pie().value(1)

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${centerX},${centerY})`}>
                {colorPie(data).map(((d, idx) => {
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