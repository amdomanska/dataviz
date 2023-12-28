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

function App() {
    const [chosenViz, setChosenViz] = useState(data[3])
    const handleMenuClick = (viz) => {
        setChosenViz(viz);
    }

    return (
        <div className="App">
            <PermanentDrawerLeft handleMenuClick={handleMenuClick} dataVizList={data}/>
            <div className="content container">
                {chosenViz &&
                    <DataViz viz={chosenViz}>
                        {chosenViz.key === "colors" && <Colors />}
                        {chosenViz.key === "population" && <Population />}
                        {chosenViz.key === "iris" && <Iris />}
                        {chosenViz.key === "migrants" && <Migrants />}
                    </ DataViz>
                }
            </div>
        </div>
    );
}

export default App;
