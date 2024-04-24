import React, {useState} from "react";
import {DATAVIZ as data} from "./data";
import {PermanentDrawerLeft} from "./components/PermanentDrawerLeft";
import {DataVizContainer} from "./components/DataVizContainer";
import {Colors} from "./components/visualizations/Colors";
import {Population} from "./components/visualizations/Population";
import {Iris} from "./components/visualizations/Iris";
import {Migrants} from "./components/visualizations/Migrants";
import {NeurodevelopmentalDisorders} from "./components/visualizations/NeurodevelopmentalDisorders";
import {Covid} from "./components/visualizations/Covid";
import {ImageAnalyzer} from "./components/visualizations/ImageAnalyzer";

export const DataViz = () => {
    const [chosenViz, setChosenViz] = useState(data[5]);
    const handleMenuClick = (viz) => {
        setChosenViz(viz);
    }

    return (
        <div className="App">
            <PermanentDrawerLeft handleMenuClick={handleMenuClick} dataVizList={data}/>
            <div className="content container">
                {chosenViz &&
                    <DataVizContainer viz={chosenViz}>
                        {chosenViz.key === "colors" && <Colors/>}
                        {chosenViz.key === "population" && <Population/>}
                        {chosenViz.key === "iris" && <Iris/>}
                        {chosenViz.key === "migrants" && <Migrants/>}
                        {chosenViz.key === "neurodevelopmental_disorders" && <NeurodevelopmentalDisorders/>}
                        {chosenViz.key === "covid" && <Covid/>}
                        {chosenViz.key === "image_analyzer" && <ImageAnalyzer/>}
                    </DataVizContainer>
                }
            </div>
        </div>
    );
}