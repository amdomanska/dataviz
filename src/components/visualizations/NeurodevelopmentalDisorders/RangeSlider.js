import React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import {max, min} from "d3";

export default function RangeSlider({data, setYear, defaultValue}) {
    const [rangeValue, setRangeValue] = React.useState([defaultValue, defaultValue+1]);
    const [singleValue, setSingleValue] = React.useState(defaultValue);
    const [isSingleMode, setIsSingleMode] = React.useState(true);

    const yearValue = d => d.year;
    const minYear = min(data, yearValue);
    const maxYear = max(data, yearValue);
    const step = 1;

    const handleChange = (e, newValue) => {
        if (isSingleMode) {
            if (Math.abs(newValue-singleValue) > 1) {
                const newRangeValue = [singleValue, newValue].sort();
                setYear(newRangeValue);
                setRangeValue([singleValue, newValue].sort());
                setIsSingleMode(false);
            }
            else {
                setSingleValue(newValue);
                setYear([newValue, newValue]);
            }
        }
        else {
            setRangeValue(newValue);
            setYear(rangeValue);
        }
    }

    const handleMouseUp = () => {
        console.log("mouse up!")
        if (!isSingleMode) {
            if (rangeValue[0] === rangeValue[1]) {
                setSingleValue(rangeValue[0]);
                setYear([rangeValue[0], rangeValue[0]]);
                setIsSingleMode(true);
            }
        }
    }

    return (
        <Box sx={{ width: 300 }}>
            <Slider
                value={isSingleMode ? singleValue : rangeValue}
                min={minYear}
                max={maxYear}
                onChange={handleChange}
                valueLabelDisplay="auto"
                marks
                step={step}
                onMouseUp={handleMouseUp}
            />
        </Box>
    );
}
