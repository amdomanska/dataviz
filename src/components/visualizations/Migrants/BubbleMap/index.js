import React from 'react';
import {useWorldAtlas} from "../../../shared/useWorldAtlas";
import {MapMarks} from "../../../shared/MapMarks";
import {scaleSqrt, max, geoNaturalEarth1} from 'd3';
import {Marks} from "./Marks";

export const BubbleMap = ({data, width, height}) => {
    const worldAtlas = useWorldAtlas();
    if (!worldAtlas) {
        return <p>Loading...</p>
    }

    const maxRadius = 15;

    const projection = geoNaturalEarth1()
        .fitSize([width, height], {type: 'Sphere'});

    const sizeValue = d => d.total;

    const sizeScale = scaleSqrt()
        .domain([0, max(data, sizeValue)])
        .range([0, maxRadius]);

    return (
        <>
            <MapMarks worldAtlas={worldAtlas}
                      projection={projection}
            />
            <Marks data={data}
                   projection={projection}
                   sizeScale={sizeScale}
                   sizeValue={sizeValue}
            />
        </>
    )


}