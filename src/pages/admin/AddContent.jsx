import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import axios from "axios";
import {
    Container
} from "../../styles/Requests";
import { useLocation } from "react-router-dom"; //ispravi da koristi usefetch

const AddContent = () => {
    const location = useLocation();
    const [contentData, setContentData] = useState({
        title: '',
        description: '',
        genre: '',
        releaseDate: '',
        country: '',
        contentType: '',
        seasons: 0,
        episodes: 0
    });

    const [contentType, setContentType] = useState('Movie');
    const [existingContent, setExistingContent] = useState([]);

    const fetchContent = async () => {
        try {
            const response = await fetch("http://localhost:5178/content");
            const cont = await response.json();
            setExistingContent(cont);
        } catch (error) {
            console.error("Error fetching content:", error);
        }
    };

    useEffect(() => {
        if (location.state) {
            const { title, description, genre, country, contentType, releaseYear } = location.state;
            setContentData({
                title,
                genre,
                description,
                country,
                contentType,
                releaseDate: releaseYear
            });
            setContentType(contentType);
        }
        fetchContent();
    }, [location.state]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContentData((prevData) => ({
            ...prevData,
            [name]: name === "seasons" || name === "episodes" ? (value === '' ? 0 : Number(value)) : value,
        }));
    };

    const approveRequest = async (id) => {
        try {
            await axios.patch(`http://localhost:5177/requests/${id}`, { status: "approved" });
            console.log(`Request ${id} approved`);
        } catch (error) {
            console.error(`Error approving request ${id}:`, error);
        }
    };

    const addContent = async (contentData) => {
        try {
            const response = await axios.post("http://localhost:5178/content", contentData);
            return response.data;
        } catch (error) {
            console.error("Error adding content:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (location.state && location.state.id) {
                await approveRequest(location.state.id);
            }

            const nextId = existingContent.length > 0
                ? (Math.max(...existingContent.map(u => u.id)) + 1).toString()
                : "1";

            const data = { ...contentData, id: nextId };
            const newContent = await addContent(data);

            alert("New content added successfully!");

            setContentData({
                title: '',
                description: '',
                genre: '',
                releaseDate: '',
                country: '',
                contentType: '',
                seasons: 0,
                episodes: 0
            });
            setContentType('Movie');
            setExistingContent([...existingContent, newContent]);

        } catch (error) {
            console.error("Error adding content:", error);
            alert("Failed to add content.");
        }
    };

    return (
        <>
            <Header
                isAuthenticated={true}
                role="admin"
            />

            <Container>
                <h3>Add new TV Show or Movie</h3>
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
                            value={contentData.genre || ''}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>Description:
                        <textarea
                            name="description"
                            value={contentData.description || ''}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>Type:
                        <select name="type" value={contentType} onChange={(e) => setContentType(e.target.value)}>
                            <option value="Movie">Movie</option>
                            <option value="TV Show">TV Series</option>
                        </select>
                    </label>

                    <label>Country:
                        <input
                            type="text"
                            name="country"
                            value={contentData.country || ''}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>Release Date:
                        <input
                            type="number"
                            name="releaseDate"
                            min="1900"
                            max="2100"
                            value={contentData.releaseDate || ''}
                            onChange={handleInputChange}
                        />
                    </label>

                    {contentType === 'TV Show' && (
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

                    <button type="submit">Add</button>
                </form>
            </Container>
        </>
    );
};

export default AddContent;
