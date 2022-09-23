import React from "react";
//import components here
import { Routes, Route } from 'react-router-dom';
import AllAlbums from "./components/AllAlbums/AllAlbums";
import AuthdUserHome from "./components/AdminPanelView/AuthdUserHome/AuthdUserHome";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import SignUp from "./components/SignUp/SignUp";
import SingleAlbum from "./components/SingleAlbum/SingleAlbum";
import ViewAccount from "./components/ViewAccount/ViewAccount";
import ConfirmationPage from "./components/ConfirmationPage/ConfirmationPage";
import Cart from "./components/Cart/Cart";

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
                <Route path='/confirmation' element={<ConfirmationPage />} />
                <Route path='/admin-panel' element={<AuthdUserHome />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/auth/signup' element={<SignUp />} />
            </Routes>
        </div>

    )
}

export default App;