import React from "react";
import { SaleRibbon, NavBar } from "./components";
import Router from "./Router";

import { Routes, Route } from 'react-router-dom';

import {
    PageNotFound,
    Home,
    ViewAllAlbums,
    ViewSingleAlbum,
    AccountPortal,
    WishList,
    LogIn,
    SignUp,
    Cart,
    Checkout,
    PaymentConfirmation,
    AdminDashboard,
    ContactForm,
    FAQ,
    PrivacyPolicy,
    ReturnPolicy,
    RewardsProg,
    Terms,
    About,
} from './components';


function App() {
    return(
        <>
         
            <SaleRibbon/>
            <NavBar/>
            <Routes>
                {/* <Route path='*' element={<PageNotFound />} /> */}
                <Route path='/' element={<Home />} />
                <Route path='/albums' element={<ViewAllAlbums />} />
                <Route path='/albums/:id/' element={<ViewSingleAlbum />} />
                <Route path='/account' element={<AccountPortal />} />
                <Route path='/wishlist' element={<WishList/>}/>
                <Route path='/login' element={<LogIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/confirmation' element={<PaymentConfirmation />} />
                <Route path='/adminDashboard' element={<AdminDashboard />} />
                <Route path='/contactForm' element={<ContactForm/>}/>
                <Route path='/faq' element={<FAQ/>}/>
                <Route path='/privacyPolicy' element={<PrivacyPolicy/>}/>
                <Route path='/returnPolicy' element={<ReturnPolicy/>}/>
                <Route path='/rewards' element={<RewardsProg/>}/>
                <Route path='/terms' element={<Terms/>}/>
                <Route path='/about' element={<About/>}/>

            </Routes>
        
        </>
    )
}

export default App;