import {geoPath, geoGraticule} from 'd3';

export const MapMarks = ({worldAtlas: {land, interiors}, projection}) => {

    const path = geoPath(projection);
    const graticule = geoGraticule();

    return (
        <g className="world-marks">
            <path className="sphere" d={path({type: 'Sphere'})}/>
            <path className="graticules" d={path(graticule())}/>
            {land.features.map((feature, idx) => (
                <path key={idx} className="land" d={path(feature)}/>
            ))}
            <path className="interiors" d={path(interiors)}/>
        </g>
    )
};
