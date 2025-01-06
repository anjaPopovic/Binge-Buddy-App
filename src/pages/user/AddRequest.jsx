import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import "../../styles/AddRequest.css";

const AddRequest = () => {
    const [title, setTitle] = useState("");
    const [country, setCountry] = useState("");
    const [contentType, setContentType] = useState("Movie");
    const [releaseYear, setReleaseYear] = useState("");
    const [requests, setRequests] = useState([]);

    const user = localStorage.getItem("username");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:5177/requests?user=${user}`);
                setRequests(response.data);
            } catch (error) {
                console.error("Error fetching requests: ", error);
            }
        };

        fetchRequests();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newRequest = {
            title,
            country,
            contentType,
            releaseYear,
            status: "pending",
            user: user,
        };

        try {
            const nextId = requests.length > 1 ? Math.max(...requests.map(u => u.id)) + 1 : 1;
            const data = { ...newRequest, id: nextId }; 
            const response = await axios.post("http://localhost:5177/requests", data);
            alert("Your request has been submitted!");

            setTitle("");
            setCountry("");
            setContentType("Movie");
            setReleaseYear("");

            setRequests((prevRequests) => [...prevRequests, response.data]);
        } catch (error) {
            console.error("Error submitting request: ", error);
        }
    };

    return (
        <div className="container">
            <Header isAuthenticated={true} role="user" />
            <h3>Request a TV Show or Movie</h3>
            <p>If you have a TV show or a movie you'd like to see on Binge Buddy Application, please fill out this form below! 
                Do keep in mind that this is the only place to submit content requests.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Country:
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                </label>
                <label>
                    Type:
                    <select value={contentType} onChange={(e) => setContentType(e.target.value)}>
                        <option value="Movie">Movie</option>
                        <option value="TV Show">TV Series</option>
                    </select>
                </label>
                <label>
                    Release Year:
                    <input type="text" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
                </label>
                <button type="submit">Submit Request</button>
            </form>

            <div className="user-requests">
                <h3>You requested:</h3>
                {requests.length > 0 ? (
                    <ul>
                        {requests.map((req) => (
                            <li key={req.id}> 
                                <strong>{req.title}</strong> ({req.releaseYear}) - {req.status}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You have not made any requests yet.</p>
                )}
            </div>
        </div>
    );
};

export default AddRequest;
