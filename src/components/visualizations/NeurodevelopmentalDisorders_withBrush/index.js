import React, {useState, useContext} from "react";
import {useData} from "./useData";
import {extent, format, scaleLinear, scaleOrdinal, scaleTime, timeFormat} from "d3";
import {AreaContext} from "../../AreaContext";
import {MultilineChart} from "./multilineChart";
import {ColorLegend} from "../../shared/ColorLegend";

const margin = {top: 120, right: 350, bottom: 80, left: 75}

const defaultTimeRange = [1999,2020];

export const NeurodevelopmentalDisorders_withBrush = ({url}) => {
    const data = useData(url);
    const [hoveredValue, setHoveredValue] = useState(null)
    const [timeRange, setTimeRange] = useState(defaultTimeRange)
    const {width, height} = useContext(AreaContext);

    const region = "World";

    const [startYear, endYear] = timeRange;

    if (data === null) {
        return <p>Loading...</p>
    }

    const title = `Number with a mental or neurodevelopmental disorder by type`

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.right - margin.left;

    const disorderValue = x => x.disorder;
    const casesValue = x => x.cases;
    const timeValue = x => new Date(x.year, 0);

    const worldData = data.filter((d) => d.entity === region);
    const filteredData = data.filter((d) => d.year >= startYear && d.year <= endYear && d.entity === region);

    const tFormat = timeFormat("%Y");

    const cFormat = format(".2s")
    const casesFormat = tickValue => cFormat(tickValue)

    const fullChartXScale = scaleTime()
        .domain(extent(worldData, timeValue))
        .range([0, innerWidth]);

    const fullChartYScale = scaleLinear()
        .domain(extent(worldData, casesValue))
        .range([innerHeight, 0]);

    const filteredChartXScale = scaleTime()
        .domain(extent(filteredData, timeValue))
        .range([0, innerWidth]);

    const filteredChartYScale = scaleLinear()
        .domain(extent(filteredData, casesValue))
        .range([innerHeight, 0]);

    const disorders = new Set(data.map(d => d.disorder));

    const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
    const colorScale = scaleOrdinal()
        .domain([...disorders])
        .range(colors)

    const marksRadius = 4;

    return (
        <>
            <svg width={width} height={height * 2}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <text
                        className="axis-label"
                        x={-margin.left + 20}
                        y={-margin.top / 2 - 10}
                        textAnchor="start"
                    >
                        {title}
                    </text>
                    <text
                        className="axis-label"
                        x={-margin.left + 20}
                        y={-margin.top / 2 + 30}
                        textAnchor="start"
                    >
                        World, 2020
                    </text>
                    <MultilineChart
                        data={filteredData}
                        xScale={filteredChartXScale}
                        xValue={timeValue}
                        yScale={filteredChartYScale}
                        yValue={casesValue}
                        innerWidth={innerWidth}
                        innerHeight={innerHeight}
                        xTickFormat={tFormat}
                        yTickFormat={casesFormat}
                        colorValue={disorderValue}
                        colorScale={colorScale}
                        marksRadius={marksRadius}
                        hoveredValue={hoveredValue}
                        fadeOpacity={0.2}
                        enableBrush={false}
                        defaultTimeRange={defaultTimeRange}

                    />
                    <g transform={`translate(0,${margin.top+innerHeight})`}>
                        <MultilineChart
                            data={worldData}
                            xScale={fullChartXScale}
                            xValue={timeValue}
                            yScale={fullChartYScale}
                            yValue={casesValue}
                            innerWidth={innerWidth}
                            innerHeight={innerHeight}
                            xTickFormat={tFormat}
                            yTickFormat={casesFormat}
                            colorValue={disorderValue}
                            colorScale={colorScale}
                            marksRadius={marksRadius}
                            hoveredValue={hoveredValue}
                            fadeOpacity={0.2}
                            enableBrush={true}
                            onBrush={setTimeRange}
                            defaultTimeRange={defaultTimeRange}

                        />
                    </g>
                    <ColorLegend
                        colorScale={colorScale}
                        tickSize={5}
                        innerWidth={innerWidth}
                        onHover={setHoveredValue}
                        fadeOpacity={0.2}
                        hoveredValue={hoveredValue}
                    />
                </g>
            </svg>
        </>
    )

}