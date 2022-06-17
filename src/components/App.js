import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import '../css/reset.css';
import '../css/style.css';
import Login from "./Login/Login";
import Register from "./Register/Register";
import Timeline from "./TelaMain";
import Trending from "./Trending";
import Hashtag from "./Hashtag";

import TokenContext from "./utils/context/TokenContext";
//import UserContext from "./utils/context/UserContext";
import HashtagContext from "./utils/context/HashtagContext";

function App(){

    const localToken = JSON.parse(localStorage.getItem('infoUsers'));
    console.log(localToken);
    const [token, setToken] = useState(localToken);


    const [hash, setHash] = useState('')

    return (
        <TokenContext.Provider value={{token, setToken}} >
            <HashtagContext.Provider value={{hash, setHash}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>} />
                        <Route path="/sign-up" element={<Register/>} />
                        <Route path="/timeline" element={<Timeline/>} />
                        <Route path="/hashtag" element={<Trending/>} />
                        <Route path="/hashtag/:hashtag" element={<Hashtag/>} />
                    </Routes>
                </BrowserRouter>
            </HashtagContext.Provider>
        </TokenContext.Provider>
    );
}

export default App;