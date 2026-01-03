import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "./Api";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaArrowLeft, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const AllPrograms = () => {
  const { role } = useAuth();
  const isAdmin = role?.toUpperCase() === "ADMIN";
  const navigate = useNavigate();

  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newProgram, setNewProgram] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    orientationDate: "",
    orientationTime: "",
    orientationLocation: "",
    orientationLink: "",
  });
  const [editingProgram, setEditingProgram] = useState(null);

  useEffect(() => {
    fetchPrograms();
    window.scrollTo(0, 0);
  }, []);

  const formatDate = (date) => {
    if (!date) return "";
    const parsed = new Date(date);
    if (isNaN(parsed)) return "";
    return parsed.toISOString().split("T")[0];
  };

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/admin/programs");
      setPrograms(res.data);
    } catch {
      toast.error("Failed to fetch programs");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewProgram({ ...newProgram, [e.target.name]: e.target.value });
  };

  const handleAddProgram = async (e) => {
    e.preventDefault();
    try {
      const formatted = {
        ...newProgram,
        startDate: formatDate(newProgram.startDate),
        endDate: formatDate(newProgram.endDate),
      };
      const res = await API.post("/api/admin/programs", formatted);
      toast.success("Program successfully added");
      setPrograms([...programs, res.data]);
      setNewProgram({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        orientationDate: "",
        orientationTime: "",
        orientationLocation: "",
        orientationLink: "",
      });
      setShowAddModal(false);
    } catch {
      toast.error("Failed to add program");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this program?")) return;
    try {
      await API.delete(`/api/admin/programs/${id}`);
      toast.success("Program deleted");
      setPrograms(programs.filter((p) => p.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const formatted = {
        ...editingProgram,
        startDate: formatDate(editingProgram.startDate),
        endDate: formatDate(editingProgram.endDate),
      };
      const res = await API.put(`/api/admin/programs/${editingProgram.id}`, formatted);
      toast.success("Program updated");
      setPrograms(programs.map((p) => (p.id === editingProgram.id ? res.data : p)));
      setEditingProgram(null);
    } catch {
      toast.error("Update failed");
    }
  };

  const filteredPrograms = programs.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] py-24 px-4 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Programs</span>
            </h2>
            <p className="text-gray-400 font-medium max-w-xl"></p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-2xl border border-white/10 transition-all font-bold text-sm"
            >
              <FaArrowLeft /> Back
            </button>
            {isAdmin && (
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl shadow-xl shadow-blue-600/20 transition-all font-bold text-sm"
              >
                <FaPlus /> Add Program
              </button>
            )}
          </motion.div>
        </div>

        {/* Search Bar */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-3xl mb-12"
        >
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search programs by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-[2rem] py-5 pl-16 pr-8 focus:outline-none focus:border-blue-500 transition-all font-medium backdrop-blur-md"
          />
        </motion.div> */}

        {loading ? (
          <div className="flex flex-col items-center py-24 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading catalog data...</p>
          </div>
        ) : filteredPrograms.length === 0 ? (
          <div className="text-center py-24 bg-white/5 rounded-[3rem] border border-white/10 border-dashed">
            <div className="text-5xl mb-6 opacity-30">🔍</div>
            <p className="text-gray-400 text-xl font-medium">No scholarship programs match your search.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-[#1e293b]/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-gray-400 uppercase text-[10px] tracking-[0.2em] font-black">
                    <th className="px-8 py-8 text-left">ID</th>
                    <th className="px-8 py-8 text-left">Program Details</th>
                    <th className="px-8 py-8 text-left">Application Period</th>
                    {isAdmin && <th className="px-8 py-8 text-center">Controls</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {filteredPrograms.map((p) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg font-mono text-gray-400 text-xs font-bold group-hover:border-blue-500/20 group-hover:text-blue-400 transition-all">
                          #{p.id}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="max-w-md">
                          <p className="font-bold text-gray-200 mb-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{p.title}</p>
                          <p className="text-xs text-gray-500 font-medium line-clamp-1">{p.description}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-gray-300 font-bold">
                          <FaCalendarAlt className="text-blue-500/50" />
                          <span>{p.startDate} - {p.endDate}</span>
                        </div>
                      </td>
                      {isAdmin && (
                        <td className="px-8 py-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setEditingProgram(p)}
                              className="p-3 bg-white/5 hover:bg-emerald-500/10 text-emerald-400 rounded-xl transition-all border border-white/5 hover:border-emerald-500/20"
                              title="Edit Program"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="p-3 bg-white/5 hover:bg-rose-500/10 text-rose-400 rounded-xl transition-all border border-white/5 hover:border-rose-500/20"
                              title="Delete Program"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      )}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>

      {/* Add/Edit Modal Overlay */}
      <AnimatePresence>
        {(showAddModal || editingProgram) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-[100] p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#1e293b] border border-white/10 rounded-[3rem] p-10 w-full max-w-xl shadow-2xl relative overflow-hidden"
            >
              {/* Modal Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

              <h3 className="text-3xl font-bold text-white mb-8 tracking-tight">
                {showAddModal ? "➕ Create Program" : "✏️ Modify Program"}
              </h3>

              <form onSubmit={showAddModal ? handleAddProgram : saveChanges} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Program Title</label>
                  <input
                    type="text"
                    name="title"
                    value={showAddModal ? newProgram.title : editingProgram.title}
                    onChange={(e) => showAddModal ? handleInputChange(e) : setEditingProgram({ ...editingProgram, title: e.target.value })}
                    placeholder="Enter program name"
                    className="w-full bg-[#0f172a] border border-white/5 text-white placeholder-gray-600 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all font-medium"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Description</label>
                  <textarea
                    name="description"
                    rows="4"
                    value={showAddModal ? newProgram.description : editingProgram.description}
                    onChange={(e) => showAddModal ? handleInputChange(e) : setEditingProgram({ ...editingProgram, description: e.target.value })}
                    placeholder="Provide a detailed description..."
                    className="w-full bg-[#0f172a] border border-white/5 text-white placeholder-gray-600 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all font-medium resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={showAddModal ? newProgram.startDate : editingProgram.startDate}
                      onChange={(e) => showAddModal ? handleInputChange(e) : setEditingProgram({ ...editingProgram, startDate: e.target.value })}
                      className="w-full bg-[#0f172a] border border-white/5 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={showAddModal ? newProgram.endDate : editingProgram.endDate}
                      onChange={(e) => showAddModal ? handleInputChange(e) : setEditingProgram({ ...editingProgram, endDate: e.target.value })}
                      className="w-full bg-[#0f172a] border border-white/5 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6 mt-6">
                  <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" /> Orientation Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Orientation Date</label>
                      <input
                        type="date"
                        name="orientationDate"
                        value={showAddModal ? newProgram.orientationDate : editingProgram.orientationDate}
                        onChange={(e) => showAddModal ? handleInputChange(e) : setEditingProgram({ ...editingProgram, orientationDate: e.target.value })}
                        className="w-full bg-[#0f172a] border border-white/5 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Orientation Time</label>
                      <input
                        type="text"
                        name="orientationTime"
                        value={showAddModal ? newProgram.orientationTime : editingProgram.orientationTime}
                        onChange={(e) => showAddModal ? handleInputChange(e) : setEditingProgram({ ...editingProgram, orientationTime: e.target.value })}
                        placeholder="e.g. 10:00 AM - 12:00 PM"
                        className="w-full bg-[#0f172a] border border-white/5 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Location</label>
                      <input
                        type="text"
                        name="orientationLocation"
                        value={showAddModal ? newProgram.orientationLocation : editingProgram.orientationLocation}
                        onChange={(e) => showAddModal ? handleInputChange(e) : setEditingProgram({ ...editingProgram, orientationLocation: e.target.value })}
                        placeholder="e.g. Online via Zoom"
                        className="w-full bg-[#0f172a] border border-white/5 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Meeting Link</label>
                      <input
                        type="url"
                        name="orientationLink"
                        value={showAddModal ? newProgram.orientationLink : editingProgram.orientationLink}
                        onChange={(e) => showAddModal ? handleInputChange(e) : setEditingProgram({ ...editingProgram, orientationLink: e.target.value })}
                        placeholder="https://zoom.us/j/..."
                        className="w-full bg-[#0f172a] border border-white/5 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-10">
                  <button
                    type="button"
                    onClick={() => { setShowAddModal(false); setEditingProgram(null); }}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all text-sm"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all text-sm shadow-xl shadow-blue-600/20"
                  >
                    {showAddModal ? "Create Program" : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
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

export default AllPrograms;
