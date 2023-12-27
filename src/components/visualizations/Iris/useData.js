import {useState, useEffect} from 'react'
import {csv} from 'd3';

export const useData = (url) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        const row = (d) => {
            d.petal_length = +d.petal_length;
            d.petal_width = +d.petal_width;
            d.sepal_width = +d.sepal_width;
            d.sepal_length = +d.sepal_length;
            return d;
        }
        csv(url, row).then(data => {
            setData(data);
        });
    }, [url])

    return data
}