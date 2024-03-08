import {useEffect, useRef, useState} from 'react';
import {histogram, max, scaleLinear} from 'd3';
import kitty from './kitty.jpg';
import {Histogram} from "./histogram";

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

    const innerWidth = img.width;
    const innerHeight = histHeight + margin.bottom + margin.top;

    return (
        <div className="img_hist_container">
            <canvas ref={canvasRef} style={{border: '1px solid red'}}/>
            <svg width={innerWidth+margin.left+margin.right} height={innerHeight} transform={`translate(${-1*margin.left},0)`}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <Histogram data={histRed} xScale={xScale} yScale={yScale} innerHeight={histHeight / 3}
                               innerWidth={innerWidth} color={"red"}/>
                </g>
                <g transform={`translate(${margin.left},${histHeight/3 + margin.top})`}>
                    <Histogram data={histBlue} xScale={xScale} yScale={yScale} innerHeight={histHeight / 3}
                               innerWidth={innerWidth} color={"blue"}/>
                </g>
                <g transform={`translate(${margin.left},${2* histHeight/3 + margin.top})`}>
                    <Histogram data={histGreen} xScale={xScale} yScale={yScale} innerHeight={histHeight / 3}
                               innerWidth={innerWidth} color={"green"}/>
                </g>
            </svg>
        </div>
    );
};
