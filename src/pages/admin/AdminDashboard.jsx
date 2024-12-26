import React from "react";
import Header from "../../components/Header";

const AdminDashboard = () => {
    
    return (
        <>
            <Header 
                isAuthenticated={true} 
                role="admin" 
            />
            <h1>ADMIN DASHBOARD</h1>
            <h1>ADMIN DASHBOARD</h1>
            <h1>ADMIN DASHBOARD</h1>
        </>
    );
};

export default AdminDashboard;
