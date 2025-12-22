"use client";

import { motion } from "framer-motion";
import { ArrowRight, Coffee, Zap, Heart, PackageOpen } from "lucide-react";
import Link from "next/link";
import FloatingPaws from "./components/FloatingPaws";
import CatCard from "./components/CatCard";
import StatCounter from "./components/StatCounter";
import { cats } from "@/lib/cats-data";

export default function Home() {
  return (
    <div className="min-h-screen">
      <FloatingPaws />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Welcome to the
              <br />
              Feline Squad
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl md:text-3xl text-gray-700 mb-12 font-light"
          >
            Where every day is a purr-fect adventure
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href="/cats">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-10 py-5 rounded-full text-xl font-semibold shadow-lg hover:shadow-2xl transition-shadow inline-flex items-center gap-3 group"
              >
                Meet the Cats
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={24} />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-6xl">🐾</div>
        </motion.div>
      </section>

      {/* Featured Cats Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-orange-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-center mb-16 text-orange-600"
          >
            Our Adorable Residents
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {cats.map((cat, index) => (
              <CatCard key={cat.id} cat={cat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Fun Stats Section */}
      <section className="py-20 px-6 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-center mb-16 text-pink-600"
          >
            Today's Feline Stats
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCounter
              icon={Coffee}
              value={27}
              label="Naps Taken"
              index={0}
            />
            <StatCounter
              icon={Zap}
              value={13}
              label="Zoomies Episodes"
              index={1}
            />
            <StatCounter
              icon={Heart}
              value={99}
              suffix="+"
              label="Cuddles Given"
              index={2}
            />
            <StatCounter
              icon={PackageOpen}
              value={5}
              label="Items Knocked Over"
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-orange-50 to-pink-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-7xl mb-6"
          >
            😺
          </motion.div>
          <blockquote className="text-3xl md:text-4xl font-light text-gray-700 italic">
            "In ancient times cats were worshipped as gods;
            <br />
            they have not forgotten this."
          </blockquote>
          <p className="text-xl text-gray-500 mt-6">— Terry Pratchett</p>
        </motion.div>
      </section>
    </div>
  );
}
