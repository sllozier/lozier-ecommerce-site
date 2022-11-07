import React from "react";
import { SaleRibbon, NavBar } from "./components";
import Router from "./Router";

function App() {
    return(
        <>
            <SaleRibbon/>
            <NavBar/>
            <Router />
        </>
    )
}

export default App;