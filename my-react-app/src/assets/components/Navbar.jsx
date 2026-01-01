import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth, Roles } from "../../AuthContext";
import { FaGraduationCap, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const hideRoutes = ["/", "/login", "/register","/forgot-password", "/reset-password","/admin/login"];
  if (hideRoutes.includes(location.pathname)) return null;

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/");
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white/50 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/Home"
          className="flex items-center gap-2 text-2xl font-semibold text-teal-800"
        >
          <FaGraduationCap className="text-yellow-500" />
          AchieveAid
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-gray-800 font-medium items-center">
          <Link to="/Home" className="hover:text-teal-700 transition">Home</Link>
          <Link to="/about" className="hover:text-teal-700 transition">About</Link>
          <Link to="/contact" className="hover:text-teal-700 transition">Contact</Link>

          {isAuthenticated && role === Roles.USER && (
            <>
              <Link to="/apply" className="hover:text-teal-700 transition">Apply</Link>
              <Link to="/dashboard" className="hover:text-teal-700 transition">Dashboard</Link>
              <button onClick={handleLogout} className="hover:text-red-500 transition">Logout</button>
            </>
          )}

          {isAuthenticated && role === Roles.ADMIN && (
            <>
              <Link to="/admin/dashboard" className="hover:text-teal-700 transition">Admin</Link>
              <button
  onClick={handleLogout}
  className="hover:text-red-500 transition"
>
  Logout
</button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button onClick={toggleMenu} className="md:hidden text-teal-800 text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-inner px-6 py-4 space-y-4 text-gray-800 font-medium">
          <Link to="/Home" onClick={closeMenu} className="block hover:text-teal-700">Home</Link>
          <Link to="/about" onClick={closeMenu} className="block hover:text-teal-700">About</Link>
          <Link to="/contact" onClick={closeMenu} className="block hover:text-teal-700">Contact</Link>

          {isAuthenticated && role === Roles.USER && (
            <>
              <Link to="/apply" onClick={closeMenu} className="block hover:text-teal-700">Apply</Link>
              <Link to="/dashboard" onClick={closeMenu} className="block hover:text-teal-700">Dashboard</Link>
              <button onClick={() => { handleLogout(); closeMenu(); }} className="block text-left hover:text-red-500">Logout</button>
            </>
          )}

          {isAuthenticated && role === Roles.ADMIN && (
            <>
              <Link to="/admin/dashboard" onClick={closeMenu} className="block hover:text-teal-700">Admin</Link>
              <button onClick={() => { handleLogout(); closeMenu(); }} className="block text-left hover:text-red-500">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
