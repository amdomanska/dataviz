import {useEffect, useMemo, useRef, useState} from 'react';
import {brush, histogram, max, min, scaleLinear, select} from 'd3';
import kitty from './kitty.jpg';
import {Histogram} from "./histogram";

const height = 200;
const histHeight = height / 3;
const margin = {top: 5, right: 5, bottom: 5, left: 5};

const redBins = histogram().value((d) => d.red).domain([0, 255]).thresholds(256);
const greenBins = histogram().value((d) => d.green).domain([0, 255]).thresholds(256);
const blueBins = histogram().value((d) => d.blue).domain([0, 255]).thresholds(256);

export const ImageAnalyzer = () => {
        const canvasRef = useRef();
        const [loaded, setLoaded] = useState(false);
        const [data, setData] = useState(null);
        const [brushExtent, setBrushExtent] = useState(null)
        const brushRef = useRef();
        let maxCount = 0;

        let img = new Image();
        img.src = kitty;

        const calculateMaxYAxisValue = (img) => {
            if (loaded) {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                const imageData = context.getImageData(0, 0, img.width, img.height).data;
                const rgbValues = [];
                for (let i = 0; i < imageData.length; i += 4) {
                    const red = imageData[i];
                    const green = imageData[i + 1];
                    const blue = imageData[i + 2];
                    rgbValues.push({red, green, blue});
                }

                const histRed = redBins(rgbValues);
                const histGreen = greenBins(rgbValues);
                const histBlue = blueBins(rgbValues);

                const allBins = [...histRed, ...histGreen, ...histBlue];
                const counts = allBins.map((bin) => bin.length);

                return max(counts);
            }
            return 0;

        }

        maxCount = useMemo(() => calculateMaxYAxisValue(img), [img, loaded]);

        img.onload = () => {
            // Create a canvas element to get pixel data
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);

                const [x0, y0, x1, y1] = brushExtent !== null ? brushExtent : [0, 0, img.width, img.height];
                const imageData = context.getImageData(x0, y0, x1, y1).data;

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

        if (loaded) {
            const b = brush().extent([[0, 0], [img.width, img.height]]);
            b(select(brushRef.current));
            b.on('brush end', (e) => {
                    if (e.selection) {
                        let [[_x0, _y0], [_x1, _y1]] = e.selection;
                        _x0 = Math.round(_x0)
                        _y0 = Math.round(_y0);
                        _x1 = Math.round(_x1);
                        _y1 = Math.round(_y1);

                        const x0 = Math.min(_x0, _x1);
                        const x1 = Math.max(_x0, _x1);
                        const y0 = Math.min(_y0, _y1);
                        const y1 = Math.max(_y0, _y1);

                        const dx = x1 - x0
                        const dy = y1 - y0;

                        if (dx <= 0 || dy <= 0) {
                            setBrushExtent(null);
                        }
                        setBrushExtent([x0, y0, dx, dy]);

                    } else {
                        setBrushExtent(null);
                    }
                }
            );
        }

        if (!loaded || !data) {
            return <canvas ref={canvasRef} style={{border: '1px solid black'}}/>;
        }

        const histRed = redBins(data);
        const histGreen = greenBins(data);
        const histBlue = blueBins(data);

        const yScale = scaleLinear().domain([0, maxCount]).range([0, histHeight]).nice();
        const xScale = scaleLinear().domain([0, 255]).range([0, img.width]);

        const innerWidth = img.width;
        const innerHeight = height + margin.bottom + margin.top;

        return (
            <div className="img_hist_container">
                <p>In progress...</p>
                <canvas ref={canvasRef} style={{border: '1px solid red'}}/>
                <svg width={innerWidth + margin.left + margin.right} height={innerHeight + img.height}
                     transform={`translate(${-1 * margin.left},${-1 * img.height})`}
                     style={{backgroundColor: "transparent"}}>
                    <g ref={brushRef}/>
                    <g transform={`translate(${margin.left},${img.height + margin.top})`}>
                        <Histogram data={histRed} xScale={xScale} yScale={yScale} innerHeight={histHeight}
                                   innerWidth={innerWidth} color={"red"}/>
                    </g>
                    <g transform={`translate(${margin.left},${img.height + histHeight + margin.top})`}>
                        <Histogram data={histBlue} xScale={xScale} yScale={yScale} innerHeight={histHeight}
                                   innerWidth={innerWidth} color={"blue"}/>
                    </g>
                    <g transform={`translate(${margin.left},${img.height + 2 * histHeight + margin.top})`}>
                        <Histogram data={histGreen} xScale={xScale} yScale={yScale} innerHeight={histHeight}
                                   innerWidth={innerWidth} color={"green"}/>
                    </g>
                </svg>
            </div>
        );
    }
;
