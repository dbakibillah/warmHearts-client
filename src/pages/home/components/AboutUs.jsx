// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background gradient + pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-50 via-white to-teal-50"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      {/* Content */}
      <div className="relative container mx-auto flex flex-col md:flex-row items-center gap-10 px-6 md:px-12">
        
        {/* Left Side Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1"
        >
          <img
            src="https://i.ibb.co.com/Z1bjCXmZ/wearehere.jpg"
            alt="We are here"
            className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Right Side Content */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-700 mb-4 drop-shadow-sm">
            About Us
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Welcome to <span className="font-semibold text-teal-600">WarmHearts Shelter</span>, 
            where comfort meets care. Our mission is to provide a nurturing and serene environment 
            for seniors, ensuring they feel valued, respected, and truly at home.
          </p>

          {/* Values Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Values</h2>
            <ul className="grid grid-cols-2 gap-3 text-gray-700 font-medium">
              <li className="flex items-center gap-2">🌿 Compassion</li>
              <li className="flex items-center gap-2">🤝 Respect</li>
              <li className="flex items-center gap-2">✨ Integrity</li>
              <li className="flex items-center gap-2">🏡 Community</li>
            </ul>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-lg shadow-md transition-all duration-300"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
