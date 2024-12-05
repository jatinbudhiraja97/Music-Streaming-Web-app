import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "./library";
import AddSongs from "./addsongs";
import Favorites from "./favorites";
import Player from "./player";
import Feed from "./feed";
import './home.css';
import Sidebar from "../Components/sidebar";
// import Login from "./login";
// import Signup from "./signup";
//import Header from "../Shared/Header"; // Import the Header component

export default function Home() {
    return (
        <Router>
            <div className="main-body">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Library />} />
                        <Route path="/library" element={<Library />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/addsongs" element={<AddSongs />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/player" element={<Player />} />
                        {/* <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} /> */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
