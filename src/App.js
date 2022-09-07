import React, { useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import  AllStudents from './components/AllStudents';
import AllCampuses from './components/AllCampuses';
import SingleStudent from "./components/SingleStudent";
import SingleCampus from './components/SingleCampus';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function App(){

    return(
        <BrowserRouter>
       <div id='main'>
            <div className='column container'>
                <div id='header'>
                    <h1>ACME School Management System</h1>
                    <Navbar/>
                </div>
            </div>

            <Routes>
                <Route path='/students' element={<AllStudents/>}/>
                <Route path='/campuses' element={<AllCampuses/>}/>
                <Route path='/students/:studentId/' element={<SingleStudent/>}/>
                <Route path='/campuses/:campusId/' element={<SingleCampus/>}/>
                
            </Routes>
       </div>
       </BrowserRouter>
    )
}

export default App;