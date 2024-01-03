import {useState, useRef} from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import {max, min} from "d3";

export default function RangeSlider({data, setYear, defaultValue}) {
    const [rangeValue, setRangeValue] = useState([defaultValue, defaultValue+1]);
    const [singleValue, setSingleValue] = useState(defaultValue);
    const [isSingleMode, setIsSingleMode] = useState(true);
    const isAfterClick = useRef(false);

    const yearValue = d => d.year;
    const minYear = min(data, yearValue);
    const maxYear = max(data, yearValue);
    const step = 1;

    const handleChange = (e, newValue) => {
        if (isAfterClick.current && isSingleMode) {
            if (Math.abs(newValue-singleValue) > 1) {
                setIsSingleMode(false);
                const newRangeValue = [singleValue, newValue].sort()
                setRangeValue(newRangeValue);
                setYear(newRangeValue);
            }
        }
        else {
            isSingleMode ? setSingleValue(newValue) : setRangeValue(newValue);
            setYear(isSingleMode ? [newValue, newValue] : newValue);
        }
        isAfterClick.current = false;
    }

    const handleMouseDown = () => {
        isAfterClick.current = true;
    }

    const handleMouseUp = () => {
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
                onMouseDown={handleMouseDown}
            />
        </Box>
    );
}
