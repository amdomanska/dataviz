import {LinearAxisLeft} from "../../shared/LinearAxisLeft";
import {TimeAxisBottom} from "../../shared/timeAxisBottom";
import {useEffect, useRef} from "react";
import {brushX, select, line, curveBasis, timeMonth} from "d3";

export const MultilineChart = ({
                                   data,
                                   xScale,
                                   yScale,
                                   innerWidth,
                                   innerHeight,
                                   xTickFormat,
                                   yTickFormat,
                                   enableBrush = false,
                                   onBrush = null,
                                   defaultTimeRange
                               }) => {

    console.log(data[0])
    const chartLine = line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.cases))
        .curve(curveBasis);

    const brushRef = useRef();

    useEffect(() => {
        const brush = brushX().extent([[0, 0], [innerWidth, innerHeight]]);
        brush(select(brushRef.current));
        brush.on('brush end', (e) => {
            decodeSelection(e.selection);
        });
        const decodeSelection = (brushExtent) => {
            if (brushExtent) {
                onBrush(brushExtent.map(xScale.invert));
            } else {
                onBrush(defaultTimeRange);
            }
        }
    }, [innerWidth, innerHeight, defaultTimeRange, onBrush, xScale])


    return (
        <>
            {enableBrush && <g ref={brushRef}/>}
            <LinearAxisLeft
                yScale={yScale}
                innerWidth={innerWidth}
                tickFormat={yTickFormat}
            />
            <TimeAxisBottom
                xScale={xScale}
                innerHeight={innerHeight}
                tickFormat={xTickFormat}
                interval={timeMonth.every(3)}
            />
            <path fill="none" stroke={"red"} strokeWidth={1.5} d={chartLine(data)}/>
        </>
    )
}