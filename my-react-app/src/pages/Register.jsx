import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import API from "./Api";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 4) {
      toast.error("Password must be atleast 4 digit");
      return;
    }

    setLoading(true);
    try {
      await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      toast.success("Account created successfully.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      const message = error?.response?.data?.message || "Registration failed.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4 relative font-sans overflow-hidden">
      {/* Dynamic Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"
      ></motion.div>
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl h-[800px] bg-[#1e293b] rounded-[40px] shadow-2xl overflow-hidden flex relative z-10 border border-white/5"
      >
        {/* Left Side: Premium Visual Section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden md:flex flex-col justify-center items-center w-[55%] h-full relative p-12 bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden"
          style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)" }}
        >
          {/* Animated Background Pattern */}
          <motion.div
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "30px 30px"
            }}
          ></motion.div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl mx-auto mb-10 flex items-center justify-center shadow-2xl border border-white/30"
            >
              <span className="text-4xl">📚</span>
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-5xl font-bold text-white mb-6 tracking-tight"
            >
              Welcome to Somali International Scholarship
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-white/80 text-xl leading-relaxed max-w-xs mx-auto font-medium"
            >
              Welcome to Our Scholarship Registration Page
            </motion.p>
          </div>

          <div className="absolute bottom-10 left-12 flex items-center gap-4 text-white/40">
            <div className="h-px w-12 bg-white/20"></div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase">ScholarshipHub</p>
          </div>
        </motion.div>

        {/* Right Side: Register Form */}
        <div className="w-full md:w-[45%] md:ml-auto h-full p-12 flex flex-col justify-center relative bg-[#1e293b]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="mb-10 text-center md:text-left">
              <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-3">Register</motion.h2>
              <motion.p variants={itemVariants} className="text-gray-400 font-medium">Create your student account</motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants} className="group">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2 px-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#0f172a] border border-gray-800 text-white placeholder-gray-600 text-sm rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all font-medium"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} className="group">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2 px-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#0f172a] border border-gray-800 text-white placeholder-gray-600 text-sm rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all font-medium"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} className="group">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2 px-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#0f172a] border border-gray-800 text-white placeholder-gray-600 text-sm rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all font-medium"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} className="group">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2 px-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter your confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-[#0f172a] border border-gray-800 text-white placeholder-gray-600 text-sm rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all font-medium"
                  required
                />
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 transition-all mt-6"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </motion.button>
            </form>

            <motion.div variants={itemVariants} className="mt-10 text-center border-t border-gray-800/50 pt-8">
              <p className="text-sm text-gray-400 font-medium">
                Already have an account? <a href="/login" className="text-blue-500 font-bold hover:text-blue-400">Login</a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
