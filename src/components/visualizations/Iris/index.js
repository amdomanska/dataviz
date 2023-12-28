import React from 'react';
import {useData} from "./useData";
import {AreaContext} from "../../AreaContext";
import {AxisBottom} from "../../shared/AxisBottom";
import {AxisLeft} from "./AxisLeft";
import {CircleMarks} from "./CircleMarks";
import {ColorLegend} from "./ColorLegend";
import {scaleLinear, extent, format, scaleOrdinal} from "d3"
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const margin = {top: 20, right: 200, bottom: 65, left: 100};
const attributes = {
    "sepal_length": "Sepal Length",
    "sepal_width": "Sepal Width",
    "petal_length": "Petal Length",
    "petal_width": "Petal Width"
}
export const Iris = ({url}) => {
    const data = useData(url);
    const [hoveredValue, setHoveredValue] = React.useState(null)
    const [xAttribute, setXAttribute] = React.useState("petal_length");
    const [yAttribute, setYAttribute] = React.useState("sepal_width");
    const {width, height} = React.useContext(AreaContext);
    if (!data) {
        return <p>Loading...</p>
    }

    const xValues = ["petal_length", "petal_width"];
    const yValues = ["sepal_length", "sepal_width"]

    const colorValue = d => d.species;
    const colorLabel = "Species";

    const filteredData = data.filter(d => hoveredValue === colorValue(d))

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.right - margin.left;
    const circleRadius = 5;
    const fadeOpacity = 0.2;

    const siFormat = format("")
    const tickFormat = tickValue => siFormat(tickValue)

    const xValue = d => d[xAttribute];
    const xLabel = attributes[xAttribute];

    const yValue = d => d[yAttribute];
    const yLabel = attributes[yAttribute];

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
        <>
            <div className="controls-container">
                <DropdownButton variant="secondary" id="dropdown-axisx"
                                title={xAttribute ? attributes[xAttribute] : "Axis X"}
                                onSelect={(e) => setXAttribute(e)}>
                    {xValues.map(val =>
                        val !== xAttribute &&
                        <Dropdown.Item key={val} eventKey={val}>{attributes[val]}</Dropdown.Item>
                    )}
                </DropdownButton>
                <DropdownButton variant="secondary" id="dropdown-axisy"
                                title={yAttribute ? attributes[yAttribute] : "Axis Y"}
                                onSelect={(e) => setYAttribute(e)}>
                    {
                        yValues.map(val =>
                            val !== yAttribute &&
                            <Dropdown.Item key={val} eventKey={val}>{attributes[val]}</Dropdown.Item>
                        )
                    }
                </DropdownButton>
            </div>
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
                    <g opacity={hoveredValue ? fadeOpacity : 1}>
                        <CircleMarks data={data}
                                     xScale={xScale}
                                     xValue={xValue}
                                     yScale={yScale}
                                     yValue={yValue}
                                     radius={circleRadius}
                                     colorScale={colorScale}
                                     colorValue={colorValue}
                        />
                    </g>
                    <CircleMarks data={filteredData}
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
                        {colorLabel}
                    </text>
                    <ColorLegend
                        colorScale={colorScale}
                        tickSize={5}
                        innerWidth={innerWidth}
                        onHover={setHoveredValue}
                        fadeOpacity={fadeOpacity}
                        hoveredValue={hoveredValue}
                    />
                </g>
            </svg>
        </>
    )


}