import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import {Home} from "./components/home";
import {
    Routes,
    Route
} from "react-router-dom";
import ScrollToHashElement from "./components/scroll-to-hash-element/ScrollToHashElement";


function App() {
    return (
        <div className="App">
            <ScrollToHashElement/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </div>
    )
}

export default App;



