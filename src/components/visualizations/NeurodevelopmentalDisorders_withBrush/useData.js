import {csv} from 'd3-fetch';
import {useState, useEffect} from 'react';

const labelsMap = {
    "Current number of cases of anxiety disorders, in both sexes aged all ages": "Anxiety Disorders",
    "Current number of cases of attention-deficit/hyperactivity disorder, in both sexes aged all ages": "ADHD",
    "Current number of cases of autism spectrum disorders, in both sexes aged all ages": "Autism spectrum disorders",
    "Current number of cases of bipolar disorder, in both sexes aged all ages": "Bipolar disorders",
    "Current number of cases of conduct disorder, in both sexes aged all ages": "Conduct disorders",
    "Current number of cases of depressive disorders, in both sexes aged all ages": "Depressive disorders",
    "Current number of cases of eating disorders, in both sexes aged all ages": "Eating disorders",
    "Current number of cases of idiopathic developmental intellectual disability, in both sexes aged all ages": "Developmental intellectual disability",
    "Current number of cases of other drug use disorders, in both sexes aged all ages": "Other drug use disorders",
    "Current number of cases of other mental disorders, in both sexes aged all ages": "Other mental disorders",
    "Current number of cases of schizophrenia, in both sexes aged all ages": "Schizophrenia"
}

export const useData = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const row = (d) => {
            d.year = +d["Year"];
            return d;
        };

        csv(url, row)
            .then(data => {
                // Reshape the data to have one row per disorder for each entity
                const reshapedData = data.map(d => {
                    return Object.entries(labelsMap).map(([key, value]) => {
                        return {
                            year: d.year,
                            entity: d["Entity"],
                            code: d["Code"],
                            disorder: value,
                            cases: +d[key],
                        }
                    })
                }).flat();
                setData(reshapedData);
            })
            .catch(error => {
                console.error('Error fetching or processing data:', error);
            });
    }, [url]);

    return data;
};
