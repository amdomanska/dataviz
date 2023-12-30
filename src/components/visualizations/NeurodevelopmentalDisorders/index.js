import React, {useState, useRef, useEffect} from "react";
import {useData} from "./useData";
import {format, max, scaleBand, scaleLinear} from "d3";
import {OrdinalAxisLeft} from "../../shared/OrdinalAxisLeft";
import {AxisBottom} from "../../shared/AxisBottom";
import {RectMarks} from "../../shared/RectMarks";
import {Slider} from "./Slider";

const margin = {top: 80, right: 120, bottom: 70, left: 320}

export const NeurodevelopmentalDisorders = ({url}) => {
    const data = useData(url);
    const [region, setRegion] = useState("World");
    const [year, setYear] = useState(1990);
    const width = window.innerWidth * 0.75;
    const height = window.innerHeight * 0.5;

    if (data === null) {
        return <p>Loading...</p>
    }

    const title = `Number with a mental or neurodevelopmental disorder by type, ${region}, ${year}`

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.right - margin.left;

    const yValue = x => x.disorder;
    const xValue = x => x.cases;

    const filteredData = data.filter((d) => d.year === year && d.entity === region).sort((a, b) => xValue(b) - xValue(a));

    const siFormat = format(",.0f")
    const xAxisTickFormat = tickValue => siFormat(tickValue)

    const xScale = scaleLinear()
        .domain([0, max(filteredData, xValue)])
        .range([0, innerWidth]);

    const yScale = scaleBand()
        .domain(filteredData.map(yValue))
        .range([0, innerHeight])
        .paddingInner(0.15);

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <text
                    className="axis-label"
                    x={margin.left}
                    y={-margin.top / 2 + 10}
                    textAnchor="middle"
                >
                    {title}
                </text>
                <OrdinalAxisLeft
                    yScale={yScale}
                />
                <AxisBottom
                    xScale={xScale}
                    innerHeight={innerHeight}
                    tickFormat={null}
                />
                <RectMarks
                    data={filteredData}
                    xScale={xScale}
                    yScale={yScale}
                    xValue={xValue}
                    yValue={yValue}
                    tooltipFormat={xAxisTickFormat}
                    valueFormat={xAxisTickFormat}
                />
            </g>
            <Slider
                data={data}
                width={width}
                innerHeight={height}
                margin={margin}
                setYear={setYear}
                tickFormat={format("")}
            />
        </svg>
    )

}