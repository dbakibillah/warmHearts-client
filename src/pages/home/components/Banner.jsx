// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
    return (
        <section
            className="relative h-screen bg-cover bg-center flex items-center justify-center text-center overflow-hidden"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80')",
            }}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-teal-900/50 to-teal-800/40"></div>

            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-teal-400/10"
                        style={{
                            width: `${Math.random() * 100 + 50}px`,
                            height: `${Math.random() * 100 + 50}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl px-6 md:px-12">
                {/* Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6"
                >
                    <span className="inline-block px-4 py-2 bg-teal-700/30 backdrop-blur-sm rounded-full text-teal-300 font-semibold text-sm md:text-base tracking-wider border border-teal-400/30">
                        Welcome to WarmHearts Shelter
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                >
                    <span className="block bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500 bg-clip-text text-transparent pb-2">
                        Where Comfort
                    </span>
                    <span className="block bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 bg-clip-text text-transparent">
                        Meets Care
                    </span>
                </motion.h1>

                {/* Decorative separator */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100px" }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto mb-8 rounded-full"
                />

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
                >
                    Dedicated to creating a safe, nurturing, and joyful
                    environment where every resident feels valued and at home.
                </motion.p>

                {/* Call-to-action buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="flex flex-col sm:flex-row justify-center gap-5 items-center"
                >
                    <Link to="/subscription">
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow:
                                    "0 10px 25px -5px rgba(13, 148, 136, 0.5)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2 group"
                        >
                            <span>Get Our Service</span>
                            <svg
                                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                ></path>
                            </svg>
                        </motion.button>
                    </Link>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-lg font-semibold rounded-xl border border-white/20 shadow-lg transition-all duration-300"
                    >
                        Learn More
                    </motion.button>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <div className="flex flex-col items-center">
                    <span className="text-sm text-teal-300 mb-2">
                        Scroll Down
                    </span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-teal-400 rounded-full flex justify-center"
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1 h-1 bg-teal-400 rounded-full mt-2"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Banner;
