import {LinearAxisLeft} from "../../shared/LinearAxisLeft";
import {AxisBottomIntegers} from "../../shared/AxisBottomIntegers";
import {HistogramMarks} from "./histogramMarks";

export const Histogram = ({yScale, xScale, innerHeight, innerWidth, data, color}) =>
    <>
        <LinearAxisLeft innerWidth={innerWidth} yScale={yScale}/>
        <AxisBottomIntegers innerHeight={innerHeight} xScale={xScale}/>
        <HistogramMarks yScale={yScale} xScale={xScale} bins={data} innerHeight={innerHeight} color={color}/>
    </>