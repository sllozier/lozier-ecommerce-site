import React from "react";
import { SaleRibbon, NavBar } from "./components";
import Router from "./Router";

function App() {
    return(
        <>
         <div id='main'>
            <SaleRibbon/>
            <NavBar/>
            <Router />
         </div>
        </>
    )
}

export default App;