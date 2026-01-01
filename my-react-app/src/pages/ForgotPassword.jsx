import { useState } from "react";
import { motion } from "framer-motion";
import API from "./Api";
import { toast } from "react-toastify";
import { FaKey, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const response = await API.post("/auth/forgot-password", { email });
      toast.success("✅ Reset link sent! Check your inbox.");
      if (response.data.debugLink) {
        window.open(response.data.debugLink, "_blank");
      }
    } catch (err) {
      const msg = err.response?.data || "Something went wrong";
      toast.error(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-6 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-[#1e293b]/50 backdrop-blur-xl shadow-2xl rounded-[2.5rem] p-10 space-y-8 border border-white/5 relative z-10"
      >
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-20 h-20 bg-blue-600/10 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl shadow-inner border border-blue-500/20 text-blue-400"
          >
            <FaKey />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
            Forgot Password?
          </h2>
          <p className="text-gray-400 text-sm font-medium">
            Enter your email address and we'll send you a secure link to reset your account credentials.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0f172a] border border-white/5 text-white placeholder-gray-600 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all font-medium"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleForgotPassword}
            disabled={loading}
            className={`w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-200 transition shadow-xl shadow-white/5 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Requesting Link..." : "Send Reset Link"}
          </motion.button>
        </div>

        <div className="text-center pt-4 border-t border-white/5">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-500 hover:text-white text-sm transition-colors flex items-center justify-center gap-2 mx-auto font-bold"
          >
            <FaArrowLeft className="text-xs" /> Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
