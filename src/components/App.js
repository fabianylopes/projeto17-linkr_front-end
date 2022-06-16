import { BrowserRouter, Routes, Route } from "react-router-dom";

import Timeline from "./TelaMain";
import Trending from "./Trending";
import Hashtag from "./Hashtag";

import '../css/reset.css';
import '../css/style.css';
import Register from "./Register";

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-up" element={<Register/>} />
                <Route path="/timeline" element={<Timeline/>} />
                <Route path="/hashtag" element={<Trending/>} />
                <Route path="/hashtag/:hashtag" element={<Hashtag/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;