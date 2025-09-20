// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
    FaCheckCircle,
    FaCrown,
    FaHeartbeat,
    FaHandsHelping,
    FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Subscription = () => {
    const plans = [
        {
            title: "Compassion Package",
            price: "Free (Donation-Based)",
            duration: "",
            icon: <FaHandsHelping className="text-4xl" />,
            features: [
                "Shared room (3–4 people)",
                "Basic bedding & dishes",
                "Monthly health check-up",
                "Recreational activities",
                "3 meals per day (simple diet)",
                "1 cup tea/snack in afternoon",
            ],
            popular: false,
        },
        {
            title: "Comfort Package",
            price: "5000 Taka",
            duration: "1 Week",
            icon: <FaHeartbeat className="text-4xl" />,
            features: [
                "Semi-private room (2 people)",
                "Fan, clean bed, cupboard",
                "Nurse monthly check-up",
                "Prayer space access",
                "Morning walk & games",
                "3 meals (fish/meat 3 days)",
            ],
            popular: false,
        },
        {
            title: "Care Plus Package",
            price: "10,000 Taka",
            duration: "1 Month",
            icon: <FaHeartbeat className="text-4xl" />,
            features: [
                "Shared room (2–4 people)",
                "Weekly cleaning & laundry",
                "Bi-monthly health check-up",
                "24/7 caregiver support",
                "Physiotherapy monthly",
                "Balanced meals + milk/snacks",
            ],
            popular: false,
        },
        {
            title: "Golden Premium Package",
            price: "25,000 Taka",
            duration: "1 Year",
            icon: <FaCrown className="text-4xl" />,
            features: [
                "Private AC room & furniture",
                "24/7 nurse & doctor on-call",
                "Mental health counseling",
                "Hobby classes (music, gardening)",
                "4 meals + Custom nutrition",
                "Imported fruits & supplements",
            ],
            popular: true,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section className="relative py-24 overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-blue-50">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-blue-400/10 to-purple-400/10 transform -skew-y-3 -translate-y-30 origin-top-right"></div>

            {/* Floating elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-float"></div>
            <div className="absolute top-1/3 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-float animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-20 w-24 h-24 bg-amber-400/15 rounded-full animate-float animation-delay-4000"></div>

            <div className="relative max-w-7xl mx-auto px-6 z-10">
                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        Choose Your{" "}
                        <span className="text-blue-600">Care Package</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Select the best plan that suits your loved ones' needs.
                        Compassion, comfort, and care — all tailored for them.
                    </p>
                </motion.div>

                {/* Subscription Plans */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="relative group"
                        >
                            {/* Popular badge */}
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                                    <div className="bg-amber-600 text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                                        <FaStar className="text-amber-200" />
                                        Recommended
                                    </div>
                                </div>
                            )}

                            <div className="h-full bg-white rounded-lg shadow-md border border-gray-200 group-hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                                {/* Card header */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4 mx-auto">
                                        {plan.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                                        {plan.title}
                                    </h3>
                                    <div className="text-center">
                                        <span className="text-2xl font-bold text-gray-900 block">
                                            {plan.price}
                                        </span>
                                        {plan.duration && (
                                            <span className="text-sm text-gray-500">
                                                {plan.duration}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Features list */}
                                <div className="p-6 flex-grow">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-3"
                                            >
                                                <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-gray-700 leading-relaxed">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA Button */}
                                <div className="p-6 pt-0">
                                    <Link
                                        to="/appointment"
                                        state={{
                                            selectedPlan: plan.title,
                                            price: plan.price,
                                        }}
                                    >
                                        <motion.button
                                            whileHover={{
                                                scale: 1.02,
                                                backgroundColor: plan.popular
                                                    ? "#d97706"
                                                    : "#2563eb",
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full py-3 rounded-md font-medium text-sm transition-colors duration-200 cursor-pointer ${
                                                plan.popular
                                                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                                            }`}
                                        >
                                            Select Plan
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100"
                >
                    <p className="text-gray-700">
                        💙 All packages include basic amenities and access to
                        common areas.
                        <span className="font-semibold text-blue-600">
                            {" "}
                            Contact us
                        </span>{" "}
                        for custom care plans tailored to specific needs.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Subscription;
