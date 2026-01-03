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
      <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden border-4 border-[#D4766A]/50">
        <motion.div
          className="absolute top-4 right-4 text-[#8B6F47] z-10"
          animate={{ rotate: [0, 10, 0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden="true"
        >
          <Sparkles size={24} />
        </motion.div>

        {/* Image */}
        <div
          className={`relative w-full overflow-hidden bg-[#F5F1EA] ${
            variant === "horizontal" ? "aspect-video" : "aspect-square"
          }`}
        >
          <Image
            src={cat.image}
            alt={`${cat.name}, a ${cat.breed} cat`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>

        {/* Info section */}
        <div className="bg-white p-6">
          <h3 className="text-2xl font-bold text-center mb-2 text-[#D4766A]">
            {cat.name}
          </h3>

          <p className="text-center text-gray-600 italic text-sm">
            &quot;{cat.quirk}&quot;
          </p>
        </div>
      </div>
    </motion.div>
  );
}
