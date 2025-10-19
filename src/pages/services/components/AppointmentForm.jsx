// eslint-disable-next-line no-unused-vars
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
    FaArrowRight,
    FaArrowLeft,
    FaCheckCircle,
    FaClock,
} from "react-icons/fa";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserData from "../../../hooks/useUserData";

const AppointmentForm = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useUserData();
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedPlan, price } = location.state || {};
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        elderlyName: "",
        age: "",
        gender: "Male",
        guardianName: "",
        contactNumber: "",
        address: "",
        healthIssues: "",
        medications: "",
        foodPreference: "Normal Diet",
        preferredDate: "",
        preferredTime: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const steps = [
        {
            number: 1,
            title: "Personal Info",
            icon: <FaUser className="text-sm" />,
        },
        {
            number: 2,
            title: "Contact Details",
            icon: <FaPhone className="text-sm" />,
        },
        {
            number: 3,
            title: "Health Info",
            icon: <FaHeartbeat className="text-sm" />,
        },
        {
            number: 4,
            title: "Appointment",
            icon: <FaCalendarAlt className="text-sm" />,
        },
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const nextStep = () => {
        // Validate current step before proceeding
        if (currentStep === 1) {
            if (
                !formData.elderlyName ||
                !formData.age ||
                !formData.guardianName
            ) {
                alert("Please fill in all required personal information");
                return;
            }
        } else if (currentStep === 2) {
            if (!formData.contactNumber || !formData.address) {
                alert("Please fill in all required contact details");
                return;
            }
        } else if (currentStep === 3) {
            // Step 3 doesn't have required fields, so we can always proceed
        }

        setCurrentStep((prev) => Math.min(prev + 1, 4));
    };

    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

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

    const stepVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: { x: 0, opacity: 1 },
        exit: { x: -100, opacity: 0 },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Step 4 validation
        if (!formData.preferredDate || !formData.preferredTime) {
            alert("Please select both date and time for your appointment");
            return;
        }

        setIsSubmitting(true);

        const submissionData = {
            ...formData,
            selectedPlan,
            price,
            userEmail: currentUser?.email || "",
        };
        await axiosSecure.post("/appointments", submissionData);
        setTimeout(() => {
            setIsSubmitting(false);
            navigate("/dashboard/my-appointments", {
                state: {
                    formData: { ...formData, selectedPlan, price },
                    appointmentId: Math.random().toString(36).substr(2, 9),
                },
            });
        }, 1500);
    };

    return (
        <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-blue-400/10 to-purple-400/10 transform -skew-y-3 -translate-y-30 origin-top-right"></div>

            {/* Floating elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-float"></div>
            <div className="absolute top-1/3 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-float animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-20 w-24 h-24 bg-amber-400/15 rounded-full animate-float animation-delay-4000"></div>

            <motion.form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl shadow-2xl p-6 max-w-4xl w-full relative overflow-hidden border border-white/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Selected Plan Banner */}
                {selectedPlan && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-blue-800">
                                    Selected Plan: {selectedPlan}
                                </h3>
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
                            <div
                                key={step.number}
                                className="flex flex-col items-center"
                            >
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                        currentStep >= step.number
                                            ? "bg-blue-500 border-blue-500 text-white"
                                            : "border-gray-300 text-gray-400"
                                    }`}
                                >
                                    {currentStep > step.number ? (
                                        <FaCheckCircle />
                                    ) : (
                                        step.icon
                                    )}
                                </div>
                                <span
                                    className={`text-xs mt-2 font-medium ${
                                        currentStep >= step.number
                                            ? "text-blue-600"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {step.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{
                                width: `${(currentStep / steps.length) * 100}%`,
                            }}
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
                                <motion.div variants={itemVariants}>
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
                                    <label className="text-gray-700 font-semibold mb-2 block">
                                        Age
                                    </label>
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
                                    <label className="text-gray-700 font-semibold mb-2 block">
                                        Gender
                                    </label>
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
                                    <label className="text-gray-700 font-semibold mb-2 block">
                                        Guardian Name
                                    </label>
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

                        {currentStep === 2 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div variants={itemVariants}>
                                    <label className="flex items-center text-gray-700 font-semibold mb-2">
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3">
                                            <FaPhone className="text-blue-600" />
                                        </span>
                                        Contact Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 shadow-sm"
                                        required
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <label className="flex items-center text-gray-700 font-semibold mb-2">
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mr-3">
                                            <FaEnvelope className="text-purple-600" />
                                        </span>
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all duration-200 shadow-sm"
                                        required
                                        placeholder="123 Main St, Anytown, BD"
                                    />
                                </motion.div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="grid grid-cols-1 gap-6">
                                <motion.div variants={itemVariants}>
                                    <label className="flex items-center text-gray-700 font-semibold mb-2">
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full mr-3">
                                            <FaHeartbeat className="text-red-600" />
                                        </span>
                                        Health Issues
                                    </label>
                                    <textarea
                                        name="healthIssues"
                                        value={formData.healthIssues}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition-all duration-200 shadow-sm resize-none"
                                        placeholder="Diabetes, High BP, Arthritis, etc."
                                        rows="3"
                                    />
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <label className="flex items-center text-gray-700 font-semibold mb-2">
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-3">
                                            <FaNotesMedical className="text-green-600" />
                                        </span>
                                        Current Medications
                                    </label>
                                    <textarea
                                        name="medications"
                                        value={formData.medications}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-200 shadow-sm resize-none"
                                        placeholder="Medicine name + dosage (e.g., Metformin 500mg twice daily)"
                                        rows="3"
                                    />
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <label className="flex items-center text-gray-700 font-semibold mb-2">
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full mr-3">
                                            <FaUtensils className="text-yellow-600" />
                                        </span>
                                        Food Preferences
                                    </label>
                                    <select
                                        name="foodPreference"
                                        value={formData.foodPreference}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all duration-200 shadow-sm appearance-none bg-white"
                                    >
                                        <option>Normal Diet</option>
                                        <option>Vegetarian</option>
                                        <option>Diabetic Diet</option>
                                        <option>Low-Salt</option>
                                        <option>Soft Food</option>
                                    </select>
                                </motion.div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div variants={itemVariants}>
                                    <label className="flex items-center text-gray-700 font-semibold mb-2">
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full mr-3">
                                            <FaCalendarAlt className="text-indigo-600" />
                                        </span>
                                        Preferred Date
                                    </label>
                                    <input
                                        type="date"
                                        name="preferredDate"
                                        value={formData.preferredDate}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 shadow-sm"
                                        required
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <label className="text-gray-700 font-semibold mb-2 block">
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full mr-3">
                                            <FaClock className="text-indigo-600" />
                                        </span>
                                        Preferred Time
                                    </label>
                                    <input
                                        type="time"
                                        name="preferredTime"
                                        value={formData.preferredTime}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 shadow-sm"
                                        required
                                    />
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    <motion.button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                            currentStep === 1
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        whileHover={{ scale: currentStep === 1 ? 1 : 1.02 }}
                    >
                        <FaArrowLeft className="mr-2" />
                        Previous
                    </motion.button>

                    {currentStep < 4 ? (
                        <motion.button
                            type="button"
                            onClick={nextStep} // ✅ শুধু nextStep চলবে, submit নয়
                            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Next
                            <FaArrowRight className="ml-2" />
                        </motion.button>
                    ) : (
                        <motion.button
                            type="button"
                            onClick={handleSubmit} // ✅ শুধু Step 4 এ submit হবে
                            disabled={isSubmitting}
                            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                isSubmitting
                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                    : "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600"
                            }`}
                            whileHover={isSubmitting ? {} : { scale: 1.02 }}
                            whileTap={isSubmitting ? {} : { scale: 0.98 }}
                        >
                            {isSubmitting ? (
                                <>Submitting...</>
                            ) : (
                                <>
                                    Submit Appointment
                                    <FaHandHoldingHeart className="ml-2" />
                                </>
                            )}
                        </motion.button>
                    )}
                </div>
            </motion.form>
        </section>
    );
};

export default AppointmentForm;
