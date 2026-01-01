import { FaChalkboardTeacher, FaRegCalendarCheck, FaLaptopHouse, FaUserFriends, FaCheckCircle, FaGraduationCap } from "react-icons/fa";
import { Link, useLocation, Navigate } from "react-router-dom";
import orientationImg from "./images/back2.jpg";

const Orientation = () => {
  const location = useLocation();
  const { application } = location.state || {};

  // If accessed directly without state, we can either redirect or show a generic message.
  // For better UX, if no application is found, we might assume the user wants general info or redirect to dashboard.
  if (!location.state?.application) {
    // Optionally redirect: return <Navigate to="/dashboard" />;
    // But let's show a generic "Orientation" page instead if they just navigated there.
  }

  const programTitle = application?.program?.title || "Scholarship Program";
  const studentName = application?.fullName || "Scholar";

  // Dynamic orientation details from program
  const orientationDate = application?.program?.orientationDate ? new Date(application.program.orientationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "TBD";
  const orientationTime = application?.program?.orientationTime || "TBD";
  const orientationLocation = application?.program?.orientationLocation || "TBD";
  const orientationLink = application?.program?.orientationLink || "";
  const agenda = application?.program?.orientationAgenda?.length > 0 ? application.program.orientationAgenda : [
    { time: "10:00 AM", event: "Welcome & Opening" },
    { time: "10:15 AM", event: "Scholarship Overview & Policies" },
    { time: "10:45 AM", event: "Meet the Mentors" },
    { time: "11:15 AM", event: "Tools Walkthrough" },
    { time: "11:45 AM", event: "Q&A + Final Announcements" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-purple-100 py-16 px-6 text-gray-800">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-2xl p-10 space-y-12 animate-fadeIn border border-white/50">

        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="inline-block p-3 rounded-full bg-indigo-100 text-indigo-600 mb-2">
            <FaGraduationCap className="text-4xl" />
          </div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Welcome, {studentName.split(' ')[0]}!
          </h1>
          <h2 className="text-2xl font-bold text-gray-700">
            Orientation for <span className="text-indigo-600">{programTitle}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Congratulations on your acceptance! We are thrilled to have you.
            Here is everything you need to kickstart your journey with us.
          </p>
        </div>

        {/* Hero Image */}
        <div className="w-full h-80 rounded-[2rem] overflow-hidden shadow-lg relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
          <img
            src={orientationImg}
            alt="orientation"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-6 left-8 z-20 text-white">
            <h3 className="text-2xl font-bold">Your Future Starts Here</h3>
            <p className="opacity-90">Prepare for success.</p>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition card-hover border border-indigo-100/50">
            <div className="w-14 h-14 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-indigo-600">
              <FaRegCalendarCheck className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Date</h3>
            <p className="text-gray-600 font-medium">{orientationDate}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition card-hover border border-purple-100/50">
            <div className="w-14 h-14 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-purple-600">
              <FaLaptopHouse className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Location</h3>
            <p className="text-gray-600 font-medium">{orientationLocation}</p>
            {orientationLink && (
              <a
                href={orientationLink}
                className="mt-3 inline-block px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-full shadow-sm hover:bg-purple-50 transition"
                target="_blank"
                rel="noreferrer"
              >
                Join Meeting Link
              </a>
            )}
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition card-hover border border-teal-100/50">
            <div className="w-14 h-14 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-teal-600">
              <FaChalkboardTeacher className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Duration</h3>
            <p className="text-gray-600 font-medium">{orientationTime}</p>
          </div>
        </div>

        {/* Info Sections */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* What to Expect */}
          <div className="space-y-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <FaUserFriends className="text-indigo-500" /> What You'll Learn
            </h2>
            <ul className="space-y-4">
              {[
                "Overview of your scholarship benefits and expectations",
                "Meet your mentors, team leaders, and fellow scholars",
                "Platform training & communication guidelines",
                "Resources, tools, and roadmap to success"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-600">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Agenda */}
          <div className="space-y-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <FaRegCalendarCheck className="text-purple-500" /> Agenda
            </h2>
            <div className="space-y-4">
              {agenda.map((slot, index) => (
                <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition">
                  <span className="font-bold text-indigo-600 w-20 text-sm">{slot.time}</span>
                  <span className="text-gray-700 font-medium">{slot.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center pt-8">
          <Link to="/dashboard">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl shadow-indigo-200 transition transform hover:-translate-y-1 active:scale-95">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Orientation;
