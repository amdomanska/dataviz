import React, {useContext} from "react";
import {AreaContext} from "../../../AreaContext";
import {extent, scaleTime, scaleLinear, max, timeFormat, format} from "d3";
import {LinearAxisLeft} from "../../../shared/LinearAxisLeft";
import {AxisBottom} from "../../../shared/AxisBottom";

const margin = { top: 20, right: 30, bottom: 65, left: 45 };

export const Histogram = ({data}) => {
    const context = useContext(AreaContext);
    const width = context.width;
    const height = context.height*0.5;
    const innerWidth = width-margin.left-margin.right;
    const innerHeight = height-margin.bottom-margin.top;

    const xAxisTickFormat = timeFormat('%m/%Y');
    const xValue = d => d.date;
    const yValue = d => d.total;

    const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = scaleLinear()
        .domain([max(data, yValue),0])
        .range([0, innerHeight])
        .nice();

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <LinearAxisLeft
                    yScale={yScale}
                    innerWidth={innerWidth}
                    tickFormat={format("")}
                />
                <AxisBottom
                    xScale={xScale}
                    innerHeight={innerHeight}
                    tickFormat={xAxisTickFormat}
                />
            </g>
        </svg>
    )
}