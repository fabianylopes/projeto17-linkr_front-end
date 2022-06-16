import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";


import '../css/reset.css';
import '../css/style.css';
import Login from "./Login";
import Register from "./Register";
import Timeline from "./TelaMain";

import TokenContext from "./utils/context/TokenContext";

function App(){

    const LocalToken = localStorage.getItem('token');
    const [token, setToken] = useState(LocalToken);
    
    return (
        <TokenContext.Provider value={{token, setToken}} >

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/sign-up" element={<Register/>} />
                    <Route path="/timeline" element={<Timeline/>} />
                </Routes>
            </BrowserRouter>

        </TokenContext.Provider>
       
    );
}

export default App;