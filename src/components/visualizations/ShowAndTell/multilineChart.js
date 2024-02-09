import {LeftAxis} from "./leftAxis";
import {TimeAxis} from "./timeAxis";
import {ChartMarkers} from "./chartMarkers";
import React from "react";

export const MultilineChart = ({
                                   cFormat,
                                   tFormat,
                                   timeValue,
                                   innerHeight,
                                   data,
                                   xScale,
                                   yScale,
                                   yValue,
                                   colorScale,
                                   colorValue,
                                   marksRadius,
                                   innerWidth,
                                   hoveredValue,
                                   fadeOpacity,
                                   filteredData
                               }) => {
    return (<>
        <LeftAxis yScale={yScale} casesFormat={cFormat} innerWidth={innerWidth}/>
        <TimeAxis xScale={xScale} tickFormat={tFormat} innerHeight={innerHeight}/>
        <g opacity={hoveredValue ? fadeOpacity : 1}>
            {
                data.map((disorder, i) =>
                    <ChartMarkers
                        key={i}
                        data={disorder}
                        xScale={xScale}
                        xValue={timeValue}
                        yScale={yScale}
                        yValue={yValue}
                        radius={marksRadius}
                        color={colorScale(colorValue(disorder[0]))}
                        tooltip={true}
                    />
                )
            }
        </g>
        {hoveredValue &&
            <g>
                <ChartMarkers
                    data={filteredData}
                    xScale={xScale}
                    xValue={timeValue}
                    yScale={yScale}
                    yValue={yValue}
                    radius={marksRadius}
                    color={colorScale(colorValue(filteredData[0]))}
                    tooltip={true}
                />
            </g>
        }

    </>)
}
