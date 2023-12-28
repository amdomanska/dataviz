import React, {useEffect} from 'react';
import {csv} from "d3";

export const useData = (url) => {
    const [data, setData] = React.useState(null);
    useEffect(() => {
        const row = (d) => {
            d.total = +d["Total Dead and Missing"];
            d.date = new Date(d["Reported Date"]);
            let tempArr = d["Location Coordinates"].split(",");
            d.location = {x: +tempArr[0], y: +tempArr[1]};
            return d;
        }
        csv(url, row).then(data => {
            setData(data);
        });
    }, [url])

    return data
}