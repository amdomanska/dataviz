import {useEffect, useRef, useState} from 'react';
import {histogram, max, scaleLinear, format} from 'd3';
import kitty from './kitty.jpg';
import {LinearAxisLeft} from '../../shared/LinearAxisLeft';
import {AxisBottomIntegers} from '../../shared/AxisBottomIntegers';
import {Marks} from "../Migrants/Histogram/Marks";
import {HistogramMarks} from "./histogramMarks";

const histHeight = 200;
const margin = {top: 5, right: 5, bottom: 5, left: 5};

export const ImageAnalyzer = () => {
    const canvasRef = useRef();
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState(null);

    let img = new Image();
    img.src = kitty;

    useEffect(() => {

        img.onload = () => {
            // Create a canvas element to get pixel data
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);

            // Get pixel data
            const imageData = context.getImageData(0, 0, img.width, img.height).data;

            // Collect RGB values
            const rgbValues = [];
            for (let i = 0; i < imageData.length; i += 4) {
                const red = imageData[i];
                const green = imageData[i + 1];
                const blue = imageData[i + 2];
                rgbValues.push({red, green, blue});
            }

            setData(rgbValues);
            setLoaded(true);
        };
    }, []); // Empty dependency array ensures useEffect runs only once

    if (!loaded || !data) {
        return <canvas ref={canvasRef} style={{border: '1px solid black'}}/>;
    }

    const redBins = histogram().value((d) => d.red).domain([0, 255]).thresholds(256);
    const greenBins = histogram().value((d) => d.green).domain([0, 255]).thresholds(256);
    const blueBins = histogram().value((d) => d.blue).domain([0, 255]).thresholds(256);

    const histRed = redBins(data);
    const histGreen = greenBins(data);
    const histBlue = blueBins(data);

    // Assuming histRed, histGreen, and histBlue are arrays of bins
    const allBins = [...histRed, ...histGreen, ...histBlue];

    // Extract the counts from each bin
    const counts = allBins.map((bin) => bin.length);

    const maxCount = max(counts);

    const yScale = scaleLinear().domain([0, maxCount]).range([0, histHeight]).nice();

    const xScale = scaleLinear().domain([0, 255]).range([0, img.width]);

    const innerWidth = img.width + margin.left + margin.right;
    const innerHeight = histHeight + margin.bottom + margin.top;

    return (
        <>
            <canvas ref={canvasRef} style={{border: '1px solid red'}}/>
            <svg width={innerWidth} height={innerHeight} transform={`translate(${-1*innerWidth+margin.left},${margin.top})`}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <LinearAxisLeft innerWidth={img.width} yScale={yScale}/>
                    <AxisBottomIntegers innerHeight={histHeight} xScale={xScale}/>
                    <HistogramMarks yScale={yScale} xScale={xScale} bins={histRed} innerHeight={innerHeight} color={"red"}/>
                    <HistogramMarks yScale={yScale} xScale={xScale} bins={histBlue} innerHeight={innerHeight} color={"blue"}/>
                    <HistogramMarks yScale={yScale} xScale={xScale} bins={histGreen} innerHeight={innerHeight} color={"green"}/>
                </g>
            </svg>
        </>
    );
};
