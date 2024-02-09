import React, {useState, useContext, useEffect} from "react";
import {extent, format, scaleLinear, scaleOrdinal, scaleTime, timeFormat, csv} from "d3";
import {AreaContext} from "../../AreaContext";
import {MultilineChart} from "./multilineChart";
import {ColorLegend} from "../../shared/ColorLegend";

const margin = {top: 120, right: 350, bottom: 80, left: 75}

const defaultTimeRange = [1999, 2020];

const labelsMap = {
    "Current number of cases of anxiety disorders, in both sexes aged all ages": "Anxiety Disorders",
    "Current number of cases of attention-deficit/hyperactivity disorder, in both sexes aged all ages": "ADHD",
    "Current number of cases of autism spectrum disorders, in both sexes aged all ages": "Autism spectrum disorders",
    "Current number of cases of bipolar disorder, in both sexes aged all ages": "Bipolar disorders",
    "Current number of cases of conduct disorder, in both sexes aged all ages": "Conduct disorders",
    "Current number of cases of depressive disorders, in both sexes aged all ages": "Depressive disorders",
    "Current number of cases of eating disorders, in both sexes aged all ages": "Eating disorders",
    "Current number of cases of idiopathic developmental intellectual disability, in both sexes aged all ages": "Developmental intellectual disability",
    "Current number of cases of other drug use disorders, in both sexes aged all ages": "Other drug use disorders",
    "Current number of cases of other mental disorders, in both sexes aged all ages": "Other mental disorders",
    "Current number of cases of schizophrenia, in both sexes aged all ages": "Schizophrenia"
}

export const NeurodevelopmentalDisordersWithBrush = ({url}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const row = (d) => {
            d.year = +d["Year"];
            return d;
        };

        csv(url, row)
            .then(data => {
                // Reshape the data to have one row per disorder for each entity
                const reshapedData = data.map(d => {
                    return Object.entries(labelsMap).map(([key, value]) => {
                        return {
                            year: d.year,
                            entity: d["Entity"],
                            code: d["Code"],
                            disorder: value,
                            cases: +d[key],
                        }
                    })
                }).flat();
                setData(reshapedData);
            })
            .catch(error => {
                console.error('Error fetching or processing data:', error);
            });
    }, [url]);

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

    const filteredData = data.filter((d) => d.year >= startYear && d.year <= endYear && d.entity === region);

    const tFormat = timeFormat("%Y");

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
                    <g transform={`translate(0,${margin.top + innerHeight})`}>
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