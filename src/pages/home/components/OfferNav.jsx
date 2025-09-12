// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
    FaHeart,
    FaHeartbeat,
    FaHome,
    FaMusic,
    FaUsers,
    FaUtensils,
} from "react-icons/fa";

const OfferNav = () => {
    const services = [
        {
            icon: <FaHeart className="text-3xl text-pink-500" />,
            title: "Compassionate Care",
            desc: "Providing heartfelt care with dignity and respect.",
        },
        {
            icon: <FaUtensils className="text-3xl text-amber-600" />,
            title: "Healthy Meals",
            desc: "Nutritious meals prepared with love for every resident.",
        },
        {
            icon: <FaMusic className="text-3xl text-purple-500" />,
            title: "Engaging Activities",
            desc: "Music, art, and social events to keep spirits high.",
        },
        {
            icon: <FaHeartbeat className="text-3xl text-red-500" />,
            title: "Health Support",
            desc: "24/7 medical assistance and wellness monitoring.",
        },
        {
            icon: <FaHome className="text-3xl text-teal-600" />,
            title: "Comfortable Living",
            desc: "Safe, serene, and homely environment for seniors.",
        },
        {
            icon: <FaUsers className="text-3xl text-blue-500" />,
            title: "Community Bonding",
            desc: "Fostering friendship and meaningful connections.",
        },
    ];

    // Animation variants
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
            },
        },
    };

    return (
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-teal-600 via-teal-500 to-teal-400">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 transform -skew-y-3 -translate-y-30 origin-top-right"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-teal-700/20 rounded-full"></div>
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-teal-700/60 rounded-full"></div>

            {/* Floating elements */}
            <div className="absolute top-1/4 left-10 w-6 h-6 bg-white/30 rounded-full animate-float"></div>
            <div className="absolute top-1/3 right-20 w-8 h-8 bg-teal-600/30 rounded-full animate-float animation-delay-1000"></div>
            <div className="absolute bottom-1/4 left-20 w-10 h-10 bg-white/20 rounded-full animate-float animation-delay-2000"></div>

            <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative">
                        Our <span className="text-teal-900">Services</span>
                        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1/3 h-1.5 bg-gradient-to-r from-teal-700 to-blue-800 rounded-full"></span>
                    </h2>
                    <p className="text-xl text-teal-100 max-w-3xl mx-auto">
                        At{" "}
                        <span className="font-semibold text-white">
                            WarmHearts Shelter
                        </span>
                        , we provide a range of services designed to bring
                        comfort, care, and joy to every resident.
                    </p>
                </motion.div>

                {/* Grid of services */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                                y: -10,
                                transition: { duration: 0.3 },
                            }}
                            className="relative group"
                        >
                            <div className="relative bg-white rounded-3xl shadow-xl p-8 h-full transform group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
                                {/* Icon container */}
                                <div className="mb-6 relative">
                                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-teal-100 rounded-2xl transform -rotate-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 group-hover:from-teal-100 group-hover:to-teal-200 transition-all duration-300">
                                        {service.icon}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-teal-800 mb-3 group-hover:text-teal-900 transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                                    {service.desc}
                                </p>

                                {/* Hover effect line */}
                                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-teal-400 to-teal-600 group-hover:w-full transition-all duration-500"></div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default OfferNav;
