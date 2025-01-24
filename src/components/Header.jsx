import React, { useState } from "react";
import "../index.css";
import {
    HeaderTitle,
    SlideoutSidebar,
    SidebarNav,
    SidebarLink,
    MenuIcon,
    CloseMenu,
    SignOutButton
} from "../styles/Header";

const Header = ({ isAuthenticated, role }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleSignOut = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.clear();
        alert("You have been logged out!");
        window.location.reload();
    };

    return (
        <div>
            <HeaderTitle>Binge Buddy</HeaderTitle>
            <MenuIcon onClick={toggleMenu} hidden={menuOpen}>☰</MenuIcon>
            <SlideoutSidebar $isOpen={menuOpen}>
                {menuOpen && <CloseMenu onClick={toggleMenu}>✖</CloseMenu>}
                <SidebarNav>
                    <ul>
                        {isAuthenticated && role === "user" && (
                            <>
                                <li><SidebarLink to="/home" onClick={toggleMenu}>Home</SidebarLink></li>
                                <li><SidebarLink to="/tvShows" onClick={toggleMenu}>TV Shows</SidebarLink></li>
                                <li><SidebarLink to="/movies" onClick={toggleMenu}>Movies</SidebarLink></li>
                                <li><SidebarLink to="/watchList" onClick={toggleMenu}>Watch List</SidebarLink></li>
                                <li><SidebarLink to="/alreadyWatched" onClick={toggleMenu}>Already Watched</SidebarLink></li>
                                <li><SidebarLink to="/addRequest" onClick={toggleMenu}>Add Request</SidebarLink></li>
                            </>
                        )}
                        {isAuthenticated && role === "admin" && (
                            <>
                                <li><SidebarLink to="/adminDashboard" onClick={toggleMenu}>Dashboard</SidebarLink></li>
                                <li><SidebarLink to="/allUsers" onClick={toggleMenu}>View All Users</SidebarLink></li>
                                <li><SidebarLink to="/requests" onClick={toggleMenu}>View Requests</SidebarLink></li>
                                <li><SidebarLink to="/addContent" onClick={toggleMenu}>Add Content</SidebarLink></li>
                            </>
                        )}
                        <li>
                            <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
                        </li>
                    </ul>
                </SidebarNav>
            </SlideoutSidebar>
        </div>
    );
};
export default Header;
