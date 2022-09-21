import React from "react";
//import components here
import { Routes, Route } from 'react-router-dom';
import AllAlbums from "./components/AllAlbums/AllAlbums";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import SingleAlbum from "./components/SingleAlbum/SingleAlbum";
import ViewAccount from "./components/ViewAccount/ViewAccount";

function App() {

    return (

        <div id='main'>
            <NavBar />

            {/*Routes Here*/}
            <Routes>
                {/* <Route path='*' element={<NotFoundPage />} /> */} //TODO: We can comment NotFoundPage back in at the end (easier to debug routes without)
                <Route path='/' element={<LandingPage />} />
                <Route path='/products' element={<AllAlbums />} />
                <Route path='/products/:id' element={<SingleAlbum />} />
                <Route path='/account/:id' element={<ViewAccount />} />
            </Routes>
        </div>

    )
}

export default App;