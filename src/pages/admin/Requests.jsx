import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import "../../styles/Requests.css";
import { useNavigate } from "react-router-dom";

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    const getAllRequests = async () => {
        const response = await axios.get("http://localhost:5177/requests");
        setRequests(response.data);
    };

    useEffect(() => {
        getAllRequests();
    }, []);

    const handleApprove = async (id) => {
        try {
            const requestToApprove = requests.find((req) => req.id === id);
            await axios.patch(`http://localhost:5177/requests/${id}`, { status: "approved" });
            setRequests((prevRequests) =>
                prevRequests.map((req) =>
                    req.id === id ? { ...req, status: "approved" } : req
                )
            );
            navigate("/addContent", { state: requestToApprove }); 
        } catch (error) {
            console.error("Error updating request:", error);
            alert("Failed to approve request.");
        }
    };
    
    const handleReject = async (id) => {
        try {
            await axios.patch(`http://localhost:5177/requests/${id}`, { status: "rejected" });
            setRequests((prevRequests) =>
                prevRequests.map((req) =>
                    req.id === id ? { ...req, status: "rejected" } : req
                )
            );
        } catch (error) {
            console.error("Error rejecting request:", error);
            alert("Failed to reject request.");
        }
    };

    return (
        <>
            <Header isAuthenticated={true} role="admin" />
            <h2 style={{ textAlign: "center", marginTop: "100px", fontSize: "1.8em" }}>
                TV Show/Movie Requests
            </h2>
            <div className="requests-container">
                <table className="requests-table">
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
                        {requests.map((request, index) => (
                            <tr key={index}>
                                <td>{request.title}</td>
                                <td>{request.country}</td>
                                <td>{request.contentType}</td>
                                <td>{request.releaseYear}</td>
                                <td>{request.status}</td>
                                <td>
                                    <div className="requests-buttons-container">
                                        <button
                                            className="requests-button-approve"
                                            onClick={() => handleApprove(request.id)}
                                            disabled={request.status === "rejected" || request.status === "approved"}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="requests-button-reject"
                                            onClick={() => handleReject(request.id)}
                                            disabled={request.status === "approved" || request.status === "rejected"}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Requests;
