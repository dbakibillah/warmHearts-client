// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
    FaAward,
    FaClock,
    FaHandHoldingHeart,
    FaHeart,
    FaMapMarkerAlt,
    FaPhone,
    FaQuoteLeft,
    FaStar,
    FaUsers
} from "react-icons/fa";

const AboutUs = () => {
    const teamMembers = [
        {
            name: "Dr. Sarah Johnson",
            role: "Medical Director",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
            bio: "15+ years of experience in geriatric care",
        },
        {
            name: "Michael Chen",
            role: "Head Caregiver",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
            bio: "Specialized in dementia and Alzheimer's care",
        },
        {
            name: "Emily Rodriguez",
            role: "Nutrition Specialist",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
            bio: "Registered dietitian with 10 years experience",
        },
    ];

    const values = [
        {
            icon: <FaHeart />,
            title: "Compassion",
            description: "We treat every resident with love and respect",
        },
        {
            icon: <FaUsers />,
            title: "Community",
            description: "Building a supportive family environment",
        },
        {
            icon: <FaAward />,
            title: "Excellence",
            description: "Highest standards of care and service",
        },
        {
            icon: <FaHandHoldingHeart />,
            title: "Dignity",
            description: "Preserving independence and self-worth",
        },
    ];

    const stats = [
        { number: "500+", label: "Seniors Helped" },
        { number: "15+", label: "Years Experience" },
        { number: "98%", label: "Satisfaction Rate" },
    ];

    const fadeIn = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
            {/* Hero Section */}
            <div className="relative py-20 bg-gradient-to-r from-teal-700 to-teal-800 text-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold mb-6"
                    >
                        About WarmHearts Shelter
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl max-w-3xl mx-auto"
                    >
                        Providing compassionate care and a loving home for
                        seniors since 2008
                    </motion.p>
                </div>
            </div>

            {/* Mission Statement */}
            <div className="py-20 px-6 max-w-7xl mx-auto">
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        Our Mission
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                        At WarmHearts Shelter, we believe every senior deserves
                        to live their golden years with dignity, comfort, and
                        joy. Our mission is to provide exceptional care that
                        nurtures the mind, body, and spirit.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    className="grid grid-cols-3 gap-8 mb-20"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl font-bold text-teal-600 mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-600 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Values */}
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
                >
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="text-center p-6 bg-white rounded-2xl shadow-lg"
                        >
                            <div className="flex justify-center mb-4 text-3xl text-teal-500">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                {value.title}
                            </h3>
                            <p className="text-gray-600">{value.description}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Story */}
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    className="bg-white rounded-2xl shadow-lg p-8"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Our Story
                    </h2>
                    <div className="text-gray-600 space-y-4">
                        <p>
                            Founded in 2008 by Dr. Sarah Johnson, WarmHearts
                            Shelter began as a small community initiative to
                            address the growing need for quality elderly care.
                        </p>
                        <p>
                            What started as a 10-bed facility has now grown into
                            a comprehensive care center serving hundreds of
                            seniors each year.
                        </p>
                        <p>
                            Today, we continue to innovate while maintaining the
                            personal touch and compassionate care that has been
                            our hallmark from the beginning.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Team Section */}
            <div className="py-20 bg-teal-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            Meet Our Team
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Our dedicated team brings expertise, compassion, and
                            commitment to every aspect of care.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                variants={fadeIn}
                                initial="hidden"
                                whileInView="visible"
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {member.name}
                                    </h3>
                                    <p className="text-teal-600 font-medium mb-3">
                                        {member.role}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        {member.bio}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-20 px-6 max-w-7xl mx-auto">
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        What Families Say
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((item, index) => (
                        <motion.div
                            key={index}
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-lg"
                        >
                            <FaQuoteLeft className="text-teal-500 text-2xl mb-4" />
                            <p className="text-gray-600 mb-6 italic">
                                "The care and compassion shown to my mother has
                                been exceptional. WarmHearts truly feels like
                                family."
                            </p>
                            <div className="flex items-center">
                                <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            className="text-yellow-400"
                                        />
                                    ))}
                                </div>
                                <span className="ml-2 text-sm text-gray-600">
                                    - Sarah M.
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Contact Info */}
            <div className="py-20 bg-gradient-to-r from-teal-900 via-teal-800 to-teal-900 text-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        className="mb-12"
                    >
                        <h2 className="text-4xl font-bold mb-6">
                            Visit Us Today
                        </h2>
                        <p className="text-xl">
                            We'd love to show you around our facility
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                        >
                            <FaMapMarkerAlt className="text-3xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Address
                            </h3>
                            <p>
                                123 Care Street
                                <br />
                                City, State 12345
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ delay: 0.1 }}
                        >
                            <FaPhone className="text-3xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Phone
                            </h3>
                            <p>
                                (555) 123-HELP
                                <br />
                                24/7 Support
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ delay: 0.2 }}
                        >
                            <FaClock className="text-3xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Hours
                            </h3>
                            <p>
                                Open 24/7
                                <br />
                                Tours: 9AM-5PM Daily
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
