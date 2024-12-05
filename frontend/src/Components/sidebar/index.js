import React from "react";
import "./sidebar.css";
import SidebarButton from "./sidebarButton";
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay, FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";


export default function Sidebar() {
    return (
        <div className="sidebar-container">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSs6xQ67sI5KwD5TVjVcy4zc00AFhuJykcKWw&usqp=CAU" 
                className="profile-img" 
                alt="profile" />
            <div className="menu-buttons">
                <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
                <SidebarButton title="AddSongs" to="/addsongs" icon={<FaGripfire />} />
                <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
                <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite />} />
                <SidebarButton title="Library" to="/library" icon={<IoLibrary />} />
            </div>
            <div className="bottom-buttons">
                <SidebarButton title="Sign out" to="" icon={<FaSignOutAlt />} />
            </div>
        </div>
    );
}
