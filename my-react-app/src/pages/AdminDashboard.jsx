import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaFileAlt,
  FaSignOutAlt,
  FaGraduationCap,
  FaChartLine,
  FaThLarge,
  FaCog
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import API from "./Api";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const [userCount, setUserCount] = useState(0);
  const [applicationCount, setApplicationCount] = useState(0);
  const [scholarshipCount, setScholarshipCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [userRes, appRes, programRes] = await Promise.all([
        API.get("/api/admin/users/count"),
        API.get("/api/admin/applications/count"),
        API.get("/api/admin/programs/count")
      ]);

      setUserCount(userRes.data);
      setApplicationCount(appRes.data);
      setScholarshipCount(programRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
      const detail = error.response?.data?.message || error.message;
      toast.error(`Metrics Sync Error: ${detail}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/role-selection");
  };

  const menuItems = [
    { name: "Overview", icon: <FaThLarge />, path: "/admin/dashboard" },
    { name: "All Programs", icon: <FaGraduationCap />, path: "/admin/allprograms" },
    { name: "Applicants", icon: <FaUsers />, path: "/admin/applicants" },
    { name: "Application List", icon: <FaFileAlt />, path: "/admin/ApplicationList" },
  ];

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="w-72 flex-shrink-0 bg-[#1e293b]/50 backdrop-blur-2xl border-r border-white/5 p-8 flex flex-col z-50 sticky top-0 h-screen"
      >
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400 mb-2"
          >
            ADMIN DASHBOARD
          </motion.h1>
          <div className="h-1 w-12 bg-gradient-to-r from-rose-500 to-orange-400 rounded-full"></div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.name}
                whileHover={{ x: 5 }}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </motion.button>
            );
          })}
        </nav>

        <div className="pt-8 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-gray-400 hover:text-rose-400 hover:bg-rose-500/5 transition-all duration-300 font-bold text-sm"
          >
            <FaSignOutAlt className="text-lg" />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-12 relative overflow-x-hidden overflow-y-auto h-screen custom-scrollbar">
        <header className="flex justify-between items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl font-bold text-white mb-2">
              Admin <span className="text-gray-500 font-medium">Control</span>
            </h2>
            <p className="text-gray-400 font-medium">Monitoring academic programs and applicant performance.</p>
          </motion.div>

          {/* <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <FaChartLine />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">System Status</p>
              <p className="text-xs text-emerald-400 font-bold">LIVE SYNCED</p>
            </div>
          </div> */}
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-bold tracking-widest uppercase text-[10px]">Loading Metrics...</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-full"
          >
            {/* Scholarships Metric */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5 }}
              onClick={() => navigate("/admin/allprograms")}
              className="bg-[#1e293b]/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-blue-500/10 shadow-2xl relative overflow-hidden group min-w-0 cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-all"></div>
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-400 text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <FaGraduationCap />
              </div>
              <h3 className="text-4xl font-black text-white mb-2">{scholarshipCount}</h3>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Active Programs</p>
            </motion.div>

            {/* Applicants Metric */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5 }}
              onClick={() => navigate("/admin/applicants")}
              className="bg-[#1e293b]/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-rose-500/10 shadow-2xl relative overflow-hidden group min-w-0 cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/5 rounded-full blur-3xl group-hover:bg-rose-600/10 transition-all"></div>
              <div className="w-14 h-14 bg-rose-600/10 rounded-2xl flex items-center justify-center text-rose-400 text-2xl mb-6 group-hover:bg-rose-600 group-hover:text-white transition-all">
                <FaUsers />
              </div>
              <h3 className="text-4xl font-black text-white mb-2">{userCount}</h3>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Registered Applicants</p>
            </motion.div>

            {/* Applications Metric */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5 }}
              onClick={() => navigate("/admin/ApplicationList")}
              className="bg-[#1e293b]/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-violet-500/10 shadow-2xl relative overflow-hidden group min-w-0 cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 rounded-full blur-3xl group-hover:bg-violet-600/10 transition-all"></div>
              <div className="w-14 h-14 bg-violet-600/10 rounded-2xl flex items-center justify-center text-violet-400 text-2xl mb-6 group-hover:bg-violet-600 group-hover:text-white transition-all">
                <FaFileAlt />
              </div>
              <h3 className="text-4xl font-black text-white mb-2">{applicationCount}</h3>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Total Submissions</p>
            </motion.div>
          </motion.div>
        )}

        {/* Quick Actions / Activity Placeholder */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 border border-white/5 rounded-[3rem] p-12 text-center max-w-full"
        >
          <div className="w-20 h-20 bg-white/5 rounded-3xl mx-auto mb-8 flex items-center justify-center text-3xl text-blue-500/30">
            <FaCog />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Advanced Management Mode</h3>
          <p className="text-gray-500 max-w-sm mx-auto font-medium mb-10">Use the sidebar to manage scholarship programs, review applicant details, or filter the full application list.</p>
        </motion.div> */}
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f172a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2d3748;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
