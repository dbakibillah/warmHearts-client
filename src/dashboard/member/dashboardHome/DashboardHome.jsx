// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
    FaAmbulance,
    FaExclamationTriangle,
    FaHeartbeat,
    FaNotesMedical,
    FaPhoneAlt,
    FaUserMd,
    FaUtensils,
    FaStar,
    FaClock,
    FaCalendarAlt,
    FaHeart,
} from "react-icons/fa";

const DashboardHome = () => {
    const person = {
        name: "Abdul Karim",
        age: 72,
        bloodGroup: "O+",
        joined: "2025-05-14",
        photo: "https://i.pravatar.cc/200?img=65",
        healthStatus: "Diabetic, needs daily insulin & blood pressure check.",
        contact: "+880 1700-123456",
        emergencyContact: "+880 1900-987654",
        favoriteMeal: "Vegetable Soup",
    };

    const services = [
        {
            icon: <FaUtensils className="text-3xl" />,
            title: "Daily Food Choice",
            desc: "Personalized meals for health and taste.",
            status: "Today's menu ready",
            color: "from-orange-400 to-orange-500",
        },
        {
            icon: <FaAmbulance className="text-3xl" />,
            title: "Emergency Support",
            desc: "24/7 ambulance & medical staff available.",
            status: "All clear",
            color: "from-red-400 to-red-500",
        },
        {
            icon: <FaHeartbeat className="text-3xl" />,
            title: "Care & Health",
            desc: "Daily monitoring, medicine & checkups.",
            status: "Insulin taken ✅",
            color: "from-pink-400 to-pink-500",
        },
        {
            icon: <FaUserMd className="text-3xl" />,
            title: "Doctor Visits",
            desc: "Specialist consultation every week.",
            status: "Next visit: 22 Sep 2025",
            color: "from-blue-400 to-blue-500",
        },
    ];

    const recentActivities = [
        {
            date: "12 Sep 2025",
            activity: "Took morning insulin at 8:00 AM",
            icon: <FaNotesMedical className="text-green-500" />,
            time: "08:00 AM",
        },
        {
            date: "11 Sep 2025",
            activity: "Attended doctor consultation (Cardiology)",
            icon: <FaUserMd className="text-blue-500" />,
            time: "02:30 PM",
        },
        {
            date: "10 Sep 2025",
            activity: "Selected soft diet (vegetarian lunch)",
            icon: <FaUtensils className="text-orange-500" />,
            time: "12:15 PM",
        },
    ];

    const stats = [
        { label: "Days in Care", value: "120", icon: <FaCalendarAlt /> },
        { label: "Medications Today", value: "3", icon: <FaNotesMedical /> },
        { label: "Meals Served", value: "360", icon: <FaUtensils /> },
        { label: "Doctor Visits", value: "12", icon: <FaUserMd /> },
    ];

    return (
        <div className="p-6 min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h1 className="text-4xl font-bold text-teal-800 mb-2">
                    Welcome to Care Dashboard
                </h1>
                <p className="text-teal-600">
                    Comprehensive care management for our beloved seniors
                </p>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-teal-100"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-teal-700">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-teal-600">
                                    {stat.label}
                                </p>
                            </div>
                            <div className="text-teal-500 text-xl">
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Profile Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-6 mb-8 border border-teal-100"
            >
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="relative">
                        <img
                            src={person.photo}
                            alt={person.name}
                            className="w-32 h-32 rounded-2xl object-cover shadow-lg border-4 border-teal-200"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-teal-500 text-white p-2 rounded-full">
                            <FaHeart className="text-sm" />
                        </div>
                    </div>

                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-4 flex-wrap">
                            <h2 className="text-2xl font-bold text-teal-800">
                                {person.name}
                            </h2>
                            <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                                {person.age} years
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-teal-600 font-medium">
                                        Blood Group:
                                    </span>
                                    <span className="px-3 py-1 bg-red-100 text-red-600 font-semibold rounded-full text-sm">
                                        {person.bloodGroup}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-teal-600">
                                    <FaCalendarAlt className="text-teal-500" />
                                    <span>Joined: {person.joined}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-teal-600">
                                    <FaPhoneAlt className="text-green-500" />
                                    <span>{person.contact}</span>
                                </div>
                                <div className="flex items-center gap-2 text-teal-600">
                                    <FaExclamationTriangle className="text-red-400" />
                                    <span className="text-sm">
                                        Emergency: {person.emergencyContact}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                            <p className="text-teal-700 flex items-center gap-2">
                                <FaHeartbeat className="text-pink-500" />
                                {person.healthStatus}
                            </p>
                            <p className="text-teal-600 mt-2 flex items-center gap-2">
                                <FaUtensils className="text-orange-500" />
                                <strong>Favorite Meal:</strong>{" "}
                                {person.favoriteMeal}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Services */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <h3 className="text-2xl font-semibold text-teal-800 mb-6 text-center">
                    Care Services
                </h3>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-gradient-to-br ${service.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300`}
                        >
                            <div className="flex justify-center mb-4">
                                {service.icon}
                            </div>
                            <h4 className="text-lg font-bold mb-2 text-center">
                                {service.title}
                            </h4>
                            <p className="text-white/90 text-sm text-center mb-3">
                                {service.desc}
                            </p>
                            <p className="text-white/80 text-xs text-center font-medium bg-white/20 rounded-full py-1 px-3">
                                {service.status}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/90 backdrop-blur-lg border border-teal-100 shadow-xl rounded-3xl p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-teal-800">
                        Recent Activities
                    </h3>
                    <FaClock className="text-teal-500 text-xl" />
                </div>

                <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl border border-teal-100 hover:bg-teal-100 transition-colors"
                        >
                            <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                {activity.icon}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-teal-800">
                                    {activity.activity}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-teal-600">
                                    <span>{activity.date}</span>
                                    <span>•</span>
                                    <span>{activity.time}</span>
                                </div>
                            </div>
                            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <button className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center justify-center gap-2 mx-auto">
                        View All Activities
                        <FaStar className="text-yellow-400" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default DashboardHome;
