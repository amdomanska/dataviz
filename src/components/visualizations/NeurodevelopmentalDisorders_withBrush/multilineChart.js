import {LinearAxisLeft} from "../../shared/LinearAxisLeft";
import {AxisBottom} from "../../shared/AxisBottom";
import {CircleMarks} from "../../shared/CircleMarks";
import {useEffect, useRef} from "react";
import {brushX, select, line} from "d3";

export const MultilineChart = ({
                                   data,
                                   xScale,
                                   xValue,
                                   yScale,
                                   yValue,
                                   innerWidth,
                                   innerHeight,
                                   xTickFormat,
                                   yTickFormat,
                                   colorScale,
                                   colorValue,
                                   marksRadius,
                                   fadeOpacity,
                                   hoveredValue,
                                   enableBrush = false,
                                   onBrush = null,
                                   defaultTimeRange
                               }) => {

    const disorders = new Set(data.map(d => d.disorder));

    const data_by_disorder = [...disorders].map(d => {
        return data.filter(x => x.disorder === d);
    });

    const filteredData = data_by_disorder.flat().filter(d => (d.disorder === hoveredValue))

    const chartLine = line()
        .x(d => xScale(new Date(d.year, 0)))
        .y(d => yScale(d.cases));

    const brushRef = useRef();

    useEffect(() => {
        const brush = brushX().extent([[0, 0], [innerWidth, innerHeight]]);
        brush(select(brushRef.current));
        brush.on('brush end', (e) => {
            decodeSelection(e.selection);
        });
        const decodeSelection = (brushExtent) => {
            if (brushExtent) {
                let selectedTimeValues = brushExtent.map(xScale.invert);
                let years = selectedTimeValues.map(date => date.getFullYear());
                onBrush(years);
            } else {
                onBrush(defaultTimeRange);
            }
        }
    }, [innerWidth, innerHeight])


    return (
        <>
            {enableBrush && <g ref={brushRef}/>}
            <LinearAxisLeft
                yScale={yScale}
                innerWidth={innerWidth}
                tickFormat={yTickFormat}
            />
            <AxisBottom
                xScale={xScale}
                innerHeight={innerHeight}
                tickFormat={xTickFormat}
            />
            <g opacity={hoveredValue ? fadeOpacity : 1}>
                {data_by_disorder.map((d, i) =>
                    <path key={i} fill="none" stroke={colorScale(colorValue(d[0]))} strokeWidth={3} d={chartLine(d)}/>
                )}
                <CircleMarks data={data_by_disorder.flat()}
                             xScale={xScale}
                             xValue={xValue}
                             yScale={yScale}
                             yValue={yValue}
                             radius={marksRadius}
                             colorScale={colorScale}
                             colorValue={colorValue}
                             tooltip={false}
                />
            </g>
            <g opacity={hoveredValue ? fadeOpacity : 1}>
                {data_by_disorder.map((d, i) =>
                    <path key={i} fill="none" stroke={colorScale(colorValue(d[0]))} strokeWidth={1.5} d={chartLine(d)}/>
                )}
                <CircleMarks data={data_by_disorder.flat()}
                             xScale={xScale}
                             xValue={xValue}
                             yScale={yScale}
                             yValue={yValue}
                             radius={marksRadius}
                             colorScale={colorScale}
                             colorValue={colorValue}
                             tooltip={false}
                />
            </g>
            {filteredData.length > 0 &&
                <>
                    <path fill="none" stroke={colorScale(colorValue(filteredData[0]))} strokeWidth={1.5}
                          d={line(filteredData)}/>
                    <CircleMarks data={filteredData}
                                 xScale={xScale}
                                 xValue={xValue}
                                 yScale={yScale}
                                 yValue={yValue}
                                 radius={marksRadius}
                                 colorScale={colorScale}
                                 colorValue={colorValue}
                                 tooltip={false}
                    />
                </>
            }

            ));

        </>
    )
}