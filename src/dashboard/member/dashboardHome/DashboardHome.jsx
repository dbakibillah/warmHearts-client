import React from "react";
import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaUtensils,
  FaAmbulance,
  FaUserMd,
  FaPhoneAlt,
  FaNotesMedical,
  FaExclamationTriangle,
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
      icon: <FaUtensils className="text-orange-500 text-4xl" />,
      title: "Daily Food Choice",
      desc: "Personalized meals for health and taste.",
      status: "Today's menu ready",
    },
    {
      icon: <FaAmbulance className="text-red-500 text-4xl" />,
      title: "Emergency Support",
      desc: "24/7 ambulance & medical staff available.",
      status: "All clear",
    },
    {
      icon: <FaHeartbeat className="text-pink-500 text-4xl" />,
      title: "Care & Health",
      desc: "Daily monitoring, medicine & checkups.",
      status: "Insulin taken ✅",
    },
    {
      icon: <FaUserMd className="text-blue-500 text-4xl" />,
      title: "Doctor Visits",
      desc: "Specialist consultation every week.",
      status: "Next visit: 22 Sep 2025",
    },
  ];

  const recentActivities = [
    {
      date: "12 Sep 2025",
      activity: "Took morning insulin at 8:00 AM",
      icon: <FaNotesMedical className="text-green-500" />,
    },
    {
      date: "11 Sep 2025",
      activity: "Attended doctor consultation (Cardiology)",
      icon: <FaUserMd className="text-blue-500" />,
    },
    {
      date: "10 Sep 2025",
      activity: "Selected soft diet (vegetarian lunch)",
      icon: <FaUtensils className="text-orange-500" />,
    },
  ];

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center border border-gray-200"
      >
        <img
          src={person.photo}
          alt={person.name}
          className="w-44 h-44 rounded-3xl object-cover shadow-lg"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">{person.name}</h2>
          <p className="text-gray-700 text-lg">Age: {person.age}</p>
          <p className="text-gray-700 text-lg">
            Blood Group:{" "}
            <span className="px-3 py-1 bg-red-100 text-red-600 font-semibold rounded-full">
              {person.bloodGroup}
            </span>
          </p>
          <p className="text-gray-700">Joined: {person.joined}</p>
          <p className="text-gray-600 flex items-center gap-2">
            {person.healthStatus.includes("Diabetic") && (
              <FaExclamationTriangle className="text-red-500" />
            )}
            {person.healthStatus}
          </p>
          <p className="text-gray-700 flex items-center gap-2 mt-2">
            <FaPhoneAlt className="text-green-600" /> {person.contact}
          </p>
          <p className="text-gray-700">
            <strong>Emergency:</strong> {person.emergencyContact}
          </p>
          <p className="text-gray-700">
            <strong>Favorite Meal:</strong> {person.favoriteMeal}
          </p>
        </div>
      </motion.div>

      {/* Services */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-12 text-2xl font-semibold text-gray-800 text-center"
      >
        Care Plus Packages
      </motion.h3>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-md p-6 text-center hover:shadow-2xl hover:-translate-y-2 transform transition-all"
          >
            <div className="flex justify-center mb-4">{service.icon}</div>
            <h4 className="text-lg font-bold text-gray-800">{service.title}</h4>
            <p className="text-gray-600 mt-2">{service.desc}</p>
            <p className="mt-3 text-sm font-medium text-green-600">{service.status}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-2xl font-semibold text-gray-800 text-center"
      >
        Recent Activities
      </motion.h3>

      <div className="mt-6 bg-white/90 backdrop-blur-lg border border-gray-200 shadow-xl rounded-3xl p-6">
        <ul className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className="flex items-center gap-4"
            >
              <div className="text-2xl">{activity.icon}</div>
              <div>
                <p className="font-semibold text-gray-800">{activity.activity}</p>
                <p className="text-sm text-gray-500">{activity.date}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
