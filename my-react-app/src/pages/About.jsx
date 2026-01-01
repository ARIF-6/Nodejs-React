import React from "react";
import { motion } from "framer-motion";
import { FaSchool, FaHeart, FaLaptopCode, FaRocket, FaGlobe, FaCertificate } from "react-icons/fa";
import illustration from "./images/bac3.jpg";

const About = () => {
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

  const featureCards = [
    {
      icon: <FaSchool />,
      title: "Our Mission",
      desc: "To streamline and digitize academic life — putting users at the center of innovation.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: <FaLaptopCode />,
      title: "Our Technology",
      desc: "Powered by modern frameworks like React & Spring Boot — fast, modern, and scalable.",
      color: "from-purple-500 to-indigo-400",
    },
    {
      icon: <FaHeart />,
      title: "Our Values",
      desc: "Focused on accessibility, transparency, and creating a real impact in education.",
      color: "from-rose-500 to-pink-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] py-24 px-6 relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
          >
            Behind the Scenes
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            About Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Scholarship Hub</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We are dedicated to bridging the gap between talent and opportunity through an intelligent, user-centric management system.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full transform -rotate-12 translate-x-10 translate-y-10"></div>
            <img
              src={illustration}
              alt="About system"
              className="rounded-[3rem] shadow-2xl object-cover w-full h-[450px] border border-white/10 relative z-10"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-10"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-3xl font-bold text-white tracking-tight">Our Vision for the Future</h2>
              <p className="text-gray-400 leading-relaxed">
                Education should be accessible to everyone, regardless of their background. Our platform is more than just a tool; it's a gateway to academic excellence. We simplify the complex world of scholarship management so you can focus on what matters most: your growth.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="flex items-center space-x-4 text-white group">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <FaRocket />
                </div>
                <span className="font-bold">Innovation First</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center space-x-4 text-white group">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                  <FaGlobe />
                </div>
                <span className="font-bold">Global Reach</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center space-x-4 text-white group">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all">
                  <FaCertificate />
                </div>
                <span className="font-bold">Verified Success</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center space-x-4 text-white group">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
                  <FaHeart />
                </div>
                <span className="font-bold">User Centric</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-gray-800 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:border-blue-500/50"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white text-3xl mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{card.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {card.desc}
              </p>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <div className="text-6xl text-white transform rotate-12">{card.icon}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
