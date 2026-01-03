import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import RoleSelection from "../pages/RoleSelection";
import Apply from "../pages/Apply";
import NotFound from "../pages/NotFound";

// Dashboards
import AdminDashboard from "../dashboards/admin/AdminDashboard";
import AdminLogin from "../dashboards/admin/AdminLogin";
import AllPrograms from "../dashboards/admin/AllPrograms";
import Applicants from "../dashboards/admin/Applicants";

import Dashboard from "../dashboards/user/Dashboard";
import MyPrograms from "../dashboards/user/MyPrograms";
import ApplicationList from "../dashboards/user/ApplicationList";
import Orientation from "../dashboards/user/Orientation";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" />;

    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/roles" element={<RoleSelection />} />

            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />

            {/* User Protected Routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/apply"
                element={
                    <ProtectedRoute>
                        <Apply />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/MyPrograms"
                element={
                    <ProtectedRoute>
                        <MyPrograms />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/orientation"
                element={
                    <ProtectedRoute>
                        <Orientation />
                    </ProtectedRoute>
                }
            />

            {/* Admin Protected Routes */}
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/allprograms"
                element={
                    <ProtectedRoute>
                        <AllPrograms />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/applicants"
                element={
                    <ProtectedRoute>
                        <Applicants />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/ApplicationList"
                element={
                    <ProtectedRoute>
                        <ApplicationList />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
