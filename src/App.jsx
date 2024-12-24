import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import TVShows from './pages/TVShows';
import Movies from './pages/Movies';
import WatchList from './pages/WatchList';
import AlreadyWatched from './pages/AlreadyWatched';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './router/ProtectedRoute';
import AllUsers from './pages/AllUsers';
import AddRequest from './pages/AddRequest';
import Requests from './pages/Requests';
import Details from './pages/Details';
import { GlobalProvider } from './context/GlobalContext';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <GlobalProvider>
      <Router>
        <Routes>

          {!isAuthenticated ? (
            <>
              <Route path="/" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={role === "admin" ? <Navigate to="/adminDashboard" /> : <Navigate to="/home" />}
              />

              <Route element={<ProtectedRoute />}>
                {role === "admin" ? (
                  <>
                    <Route path="/adminDashboard" element={<AdminDashboard />} />
                    <Route path="/allUsers" element={<AllUsers />} />
                    <Route path="/home" element={<Navigate to="/adminDashboard" />} />
                    <Route path="/movies" element={<Navigate to="/adminDashboard" />} />
                    <Route path="/requests" element={<Requests />} />
                  </>
                ) : (
                  <>
                    <Route path="/home" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/tvShows" element={<TVShows />} />
                    <Route path="/watchList" element={<WatchList />} />
                    <Route path="/alreadyWatched" element={<AlreadyWatched />} />
                    <Route path="/addRequest" element={<AddRequest />} />
                    <Route path="/details/:id" element={<Details />} />
                  </>
                )}
              </Route>

              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </Router>
    </GlobalProvider>
  );
};

export default App;
