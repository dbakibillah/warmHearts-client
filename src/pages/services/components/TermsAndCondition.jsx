import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const TermsAndConditions = () => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    alert("✅ You have accepted the Terms & Conditions");
    // You can also redirect user here, e.g. navigate("/appointment")
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-4xl w-full"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-extrabold text-gray-800 mb-6 text-center"
        >
          Terms & Conditions
        </motion.h1>

        {/* Content */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="list-disc list-inside space-y-4 text-gray-700 leading-relaxed"
        >
          <li>
            All personal and medical information must be accurate and up to date.
          </li>
          <li>
            Family members must disclose allergies, dietary restrictions, or health issues.
          </li>
          <li>
            The shelter team may take emergency decisions for resident well-being.
          </li>
          <li>
            Payment (if applicable) should be made on time as per package.
          </li>
          <li>
            Visitors are allowed during official visiting hours only.
          </li>
          <li>
            Shelter is not responsible for any undisclosed health issues.
          </li>
        </motion.ul>

        {/* Confirmation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 flex flex-col items-center"
        >
          {confirmed ? (
            <div className="flex items-center text-green-600 font-semibold text-lg">
              <FaCheckCircle className="mr-2" /> You have accepted the Terms
            </div>
          ) : (
            <motion.button
              onClick={handleConfirm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold rounded-xl shadow-lg transition-all"
            >
              Confirm & Continue
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TermsAndConditions;
