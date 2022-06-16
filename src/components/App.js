import { BrowserRouter, Routes, Route } from "react-router-dom";

import Timeline from "./TelaMain";
import Hashtag from "./Hashtag";

import '../css/reset.css';
import '../css/style.css';

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/timeline" element={<Timeline/>} />
                <Route path="/hashtag" element={<Hashtag/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;