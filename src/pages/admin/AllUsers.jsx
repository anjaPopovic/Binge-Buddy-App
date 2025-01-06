import React, { useState, useEffect } from "react";
import "../../styles/AllUsers.css";
import Header from "../../components/Header";
import axios from "axios";

const AllUsers = () => {
    const [data, setData] = useState([]);

    const getAllUsers = () => {
        axios
            .get("http://localhost:5175/users")
            .then((response) => {
                const filtered = response.data
                    .filter((user) => user.role === "user")
                    .map(({ id, password, ...rest }) => rest);
                setData(filtered);
            })
            .catch((error) => {
                console.error("There was an error fetching the data:", error);
            });
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <>
            <Header 
                isAuthenticated={true} 
                role="admin" 
            />
            <h2 style={{ "textAlign": "center", "margin": "100px" }}>All Users</h2>
            <div className="users-table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AllUsers;
