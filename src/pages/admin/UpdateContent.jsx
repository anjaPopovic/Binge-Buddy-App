import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Container
} 
from "../../styles/Requests";

const UpdateContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [contentData, setContentData] = useState({
        title: '',
        description: '',
        genre: '',
        releaseDate: '',
        country: '',
        seasons: 0,
        episodes: 0,
    });

    useEffect(() => {
        if (location.state) {
            setContentData(location.state);
        }
    }, [location.state]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContentData((prevData) => ({
            ...prevData,
            [name]: name === "seasons" || name === "episodes" ? (value === '' ? '' : Number(value)) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5178/content/${contentData.id}`, contentData);
            alert("Content updated successfully!");
            navigate("/adminDashboard");
        } catch (error) {
            console.error("Error updating content: ", error);
            alert("Failed to update content.");
        }
    };

    return (
        <>
            <Header isAuthenticated={true} role="admin" />
            <Container>
                <h3>Update TV Show or Movie</h3>
                <form onSubmit={handleSubmit}>
                    <label>Title:
                        <input
                            type="text"
                            name="title"
                            value={contentData.title}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>Genre:
                        <input
                            type="text"
                            name="genre"
                            value={contentData.genre}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>Description:
                        <textarea
                            name="description"
                            value={contentData.description}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>Country:
                        <input
                            type="text"
                            name="country"
                            value={contentData.country}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>Release Year:
                        <input
                            type="number"
                            name="releaseDate"
                            value={contentData.releaseDate}
                            onChange={handleInputChange}
                        />
                    </label>

                    {contentData.contentType === 'TV Show' && (
                        <>
                            <label>Seasons:
                                <input
                                    type="number"
                                    name="seasons"
                                    min="0"
                                    value={contentData.seasons}
                                    onChange={handleInputChange}
                                />
                            </label>

                            <label>Episodes per Season:
                                <input
                                    type="number"
                                    name="episodes"
                                    min="0"
                                    value={contentData.episodes}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </>
                    )}

                    <button type="submit">Update</button>
                </form>
            </Container>
        </>
    );
};

export default UpdateContent;
