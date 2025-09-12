// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
    FaHeart,
    FaHandsHelping,
    FaStar,
    FaUsers,
    FaArrowRight,
} from "react-icons/fa";

const AboutUs = () => {
    return (
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-teal-50 via-white to-blue-50">
            {/* Enhanced decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-teal-600/10 to-blue-400/10 transform -skew-y-3 -translate-y-30 origin-top-right"></div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-400/10 rounded-full blur-xl"></div>
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-300/15 rounded-full blur-xl"></div>

            {/* Floating elements */}
            <div className="absolute top-1/4 left-10 w-6 h-6 bg-teal-400/20 rounded-full animate-float"></div>
            <div className="absolute top-1/3 right-20 w-8 h-8 bg-blue-400/20 rounded-full animate-float animation-delay-1000"></div>
            <div className="absolute bottom-1/4 left-20 w-10 h-10 bg-teal-500/15 rounded-full animate-float animation-delay-2000"></div>

            <div className="relative container mx-auto flex flex-col md:flex-row items-center gap-16 px-6 md:px-12 lg:px-24">
                {/* Left Side Image */}
                <motion.div
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 relative"
                >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-blue-500/30 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="absolute inset-0 border-4 border-white/30 rounded-3xl"></div>
                        <img
                            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1153&q=80"
                            alt="WarmHearts Shelter team with seniors"
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    {/* Floating stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                        className="absolute -bottom-6 -left-4 bg-white p-5 rounded-2xl shadow-lg border border-teal-100"
                    >
                        <div className="text-center">
                            <p className="text-3xl font-bold text-teal-700">
                                15+
                            </p>
                            <p className="text-sm text-gray-600 font-medium">
                                Years of Experience
                            </p>
                        </div>
                    </motion.div>

                    {/* Additional floating element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="absolute -top-6 -right-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white p-3 rounded-2xl shadow-lg"
                    >
                        <div className="flex items-center">
                            <FaHeart className="mr-2" />
                            <span className="text-sm font-semibold">
                                Caring Since 2008
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Side Content */}
                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 text-center md:text-left"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-6xl font-bold text-teal-900 mb-6"
                    >
                        About <span className="text-teal-600">WarmHearts</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-gray-700 leading-relaxed mb-10 font-light"
                    >
                        Welcome to{" "}
                        <span className="font-semibold text-teal-600">
                            WarmHearts Shelter
                        </span>
                        , where comfort meets care. Our mission is to provide a
                        nurturing and serene environment for seniors, ensuring
                        they feel valued, respected, and truly at home.
                    </motion.p>

                    {/* Values Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl font-bold text-teal-900 mb-8 relative inline-block pb-2">
                            Our Values
                            <span className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full"></span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {[
                                {
                                    icon: (
                                        <FaHeart className="text-2xl text-pink-500" />
                                    ),
                                    title: "Compassion",
                                    desc: "Heartfelt care for every resident",
                                },
                                {
                                    icon: (
                                        <FaHandsHelping className="text-2xl text-teal-500" />
                                    ),
                                    title: "Respect",
                                    desc: "Honoring each individual's dignity",
                                },
                                {
                                    icon: (
                                        <FaStar className="text-2xl text-amber-500" />
                                    ),
                                    title: "Integrity",
                                    desc: "Always doing the right thing",
                                },
                                {
                                    icon: (
                                        <FaUsers className="text-2xl text-blue-500" />
                                    ),
                                    title: "Community",
                                    desc: "Building connections that matter",
                                },
                            ].map((value, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{
                                        scale: 1.03,
                                        y: -5,
                                    }}
                                    className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-teal-100/50 hover:border-teal-200 group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-teal-50 rounded-xl group-hover:bg-teal-100 transition-colors duration-300">
                                            {value.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-teal-800 text-lg">
                                                {value.title}
                                            </h3>
                                            <p className="text-gray-600 mt-2">
                                                {value.desc}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow:
                                "0 15px 30px -5px rgba(5, 150, 150, 0.25)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 mx-auto md:mx-0 group"
                    >
                        <span>Learn More About Us</span>
                        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;
