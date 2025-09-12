// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import {
    FaChevronLeft,
    FaChevronRight,
    FaQuoteLeft,
    FaStar,
} from "react-icons/fa";

const ClientReviews = () => {
    const reviews = [
        {
            name: "Sophia Martinez",
            role: "Daughter of Resident",
            review: "WarmHearts Shelter has been a blessing for our family. My mother feels truly cared for, respected, and happy here. The staff are compassionate and attentive.",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 5,
        },
        {
            name: "James Anderson",
            role: "Family Member",
            review: "The environment is peaceful and homely. I love how they create activities that bring smiles to everyone's faces. Truly feels like family.",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 5,
        },
        {
            name: "Olivia Taylor",
            role: "Resident",
            review: "This place is my second home. I feel safe, loved, and always part of a warm community. The meals and activities brighten up my days.",
            image: "https://randomuser.me/api/portraits/women/65.jpg",
            rating: 5,
        },
    ];

    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextReview = useCallback(
        () => setCurrent((p) => (p + 1) % reviews.length),
        [reviews.length]
    );
    const prevReview = useCallback(
        () => setCurrent((p) => (p - 1 + reviews.length) % reviews.length),
        [reviews.length]
    );

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            nextReview();
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, nextReview]);

    // Optional: keyboard navigation (← / →)
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowRight") nextReview();
            if (e.key === "ArrowLeft") prevReview();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [nextReview, prevReview]);

    return (
        <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-24 h-24 bg-teal-200/30 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200/30 rounded-full"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Real stories from families and residents at WarmHearts
                        Shelter
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 80, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -80, scale: 0.95 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mx-auto flex flex-col items-center justify-center relative"
                            onHoverStart={() => setIsAutoPlaying(false)}
                            onHoverEnd={() => setIsAutoPlaying(true)}
                        >
                            {/* Quote icon */}
                            <div className="absolute top-6 left-6 text-teal-200 text-4xl">
                                <FaQuoteLeft />
                            </div>

                            <div className="flex flex-col items-center text-center">
                                {/* Rating stars */}
                                <div className="flex mb-6">
                                    {[...Array(reviews[current].rating)].map(
                                        (_, i) => (
                                            <FaStar
                                                key={i}
                                                className="text-amber-400 text-lg mx-0.5"
                                            />
                                        )
                                    )}
                                </div>

                                {/* Profile image */}
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="relative mb-6"
                                >
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 p-1">
                                        <img
                                            src={reviews[current].image}
                                            alt={reviews[current].name}
                                            className="w-full h-full rounded-full object-cover border-4 border-white"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                                        <FaQuoteLeft className="text-white text-sm" />
                                    </div>
                                </motion.div>

                                {/* Review text */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="text-lg text-gray-700 italic mb-6 leading-relaxed max-w-2xl"
                                >
                                    "{reviews[current].review}"
                                </motion.p>

                                {/* Reviewer info */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="text-center"
                                >
                                    <h3 className="text-xl font-semibold text-teal-800">
                                        {reviews[current].name}
                                    </h3>
                                    <span className="text-gray-500 text-sm">
                                        {reviews[current].role}
                                    </span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#0d9488" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevReview}
                        aria-label="Previous review"
                        className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 bg-teal-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#0d9488" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextReview}
                        aria-label="Next review"
                        className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 bg-teal-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        <FaChevronRight className="w-4 h-4" />
                    </motion.button>
                </div>

                {/* Dots indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex justify-center gap-2"
                >
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            aria-label={`Go to review ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                i === current
                                    ? "bg-teal-600 w-8"
                                    : "bg-teal-300 hover:bg-teal-400 w-2"
                            }`}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ClientReviews;
