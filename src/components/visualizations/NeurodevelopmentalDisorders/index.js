import React, {useState, useRef, useEffect} from "react";
import {useData} from "./useData";
import {format, max, scaleBand, scaleLinear} from "d3";
import {OrdinalAxisLeft} from "../../shared/OrdinalAxisLeft";
import {AxisBottom} from "../../shared/AxisBottom";
import {RectMarks} from "../../shared/RectMarks";
// import {Slider} from "./Slider";
import {Slider} from "@mui/material"
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import RangeSlider from "./RangeSlider"
import {BarChart} from "./barChart";

const margin = {top: 120, right: 120, bottom: 80, left: 320}
const defaultYear = 2019;

export const NeurodevelopmentalDisorders = ({url}) => {
    const data = useData(url);
    const [region, setRegion] = useState("World");
    const [year, setYear] = useState([defaultYear, defaultYear]);
    const width = window.innerWidth * 0.75;
    const height = window.innerHeight * 0.5;

    if (data === null) {
        return <p>Loading...</p>
    }

    const title = `Number with a mental or neurodevelopmental disorder by type`

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.right - margin.left;

    const yValue = x => x.disorder;
    const xValue = x => x.cases;

    const filteredData = data.filter((d) => d.year >= year[0] && d.year <= year[1] && d.entity === region).sort((a, b) => xValue(b) - xValue(a));

    const siFormat = format(",.0f")
    const xAxisTickFormat = tickValue => siFormat(tickValue)

    const xScale = scaleLinear()
        .domain([0, max(filteredData, xValue)])
        .range([0, innerWidth]);

    const yScale = scaleBand()
        .domain(filteredData.map(yValue))
        .range([0, innerHeight])
        .paddingInner(0.15);


    const countries = new Set(data.map(d => d.entity));
    const options = [...countries].map(d => ({"name": d, "value": d}));

    return (
        <>
            <RangeSlider data={data} setYear={setYear} defaultValue={defaultYear}/>
            <SelectSearch options={options} value="sv" name="language" placeholder="Choose region" search={true}
                          onChange={e => setRegion(e)} value={region}/>
            <svg width={width} height={height}>
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
                        {region}, {year[0] === year[1] ? year[0] : `${year[0]}-${year[1]}`}
                    </text>

                    {year[0] === year[1] &&
                        <BarChart
                            data={filteredData}
                            xScale={xScale}
                            yScale={yScale}
                            xValue={xValue}
                            yValue={yValue}
                            tooltipFormat={xAxisTickFormat}
                            valueFormat={xAxisTickFormat}
                            innerHeight={innerHeight}
                        />
                    }
                </g>
                {/*<Slider*/}
                {/*    data={data}*/}
                {/*    width={width}*/}
                {/*    innerHeight={height}*/}
                {/*    margin={margin}*/}
                {/*    setYear={setYear}*/}
                {/*    tickFormat={format("")}*/}
                {/*/>*/}
            </svg>
        </>
    )

}