import React from "react";
//import components here
import { Routes, Route } from 'react-router-dom';

function App(){

    return(
        
       <div id='main'>
            <div className='column container'>
                <div id='header'>
                    <h1>Title of Project</h1>
                    {/* <Navbar/> */}
                </div>
            </div>

            {/* <Routes>
                <Route path='/path1' element={<path1element/>}/>
                <Route path='/path2' element={<path2element/>}/>
                <Route path='/path1/:path1Id/' element={<path1childelement/>}/>
                <Route path='/path2/:path2Id/' element={<path2childelement/>}/>
                <Route path='/' element={<whateverimakehome/>}/>
            </Routes> */}
       </div>
       
    )
}

export default App;