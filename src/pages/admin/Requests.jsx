import React from "react";
import Header from "../../components/Header";
import {
    RequestsContainer,
    RequestsTable,
    RequestsButtonsContainer,
    ApproveButton,
    RejectButton
}
    from "../../styles/Requests";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

const Requests = () => {
    const navigate = useNavigate();

    const { data: requests = [], loading, error } = useFetch("http://localhost:5177/requests");

    const handleApprove = async (id) => {
        try {
            const requestToApprove = requests.find((req) => req.id === id);
            navigate("/addContent", { state: requestToApprove });
        } catch (error) {
            console.error("Error navigating to Add Content:", error);
            alert("Failed to approve request.");
        }
    };

    const handleReject = async (id) => {
        try {
            await fetch(`http://localhost:5177/requests/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "rejected" }),
            });
            alert("Request rejected successfully!");
        } catch (error) {
            console.error("Error rejecting request:", error);
            alert("Failed to reject request.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading requests: {error.message || error}</div>;
    }

    return (
        <>
            <Header isAuthenticated={true} role="admin" />
            <h2 style={{ textAlign: "center", marginTop: "100px", fontSize: "1.8em" }}>
                TV Show/Movie Requests
            </h2>
            <RequestsContainer>
                <RequestsTable>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Country</th>
                            <th>Content Type</th>
                            <th>Release Year</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.title}</td>
                                <td>{request.country}</td>
                                <td>{request.contentType}</td>
                                <td>{request.releaseYear}</td>
                                <td>{request.status}</td>
                                <td>
                                    <RequestsButtonsContainer>
                                        <ApproveButton
                                            onClick={() => handleApprove(request.id)}
                                            disabled={request.status === "rejected" || request.status === "approved"}
                                        >
                                            Approve
                                        </ApproveButton>
                                        <RejectButton
                                            onClick={() => handleReject(request.id)}
                                            disabled={request.status === "approved" || request.status === "rejected"}
                                        >
                                            Reject
                                        </RejectButton>
                                    </RequestsButtonsContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </RequestsTable>
            </RequestsContainer>
        </>
    );
};

export default Requests;
