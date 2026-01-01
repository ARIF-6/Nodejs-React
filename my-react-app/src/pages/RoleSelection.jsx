import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaUserShield, FaGraduationCap } from "react-icons/fa";

const RoleSelection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <div className="w-20 h-20 bg-blue-600/10 rounded-3xl mx-auto mb-8 flex items-center justify-center text-4xl text-blue-400 border border-blue-500/20 shadow-2xl">
          <FaGraduationCap />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Scholarship Hub</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-sm mx-auto font-medium">Please choose your access portal to continue to the application system.</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full z-10"
      >
        {/* User Portal Tile */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -10, scale: 1.02 }}
          onClick={() => navigate("/login")}
          className="bg-[#1e293b]/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 cursor-pointer group hover:border-blue-500/30 transition-all duration-300 shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-3xl text-blue-400 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <FaUser />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">Applicant Portal</h3>
            <p className="text-gray-400 font-medium leading-relaxed">Access your student dashboard and start your scholarship application journey.</p>
          </div>
        </motion.div>

        {/* Admin Portal Tile */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -10, scale: 1.02 }}
          onClick={() => navigate("/admin/login")}
          className="bg-[#1e293b]/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 cursor-pointer group hover:border-slate-500/30 transition-all duration-300 shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-600/10 rounded-full blur-3xl group-hover:bg-slate-600/20 transition-all"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl text-slate-400 mb-8 group-hover:bg-slate-700 group-hover:text-white transition-all duration-300">
              <FaUserShield />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-slate-400 transition-colors">Administrator Access</h3>
            <p className="text-gray-400 font-medium leading-relaxed">Manage applications, review programs, and oversee the scholarship selection process.</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-gray-600 text-[10px] font-bold tracking-[0.4em] uppercase"
      >
        Verified Academic System
      </motion.div>
    </div>
  );
};

export default RoleSelection;
