import { motion } from "framer-motion";
import {
    FaHeartbeat,
    FaUserMd,
    FaWalking,
    FaPhoneAlt,
    FaHome,
    FaClock,
    FaNotesMedical,
    FaTint,
    FaCapsules,
    FaUtensils,
    FaRegSmile,
    FaInfoCircle,
} from "react-icons/fa";

const DashboardProfile = () => {
    const profile = {
        name: "Abdul Karim",
        age: 72,
        bloodGroup: "O+",
        weight: "64 kg",
        height: "5'5\"",
        chronicDiseases: ["Diabetes (Type 2)", "High Blood Pressure"],
        emergencyContact: {
            name: "Mahmud Karim (Son)",
            phone: "+880 1700-988776",
        },
        address: "House 23, Road 4, Sector 9, Uttara, Dhaka",
        joined: "May 14, 2025",
        lifestyle:
            "Retired teacher, enjoys reading, walking, and light gardening. Keeps a consistent morning routine and prefers vegetarian meals.",
        medication: [
            "Metformin 500mg (2x daily)",
            "Amlodipine 5mg (1x daily)",
            "Insulin (as prescribed)",
        ],
        meals: [
            { time: "8:00 AM", menu: "Oats, Boiled Egg, Green Tea" },
            { time: "1:00 PM", menu: "Brown Rice, Grilled Chicken, Vegetables" },
            { time: "8:00 PM", menu: "Vegetable Soup, Bread" },
        ],
        doctor: {
            name: "Dr. Rahman",
            specialization: "Cardiologist",
            lastVisit: "October 10, 2025",
        },
        healthStats: {
            sugar: "6.1 mmol/L",
            pressure: "128/82 mmHg",
            pulse: "74 bpm",
            sleep: "7 hrs",
            status: "Stable",
            score: 82,
        },
        activities: [
            {
                date: "Oct 11, 2025",
                event: "Morning walk completed (30 mins)",
                icon: <FaWalking className="text-green-500" />,
            },
            {
                date: "Oct 10, 2025",
                event: "Routine check-up with Dr. Rahman",
                icon: <FaUserMd className="text-blue-500" />,
            },
            {
                date: "Oct 9, 2025",
                event: "Normal sugar level maintained",
                icon: <FaHeartbeat className="text-pink-500" />,
            },
        ],
        photo: "https://i.pravatar.cc/200?img=65",
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 p-8">
            {/* 🔹 SUMMARY BANNER */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-3xl shadow-xl p-6 flex flex-col md:flex-row justify-between items-center mb-10"
            >
                <div className="flex items-center gap-6">
                    <img
                        src={profile.photo}
                        alt="Profile"
                        className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
                    />
                    <div>
                        <h1 className="text-3xl font-bold mb-1">{profile.name}</h1>
                        <p className="text-sm text-white/90">
                            Age: {profile.age} | Blood Group: {profile.bloodGroup}
                        </p>
                        <p className="text-white/80 mt-1">{profile.address}</p>
                    </div>
                </div>

                <div className="text-center mt-6 md:mt-0">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <FaHeartbeat className="text-white text-xl" />
                        <h2 className="font-semibold text-lg">
                            Health Status: {profile.healthStats.status}
                        </h2>
                    </div>
                    <div className="w-48 bg-white/30 h-3 rounded-full overflow-hidden">
                        <div
                            className={`h-3 rounded-full ${
                                profile.healthStats.score > 75
                                    ? "bg-green-400"
                                    : profile.healthStats.score > 50
                                    ? "bg-yellow-400"
                                    : "bg-red-400"
                            }`}
                            style={{ width: `${profile.healthStats.score}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-white/80 mt-1">
                        Overall Health Score: {profile.healthStats.score}%
                    </p>
                </div>
            </motion.div>

            {/* 🔹 MAIN CONTENT */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* LEFT COLUMN */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    {/* Personal Info */}
                    <div className="bg-white shadow-lg rounded-3xl p-6 border-l-4 border-teal-500">
                        <h2 className="text-xl font-semibold text-teal-800 mb-4 flex items-center gap-2">
                            <FaHome /> Personal Details
                        </h2>
                        <ul className="text-teal-700 space-y-2 text-sm">
                            <li><strong>Height:</strong> {profile.height}</li>
                            <li><strong>Weight:</strong> {profile.weight}</li>
                            <li><strong>Blood Group:</strong> {profile.bloodGroup}</li>
                            <li><strong>Address:</strong> {profile.address}</li>
                            <li>
                                <strong>Emergency Contact:</strong>{" "}
                                {profile.emergencyContact.name} ({profile.emergencyContact.phone})
                            </li>
                        </ul>
                    </div>

                    {/* Chronic Conditions */}
                    <div className="bg-white shadow-lg rounded-3xl p-6 border-l-4 border-pink-500">
                        <h2 className="text-xl font-semibold text-teal-800 mb-3 flex items-center gap-2">
                            <FaNotesMedical /> Chronic Conditions
                        </h2>
                        <ul className="list-disc list-inside text-sm text-teal-700">
                            {profile.chronicDiseases.map((d, i) => (
                                <li key={i}>{d}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Doctor Info */}
                    <div className="bg-white shadow-lg rounded-3xl p-6 border-l-4 border-blue-500">
                        <h2 className="text-xl font-semibold text-teal-800 mb-3 flex items-center gap-2">
                            <FaUserMd /> Primary Doctor
                        </h2>
                        <p className="text-sm text-teal-700">
                            <strong>{profile.doctor.name}</strong> (
                            {profile.doctor.specialization})
                            <br />
                            <span className="text-xs">
                                Last Visit: {profile.doctor.lastVisit}
                            </span>
                        </p>
                    </div>
                </motion.div>

                {/* MIDDLE COLUMN */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    {/* Health Overview */}
                    <div className="bg-white shadow-lg rounded-3xl p-6 border-l-4 border-green-500">
                        <h2 className="text-xl font-semibold text-teal-800 mb-4 flex items-center gap-2">
                            <FaTint /> Health Overview
                        </h2>
                        <div className="grid grid-cols-2 gap-4 text-sm text-teal-700">
                            <p><strong>Blood Sugar:</strong> {profile.healthStats.sugar}</p>
                            <p><strong>Pressure:</strong> {profile.healthStats.pressure}</p>
                            <p><strong>Pulse:</strong> {profile.healthStats.pulse}</p>
                            <p><strong>Sleep:</strong> {profile.healthStats.sleep}</p>
                        </div>
                    </div>

                    {/* Medications */}
                    <div className="bg-white shadow-lg rounded-3xl p-6 border-l-4 border-cyan-500">
                        <h2 className="text-xl font-semibold text-teal-800 mb-3 flex items-center gap-2">
                            <FaCapsules /> Daily Medications
                        </h2>
                        <ul className="list-disc list-inside text-sm text-teal-700">
                            {profile.medication.map((med, i) => (
                                <li key={i}>{med}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Meal Schedule */}
                    <div className="bg-white shadow-lg rounded-3xl p-6 border-l-4 border-orange-400">
                        <h2 className="text-xl font-semibold text-teal-800 mb-3 flex items-center gap-2">
                            <FaUtensils /> Meal Schedule
                        </h2>
                        <ul className="text-sm text-teal-700 space-y-2">
                            {profile.meals.map((meal, i) => (
                                <li key={i} className="flex justify-between">
                                    <span className="font-semibold">{meal.time}</span>
                                    <span>{meal.menu}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                {/* RIGHT COLUMN */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    {/* Lifestyle */}
                    <div className="bg-white shadow-lg rounded-3xl p-6 border-l-4 border-teal-500">
                        <h2 className="text-xl font-semibold text-teal-800 mb-3 flex items-center gap-2">
                            <FaRegSmile /> Lifestyle
                        </h2>
                        <p className="text-sm text-teal-700">{profile.lifestyle}</p>
                    </div>

                    {/* Recent Activities */}
                    <div className="bg-white shadow-lg rounded-3xl p-6 border-l-4 border-green-400">
                        <h2 className="text-xl font-semibold text-teal-800 mb-3 flex items-center gap-2">
                            <FaClock /> Recent Activities
                        </h2>
                        <div className="space-y-3">
                            {profile.activities.map((activity, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 bg-teal-50 rounded-xl p-3 border border-teal-100"
                                >
                                    {activity.icon}
                                    <div>
                                        <p className="text-sm text-teal-800">{activity.event}</p>
                                        <p className="text-xs text-teal-600">{activity.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DashboardProfile;
