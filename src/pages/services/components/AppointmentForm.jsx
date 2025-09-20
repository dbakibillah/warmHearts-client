// eslint-disable react/no-unescaped-entities
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaNotesMedical, FaUtensils, FaHeartbeat } from "react-icons/fa";
import { Link } from "react-router";

const AppointmentForm = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-3xl w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Register an Elderly Person
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Elderly Name */}
          <div className="col-span-2">
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <FaUser className="mr-2 text-indigo-600" /> Elderly Person's Name
            </label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>

          {/* Age */}
          <div>
            <label className="text-gray-700 font-medium mb-2">Age</label>
            <input type="number" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>

          {/* Gender */}
          <div>
            <label className="text-gray-700 font-medium mb-2">Gender</label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Guardian Name */}
          <div>
            <label className="text-gray-700 font-medium mb-2">Guardian Name</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>

          {/* Contact Number */}
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <FaPhone className="mr-2 text-indigo-600" /> Contact Number
            </label>
            <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>

          {/* Email */}
          <div className="col-span-2">
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <FaEnvelope className="mr-2 text-indigo-600" /> Email
            </label>
            <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>

          {/* Health Issues */}
          <div className="col-span-2">
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <FaHeartbeat className="mr-2 text-red-600" /> Health Issues
            </label>
            <textarea className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400 outline-none" placeholder="Diabetes, High BP, etc." />
          </div>

          {/* Medications */}
          <div className="col-span-2">
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <FaNotesMedical className="mr-2 text-green-600" /> Current Medications
            </label>
            <textarea className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none" placeholder="Medicine name + dosage" />
          </div>

          {/* Food Preference */}
          <div className="col-span-2">
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <FaUtensils className="mr-2 text-yellow-600" /> Food Preferences
            </label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none">
              <option>Normal Diet</option>
              <option>Vegetarian</option>
              <option>Diabetic Diet</option>
              <option>Low-Salt</option>
              <option>Soft Food</option>
            </select>
          </div>

          {/* Date & Time */}
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <FaCalendarAlt className="mr-2 text-indigo-600" /> Preferred Date
            </label>
            <input type="date" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>
          <div>
            <label className="text-gray-700 font-medium mb-2">Preferred Time</label>
            <input type="time" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>

          {/* Submit */}
          <Link to="/terms">
          <motion.button
            type="submit"
            className="col-span-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Appointment
          </motion.button>
          </Link>
        </form>
      </motion.div>
    </section>
  );
};

export default AppointmentForm;
