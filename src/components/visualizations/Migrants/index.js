import {useContext} from "react";
import {useData} from "./useData"
import {Histogram} from "./Histogram";
import {BubbleMap} from "./BubbleMap";
import {AreaContext} from "../../AreaContext";

export const Migrants = ({url}) => {
    const {width, height} = useContext(AreaContext)
    const data = useData(url);
    if (!data) {
        return <p>Loading...</p>
    }
    return (
        <svg width={width} height={height}>
            <BubbleMap data={data} width={width} height={0.7*height}/>
            <Histogram data={data} width={width} height={0.3*height}/>
        </svg>
    )

}