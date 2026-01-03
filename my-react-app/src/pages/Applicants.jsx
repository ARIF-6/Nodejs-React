import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "./Api";
import { FaTrash, FaArrowLeft, FaUsers, FaUserCircle, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

const Applicants = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    window.scrollTo(0, 0);
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Fetch users error:", error);
      toast.error("❌ Failed to sync registered applicants");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("CRITICAL: Are you sure you want to remove this applicant record?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Applicant record purged successfully");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Delete user error:", error);
      toast.error("Action Blocked: Applicant has active applications");
    }
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.userId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.05 } }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-lg">
                <FaUsers className="text-xl" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight">Registered <span className="text-gray-500 font-medium">Applicants</span></h2>
            </div>
            <p className="text-gray-400 font-medium">Managing the global directory of scholars and administrators.</p>
          </motion.div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* <div className="relative flex-1 md:w-80">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Filter by name, ID or email..."
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
            <p className="text-gray-500 font-bold tracking-widest uppercase text-[10px]">Syncing Directory...</p>
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
                    <th className="px-8 py-8 text-left">Name</th>
                    <th className="px-8 py-8 text-left">Email</th>
                    <th className="px-8 py-8 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  <AnimatePresence>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-20">
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-3xl text-gray-600 mb-6">
                              <FaUserCircle />
                            </div>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No records matching query</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <motion.tr
                          key={user._id}
                          variants={rowVariants}
                          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                          className="transition-colors group"
                        >
                          <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg font-mono text-gray-400 text-xs font-bold group-hover:border-blue-500/20 group-hover:text-blue-400 transition-all">
                              {user.userId || "UNSYNCED"}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/10">
                                {user.name?.charAt(0) || "U"}
                              </div>
                              <span className="font-bold text-gray-200">{user.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-gray-400 font-medium">
                            {user.email}
                          </td>
                          <td className="px-8 py-6 text-center">
                            <button
                              onClick={() => deleteUser(user._id)}
                              className="text-gray-600 hover:text-rose-500 transition-all p-3 hover:bg-rose-500/10 rounded-xl border border-transparent hover:border-rose-500/20"
                              title="Delete Record"
                            >
                              <FaTrash className="text-lg" />
                            </button>
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

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
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

export default Applicants;
