import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "./Api";
import { toast } from "react-toastify";
import { FaLock, FaShieldAlt } from "react-icons/fa";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = new URLSearchParams(useLocation().search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return toast.error("Please fill in all fields");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (newPassword.length < 4) {
      return toast.error("Password must be atleast 4 digit");
    }

    setLoading(true);
    try {
      await API.put(`/auth/reset-password/${token}`, { password: newPassword });
      toast.success("✅ Password successfully updated!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data || "❌ The reset link is invalid or has expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 py-12 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-[#1e293b]/50 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/5 relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-20 h-20 bg-emerald-500/10 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl border border-emerald-500/20 text-emerald-400"
          >
            <FaShieldAlt />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Reset Password
          </h2>
          <p className="text-gray-400 text-sm font-medium">Create a strong, unique password to secure your academic profile.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#0f172a] border border-white/5 text-white placeholder-gray-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all font-medium"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#0f172a] border border-white/5 text-white placeholder-gray-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all font-medium"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all shadow-xl shadow-white/5 mt-4 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Updating..." : "Update Password"}
          </motion.button>
        </form>

        <div className="text-center mt-10 pt-6 border-t border-white/5">
          <a href="/login" className="text-gray-500 hover:text-white text-sm font-bold transition-colors">
            Cancel and Return
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
