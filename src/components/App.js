import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import '../css/reset.css';
import '../css/style.css';
import Login from "./Login";
import Register from "./Register";
import Timeline from "./TelaMain";
import Hashtag from "./Hashtag";
import UserPage from "./UserPage";

import TokenContext from "./utils/context/TokenContext";
import HashtagContext from "./utils/context/HashtagContext";

function App(){

    const localToken = JSON.parse(localStorage.getItem('infoUsers'));
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
                        <Route path="/hashtag/:hashtag" element={<Hashtag/>} />
                        <Route path="/user/:id" element={<UserPage/>}/>
                    </Routes>
                </BrowserRouter>
            </HashtagContext.Provider>
        </TokenContext.Provider>
    );
}

export default App;