import React, {useState, useContext} from "react";
import {extent, format, scaleLinear, scaleTime, timeFormat} from "d3";
import {AreaContext} from "../../AreaContext";
import {MultilineChart} from "./multilineChart";
import {VerticalTooltip} from "./verticalTooltip";
import {useData} from "./useData";

const margin = {top: 20, right: 300, bottom: 80, left: 75}

export const Covid = ({url}) => {
    const data = useData(url);

    const casesValue = x => x.cases;
    const timeValue = x => x.date;

    const defaultTimeRange = [new Date("2020-01-05"), new Date()];
    const [timeRange, setTimeRange] = useState(defaultTimeRange)
    const {width, height} = useContext(AreaContext);

    const [startYear, endYear] = timeRange;

    if (data === null) {
        return <p>Loading...</p>
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.right - margin.left;

    const filteredData = data.filter((d) => d.date >= startYear && d.date <= endYear);

    const tFormat = timeFormat("%m/%y");

    const cFormat = format(".2s")
    const casesFormat = tickValue => cFormat(tickValue)

    const fullChartXScale = scaleTime()
        .domain(extent(data, timeValue))
        .range([0, innerWidth]);

    const fullChartYScale = scaleLinear()
        .domain(extent(data, casesValue))
        .range([innerHeight, 0]);

    const filteredChartXScale = scaleTime()
        .domain(extent(filteredData, timeValue))
        .range([0, innerWidth]);

    const filteredChartYScale = scaleLinear()
        .domain(extent(filteredData, casesValue))
        .range([innerHeight, 0]);

    return (
        <>
            <svg width={width} height={height * 2}>
                <g transform={`translate(${margin.left},${margin.top})`}>
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
                        hoveredValue={null}
                        fadeOpacity={0.2}
                        enableBrush={false}
                        defaultTimeRange={defaultTimeRange}

                    />
                    <VerticalTooltip
                        data={data}
                        innerHeight={innerHeight}
                        innerWidth={innerWidth}
                        xScale={filteredChartXScale}
                    />
                    <text
                        className="tick"
                        x={-margin.left + 35}
                        y={innerHeight + 55}
                        textAnchor="start"
                    >
                        Brush to filter:
                    </text>
                    <g transform={`translate(0,${margin.top + innerHeight+40})`}>
                        <MultilineChart
                            data={data}
                            xScale={fullChartXScale}
                            xValue={timeValue}
                            yScale={fullChartYScale}
                            yValue={casesValue}
                            innerWidth={innerWidth}
                            innerHeight={innerHeight}
                            xTickFormat={tFormat}
                            yTickFormat={casesFormat}
                            fadeOpacity={0.2}
                            enableBrush={true}
                            onBrush={setTimeRange}
                            defaultTimeRange={defaultTimeRange}

                        />
                    </g>
                </g>
            </svg>
        </>
    )

}