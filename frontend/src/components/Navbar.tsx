
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {ReviewPage} from "../pages/ReviewPage.tsx";
import SubmitLeaderPage from "../pages/SubmitLeaderPage.tsx";
import HomePage from "../pages/HomePage.tsx";



const Navbar = () => {
    return (
        <Router>
            <div>
                <div>
                    <ul>
                        <li><Link to ="/Home"> Home </Link></li>
                        <li><Link to ="/See Reviews"> Reviews </Link></li>
                        <li><Link to ="/Submit a Leader"> Submit New Leader </Link></li>
                    </ul>
                    <Routes>
                        <Route path="/Home" element ={<HomePage/>}/>
                        <Route path="/See Reviews" element ={<ReviewPage/>}/>
                        <Route path="/Submit a Leader" element ={<SubmitLeaderPage/>}/>
                    </Routes>
                </div>
            </div>
        </Router>

);
};

export default Navbar;