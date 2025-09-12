import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaCalendarAlt, FaClock, FaPaperPlane } from "react-icons/fa";

const AppointmentForm = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Book an Appointment
        </h2>
        <form className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="flex items-center text-gray-700 font-medium mb-2">
              <FaUser className="mr-2 text-indigo-600" /> Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="flex items-center text-gray-700 font-medium mb-2">
              <FaEnvelope className="mr-2 text-indigo-600" /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="Enter your email"
            />
          </div>

          {/* Date Field */}
          <div>
            <label htmlFor="date" className="flex items-center text-gray-700 font-medium mb-2">
              <FaCalendarAlt className="mr-2 text-indigo-600" /> Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          {/* Time Field */}
          <div>
            <label htmlFor="time" className="flex items-center text-gray-700 font-medium mb-2">
              <FaClock className="mr-2 text-indigo-600" /> Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPaperPlane /> Submit
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default AppointmentForm;
