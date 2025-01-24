import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import {
    Container,
    UserRequests,
    RequestList,
    RequestItem
}
    from "../../styles/Requests";

const AddRequest = () => {
    const [title, setTitle] = useState("");
    const [country, setCountry] = useState("");
    const [contentType, setContentType] = useState("Movie");
    const [releaseYear, setReleaseYear] = useState("");
    const [requests, setRequests] = useState([]);
    const [myRequests, setMyRequests] = useState([]);

    const user = localStorage.getItem("username");

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:5177/requests`);
            const allRequests = response.data;
            setRequests(allRequests);

            const userRequests = allRequests.filter((req) => req.user === user);
            setMyRequests(userRequests);

        } catch (error) {
            console.error("Error fetching requests: ", error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !country || !releaseYear) {
            alert("Please fill out all fields!");
            return;
        }

        const newRequest = {
            title,
            country,
            contentType,
            releaseYear,
            status: "pending",
            user: user,
        };

        try {
            const nextId = requests.length > 0 ?
                (Math.max(...requests.map(u => u.id)) + 1).toString()
                : "1";

            const data = { ...newRequest, id: nextId };
            const response = await axios.post("http://localhost:5177/requests", data);
            alert("Your request has been submitted!");

            setTitle("");
            setCountry("");
            setContentType("Movie");
            setReleaseYear("");

            setMyRequests((prevRequests) => [...prevRequests, newRequest]);
            setRequests((prevRequests) => [...prevRequests, newRequest]);
        } catch (error) {
            console.error("Error submitting request: ", error);
        }
    };

    return (
        <>
            <Header
                isAuthenticated={true}
                role="user"
            />

            <Container>
                <h3>Request a TV Show or Movie</h3>
                <p>If you have a TV show or a movie you'd like to see on Binge Buddy Application, please fill out this form below!
                </p>
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

                <UserRequests>
                    <h3>You requested:</h3>
                    {myRequests.length > 0 ? (
                        <RequestList>
                            {myRequests.map((req, index) => (
                                <RequestItem key={index}>
                                    <strong>{req.title}</strong> ({req.releaseYear}) - {req.status}
                                </RequestItem>
                            ))}
                        </RequestList>
                    ) : (
                        <p>You have not made any requests yet.</p>
                    )}
                </UserRequests>

            </Container>
        </>
    );
};

export default AddRequest;
