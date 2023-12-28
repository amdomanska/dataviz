import {useData} from "./useData"
import {Histogram} from "./Histogram";

export const Migrants = ({url}) => {
    const data = useData(url);
    if (!data) {
        return <p>Loading...</p>
    }
    return (
        <>
            {/*<BubbleMap data={data}/>*/}
            <Histogram data={data}/>
        </>
    )

}