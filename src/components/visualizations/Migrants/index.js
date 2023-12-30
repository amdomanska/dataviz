import {useContext, useState} from "react";
import {useData} from "./useData"
import {Histogram} from "./Histogram";
import {BubbleMap} from "./BubbleMap";
import {AreaContext} from "../../AreaContext";

export const Migrants = ({url}) => {
    const {width, height} = useContext(AreaContext)
    const [brushExtent, setBrushExtent] = useState(null)
    const data = useData(url);
    if (!data) {
        return <p>Loading...</p>
    }
    const xValue = d => d.date
    const filteredData = brushExtent ? data.filter((d) => xValue(d) > brushExtent[0] && xValue(d) < brushExtent[1]) : data;

    return (
        <svg width={width} height={height}>
            <BubbleMap data={filteredData} width={width} height={0.7*height}/>
            <Histogram data={data}
                       width={width}
                       height={0.3*height}
                       brushExtent={brushExtent}
                       setBrushExtent={setBrushExtent}/>
        </svg>
    )

}