import {useState} from 'react';
import './App.css';
import {arc} from 'd3';
import {DataViz} from "./components/DataViz";
import {PermanentDrawerLeft} from "./components/PermanentDrawerLeft"
import {Colors} from "./components/visualizations/Colors"
import {DATAVIZ as data} from "./data"

function App() {
    const [chosenViz, setChosenViz] = useState(data[0])
    const handleMenuClick = (viz) => {
        setChosenViz(viz);
    }

    return (
        <div className="App">
            <PermanentDrawerLeft handleMenuClick={handleMenuClick} dataVizList={data}/>
            {chosenViz &&
                <DataViz viz={chosenViz}>
                    {chosenViz["key"] === "colors" && <Colors url={chosenViz["url"]}/>}
                </ DataViz>
            }
        </div>
    );
}

export default App;
