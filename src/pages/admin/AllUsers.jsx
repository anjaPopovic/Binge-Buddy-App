import React from "react";
import {
    RequestsContainer,
    RequestsTable,
    TableRow,
    TableCells
}
    from "../../styles/Requests";
import Header from "../../components/Header";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
    const navigate = useNavigate();
    const { data: users, loading, error } = useFetch("http://localhost:5175/users");

    const handleClick = (id) => {
        navigate(`/userDetails/${id}`, { state: { id } });
    };

    const filteredUsers = users
        ?.filter((user) => user.role === "user")
        .map(({ password, ...rest }) => rest);

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
            <RequestsContainer>
                <RequestsTable>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <TableRow
                                key={index}
                                onClick={() => handleClick(user.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <TableCells>{user.username}</TableCells>
                                <TableCells>{user.email}</TableCells>
                                <TableCells>{user.role}</TableCells>
                            </TableRow>
                        ))}
                    </tbody>
                </RequestsTable>
            </RequestsContainer>
        </>
    );
};

export default AllUsers;
