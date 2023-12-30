import {useEffect, useState} from 'react';
import {csv} from "d3";

export const useData = (url) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const row = (d) => {
            d.total = +d["Total Dead and Missing"];
            d.date = new Date(d["Reported Date"]);
            d.location = d["Location Coordinates"].split(",").map(d=>+d).reverse();
            // d.coords = d['Location Coordinates'].split(',').map(d => +d).reverse();
            return d;
        }
        csv(url, row).then(data => {
            setData(data);
        });
    }, [url])

    return data
}