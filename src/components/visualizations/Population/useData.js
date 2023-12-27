import {useState, useEffect} from 'react'
import {csv, descending} from 'd3';

export const useData = (url) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        const row = (d) => {
            d.Population = +d['2020']*1000
            return d;
        }
        csv(url, row).then(data => {
            data.sort((x,y) => {
                return descending(x.Population, y.Population)
            })
            setData(data.slice(0,10));
        });
    }, [url])

    return data
}