import React from "react";
import "../../styles/AllUsers.css";
import Header from "../../components/Header";
import { useFetch } from "../../hooks/useFetch";

const AllUsers = () => {
    const { data: users, loading, error } = useFetch("http://localhost:5175/users");

    const filteredUsers = users
        ?.filter((user) => user.role === "user")
        .map(({ id, password, ...rest }) => rest);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading users: {error.message || error}</div>;
    }

    return (
        <>
            <Header
                isAuthenticated={true}
                role="admin"
            />
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>All Users</h2>
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
                        {filteredUsers.map((user, index) => (
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
