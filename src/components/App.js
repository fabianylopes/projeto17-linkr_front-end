import { BrowserRouter, Routes, Route } from "react-router-dom";

import Timeline from "./TelaMain";

import '../css/reset.css';
import '../css/style.css';

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/timeline" element={<Timeline/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;