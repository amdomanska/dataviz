import React from 'react';
import {useData} from "./useData";
import {AreaContext} from "../../AreaContext";
import {AxisBottom} from "../../shared/AxisBottom";
import {AxisLeft} from "./AxisLeft";
import {CircleMarks} from "./CircleMarks";
import {ColorLegend} from "./ColorLegend";
import {scaleLinear, extent, format, scaleOrdinal} from "d3"

const margin = {top: 20, right: 200, bottom: 65, left: 100};

export const Iris = ({url}) => {
    const data = useData(url);
    const {width, height} = React.useContext(AreaContext);
    if (!data) {
        return <p>Loading...</p>
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.right - margin.left;
    const circleRadius = 5;

    const siFormat = format("")
    const tickFormat = tickValue => siFormat(tickValue)

    const xValue = d => d.petal_length;
    const xLabel = "Petal Length";
    const yValue = d => d.sepal_width;
    const yLabel = "Sepal Width";
    const colorValue = d => d.species;
    const colorLabel = "Species";

    const xScale = scaleLinear()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = scaleLinear()
        .domain(extent(data, yValue).reverse())
        .range([0, innerHeight])
        .nice();

    const colorScale = scaleOrdinal()
        .domain(data.map(colorValue))
        .range(['#E6842A', '#137B80', '#8E6C8A'])

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <AxisBottom
                    xScale={xScale}
                    innerHeight={innerHeight}
                    tickFormat={tickFormat}
                />
                <text
                    className="axis-label"
                    textAnchor="middle"
                    x={innerWidth / 2}
                    y={height - margin.bottom + 30}
                >
                    {xLabel}
                </text>
                <AxisLeft
                    yScale={yScale}
                    innerWidth={innerWidth}
                    tickFormat={tickFormat}
                />
                <text
                    className="axis-label"
                    textAnchor="middle"
                    transform={`translate(-40, ${innerHeight / 2}) rotate(-90)`}
                >
                    {yLabel}
                </text>
                <CircleMarks data={data}
                             xScale={xScale}
                             xValue={xValue}
                             yScale={yScale}
                             yValue={yValue}
                             radius={circleRadius}
                             colorScale={colorScale}
                             colorValue={colorValue}
                />
                <text
                    className="axis-label"
                    textAnchor="middle"
                    x={innerWidth + 80}
                    y={20}
                >
                    Species
                </text>

                <ColorLegend
                    colorScale={colorScale}
                    tickSize={5}
                    innerWidth={innerWidth}
                />
            </g>
        </svg>
    )


}