import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaUniversity,
  FaHandshake,
  FaArrowRight
} from "react-icons/fa";
import scholarshipImage from "./images/why2.jpg";

const ModernScholarshipInfo = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="bg-[#0f172a] text-white font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-20 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest inline-block"
            >
              Academic Excellence
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Academic Future</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
              Explore meticulously crafted scholarships designed to support your education, fuel your growth, and help you reach your most ambitious goals.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/apply"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-600/20 transition-all group"
              >
                Apply Now <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full"></div>
            <img
              src={scholarshipImage}
              alt="Scholarship"
              className="rounded-3xl shadow-2xl object-cover w-full h-[400px] relative z-10 border border-white/10"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-32 relative">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Why Choose Our <span className="text-blue-500">Programs</span>?
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-10"
        >
          {[
            {
              icon: <FaUserGraduate />,
              title: "Top Talent Focus",
              desc: "Ideal for full-time, high-achieving students driven by academic excellence and passion.",
              color: "from-emerald-500/20 to-emerald-500/5",
              iconColor: "text-emerald-400"
            },
            {
              icon: <FaUniversity />,
              title: "Full Coverage",
              desc: "We cover tuition, living expenses, and provide all necessary educational resources.",
              color: "from-blue-500/20 to-blue-500/5",
              iconColor: "text-blue-400"
            },
            {
              icon: <FaHandshake />,
              title: "Mentorship & Careers",
              desc: "Join a prestigious network of industry mentors and career-driven global scholars.",
              color: "from-purple-500/20 to-purple-500/5",
              iconColor: "text-purple-400"
            },
          ].map(({ icon, title, desc, color, iconColor }, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 transition-all group`}
            >
              <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-8 ${iconColor} group-hover:scale-110 transition-transform`}>
                {icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{title}</h3>
              <p className="text-gray-400 leading-relaxed font-medium">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default ModernScholarshipInfo;
