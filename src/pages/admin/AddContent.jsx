import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import axios from "axios";
import "../../styles/AddRequest.css";
import { useLocation } from "react-router-dom";
import useContent from "../../hooks/UseContent";

const AddContent = () => {
    const location = useLocation();
    const { fetchContent } = useContent();

    const [contentData, setContentData] = useState({
        title: '',
        description: '',
        genre: '',
        releaseDate: '',
        country: '',
        seasons: 0,
        episodes: 0
    });

    const [contentType, setContentType] = useState('Movie');
    const [existingContent, setExistingContent] = useState([]);

    useEffect(() => {
        fetchContent();
    }, []);

    useEffect(() => {
        if (location.state) {
            const { title, description, genre, country, contentType, releaseYear } = location.state;
            setContentData({
                title,
                genre,
                description,
                country,
                contentType,
                releaseDate: releaseYear,
            });
            setContentType(contentType);
        }
    }, [location.state]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContentData((prevData) => ({
            ...prevData,
            [name]: name === "seasons" || name === "episodes" ? (value === '' ? '' : Number(value)) : value,
        }));
    };

    const handleContentTypeChange = (e) => {
        setContentType(e.target.value);
    };
    const addContent = async (contentData) => {
        try {
            const response = await axios.post("http://localhost:5178/content", contentData);
            return response.data; // Vraća podatke o novom sadržaju
        } catch (error) {
            console.error("Error adding content: ", error);
            throw error; // Prosleđuje grešku kako bi mogla biti obrađena na mestu poziva
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //const nextId = existingContent.length > 0? Math.max(...existingContent.map(item => item.id)) + 1  : 1;
            const nextId = existingContent.length > 0 
    ? (Math.max(...existingContent.map(u => Number(u.id))) + 1).toString() 
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
                seasons: 0,
                episodes: 0
            });
            setContentType('Movie');
            setExistingContent([...existingContent, newContent]);

        } catch (error) {
            console.error("Error adding content: ", error);
            alert("Failed to add content.");
        }
    };

    return (
        <>
            <Header isAuthenticated={true} role="admin" />

            <div className="container">
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
                        <select name="type" value={contentType} onChange={handleContentTypeChange}>
                            <option value="Movie">Movie</option>
                            <option value="TV Show">TV Series</option>
                        </select>
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
                            type="date"
                            name="releaseDate"
                            value={contentData.releaseDate}
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
            </div>
        </>
    );
};

export default AddContent;
