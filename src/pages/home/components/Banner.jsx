// src/pages/home/components/Banner.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Banner = () => {
    return (
        <section
            className="relative h-screen bg-cover bg-center flex items-center"
            style={{
                backgroundImage:
                    "url('https://i.ibb.co.com/xSBMK7t7/Banner.jpg')",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content box */}
            <div className="relative z-10 max-w-3xl px-8 md:px-16 bg-black/30 rounded-lg p-6 md:p-8 shadow-lg ml-20">
                {/* Heading without glow */}
                <motion.h1
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-extrabold leading-tight tracking-wide"
                    style={{
                        fontFamily: "'Montserrat', sans-serif",
                        background:
                            "linear-gradient(to right, #0f766e, #14b8a6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Where Comfort Meets Care
                </motion.h1>

                {/* Animated Paragraph */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-4 text-white text-lg md:text-xl font-medium drop-shadow-lg max-w-xl"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                    Our caring team is dedicated to providing the best support
                    for your furry friends. We make sure every resident feels
                    respected, important, and at home.
                </motion.p>

                {/* Animated Button */}
                <motion.button
                    whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 16px rgba(20, 184, 166, 0.6)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="mt-6 px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 ease-in-out"
                >
                    Get Our Service
                </motion.button>
            </div>
        </section>
    );
};

export default Banner;
