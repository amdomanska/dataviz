import {OrdinalAxisLeft} from "../../shared/OrdinalAxisLeft";
import {AxisBottom} from "../../shared/AxisBottom";
import React from "react";
import {RectMarks} from "../../shared/RectMarks";

export const BarChart = ({xScale, xValue, yScale, yValue, innerHeight, tooltipFormat, valueFormat, data}) => (<>
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