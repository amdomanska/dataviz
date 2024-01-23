import { useEffect, useRef } from 'react';
import { brush, select, DOM, scaleLinear } from 'd3';

const imgWidth = 1280;
const imgHeight = 1014;

const width = 1000;
const scaleFactor = width/imgWidth;
const height = imgHeight * scaleFactor;
const imageUrl =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg';

export const ImageAnalyzer = () => {
    return <p>In progress...</p>
    // const r = new Uint16Array(257);
    // const g = new Uint16Array(257);
    // const b = new Uint16Array(257);
    //
    // const brushRef = useRef();
    //
    // const context = DOM.context(width, height, 1);
    // context.willReadFrequently = true;
    //
    // const xScale = scaleLinear()
    // .domain([0, 256])
    // .rangeRound([0, width])
    //
    // const yScale = scaleLinear()
    // .rangeRound([0, height / 4])
    //
    // useEffect(() => {
    //
    //     const brushInstance = brush().extent([
    //         [0, 0],
    //         [width, height],
    //     ]);
    //     brushInstance(select(brushRef.current));
    //     brushInstance.on('brush end', brushed);
    // }, []);
    //
    // const brushed = ({selection: [[x0, y0], [x1, y1]]}) => {
    //     x0 = Math.round(x0);
    //     y0 = Math.round(y0);
    //     x1 = Math.round(x1);
    //     y1 = Math.round(y1);
    //     const dx = x1 - x0, dy = y1 - y0;
    //
    //     r.fill(0);
    //     g.fill(0);
    //     b.fill(0);
    //
    //     if (x1 > x0 && y1 > y0) {
    //         const data = context.getImageData(x0, y0, dx, dy).data;
    //         let max = 0;
    //         for (let i = 0, k = -1; i < dx; ++i) {
    //             for (let j = 0; j < dy; ++j, ++k) {
    //                 max = Math.max(max, ++r[data[++k]], ++g[data[++k]], ++b[data[++k]]);
    //             }
    //         }
    //         yScale.domain([0, max]);
    //     }
    // }
    //
    // return (
    //     <svg width={width} height={height}>
    //         <image xlinkHref={imageUrl} width={width} height={height}/>
    //         <g ref={brushRef} />
    //     </svg>
    // );
};
