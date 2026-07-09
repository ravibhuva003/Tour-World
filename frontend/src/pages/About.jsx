import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-[#f9f9f9] min-h-screen py-4 font-['Outfit']">
      {/* Hero Section */}
      <div className="container mx-auto px-6 lg:px-20 mb-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#0b2727] mb-4">
            Discover The World With Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            We believe that travel is more than just visiting a new place; it’s about experiencing different cultures, tasting new flavors, and creating memories that last a lifetime.
          </p>
        </motion.div>
      </div>

      {/* Our Story & Mission */}
      <div className="container mx-auto px-6 lg:px-20 mb-6">
        <div className="flex flex-col md:flex-row gap-12 items-center bg-white p-8 md:p-12 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
          <motion.div 
            className="md:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[#0b2727]">Our Story</h2>
            <p className="text-gray-600 leading-relaxed text-[1.05rem]">
              Founded with a passion for exploration, Tour World began as a small group of travel enthusiasts who wanted to share the beauty of the globe. Over the years, we've grown into a trusted travel partner for thousands of adventurers.
            </p>
            <p className="text-gray-600 leading-relaxed text-[1.05rem]">
              Our mission is to make travel accessible, enjoyable, and safe for everyone. We carefully curate our tours to ensure you get the best experience without the hassle of planning every little detail.
            </p>
            <div className="pt-4">
               <button className="bg-gradient-to-r from-[#faa935] to-[#f75c03] text-white px-8 py-3 rounded-xl font-medium shadow-[0_4px_15px_rgba(247,92,3,0.3)] hover:shadow-[0_6px_20px_rgba(247,92,3,0.4)] transition-all">
                  Join Our Journey
               </button>
            </div>
          </motion.div>

          <motion.div 
            className="md:w-1/2 w-full h-[350px] bg-gradient-to-br from-[#faa935] to-[#f75c03] rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
             {/* Decorative abstract elements */}
             <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
             <div className="absolute bottom-[-50px] left-[-50px] w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
             
             <div className="text-center text-white z-10 px-6">
                <i className="ri-earth-line text-7xl mb-4 opacity-90 block"></i>
                <h3 className="text-2xl font-bold">15+ Years</h3>
                <p className="opacity-90">of creating unforgettable experiences</p>
             </div>
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0b2727] mb-4">Why Choose Us?</h2>
          <p className="text-gray-600">We go the extra mile to make your trip perfect.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "ri-map-pin-user-line",
              title: "Expert Guides",
              desc: "Our local guides have deep knowledge of the destinations, ensuring you discover hidden gems."
            },
            {
              icon: "ri-wallet-3-line",
              title: "Best Value",
              desc: "We offer competitive pricing without compromising on quality or comfort during your travels."
            },
            {
              icon: "ri-customer-service-2-line",
              title: "24/7 Support",
              desc: "Our dedicated support team is always available to assist you, no matter where you are."
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all border border-gray-100 flex flex-col items-center text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 bg-[#faa935]/10 text-[#f75c03] rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-[#f75c03] group-hover:text-white transition-all duration-300">
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-[#0b2727] mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-[0.95rem] leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
