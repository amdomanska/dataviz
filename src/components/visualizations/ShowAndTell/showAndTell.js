import React, {useState, useEffect} from 'react';
import {csv, extent, format, scaleLinear, scaleOrdinal, scaleTime, timeFormat} from 'd3';
import {MultilineChart} from "./multilineChart";
import {Legend} from "./legend";

// import {LeftAxis} from "./leftAxis";
// import {TimeAxis} from "./timeAxis";
// import {ChartMarkers} from "./chartMarkers";

const url =
    'https://gist.githubusercontent.com/amdomanska/56e7cb5803523a05463c833fc57c1886/raw/34b3349e51b6a4250e6f409314361422f492ec0b/nddisorders.csv';

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

const width = 1440;
const height = 800;
const margin = {top: 120, right: 350, bottom: 100, left: 75};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const marksRadius = 5;

export const ShowAndTell = () => {
    const [data, setData] = useState(null);
    const [hoveredValue, setHoveredValue] = useState(null);

    console.log(hoveredValue);

    useEffect(() => {
        csv(url).then((data) => {
            const reshapedData = data.map(d => {
                return Object.entries(labelsMap).map(([key, value]) => {
                        return {
                            year: +d["Year"],
                            disorder: value,
                            cases: +d[key],
                        }
                    }
                )
            }).flat();
            setData(reshapedData);
        });
    }, [url]);

    if (!data) {
        return (
            <p>Loading...</p>
        )
    }

    const disorders = new Set(data.map(d => d.disorder));
    const dataByDisorder = [...disorders].map(d => {
        return data.filter(x => x.disorder === d);
    });

    const yValue = d => d.cases;
    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([innerHeight, 0]).nice();

    const timeValue = d => new Date(d.year, 0);
    const xScale = scaleTime()
        .domain(extent(data, timeValue))
        .range([0, innerWidth]).nice();

    const colors = ["#ff4040", "#e78d0b", "#a7d503", "#58fc2a", "#18f472", "#00bfbf", "#1872f4", "#582afc", "#a703d5", "#e70b8d", "#ff4040"];
    const colorValue = d => d.disorder;
    const colorScale = scaleOrdinal()
        .domain([...disorders])
        .range(colors)

    const cFormat = format(".2s")
    const tFormat = timeFormat("%Y");

    const fadeOpacity = 0.2;

    return (
        <>
            <svg width={width} height={height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <text
                        className="axis-label"
                        x={-margin.left + 20}
                        y={-margin.top / 2 - 10}
                        textAnchor="start"
                    >
                        Number with a mental or neurodevelopmental disorder by type
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
                        cFormat={cFormat}
                        tFormat={tFormat}
                        timeValue={timeValue}
                        innerHeight={innerHeight}
                        data={dataByDisorder}
                        xScale={xScale}
                        yScale={yScale}
                        yValue={yValue}
                        colorScale={colorScale}
                        innerWidth={innerWidth}
                        colorValue={colorValue}
                        marksRadius={marksRadius}
                        hoveredValue={hoveredValue}
                        fadeOpacity={0.2}
                    />
                    <Legend
                        colorScale={colorScale}
                        tickSize={marksRadius}
                        innerWidth={innerWidth}
                        onHover={setHoveredValue}
                        hoveredValue={hoveredValue}
                        fadeOpacity={fadeOpacity}
                    />
                </g>
            </svg>
        </>
)
}




































