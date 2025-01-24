import React from "react";
import Header from "../../components/Header";
import {
    RequestsContainer,
    RequestsTable,
    ApproveButton,
    RejectButton
} from "../../styles/Requests";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { data: content = [], loading, error } = useFetch("http://localhost:5178/content");

    const handleUpdate = (id) => {
        const selectedContent = content.find((item) => item.id === id);
        navigate("/updateContent", { state: selectedContent });
    };

    const deleteContent = async (contentId) => {
        const confirmed = window.confirm("Are you sure you want to delete this content?");
        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:5178/content/${contentId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Content has been deleted!");
                    window.location.reload();
                } else {
                    alert("Failed to delete content.");
                }
            } catch (error) {
                console.error("Error deleting content:", error);
                alert("An error occurred while trying to delete the content.");
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading content: {error.message || error}</div>;

    return (
        <>
            <Header isAuthenticated={true} role="admin" />
            <h2 style={{ textAlign: "center", marginTop: "100px", fontSize: "1.8em" }}>
                Added TV Shows/Movies from users' requests
            </h2>
            <RequestsContainer>
                <RequestsTable>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Genre</th>
                            <th>Release Date</th>
                            <th>Country</th>
                            <th>Seasons</th>
                            <th>Episodes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content.map((r) => (
                            <tr key={r.id}>
                                <td>{r.title}</td>
                                <td>{r.description}</td>
                                <td>{r.genre}</td>
                                <td>{r.releaseDate}</td>
                                <td>{r.country}</td>
                                <td>{r.seasons}</td>
                                <td>{r.episodes}</td>
                                <td>
                                    <RejectButton
                                        onClick={() => deleteContent(r.id)}
                                    >
                                        Delete
                                    </RejectButton>
                                    <ApproveButton
                                        onClick={() => handleUpdate(r.id)}
                                    >
                                        Update
                                    </ApproveButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </RequestsTable>
            </RequestsContainer>
        </>
    );
};

export default AdminDashboard;
