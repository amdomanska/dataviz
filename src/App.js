import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import {DataViz} from "./components/DataViz";
import {PermanentDrawerLeft} from "./components/PermanentDrawerLeft"
import {Colors} from "./components/visualizations/Colors"
import {Population} from "./components/visualizations/Population"
import {Iris} from "./components/visualizations/Iris"
import {Migrants} from "./components/visualizations/Migrants"
import {DATAVIZ as data} from "./data"
import {NeurodevelopmentalDisorders} from "./components/visualizations/NeurodevelopmentalDisorders";
import {NeurodevelopmentalDisordersWithBrush} from "./components/visualizations/NeurodevelopmentalDisordersWithBrush";
import {ImageAnalyzer} from "./components/visualizations/ImageAnalyzer";
import {ShowAndTell} from "./components/visualizations/ShowAndTell/showAndTell";

function App() {
    const [chosenViz, setChosenViz] = useState(data[7]);
    const [hidden, setHidden] = useState(true);
    const handleMenuClick = (viz) => {
        setChosenViz(viz);
    }

    return (
        <div className="App">
            <PermanentDrawerLeft handleMenuClick={handleMenuClick} dataVizList={data} hidden={hidden}/>
            <div className="content container">
                <button onClick={() => setHidden(prevState => !prevState)} className="data_source">{hidden ? 'Show navigation' : 'Hide navigation'}</button>

                {chosenViz &&
                    <DataViz viz={chosenViz}>
                        {chosenViz.key === "colors" && <Colors/>}
                        {chosenViz.key === "population" && <Population/>}
                        {chosenViz.key === "iris" && <Iris/>}
                        {chosenViz.key === "migrants" && <Migrants/>}
                        {chosenViz.key === "neurodevelopmental_disorders" && <NeurodevelopmentalDisorders/>}
                        {chosenViz.key === "neurodevelopmental_disorders_2" && <NeurodevelopmentalDisordersWithBrush/>}
                        {chosenViz.key === "showAndTell" && <ShowAndTell/>}
                        {chosenViz.key === "image_analyzer" && <ImageAnalyzer/>}
                    </ DataViz>
                }
            </div>
        </div>
    );
}

export default App;
