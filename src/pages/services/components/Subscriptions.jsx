// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaCheckCircle, FaCrown, FaHeartbeat, FaHandsHelping } from "react-icons/fa";
import { Link } from "react-router";

const Subscription = () => {
  const plans = [
    {
      title: "Compassion Package",
      price: "Free (Donation-Based)",
      duration: "",
      icon: <FaHandsHelping className="text-blue-500 text-3xl mb-3" />,
      features: [
        "Shared room (3–4 people)",
        "Basic bedding & dishes",
        "Monthly health check-up",
        "Recreational activities (music, storytelling)",
        "3 meals per day (simple diet)",
        "1 cup tea/snack in afternoon",
      ],
      color: "from-blue-100 to-blue-50",
    },
    {
      title: "Comfort Package",
      price: "5000 Taka",
      duration: "1 Week",
      icon: <FaHeartbeat className="text-green-500 text-3xl mb-3" />,
      features: [
        "Semi-private room (2 people)",
        "Fan, clean bed, cupboard",
        "Nurse monthly check-up",
        "Prayer space access",
        "Morning walk & games",
        "3 meals (fish/meat 3 days, fruits 2 days)",
      ],
      color: "from-green-100 to-green-50",
    },
    {
      title: "Care Plus Package",
      price: "10,000 Taka",
      duration: "1 Month",
      icon: <FaHeartbeat className="text-purple-500 text-3xl mb-3" />,
      features: [
        "Shared room (2–4 people)",
        "Weekly cleaning & laundry",
        "Bi-monthly health check-up",
        "24/7 caregiver support",
        "Physiotherapy monthly",
        "Balanced meals + milk/snacks",
      ],
      color: "from-purple-100 to-purple-50",
    },
    {
      title: "Golden Premium Package",
      price: "25,000 Taka",
      duration: "1 Year",
      icon: <FaCrown className="text-yellow-500 text-3xl mb-3" />,
      features: [
        "Private AC room & furniture",
        "24/7 nurse & doctor on-call",
        "Mental health counseling",
        "Hobby classes (music, gardening)",
        "4 meals + Custom nutrition",
        "Imported fruits & supplements",
      ],
      color: "from-yellow-100 to-yellow-50",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-indigo-50 via-gray-50 to-blue-100">
      {/* Animated Floating Orbs */}
      <motion.div
        animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full filter blur-3xl opacity-40"
      />
      <motion.div
        animate={{ x: [0, -80, 80, 0], y: [0, 60, -60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-blue-300 rounded-full filter blur-3xl opacity-40"
      />
      <motion.div
        animate={{ x: [0, 60, -60, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-30"
      />

      {/* Title Section */}
      <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          💙 Choose Your Care Package
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Select the best plan that suits your loved ones’ needs.  
          Compassion, comfort, and care — all tailored for them.
        </p>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08, y: -10 }}
              transition={{ type: "spring", stiffness: 150 }}
              className={`bg-gradient-to-br ${plan.color} shadow-xl rounded-2xl p-8 border hover:shadow-2xl relative z-10`}
            >
              <div className="flex flex-col items-center">
                {plan.icon}
                <h3 className="text-2xl font-bold text-gray-800">{plan.title}</h3>
                <p className="text-lg text-blue-700 font-semibold mt-2">
                  {plan.duration && `${plan.duration} •`} {plan.price}
                </p>
              </div>

              <ul className="text-sm text-gray-700 mt-6 space-y-3 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> {feature}
                  </li>
                ))}
              </ul>

              <Link to="/appointment" className="mt-8 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold shadow-md transition-all">
                Select this Plan
              </Link>

              {plan.title.includes("Premium") && (
                <span className="absolute top-3 right-3 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full text-gray-900">
                  Popular ⭐
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wave Animation at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-40"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            fill="#3b82f6"
            fillOpacity="0.7"
            animate={{
              d: [
                "M0,160L60,154.7C120,149,240,139,360,133.3C480,128,600,128,720,138.7C840,149,960,171,1080,165.3C1200,160,1320,128,1380,112L1440,96L1440,320L0,320Z",
                "M0,192L60,202.7C120,213,240,235,360,224C480,213,600,171,720,165.3C840,160,960,192,1080,181.3C1200,171,1320,117,1380,90.7L1440,64L1440,320L0,320Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  );
};

export default Subscription;
