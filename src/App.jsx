import React from "react";
import {BrowserRouter as Router,Route,Routes,} from "react-router-dom";
import Apps from '../src/pages/Apps';
import SignIn from "./pages/login/SignIn";

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element ={< SignIn />} />
                <Route path="/home" element ={< Apps />} />
            </Routes>
        </Router>
    )
}

export default App;
