"use client";
import React, { useState, useEffect, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const ClientReviews = () => {
  const reviews = [
    {
      name: "Sophia Martinez",
      role: "Daughter of Resident",
      review:
        "WarmHearts Shelter has been a blessing for our family. My mother feels truly cared for, respected, and happy here. The staff are compassionate and attentive.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "James Anderson",
      role: "Family Member",
      review:
        "The environment is peaceful and homely. I love how they create activities that bring smiles to everyone’s faces. Truly feels like family.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Olivia Taylor",
      role: "Resident",
      review:
        "This place is my second home. I feel safe, loved, and always part of a warm community. The meals and activities brighten up my days.",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextReview = useCallback(
    () => setCurrent((p) => (p + 1) % reviews.length),
    [reviews.length]
  );
  const prevReview = useCallback(
    () => setCurrent((p) => (p - 1 + reviews.length) % reviews.length),
    [reviews.length]
  );

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
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-teal-700 mb-4">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 mb-12">
          Real stories from families and residents at WarmHearts Shelter
        </p>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-10 max-w-2xl mx-auto min-h-[320px] flex flex-col items-center justify-center"
            >
              <img
                src={reviews[current].image}
                alt={reviews[current].name}
                className="w-20 h-20 rounded-full border-4 border-teal-500 mb-4 object-cover"
              />
              <p className="text-lg text-gray-700 italic mb-4">
                “{reviews[current].review}”
              </p>
              <h3 className="text-xl font-semibold text-teal-700">
                {reviews[current].name}
              </h3>
              <span className="text-gray-500 text-sm">
                {reviews[current].role}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Prev Button */}
          <button
            onClick={prevReview}
            aria-label="Previous review"
            className="absolute top-1/2 left-2 md:-left-8 -translate-y-1/2 bg-teal-600 text-white p-3 rounded-full shadow-md hover:bg-teal-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            {/* Inline chevron icon (no extra libs) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={nextReview}
            aria-label="Next review"
            className="absolute top-1/2 right-2 md:-right-8 -translate-y-1/2 bg-teal-600 text-white p-3 rounded-full shadow-md hover:bg-teal-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            {/* Inline chevron icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === current ? "bg-teal-600 w-6" : "bg-teal-300 hover:bg-teal-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
