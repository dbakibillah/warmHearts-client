import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  FaArrowRight,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const AppointmentForm = () => {
  const location = useLocation();
  const { selectedPlan, price } = location.state || {};
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    elderlyName: "",
    age: "",
    gender: "Male",
    guardianName: "",
    contactNumber: "",
    email: "",
    healthIssues: "",
    medications: "",
    foodPreference: "Normal Diet",
    preferredDate: "",
    preferredTime: "",
  });

  const steps = [
    { number: 1, title: "Personal Info", icon: <FaUser className="text-sm" /> },
    { number: 2, title: "Contact Details", icon: <FaPhone className="text-sm" /> },
    { number: 3, title: "Health Info", icon: <FaHeartbeat className="text-sm" /> },
    { number: 4, title: "Appointment", icon: <FaCalendarAlt className="text-sm" /> },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const stepVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-blue-400/10 to-purple-400/10 transform -skew-y-3 -translate-y-30 origin-top-right"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-float"></div>
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-float animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-20 w-24 h-24 bg-amber-400/15 rounded-full animate-float animation-delay-4000"></div>

      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-6 max-w-4xl w-full relative overflow-hidden border border-white/20 backdrop-blur-sm"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"></div>
          <motion.h2
            className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Register an Elderly Person
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            We care with <FaHeartbeat className="inline text-pink-500 mx-1" /> compassion and expertise
          </motion.p>
        </div>

        {/* Selected Plan Banner */}
        {selectedPlan && (
          <motion.div
            className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-800">Selected Plan: {selectedPlan}</h3>
                <p className="text-blue-600">{price}</p>
              </div>
              <FaCheckCircle className="text-green-500 text-xl" />
            </div>
          </motion.div>
        )}

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    currentStep >= step.number ? "bg-blue-500 border-blue-500 text-white" : "border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep > step.number ? <FaCheckCircle /> : step.icon}
                </div>
                <span
                  className={`text-xs mt-2 font-medium ${
                    currentStep >= step.number ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div className="col-span-2" variants={itemVariants}>
                  <label className="flex items-center text-gray-700 font-semibold mb-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full mr-3">
                      <FaUser className="text-indigo-600" />
                    </span>
                    Elderly Person's Name
                  </label>
                  <input
                    type="text"
                    name="elderlyName"
                    value={formData.elderlyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 shadow-sm"
                    required
                    placeholder="Full name"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="text-gray-700 font-semibold mb-2 block">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 shadow-sm"
                    required
                    min="1"
                    max="120"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="text-gray-700 font-semibold mb-2 block">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 shadow-sm appearance-none bg-white"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="text-gray-700 font-semibold mb-2 block">Guardian Name</label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 shadow-sm"
                    required
                    placeholder="Guardian's full name"
                  />
                </motion.div>
              </div>
            )}
            {/* Remaining steps (2-4) same as above... */}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <motion.button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              currentStep === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            whileHover={{ scale: currentStep === 1 ? 1 : 1.02 }}
          >
            <FaArrowLeft className="mr-2" />
            Previous
          </motion.button>

          {currentStep < 4 ? (
            <motion.button
              onClick={nextStep}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Next
              <FaArrowRight className="ml-2" />
            </motion.button>
          ) : (
            <Link to="/terms">
              <motion.button
                className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-teal-600 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Appointment
                <FaHandHoldingHeart className="ml-2" />
              </motion.button>
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default AppointmentForm;
