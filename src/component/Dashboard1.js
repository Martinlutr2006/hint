import React  from "react";
import {link,Routes,Route} from 'react-router-dom'
import Home from './Home'

function Dashboard(){
    return(
        <div>
            <nav style={{display:"flex", gap:"2rem"}}>
            <link to="Home">Home</link>

            </nav>
            <Routes>
                <Route path="./home" element={<Home/>}/>
            </Routes>
        </div>
    );
}
export default Dashboard;