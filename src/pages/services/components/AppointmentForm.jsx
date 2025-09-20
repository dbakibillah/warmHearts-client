import { motion } from "framer-motion";
import {
    FaCalendarAlt,
    FaEnvelope,
    FaHeartbeat,
    FaNotesMedical,
    FaPhone,
    FaUser,
    FaUtensils,
    FaHandHoldingHeart,
    FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AppointmentForm = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-24 h-24 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-10 right-10 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-10 left-20 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            <motion.div
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full relative overflow-hidden border border-white/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Header with decorative elements */}
                <div className="text-center mb-8 relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"></div>
                    <motion.h2
                        className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Register an Elderly Person
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        We care with{" "}
                        <FaHeartbeat className="inline text-pink-500 mx-1" />{" "}
                        compassion and expertise
                    </motion.p>
                </div>

                <motion.form
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Elderly Name */}
                    <motion.div className="col-span-2" variants={itemVariants}>
                        <label className="flex items-center text-gray-700 font-semibold mb-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full mr-3">
                                <FaUser className="text-indigo-600" />
                            </span>
                            Elderly Person's Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 shadow-sm"
                            required
                            placeholder="Full name"
                        />
                    </motion.div>

                    {/* Age */}
                    <motion.div variants={itemVariants}>
                        <label className="text-gray-700 font-semibold mb-2 block">
                            Age
                        </label>
                        <input
                            type="number"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 shadow-sm"
                            required
                            min="1"
                            max="120"
                        />
                    </motion.div>

                    {/* Gender */}
                    <motion.div variants={itemVariants}>
                        <label className="text-gray-700 font-semibold mb-2 block">
                            Gender
                        </label>
                        <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 shadow-sm appearance-none bg-white">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </motion.div>

                    {/* Guardian Name */}
                    <motion.div variants={itemVariants}>
                        <label className="text-gray-700 font-semibold mb-2 block">
                            Guardian Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 shadow-sm"
                            required
                            placeholder="Guardian's full name"
                        />
                    </motion.div>

                    {/* Contact Number */}
                    <motion.div variants={itemVariants}>
                        <label className="flex items-center text-gray-700 font-semibold mb-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3">
                                <FaPhone className="text-blue-600" />
                            </span>
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 shadow-sm"
                            required
                            placeholder="+1 (555) 123-4567"
                        />
                    </motion.div>

                    {/* Email */}
                    <motion.div className="col-span-2" variants={itemVariants}>
                        <label className="flex items-center text-gray-700 font-semibold mb-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mr-3">
                                <FaEnvelope className="text-purple-600" />
                            </span>
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all duration-200 shadow-sm"
                            required
                            placeholder="email@example.com"
                        />
                    </motion.div>

                    {/* Health Issues */}
                    <motion.div className="col-span-2" variants={itemVariants}>
                        <label className="flex items-center text-gray-700 font-semibold mb-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full mr-3">
                                <FaHeartbeat className="text-red-600" />
                            </span>
                            Health Issues
                        </label>
                        <textarea
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition-all duration-200 shadow-sm resize-none"
                            placeholder="Diabetes, High BP, Arthritis, etc."
                            rows="3"
                        />
                    </motion.div>

                    {/* Medications */}
                    <motion.div className="col-span-2" variants={itemVariants}>
                        <label className="flex items-center text-gray-700 font-semibold mb-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-3">
                                <FaNotesMedical className="text-green-600" />
                            </span>
                            Current Medications
                        </label>
                        <textarea
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-200 shadow-sm resize-none"
                            placeholder="Medicine name + dosage (e.g., Metformin 500mg twice daily)"
                            rows="3"
                        />
                    </motion.div>

                    {/* Food Preference */}
                    <motion.div className="col-span-2" variants={itemVariants}>
                        <label className="flex items-center text-gray-700 font-semibold mb-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full mr-3">
                                <FaUtensils className="text-yellow-600" />
                            </span>
                            Food Preferences
                        </label>
                        <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all duration-200 shadow-sm appearance-none bg-white">
                            <option>Normal Diet</option>
                            <option>Vegetarian</option>
                            <option>Diabetic Diet</option>
                            <option>Low-Salt</option>
                            <option>Soft Food</option>
                        </select>
                    </motion.div>

                    {/* Date & Time */}
                    <motion.div variants={itemVariants}>
                        <label className="flex items-center text-gray-700 font-semibold mb-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full mr-3">
                                <FaCalendarAlt className="text-indigo-600" />
                            </span>
                            Preferred Date
                        </label>
                        <input
                            type="date"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 shadow-sm"
                            required
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <label className="text-gray-700 font-semibold mb-2 block">
                            Preferred Time
                        </label>
                        <input
                            type="time"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 shadow-sm"
                            required
                        />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                        className="col-span-2 mt-4"
                        variants={itemVariants}
                    >
                        <Link to="/terms">
                            <motion.button
                                type="button"
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                                whileHover={{
                                    scale: 1.02,
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="mr-2">Submit Appointment</span>
                                <FaHandHoldingHeart className="group-hover:scale-110 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.form>

                {/* Footer note */}
                <motion.div
                    className="mt-6 text-center text-gray-500 text-sm flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>Your loved ones deserve the best care</span>
                    <FaStar className="text-yellow-400 ml-1" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default AppointmentForm;
