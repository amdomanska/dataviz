import {LinearAxisLeft} from "../../shared/LinearAxisLeft";
import {AxisBottomIntegers} from "../../shared/AxisBottomIntegers";
import {useState} from "react";
import * as d3 from "d3";
import {CircleMarks} from "../../shared/CircleMarks";
import {VerticalTooltip} from "./verticalTooltip";

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
                                   hoveredValue
                               }) => {
    const [hoveredYear, setYearHovered] = useState(null);

    const disorders = new Set(data.map(d => d.disorder));
    const data_by_disorder = [...disorders].map(d => {
        return data.filter(x => x.disorder === d);
    });

    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.cases));

    const filteredData = data_by_disorder.flat().filter(d => (d.disorder === hoveredValue))


    return (
        <>
            <LinearAxisLeft
                yScale={yScale}
                innerWidth={innerWidth}
                tickFormat={yTickFormat}
            />
            <AxisBottomIntegers
                xScale={xScale}
                innerWidth={innerWidth}
                innerHeight={innerHeight}
                tickFormat={xTickFormat}
            />
            <g opacity={hoveredValue ? fadeOpacity : 1}>
                {data_by_disorder.map((d, i) =>
                    <path key={i} fill="none" stroke={colorScale(colorValue(d[0]))} strokeWidth={3} d={line(d)}/>
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
                    <path key={i} fill="none" stroke={colorScale(colorValue(d[0]))} strokeWidth={1.5} d={line(d)}/>
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
                             marked={hoveredYear}
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
                                 marked={hoveredYear}
                    />
                </>
            }

            ));
            <VerticalTooltip
                xScale={xScale}
                colorScale={colorScale}
                data={data}
                innerHeight={innerHeight}
                innerWidth={innerWidth}
                tickSize={marksRadius}
                setYearHovered={setYearHovered}
            />
        </>
    )
}