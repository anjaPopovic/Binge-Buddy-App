import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "../styles/Header.css";

const Header = ({ isAuthenticated, role }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const handleSignOut = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        {/*navigate("/");
        window.localStorage.clear();*/}
        alert("You have been logged out!");
        window.location.href = "./";

    };

    const linkStyle = {
        margin: "1rem",
        textDecoration: "none",
        color: 'white'
    };

    return (
        <header>
            <div className="logo">
                <h1>Binge Buddy</h1>
            </div>
            <button className="hamburger-menu" onClick={toggleMenu}>
                ☰
            </button>
            <nav>
                <ul className={menuOpen ? "nav-links open" : "nav-links"}>
                    {isAuthenticated && role === "user" && (
                        <>
                            <li><Link to="/home" style={linkStyle}>Home</Link></li>
                            <li><Link to="/tvShows" style={linkStyle}>TV Shows</Link></li>
                            <li><Link to="/movies" style={linkStyle}>Movies</Link></li>
                            <li><Link to="/watchList" style={linkStyle}>Watch List</Link></li>
                            <li><Link to="/alreadyWatched" style={linkStyle}>Already Watched</Link></li>
                            <li><Link to="/addRequest" style={linkStyle}>Add Request</Link></li>
                        </>

                    )
                    }

                    {isAuthenticated && role === "admin" && (
                        <>
                            <li><Link to="/allUsers" style={linkStyle}>View All Users</Link></li>
                            <li><Link to="/requests" style={linkStyle}>View Requests</Link></li>
                        </>
                    )}
                    <li><button onClick={handleSignOut} className="signout-btn">Sign Out</button></li>

                </ul>
            </nav>
        </header>
    );
}

export default Header; 
