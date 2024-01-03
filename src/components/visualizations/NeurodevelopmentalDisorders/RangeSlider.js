import {useState, useRef, useEffect} from 'react';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {max, min} from "d3";

export default function RangeSlider({data, setYear, defaultValue}) {
    const [rangeValue, setRangeValue] = useState([defaultValue, defaultValue+1]);
    const [singleValue, setSingleValue] = useState(defaultValue);
    const [isSingleMode, setIsSingleMode] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const isAfterClick = useRef(false);
    let intervalId = useRef();

    const yearValue = d => d.year;
    const minYear = min(data, yearValue);
    const maxYear = max(data, yearValue);
    const step = 1;

    useEffect(() => {
        // Cleanup interval on component unmount
        return () => {
            if (intervalId.current){
                clearInterval(intervalId.current);
            }
        };
    }, []);

    const runAnimation = () => {
        let newValue = isSingleMode ? singleValue : rangeValue[1];
        setIsAnimating(true);

        intervalId.current = setInterval(() => {
            console.log("start: ",rangeValue);
            newValue = newValue + 1;
            if (newValue <= 2019) {
                setIsSingleMode(false);
                const newRangeValue = isSingleMode ? [singleValue, newValue] : [rangeValue[0], newValue];
                setRangeValue(newRangeValue);
                setYear(newRangeValue);
            } else {
                clearInterval(intervalId.current);
                setIsAnimating(false);
            }
        }, 1000);
    };

    const stopAnimation = () => {
        clearInterval(intervalId.current);
        setIsAnimating(false);
        console.log("stop: ", rangeValue);
    }

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
            <Button variant="outlined" onClick={!isAnimating ? runAnimation : stopAnimation}>{!isAnimating ? `Start Animation` : `Stop Animation`}</Button>
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
