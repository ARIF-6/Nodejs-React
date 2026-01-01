import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaGraduationCap } from "react-icons/fa";
import { useAuth } from "../AuthContext";
import "./Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, logout, role } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const hidePaths = ["/login", "/register", "/admin/login", "/roles", "/forgot-password", "/reset-password"];
    if (hidePaths.includes(location.pathname)) return null;

    const isAdmin = role?.toUpperCase() === 'ADMIN';

    const menuVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: "auto",
            transition: { duration: 0.3, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.2, ease: "easeIn" }
        }
    };

    return (
        <nav className="navbar fixed top-0 left-0 w-full z-[100] backdrop-blur-lg bg-white/70 border-b border-gray-200/50 shadow-sm">
            <div className="navbar-container max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="navbar-logo flex items-center space-x-3 group">
                    <motion.div
                        whileHover={{ rotate: 15 }}
                        className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg"
                    >
                        <FaGraduationCap />
                    </motion.div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all">
                        ScholarshipHub
                    </span>
                </Link>

                <div className="menu-icon lg:hidden cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={toggleMenu}>
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </div>

                <ul className="hidden lg:flex items-center space-x-8">
                    <NavItem to="/home" label="Home" />
                    <NavItem to="/about" label="About" />
                    <NavItem to="/contact" label="Contact" />

                    {isAuthenticated ? (
                        <>
                            <NavItem to={isAdmin ? "/admin/dashboard" : "/dashboard"} label="Dashboard" />
                            <li>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-gray-800 transition-all"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </motion.button>
                            </li>
                        </>
                    ) : (
                        <>
                            <NavItem to="/login" label="Login" />
                            <li>
                                <Link to="/register">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
                                    >
                                        Register
                                    </motion.button>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 overflow-hidden shadow-xl"
                    >
                        <MobileNavItem to="/home" label="Home" onClick={toggleMenu} />
                        <MobileNavItem to="/about" label="About" onClick={toggleMenu} />
                        <MobileNavItem to="/contact" label="Contact" onClick={toggleMenu} />
                        {isAuthenticated ? (
                            <>
                                <MobileNavItem to={isAdmin ? "/admin/dashboard" : "/dashboard"} label="Dashboard" onClick={toggleMenu} />
                                <li className="p-6">
                                    <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-lg" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <MobileNavItem to="/login" label="Login" onClick={toggleMenu} />
                                <li className="px-6 pb-6">
                                    <Link to="/register" onClick={toggleMenu}>
                                        <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg">
                                            Register
                                        </button>
                                    </Link>
                                </li>
                            </>
                        )}
                    </motion.ul>
                )}
            </AnimatePresence>
        </nav>
    );
};

const NavItem = ({ to, label }) => (
    <li className="nav-item">
        <Link to={to} className="relative group p-2 flex flex-col items-center">
            <span className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                {label}
            </span>
            <motion.div
                className="absolute bottom-0 h-0.5 bg-blue-600 w-0 group-hover:w-full transition-all duration-300"
            />
        </Link>
    </li>
);

const MobileNavItem = ({ to, label, onClick }) => (
    <li className="border-b border-gray-50 last:border-0">
        <Link to={to} className="block p-6 text-gray-700 font-bold hover:bg-gray-50 active:bg-blue-50 transition-colors" onClick={onClick}>
            {label}
        </Link>
    </li>
);

export default Navbar;
