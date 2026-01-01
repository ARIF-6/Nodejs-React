import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "./Api";
import {
  FaUniversity,
  FaUser,
  FaEnvelope,
  FaSchool,
  FaStar,
  FaRegCalendarAlt,
  FaSearch,
  FaArrowRight,
  FaTimes,
  FaCheckCircle
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Apply = () => {
  const [programs, setPrograms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    institution: "",
    gpa: "",
    personalStatement: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchPrograms();
    window.scrollTo(0, 0);
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await API.get("/api/admin/programs");
      setPrograms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const validateForm = () => {
    const { fullName, email, dateOfBirth, institution, gpa, personalStatement } = form;

    if (!fullName || !email || !dateOfBirth || !institution || !gpa || !personalStatement) {
      toast.error("❌ All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("❌ Enter a valid email address.");
      return false;
    }

    const dob = new Date(dateOfBirth);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age < 21) {
      toast.error("You must be at least 21 years old.");
      return false;
    }

    const gpaValue = parseFloat(gpa);
    if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 5) {
      toast.error("❌ GPA must be between 0 and 5.");
      return false;
    }

    return true;
  };

  const handleApply = async () => {
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      await API.post(`/api/applications/apply/${selectedProgram.id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("🎉 Application submitted successfully!");
      setSelectedProgram(null);
      setTimeout(() => navigate("/MyPrograms"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to submit application.");
    }
  };

  const filteredPrograms = programs.filter((p) => {
    const term = searchQuery.toLowerCase();
    const searchableText = `${p.title} ${p.description} ${p.startDate}`.toLowerCase();
    return searchableText.includes(term);
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] py-20 px-4 relative overflow-hidden font-sans">
      <ToastContainer theme="dark" />

      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl w-full mx-auto z-10 relative"
      >
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
          >
            Start Your Journey
          </motion.span>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
            Apply for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Scholarship</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Find the perfect opportunity to fuel your academic excellence and future career.
          </p>
        </div>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-2xl mx-auto mb-16 relative"
        >
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search for a scholarship title or category..."
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-[2rem] py-6 pl-16 pr-8 focus:outline-none focus:border-blue-500 transition-all shadow-2xl placeholder-gray-500 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        {/* Categories / Help Section */}
        <AnimatePresence mode="wait">
          {searchQuery.trim() === "" ? (
            <motion.div
              key="help"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              <div className="text-center">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-8">Popular Categories</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {["Science", "Business", "Engineering", "Arts", "Technology", "Medicine"].map((tag) => (
                    <motion.button
                      key={tag}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSearchQuery(tag)}
                      className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-blue-600 transition-all font-bold text-sm shadow-xl"
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: <FaSearch />, title: "Find Program", desc: "Browse our extensive list of vetted scholarship programs." },
                  { icon: <FaUser />, title: "Complete Form", desc: "Fill out the intuitive application with your academic details." },
                  { icon: <FaCheckCircle />, title: "Submit & Track", desc: "Get real-time updates on your application status." },
                ].map((step, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2.5rem] text-center group hover:bg-white/10 transition-all">
                    <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 text-2xl mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="max-w-4xl mx-auto space-y-6"
            >
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program) => (
                  <motion.div
                    key={program.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 flex flex-col md:flex-row justify-between items-center gap-8 group hover:bg-white/10 transition-all relative overflow-hidden"
                  >
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                          <FaUniversity />
                        </div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {program.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 max-w-xl">
                        {program.description}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedProgram(program)}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-600/20 flex items-center gap-3 w-full md:w-auto justify-center"
                    >
                      Apply Now <FaArrowRight />
                    </motion.button>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-20 bg-white/5 rounded-[2rem] border border-white/10"
                >
                  <p className="text-gray-500 text-lg font-medium">No scholarship programs match your search.</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Full Screen Application Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0f172a]/95 backdrop-blur-xl flex justify-center items-center z-[150] p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#1e293b] border border-white/10 rounded-[3rem] shadow-2xl p-10 w-full max-w-4xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                className="absolute top-8 right-8 text-2xl text-gray-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
                onClick={() => setSelectedProgram(null)}
              >
                <FaTimes />
              </button>

              <div className="mb-10 text-center">
                <p className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-3 text-center">Program Application</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white">{selectedProgram.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <InputField
                  icon={<FaUser />}
                  label="Full Name"
                  placeholder="Enter your legal name"
                  value={form.fullName}
                  onChange={(v) => setForm({ ...form, fullName: v })}
                />
                <InputField
                  icon={<FaEnvelope />}
                  label="Email Address"
                  placeholder="name@example.com"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />
                <InputField
                  icon={<FaRegCalendarAlt />}
                  label="Date of Birth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(v) => setForm({ ...form, dateOfBirth: v })}
                />
                <InputField
                  icon={<FaSchool />}
                  label="Current Institution"
                  placeholder="University / High School"
                  value={form.institution}
                  onChange={(v) => setForm({ ...form, institution: v })}
                />
                <InputField
                  icon={<FaStar />}
                  label="Cumulative GPA"
                  placeholder="e.g. 3.8"
                  value={form.gpa}
                  onChange={(v) => setForm({ ...form, gpa: v })}
                />

                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Personal Statement</label>
                  <textarea
                    placeholder="Describe your motivations, achievements, and future goals..."
                    rows={5}
                    className="w-full bg-[#0f172a] border border-white/10 rounded-2xl p-6 text-white focus:outline-none focus:border-blue-500 transition-all font-medium placeholder-gray-600 resize-none"
                    value={form.personalStatement}
                    onChange={(e) => setForm({ ...form, personalStatement: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse md:flex-row justify-end items-center gap-6 border-t border-white/5 pt-10">
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="text-gray-400 font-bold hover:text-white transition-colors"
                >
                  Go Back
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleApply}
                  className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20"
                >
                  Submit Application
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InputField = ({ icon, label, placeholder, value, onChange, type = "text" }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">{label}</label>
    <div className="relative group">
      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-[#0f172a] border border-white/10 text-white rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:border-blue-500 transition-all font-medium placeholder-gray-600"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);

export default Apply;
