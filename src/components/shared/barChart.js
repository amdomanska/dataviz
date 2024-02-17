import {OrdinalAxisLeft} from "./OrdinalAxisLeft";
import {AxisBottomIntegers} from "./AxisBottomIntegers";
import React from "react";
import {RectMarks} from "./RectMarks";

export const BarChart = ({xScale, xValue, yScale, yValue, innerHeight, tooltipFormat, valueFormat, data}) => (
    <>
        <OrdinalAxisLeft
            yScale={yScale}
        />
        <AxisBottomIntegers
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