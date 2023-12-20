import {useState} from 'react';
import './App.css';
import {arc} from 'd3';
import {DataViz} from "./components/DataViz";
import {PermanentDrawerLeft} from "./components/PermanentDrawerLeft"
import {Colors} from "./components/visualizations/Colors"

const DATAVIZ = [{key: "colors", title: "CSS named colours", url: "www.wp.pl"}, {
    key: "something",
    title: "Something else",
    url: "www.something.pl"
}]

function App() {
    const [chosenViz, setChosenViz] = useState()
    const handleMenuClick = (viz) => {
        setChosenViz(viz);
    }
    return (
        <div className="App">
            <PermanentDrawerLeft handleMenuClick={handleMenuClick} dataVizList={DATAVIZ}/>
            {chosenViz &&
                <DataViz title={chosenViz["title"]} information={chosenViz["url"]}>
                    {chosenViz["key"] === "colors" && <Colors />}
                    {chosenViz["key"] === "something" && <p>Something Chosen</p>}
                </ DataViz>
            }
        </div>
    );
}

export default App;
