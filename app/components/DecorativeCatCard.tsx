"use client";

import { motion } from "framer-motion";
import { Cat } from "@/lib/cats-data";
import { Sparkles } from "lucide-react";
import Image from "next/image";

interface DecorativeCatCardProps {
  cat: Cat;
  index: number;
  variant?: "square" | "horizontal";
}

export default function DecorativeCatCard({
  cat,
  index,
  variant = "square"
}: DecorativeCatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="pointer-events-none"
    >
      <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden border-4 border-orange-200">
        <motion.div
          className="absolute top-4 right-4 text-yellow-400 z-10"
          animate={{ rotate: [0, 10, 0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles size={24} />
        </motion.div>

        {/* Image */}
        <div
          className={`relative w-full overflow-hidden bg-gradient-to-br from-orange-100 to-pink-100 ${
            variant === "horizontal" ? "aspect-[16/9]" : "aspect-square"
          }`}
        >
          <Image
            src={cat.image}
            alt={cat.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>

        {/* Info section */}
        <div className="bg-white p-6">
          <h3 className="text-2xl font-bold text-center mb-2 text-orange-600">
            {cat.name}
          </h3>

          <p className="text-center text-gray-600 italic text-sm">
            "{cat.quirk}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}
