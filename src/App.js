import React, {useState} from 'react';
import './App.scss';
import {arc} from 'd3';
import {DataViz} from "./components/DataViz";
import {PermanentDrawerLeft} from "./components/PermanentDrawerLeft"
import {Colors} from "./components/visualizations/Colors"
import {Population} from "./components/visualizations/Population"
import {DATAVIZ as data} from "./data"

function App() {
    const [chosenViz, setChosenViz] = useState(data[0])
    const handleMenuClick = (viz) => {
        setChosenViz(viz);
    }

    return (
        <div className="App">
            <PermanentDrawerLeft handleMenuClick={handleMenuClick} dataVizList={data}/>
            <div className="content">
                {chosenViz &&
                    <DataViz viz={chosenViz}>
                        {chosenViz.key === "colors" && <Colors />}
                        {chosenViz.key === "population" && <Population />}
                    </ DataViz>
                }
            </div>
        </div>
    );
}

export default App;
