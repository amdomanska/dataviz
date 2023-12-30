import {useEffect, useRef, selectRef} from "react";
import {min, max, select} from "d3";
import {sliderBottom} from "d3-simple-slider";

export const Slider = ({
                           data,
                           width,
                           innerHeight,
                           margin,
                           tickFormat,
                           setYear
                       }) => {
    const sliderRef = useRef();

    useEffect(() => {
        const yearValue = d => d.year;
        const minYear = min(data, yearValue);
        const maxYear = max(data, yearValue);
        const step = 1;
        const availableYears = Array.from({length: Math.floor((maxYear - minYear) / step) + 1}, (_, index) => minYear + index * step);
        console.log(availableYears)

        const slider = sliderBottom()
            .min(minYear)
            .max(maxYear)
            .marks(availableYears)
            .width(width-margin.right)
            .tickFormat(tickFormat)
            .tickValues(availableYears)
            .displayValue(false)
            .on("onchange", (e) => setYear(e))
        slider(select(sliderRef.current));
    }, [width, setYear])

    return <g className="slider" ref={sliderRef} transform={`translate(${20}, ${innerHeight-margin.top+30})`} />
}