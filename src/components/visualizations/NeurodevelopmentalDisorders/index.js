import React, {useState, useContext} from "react";
import {useData} from "./useData";
import {extent, format, max, scaleBand, scaleLinear, scaleOrdinal, scaleTime, timeFormat} from "d3";
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import RangeSlider from "./RangeSlider"
import {BarChart} from "../../shared/barChart";
import {AreaContext} from "../../AreaContext";
import {MultilineChart} from "./multilineChart";
import {ColorLegend} from "../../shared/ColorLegend";

const barChartMargin = {top: 120, right: 120, bottom: 80, left: 320}
const multilineChartMargin = {top: 120, right: 350, bottom: 80, left: 75}
const defaultYear = 1990;

export const NeurodevelopmentalDisorders = ({url}) => {
    const data = useData(url);
    const [region, setRegion] = useState("World");
    const [year, setYear] = useState([defaultYear, defaultYear]);
    const [hoveredValue, setHoveredValue] = useState(null)
    const {width, height} = useContext(AreaContext);

    // console.log(year);
    const isBarChartMode = year[0] === year[1];

    let margin = isBarChartMode ? barChartMargin : multilineChartMargin;

    if (data === null) {
        return <p>Loading...</p>
    }

    const title = `Number with a mental or neurodevelopmental disorder by type`

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.right - margin.left;

    const disorderValue = x => x.disorder;
    const casesValue = x => x.cases;
    const timeValue = x => new Date(x.year, 0);
    const fakeTimeValue = x => x.year;

    const filteredData = data.filter((d) => d.year >= year[0] && d.year <= year[1] && d.entity === region).sort((a, b) => casesValue(b) - casesValue(a));

    const siFormat = format(",.0f")
    const xAxisTickFormat = tickValue => siFormat(tickValue)

    const tFormat = format("");

    const cFormat = format(".2s")
    const casesFormat = tickValue => cFormat(tickValue)

    const xScale = scaleLinear()
        .domain([0, max(filteredData, casesValue)])
        .range([0, innerWidth]);

    const yScale = scaleBand()
        .domain(filteredData.map(disorderValue))
        .range([0, innerHeight])
        .paddingInner(0.15);

    const timeScale = scaleTime()
        .domain(extent(filteredData, timeValue))
        .range([0, innerWidth])
        .nice();

    const fakeTimeScale = scaleLinear()
        .domain(extent(filteredData, fakeTimeValue))
        .range([0, innerWidth])
        .nice();

    const casesScale = scaleLinear()
        .domain(extent(filteredData, casesValue))
        .range([innerHeight, 0])
        .nice();

    const disorders = new Set(data.map(d => d.disorder));

    const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
    const colorScale = scaleOrdinal()
        .domain([...disorders])
        .range(colors)

    const countries = new Set(data.map(d => d.entity));
    const options = [...countries].map(d => ({"name": d, "value": d}));

    const marksRadius = 4;
    const hoveredMarksRadius = 5;

    return (
        <>
            <RangeSlider data={data} setYear={setYear} defaultValue={defaultYear} width={innerWidth}/>
            <SelectSearch options={options} name="language" placeholder="Choose region" search={true}
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
                    <ColorLegend
                        colorScale={colorScale}
                        tickSize={5}
                        innerWidth={innerWidth}
                        onHover={setHoveredValue}
                        fadeOpacity={0.2}
                        hoveredValue={hoveredValue}
                    />
                    {isBarChartMode ?
                        <BarChart
                            data={filteredData}
                            xScale={xScale}
                            yScale={yScale}
                            xValue={casesValue}
                            yValue={disorderValue}
                            tooltipFormat={xAxisTickFormat}
                            valueFormat={xAxisTickFormat}
                            innerHeight={innerHeight}
                        />
                        :
                        <>
                            <MultilineChart
                                data={filteredData}
                                xScale={fakeTimeScale}
                                xValue={fakeTimeValue}
                                yScale={casesScale}
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
                            />
                        </>
                    }
                </g>
            </svg>
        </>
    )

}