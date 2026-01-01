import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "./Api";
import { toast } from "react-toastify";
import {
    FaUniversity,
    FaCalendarAlt,
    FaCheckCircle,
    FaHourglassHalf,
    FaTimesCircle,
    FaArrowRight
} from "react-icons/fa";

const MyPrograms = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyApplications();
        window.scrollTo(0, 0);
    }, []);

    const fetchMyApplications = async () => {
        try {
            const res = await API.get("/api/applications/my");
            setApplications(res.data);
        } catch (err) {
            toast.error("Failed to fetch your applications");
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "ACCEPTED":
                return {
                    icon: <FaCheckCircle />,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/10",
                    border: "border-emerald-500/20"
                };
            case "REJECTED":
                return {
                    icon: <FaTimesCircle />,
                    color: "text-rose-400",
                    bg: "bg-rose-500/10",
                    border: "border-rose-500/20"
                };
            default:
                return {
                    icon: <FaHourglassHalf />,
                    color: "text-amber-400",
                    bg: "bg-amber-500/10",
                    border: "border-amber-500/20"
                };
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] py-20 px-4 relative overflow-hidden font-sans">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto z-10 relative"
            >
                <div className="text-center mb-16">
                    <span className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">My Tracker</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">🎓 My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Applications</span></h2>
                    <p className="text-gray-400 font-medium">Keep track of your scholarship journey and current status.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : applications.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-16 text-center max-w-2xl mx-auto"
                    >
                        <p className="text-gray-500 text-lg mb-8 font-medium">You haven't applied for any programs yet.</p>
                        <Link to="/apply" className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/20">
                            Apply Now <FaArrowRight />
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        {applications.map((app) => {
                            const style = getStatusStyle(app.status);
                            return (
                                <motion.div
                                    key={app._id}
                                    variants={itemVariants}
                                    whileHover={{ x: 10 }}
                                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 flex flex-col md:flex-row justify-between items-center gap-6 group hover:bg-white/10 transition-all shadow-xl hover:shadow-blue-500/5"
                                >
                                    <div className="flex items-center gap-6 flex-1">
                                        <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <FaUniversity />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                                {app.program ? app.program.title : 'Unknown Program'}
                                            </h3>
                                            <div className="flex items-center gap-4 text-gray-400 text-sm font-medium">
                                                <div className="flex items-center gap-2">
                                                    <FaCalendarAlt className="text-blue-500" />
                                                    {new Date(app.createdAt).toLocaleDateString()}
                                                </div>
                                                <div className="px-3 py-0.5 bg-white/5 rounded-full border border-white/10 text-[10px] tracking-wider uppercase font-bold text-gray-500">
                                                    ID: {app._id.slice(-6).toUpperCase()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border ${style.border} ${style.bg} ${style.color} font-bold text-sm tracking-wide shadow-lg w-full md:w-auto justify-center`}>
                                        <span className="text-lg">{style.icon}</span>
                                        {app.status}
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

export default MyPrograms;
