import React from "react";

const OfferNav = () => {
  const services = [
    {
      icon: "💖",
      title: "Compassionate Care",
      desc: "Providing heartfelt care with dignity and respect.",
    },
    {
      icon: "🍲",
      title: "Healthy Meals",
      desc: "Nutritious meals prepared with love for every resident.",
    },
    {
      icon: "🎶",
      title: "Engaging Activities",
      desc: "Music, art, and social events to keep spirits high.",
    },
    {
      icon: "🩺",
      title: "Health Support",
      desc: "24/7 medical assistance and wellness monitoring.",
    },
    {
      icon: "🏡",
      title: "Comfortable Living",
      desc: "Safe, serene, and homely environment for seniors.",
    },
    {
      icon: "🤝",
      title: "Community Bonding",
      desc: "Fostering friendship and meaningful connections.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-teal-600 to-teal-400 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
        <p className="text-lg text-teal-100 mb-12">
          At <span className="font-semibold">WarmHearts Shelter</span>, we
          provide a range of services designed to bring comfort, care, and joy
          to every resident.
        </p>

        {/* Grid of services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/90 rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-teal-700 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-700">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferNav;
