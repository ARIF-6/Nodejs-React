import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher, FaRocket } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import ScholarshipInfo from "./ScholarshipInfo.jsx";
import bgImg from "./images/pic.jpg";

const Home = () => {
  const { isAuthenticated, role } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-center bg-cover px-6"
        style={{ backgroundImage: `url(${bgImg})` }}>
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center max-w-4xl p-10 md:p-16 rounded-[2.5rem] bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6"
          >
            Empower Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-200 font-medium mb-10 max-w-2xl mx-auto"
          >
            Discover academic opportunities tailored for you. Apply with ease, track with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <motion.a
              href="#features"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl text-lg font-bold shadow-xl transition-all"
            >
              Explore Opportunities
            </motion.a>
            {isAuthenticated && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={role?.toUpperCase() === "ADMIN" ? "/admin/dashboard" : "/dashboard"}
                  className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-2xl text-lg font-bold hover:bg-white/20 transition-all shadow-xl block"
                >
                  View Dashboard
                </Link>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-[#0f172a] py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-center text-white mb-20 tracking-tight">
              A Platform Built For <span className="text-blue-500">Excellence</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-10">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-[#1e293b] p-10 rounded-[2rem] border border-gray-800 shadow-2xl group transition-all duration-300 hover:border-blue-500/50"
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-500 transition-colors duration-300">
                  <FaUserGraduate className="text-3xl text-blue-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Students</h3>
                <p className="text-gray-400 leading-relaxed">
                  Apply, track, and manage your scholarship applications with a seamless digital experience.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-[#1e293b] p-10 rounded-[2rem] border border-gray-800 shadow-2xl group transition-all duration-300 hover:border-purple-500/50"
              >
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-500 transition-colors duration-300">
                  <FaChalkboardTeacher className="text-3xl text-purple-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Faculty</h3>
                <p className="text-gray-400 leading-relaxed">
                  Review applications, manage data, and guide students with powerful administrative tools.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-[#1e293b] p-10 rounded-[2rem] border border-gray-800 shadow-2xl group transition-all duration-300 hover:border-cyan-500/50"
              >
                <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-cyan-500 transition-colors duration-300">
                  <FaRocket className="text-3xl text-cyan-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Innovation</h3>
                <p className="text-gray-400 leading-relaxed">
                  We're simplifying education funding and making opportunities accessible to every dreamer.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div id="About-section">
          <About />
        </div>
        <div id="ScholarshipInfo-section">
          <ScholarshipInfo />
        </div>
        <div id="contact-section">
          <Contact />
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-[#0f172a] border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto text-center px-4">
          <p className="text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} ScholarshipHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
