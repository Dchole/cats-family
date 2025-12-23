"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Heart, PawPrint } from "lucide-react";
import Image from "next/image";

export default function ContactAdoption() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email Us",
      value: "catsquad@example.com",
      href: "mailto:catsquad@example.com",
      color: "from-orange-400 to-pink-500"
    },
    {
      icon: Phone,
      label: "Call Us",
      value: "(555) 123-4567",
      href: "tel:+15551234567",
      color: "from-pink-400 to-purple-500"
    }
  ];

  return (
    <section
      id="contact-section"
      className="py-20 px-6 bg-gradient-to-b from-orange-50 to-pink-50 relative overflow-hidden"
    >
      {/* Decorative floating paws */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 left-10 text-orange-300 opacity-30"
      >
        <PawPrint size={60} fill="currentColor" />
      </motion.div>
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-10 right-10 text-pink-300 opacity-30"
      >
        <PawPrint size={80} fill="currentColor" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="inline-block mb-4"
          >
            <Heart className="text-pink-500" size={48} fill="currentColor" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold text-orange-600 mb-4">
            Ready to Add a Furry Friend?
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            We occasionally have adorable kittens ready for their forever homes.
            Get in touch to learn about available kittens and the adoption
            process!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.label}
              href={method.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="block"
            >
              <div
                className={`bg-gradient-to-br ${method.color} p-8 rounded-3xl shadow-xl text-white relative overflow-hidden group`}
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  animate={{
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/20 p-4 rounded-full">
                      <method.icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold">{method.label}</h3>
                  </div>
                  <p className="text-xl font-medium">{method.value}</p>
                </div>

                {/* Decorative paw in corner */}
                <div className="absolute -bottom-4 -right-4 opacity-20">
                  <PawPrint size={100} fill="white" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Additional message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center bg-white rounded-3xl p-8 shadow-lg max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <PawPrint
              className="text-orange-500"
              size={24}
              fill="currentColor"
            />
            <h3 className="text-2xl font-bold text-gray-800">
              We'd Love to Hear From You!
            </h3>
            <PawPrint className="text-pink-500" size={24} fill="currentColor" />
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Whether you're interested in adoption, have questions about our
            cats, or just want to say hello, feel free to reach out. We
            typically respond within 24 hours and would be thrilled to help you
            find your perfect furry companion! 🐱💕
          </p>
        </motion.div>
      </div>
    </section>
  );
}
