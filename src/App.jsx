import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Upload from "./pages/Upload.jsx";
import Search from "./pages/Search.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import User from "./pages/User"; 
import Register from "./pages/Register.jsx";
import DocumentView from "./pages/DocumentView.jsx";
import Processing from "./pages/Processing.jsx";

// PrivateRoute for protected pages
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

// PublicRoute for login/register pages
function PublicRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return !isLoggedIn ? children : <Navigate to="/home" replace />;
}

export default function App() {
  return (
    <AppLayout>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Dashboard />} />  {/* accessible before login */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/user" element={<User />} /> 
        {/* Protected pages */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/upload" element={<PrivateRoute><Upload /></PrivateRoute>} />
        <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
        <Route path="/docs/:id" element={<PrivateRoute><DocumentView /></PrivateRoute>} />
        <Route path="/processing/:jobId" element={<PrivateRoute><Processing /></PrivateRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}