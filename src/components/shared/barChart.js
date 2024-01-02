import {OrdinalAxisLeft} from "./OrdinalAxisLeft";
import {AxisBottom} from "./AxisBottom";
import React from "react";
import {RectMarks} from "./RectMarks";

export const BarChart = ({xScale, xValue, yScale, yValue, innerHeight, tooltipFormat, valueFormat, data}) => (
    <>
        <OrdinalAxisLeft
            yScale={yScale}
        />
        <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={null}
        />
        <RectMarks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={tooltipFormat}
            valueFormat={valueFormat}
        />
    </>
)