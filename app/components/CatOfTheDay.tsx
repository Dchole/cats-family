"use client";

import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Cat } from "@/lib/cats-data";

interface CatOfTheDayProps {
  cat: Cat;
}

export default function CatOfTheDay({ cat }: CatOfTheDayProps) {
  return (
    <section className="py-20 px-6 bg-[#F5F1EA] relative overflow-hidden">
      {/* Decorative stars */}
      <motion.div className="absolute top-10 right-10 text-[#8B6F47] opacity-30">
        <Star size={80} fill="currentColor" />
      </motion.div>

      <motion.div className="absolute bottom-10 left-10 text-[#D4766A] opacity-30">
        <Star size={60} fill="currentColor" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-[#8B6F47]" size={32} />
            <h2 className="text-5xl md:text-6xl font-bold text-[#D4766A]">
              Cat of the Day
            </h2>
            <Sparkles className="text-[#8B6F47]" size={32} />
          </div>
          <p className="text-xl text-gray-700">
            Today's spotlight shines on...
          </p>
        </motion.div>

        <Link href={`/cats/${cat.id}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto cursor-pointer border-4 border-yellow-400 relative"
          >
            {/* Special badge */}
            <motion.div
              initial={{ rotate: -10 }}
              whileInView={{ rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.6 }}
              className="absolute top-4 right-4 bg-[#8B6F47] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg z-10 flex items-center gap-2"
            >
              <Star size={16} fill="currentColor" />
              FEATURED
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square rounded-2xl overflow-hidden"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Info */}
              <div className="flex flex-col justify-center">
                <h3 className="text-4xl md:text-5xl font-bold text-[#D4766A] mb-4">
                  {cat.name}
                </h3>

                <div className="space-y-4 text-gray-700">
                  <p className="text-lg">
                    <span className="font-semibold text-[#8B6F47]">Age:</span>{" "}
                    {cat.age} years old
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-[#8B6F47]">Breed:</span>{" "}
                    {cat.breed}
                  </p>
                  <p className="text-lg italic bg-[#F5F1EA] p-4 rounded-xl border-l-4 border-[#D4766A]">
                    "{cat.quirk}"
                  </p>
                  <p className="text-base text-gray-600">
                    <span className="font-semibold">Fun Fact:</span>{" "}
                    {cat.funFact}
                  </p>
                </div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="mt-6 inline-flex items-center text-[#D4766A] font-semibold text-lg"
                >
                  Meet {cat.name} →
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
