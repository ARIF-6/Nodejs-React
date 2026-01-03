import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import API from "../../services/api";
import { useAuth, Roles } from "../AuthContext.jsx";
import { FaUserShield, FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password.length < 4) {
      toast.error("Password must be atleast 4 digit");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", formData);
      const { role, token } = res.data;

      if (role === Roles.ADMIN && token) {
        login(token, Roles.ADMIN);
        toast.success("🛡️ Admin login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Access Denied: Invalid administrator credentials");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed. Please verify your identity.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Animated Patterns */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-rose-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-5xl h-[650px] bg-[#1e293b] rounded-[40px] shadow-2xl overflow-hidden flex relative z-10 border border-white/5"
      >
        {/* Left Side: Visual Panel */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden md:flex flex-col justify-center items-center w-[55%] h-full relative p-12 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden"
          style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)" }}
        >
          {/* Animated Tech Grid Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

          <div className="relative z-10 text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 bg-blue-500/10 rounded-[28px] mx-auto mb-8 flex items-center justify-center text-5xl text-blue-500 border border-blue-500/20 shadow-2xl"
            >
              <FaShieldAlt />
            </motion.div>
            <h1 className="text-5xl font-black text-white mb-6 tracking-tighter">
              Secure Portal
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xs mx-auto font-medium">
              Administrator credentials required for system access.
            </p>
          </div>

          <div className="absolute bottom-12 left-12 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-xs font-bold text-slate-500 border border-white/5">DB</div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Enterprise Dashboard v2.0</p>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[45%] md:ml-auto h-full p-12 flex flex-col justify-center relative bg-[#1e293b]">
          <div className="mb-10 text-center md:text-left">
            <motion.span variants={itemVariants} className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">System Authorization</motion.span>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-white mb-3">Login</motion.h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Access Key (User)</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Admin Username"
                className="w-full bg-[#0f172a] border border-white/5 text-white placeholder-gray-600 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all font-medium"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Secret Key</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-[#0f172a] border border-white/5 text-white placeholder-gray-600 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all font-medium"
                required
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full bg-white text-black font-black py-4.5 rounded-2xl hover:bg-gray-200 transition-all shadow-xl shadow-white/5 mt-4 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "AUTHENTICATING..." : "AUTHORIZE ACCESS"}
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className="mt-12 text-center pt-8 border-t border-white/5 font-bold">
            <button
              onClick={() => navigate("/role-selection")}
              className="text-gray-500 hover:text-white text-xs transition-all flex items-center justify-center gap-2 mx-auto uppercase tracking-widest"
            >
              <FaArrowLeft /> Switch Portal
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
