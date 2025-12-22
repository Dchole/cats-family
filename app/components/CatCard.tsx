"use client";

import { motion } from "framer-motion";
import { Cat } from "@/lib/cats-data";
import { Sparkles } from "lucide-react";
import Link from "next/link";

interface CatCardProps {
  cat: Cat;
  index: number;
}

export default function CatCard({ cat, index }: CatCardProps) {
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
    >
      <Link href={`/cats/${cat.id}`}>
        <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden p-6 border-4 border-orange-200 hover:border-pink-300 transition-colors cursor-pointer group">
          <motion.div
            className="absolute top-4 right-4 text-yellow-400"
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={24} />
          </motion.div>

          <div className="w-32 h-32 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
            🐱
          </div>

          <h3 className="text-2xl font-bold text-center mb-2 text-orange-600">
            {cat.name}
          </h3>

          <p className="text-center text-gray-600 italic text-sm">
            "{cat.quirk}"
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
