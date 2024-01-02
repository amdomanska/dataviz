import React from 'react';
import {useData} from "./useData";
import {AreaContext} from "../../AreaContext";
import {max, scaleLinear, scaleBand, format,} from 'd3';
import {OrdinalAxisLeft} from '../../shared/OrdinalAxisLeft'
import {AxisBottom} from '../../shared/AxisBottom'

import {RectMarks} from '../../shared/RectMarks';
import {BarChart} from "../../shared/barChart";

const margin = {top: 50, right: 30, bottom: 80, left: 240}

export const Population = ({url}) => {

    const data = useData(url);
    const {height, width} = React.useContext(AreaContext)

    if (data === null) {
        return <p>Loading...</p>
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.right - margin.left;

    const yValue = x => x.Country;
    const xValue = x => x.Population;

    const siFormat = format('.2s')
    const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B')

    const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth]);

    const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .paddingInner(0.15);

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <BarChart
                    data={data}
                    xScale={xScale}
                    yScale={yScale}
                    xValue={xValue}
                    yValue={yValue}
                    tooltipFormat={xAxisTickFormat}
                    valueFormat={xAxisTickFormat}
                    innerHeight={innerHeight}
                />
                <text
                    className="axis-label"
                    x={innerWidth / 2}
                    y={height-margin.bottom+15}
                    textAnchor="middle"
                >
                    Population
                </text>
            </g>
        </svg>
    )


}