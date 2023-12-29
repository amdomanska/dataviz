import React, {useContext} from "react";
import {AreaContext} from "../../../AreaContext";
import {extent, scaleTime, scaleLinear, max, timeFormat, format, bin, timeMonths, sum} from "d3";
import {LinearAxisLeft} from "../../../shared/LinearAxisLeft";
import {AxisBottom} from "../../../shared/AxisBottom";
import {Marks} from "./Marks";

const margin = {top: 20, right: 30, bottom: 65, left: 45};

export const Histogram = ({data}) => {
    const context = useContext(AreaContext);
    const width = context.width;
    const height = context.height * 0.5;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.bottom - margin.top;

    const xAxisTickFormat = timeFormat('%m/%Y');
    const xValue = d => d.date;
    const yValue = d => d.total;

    const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const [start, stop] = xScale.domain();
    const bins = bin()
        .value(xValue)
        .domain(xScale.domain())
        .thresholds(timeMonths(start, stop))

    const binnedData = bins(data).map(array => ({
        y: sum(array, yValue),
        x0: array.x0,
        x1: array.x1
    }));

    const getSum = d => d.y
    const yScale = scaleLinear()
        .domain([max(binnedData, getSum), 0])
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
                <Marks
                    data={binnedData}
                    xScale={xScale}
                    xValue={xValue}
                    yScale={yScale}
                    yValue={getSum}
                    innerWidth={innerWidth}
                    innerHeight={innerHeight}
                    format={xAxisTickFormat}
                />
            </g>
        </svg>
    )
}