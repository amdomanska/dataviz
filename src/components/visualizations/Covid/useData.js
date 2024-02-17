import {csv} from 'd3-fetch';
import {useState, useEffect} from 'react';

export const useData = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv(url)
            .then(data => {
                const reshapedData = data.map(d =>
                    (
                        {
                            cases: +d.UK,
                            date: new Date(d.date)
                        }
                    )
                )
                setData(reshapedData);
            })
            .catch(error => {
                console.error('Error fetching or processing data:', error);
            });
    }, [url]);

    return data;
};
