import React, { useState, useEffect } from "react";
import axios from "axios";
import ResultsCard from "../components/ResultsCard";
import "../styles/ResultsCard.css";

const ShowContent = () => {
    const [newContent, setNewContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewContent = async () => {
            try {
                const response = await axios.get(`http://localhost:5178/content`);
                setNewContent(response.data.results || response.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch content.");
            } finally {
                setLoading(false);
            }
        }
        fetchNewContent();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="home-page">
            <h2>Users have also requested...</h2>

            <div className="results-container">
                {newContent.length > 0 ? (
                    newContent.map((item, index) => (
                        <ResultsCard key={index} contentType={item} />
                    ))
                ) : (
                    <div>No content available.</div>
                )}
            </div>
        </div>
    );

};

export default ShowContent;
