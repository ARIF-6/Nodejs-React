import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../services/api";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaEye, FaArrowLeft, FaFileAlt, FaSearch, FaTimes, FaCheck, FaBan, FaCalendarAlt, FaUniversity, FaGraduationCap, FaUserCircle, FaClock, FaInfoCircle, FaCheckCircle } from "react-icons/fa";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewApp, setViewApp] = useState(null);
  const [editApp, setEditApp] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/applications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setApplications(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Critical: Failed to sync application database");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (e) => {
    setEditedStatus(e.target.value);
  };

  const saveStatus = async () => {
    try {
      const res = await API.put(
        `/api/applications/${editApp._id || editApp.id}`,
        { status: editedStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`Application updated to ${editedStatus}`);
      setApplications((prev) =>
        prev.map((app) => (app._id === (editApp._id || editApp.id) ? res.data : app))
      );
      setEditApp(null);
    } catch (err) {
      const message = err.response?.data?.message || "Status synchronization failed";
      toast.error(`❌ ${message}`);
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("CRITICAL: Are you sure you want to purge this application record?")) return;
    try {
      await API.delete(`/api/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Application record deleted");
      setApplications(applications.filter((app) => app._id !== id));
    } catch {
      toast.error("Deletion Failed: System integrity error");
    }
  };

  const filteredApps = applications.filter(app =>
    app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.applicationId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.program?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchApplications();
    window.scrollTo(0, 0);
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACCEPTED": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
      case "REJECTED": return "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]";
      default: return "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]";
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-lg">
                <FaFileAlt className="text-xl" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight">Review And Manage <span className="text-gray-500 font-medium">Applicant</span></h2>
            </div>
            <p className="text-gray-400 font-medium">Reviewing and managing scholar applications for all programs.</p>
          </motion.div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* <div className="relative flex-1 md:w-80">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="ID, Name or Program..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1e293b]/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-blue-500 transition-all text-sm font-medium placeholder-gray-600"
              />
            </div> */}
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/5 transition px-8 py-4 rounded-2xl font-bold flex items-center gap-3 whitespace-nowrap"
            >
              <FaArrowLeft className="text-xs" /> Dashboard
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-bold tracking-widest uppercase text-[10px]">Processing Database...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1e293b]/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-gray-400 uppercase text-[10px] tracking-[0.2em] font-black">
                    <th className="px-8 py-8 text-left">Applicant ID</th>
                    <th className="px-8 py-8 text-left">Applicant Info</th>
                    <th className="px-8 py-8 text-left">Scholarship Program</th>
                    <th className="px-8 py-8 text-left">System Status</th>
                    <th className="px-8 py-8 text-center">Administrative Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  <AnimatePresence>
                    {filteredApps.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-20">
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-3xl text-gray-600 mb-6">
                              <FaFileAlt />
                            </div>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Queue is empty</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredApps.map((app) => (
                        <motion.tr
                          key={app._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                          className="transition-colors group"
                        >
                          <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg font-mono text-gray-400 text-xs font-bold group-hover:border-blue-500/20 group-hover:text-blue-400 transition-all">
                              {app.applicationId}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <div>
                              <p className="font-bold text-gray-200 mb-1">{app.fullName}</p>
                              <p className="text-xs text-gray-500 font-medium">{app.email}</p>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-gray-300 font-bold">
                            {app.program?.title || "UNSPECIFIED"}
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-4 py-2 rounded-xl border text-[10px] font-black tracking-widest uppercase ${getStatusStyle(app.status)}`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => setViewApp(app)}
                                className="text-gray-500 hover:text-blue-400 transition-all p-3 hover:bg-blue-500/10 rounded-xl border border-transparent hover:border-blue-500/20"
                                title="View Details"
                              >
                                <FaEye className="text-lg" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditApp(app);
                                  setEditedStatus(app.status);
                                }}
                                className="text-gray-500 hover:text-emerald-400 transition-all p-3 hover:bg-emerald-500/10 rounded-xl border border-transparent hover:border-emerald-500/20"
                                title="Update Status"
                              >
                                <FaEdit className="text-lg" />
                              </button>
                              <button
                                onClick={() => deleteApplication(app._id || app.id)}
                                className="text-gray-500 hover:text-rose-500 transition-all p-3 hover:bg-rose-500/10 rounded-xl border border-transparent hover:border-rose-500/20"
                                title="Purge Record"
                              >
                                <FaTrash className="text-lg" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>

      {/* View Details Modal */}
      <AnimatePresence>
        {viewApp && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex justify-center items-center z-50 p-6 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#1e293b] rounded-[3rem] p-10 w-full max-w-5xl shadow-2xl border border-white/5 relative overflow-hidden my-auto"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-2xl text-blue-500 border border-blue-500/10">
                    <FaUserCircle />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white leading-tight">Scholar <span className="text-gray-500">Profile</span></h3>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Global ID: {viewApp.applicationId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-xl border text-[10px] font-black tracking-widest uppercase ${getStatusStyle(viewApp.status)}`}>
                    {viewApp.status}
                  </span>
                  <button
                    onClick={() => setViewApp(null)}
                    className="w-12 h-12 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-2xl flex items-center justify-center transition-all border border-white/5"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Personal Information Column */}
                <div className="lg:col-span-1 space-y-6">
                  <h4 className="text-blue-500 font-black text-[10px] uppercase tracking-[0.2em] px-2 mb-4">Personal Information</h4>
                  <div className="bg-[#0f172a] p-6 rounded-3xl border border-white/5">
                    <FaUserCircle className="text-blue-500 mb-4" />
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Full Identity</p>
                    <p className="text-lg font-bold text-white">{viewApp.fullName}</p>
                    <p className="text-xs text-blue-400 font-medium italic mt-2">{viewApp.email}</p>
                  </div>
                  <div className="bg-[#0f172a] p-6 rounded-3xl border border-white/5">
                    <FaCalendarAlt className="text-emerald-500 mb-4" />
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Birth Record</p>
                    <p className="text-lg font-bold text-white">{viewApp.dateOfBirth}</p>
                  </div>
                  <div className="bg-[#0f172a] p-6 rounded-3xl border border-white/5">
                    <FaClock className="text-amber-500 mb-4" />
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Submitted On</p>
                    <p className="text-lg font-bold text-white">
                      {viewApp.createdAt ? new Date(viewApp.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Academic & Program Column */}
                <div className="lg:col-span-2 space-y-6">
                  <h4 className="text-purple-500 font-black text-[10px] uppercase tracking-[0.2em] px-2 mb-4">Academic & Program Alignment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#0f172a] p-6 rounded-3xl border border-white/5">
                      <FaUniversity className="text-purple-500 mb-4" />
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Institution</p>
                      <p className="text-lg font-bold text-white truncate">{viewApp.institution}</p>
                    </div>
                    <div className="bg-[#0f172a] p-6 rounded-3xl border border-white/5">
                      <FaGraduationCap className="text-rose-500 mb-4" />
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">GPA Performance</p>
                      <p className="text-lg font-bold text-white">{viewApp.gpa}</p>
                    </div>
                  </div>

                  <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
                        <FaInfoCircle />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Assigned Scholarship</p>
                        <h5 className="text-xl font-bold text-white">{viewApp.program?.title}</h5>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium mb-4">
                      {viewApp.program?.description}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-gray-500 uppercase">Start:</span>
                        <span className="text-xs font-bold text-indigo-400">{viewApp.program?.startDate || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-gray-500 uppercase">End:</span>
                        <span className="text-xs font-bold text-indigo-400">{viewApp.program?.endDate || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Statement - Full Width */}
              <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 mb-10">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                  Scholar Personal Statement
                </p>
                <div className="max-h-64 overflow-y-auto custom-scrollbar pr-4 text-gray-300 leading-relaxed font-medium text-base">
                  {viewApp.personalStatement}
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-center gap-4">
                <button
                  onClick={() => {
                    setEditApp(viewApp);
                    setEditedStatus(viewApp.status);
                    setViewApp(null);
                  }}
                  className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-black text-xs tracking-[0.2em] uppercase transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  <FaEdit /> Update Status
                </button>
                <button
                  onClick={() => setViewApp(null)}
                  className="px-10 py-5 bg-white text-black rounded-[2rem] font-black text-xs tracking-[0.2em] uppercase hover:bg-gray-200 transition-all shadow-xl shadow-black/20"
                >
                  Close Data Sheet
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Status Modal */}
      <AnimatePresence>
        {editApp && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1e293b] p-10 rounded-[3rem] shadow-2xl w-full max-w-lg border border-white/10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-600"></div>

              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl text-emerald-500 border border-emerald-500/10">
                  <FaEdit />
                </div>
                <h3 className="text-3xl font-black text-white">Modify <span className="text-gray-500">Status</span></h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">{editApp.fullName}</p>
              </div>

              <div className="space-y-6 mb-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-2 block">Decision Selection</label>
                  <select
                    value={editedStatus}
                    onChange={handleStatusChange}
                    className="w-full bg-[#0f172a] border border-white/5 rounded-2xl py-5 px-6 focus:outline-none focus:border-emerald-500 transition-all font-bold text-white appearance-none"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>

                {/* <div className="flex gap-4 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                  <div className="text-emerald-500 mt-1"><FaCheck className="text-sm" /></div>
                  <p className="text-[11px] text-emerald-400/80 font-medium">Updating status will immediately notify the student and update their academic status dashboard.</p>
                </div> */}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={saveStatus}
                  className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-600/20 transition-all tracking-widest text-xs"
                >
                  EXECUTE UPDATE
                </button>
                {/* <button
                  onClick={() => setEditApp(null)}
                  className="w-full py-5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-black rounded-2xl transition-all tracking-widest text-xs border border-white/5"
                >
                  ABORT ACTION
                </button> */}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ApplicationList;
