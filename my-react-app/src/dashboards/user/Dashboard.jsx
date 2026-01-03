import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../services/api";
import { toast } from "react-toastify";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaEnvelopeOpenText,
  FaUniversity,
  FaCalendarAlt,
  FaArrowRight
} from "react-icons/fa";
import scholarImg from "./images/apply.png";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get("/api/applications/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setApplications(res.data);
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
    window.scrollTo(0, 0);
  }, []);

  const getStatusDetails = (status) => {
    switch (status) {
      case "ACCEPTED":
        return {
          icon: <FaCheckCircle className="text-emerald-400 text-3xl" />,
          message: "🎉 Congratulations! Your application has been approved and moved to the next stage.",
          borderColor: "border-emerald-500/30",
          glowColor: "shadow-emerald-500/10",
          textColor: "text-emerald-400"
        };
      case "REJECTED":
        return {
          icon: <FaTimesCircle className="text-rose-400 text-3xl" />,
          message: "❌ Unfortunately, your application for this program was not successful this time.",
          borderColor: "border-rose-500/30",
          glowColor: "shadow-rose-500/10",
          textColor: "text-rose-400"
        };
      default:
        return {
          icon: <FaHourglassHalf className="text-amber-400 text-3xl" />,
          message: "⏳ Your application is currently under comprehensive review by our committee.",
          borderColor: "border-amber-500/30",
          glowColor: "shadow-amber-500/10",
          textColor: "text-amber-400"
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] py-20 px-4 relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto z-10 relative"
      >
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
          >
            Student Portal
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Application <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Status Center</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Track your progress, view feedback, and manage your academic future in one place.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading your applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white/5 backdrop-blur-md py-20 px-10 rounded-[3rem] border border-white/10 shadow-2xl max-w-3xl mx-auto"
          >
            <div className="text-6xl mb-6">📄</div>
            <h2 className="text-2xl font-bold text-white mb-4">No Applications Found</h2>
            <p className="text-gray-400 mb-10">You haven't submitted any applications for scholarships yet. Ready to start?</p>
            <Link to="/apply" className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/20">
              Browse Scholarships <FaArrowRight />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-12"
          >
            {applications.map((app) => {
              const { icon, message, borderColor, glowColor, textColor } = getStatusDetails(app.status);
              return (
                <motion.div
                  key={app.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className={`bg-white/5 backdrop-blur-md rounded-[3rem] border ${borderColor} shadow-2xl ${glowColor} flex flex-col lg:flex-row overflow-hidden transition-all duration-300 group`}
                >
                  <div className="lg:w-1/3 relative h-64 lg:h-auto overflow-hidden">
                    <img
                      src={scholarImg}
                      alt="Scholarship"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60"></div>
                  </div>

                  <div className="p-10 lg:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-blue-400">
                            <FaUniversity className="text-xl" />
                            <span className="text-xs font-bold uppercase tracking-widest">Scholarship Program</span>
                          </div>
                          <h3 className="text-3xl font-bold text-white tracking-tight">
                            {app.program?.title || "Unknown Program"}
                          </h3>
                        </div>
                        <div className={`px-5 py-2 rounded-full border ${borderColor} bg-white/5 flex items-center gap-2 w-fit`}>
                          {icon}
                          <span className={`text-xs font-bold uppercase tracking-widest ${textColor}`}>{app.status}</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 mb-8 border-t border-white/5 pt-8">
                        <div className="space-y-1">
                          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Applicant Name</p>
                          <p className="text-lg text-white font-semibold">{app.fullName}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Contact Email</p>
                          <div className="flex items-center gap-2 text-white/90">
                            <FaEnvelopeOpenText className="text-blue-500" />
                            <span className="text-base font-medium">{app.email}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Application ID</p>
                          <p className="text-sm font-mono text-gray-400">#{app.id || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Applied Date</p>
                          <div className="flex items-center gap-2 text-white/90">
                            <FaCalendarAlt className="text-blue-500" />
                            <span className="text-base font-medium">{app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'Recent'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-3xl p-6 border border-white/5 space-y-4">
                      <p className="text-gray-300 text-sm leading-relaxed font-medium italic">
                        "{message}"
                      </p>

                      {app.status === "ACCEPTED" && (
                        <Link
                          to="/orientation"
                          state={{ application: app }}
                          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition-all uppercase tracking-widest"
                        >
                          📅 View Orientation Schedule
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
