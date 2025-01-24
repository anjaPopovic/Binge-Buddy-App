import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/user/Home';
import Registration from './pages/user/form/Registration';
import Login from './pages/user/form/Login';
import TVShows from './pages/user/TVShows';
import Movies from './pages/user/Movies';
import WatchList from './pages/user/WatchList';
import AlreadyWatched from './pages/user/AlreadyWatched';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './router/ProtectedRoute';
import AllUsers from './pages/admin/AllUsers';
import AddRequest from './pages/user/AddRequest';
import Requests from './pages/admin/Requests';
import AddContent from './pages/admin/AddContent';
import UpdateContent from './pages/admin/UpdateContent';
import { GlobalProvider } from './context/GlobalContext';
import TMDBDetails from './pages/user/TMDBDetails';
import LocalDetails from './pages/user/LocalDetails';
import UserDetails from './pages/admin/UserDetails';
import GlobalStyle from './styles/Global';

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
    <>
    <GlobalStyle />
    <GlobalProvider>
      <Router>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<Login  />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route element={<ProtectedRoute />}>
                {role === "admin" ? (
                  <>
                    <Route path="/adminDashboard" element={<AdminDashboard />} />
                    <Route path="/allUsers" element={<AllUsers />} />
                    <Route path="/addContent" element={<AddContent />} />
                    <Route path="/requests" element={<Requests />} />
                    <Route path="/updateContent" element={<UpdateContent />}/>
                    <Route path="/userDetails/:id" element={<UserDetails />} />
                    <Route path="/home" element={<Navigate to="/adminDashboard" />} />
                    <Route path="/movies" element={<Navigate to="/adminDashboard" />} />
                    <Route path="/" element={<Navigate to="/adminDashboard" />} />
                  </>
                ) : (
                  <>
                    <Route path="/home" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/tvShows" element={<TVShows />} />
                    <Route path="/watchList" element={<WatchList />} />
                    <Route path="/alreadyWatched" element={<AlreadyWatched />} />
                    <Route path="/addRequest" element={<AddRequest />} />
                    <Route path="/details/:type/:id" element={<TMDBDetails />} />
                    <Route path="/details/:id" element={<LocalDetails />} />
                    <Route path="/" element={<Navigate to="/home" />} />
                  </>
                )}
              </Route>

              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </Router>
    </GlobalProvider>
    </>
  );
};

export default App;
