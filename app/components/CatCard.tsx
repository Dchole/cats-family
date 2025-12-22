"use client";

import { motion } from "framer-motion";
import { Cat } from "@/lib/cats-data";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
        <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden border-4 border-orange-200 hover:border-pink-300 transition-colors cursor-pointer group">
          <motion.div
            className="absolute top-4 right-4 text-yellow-400 z-10"
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={24} />
          </motion.div>

          {/* Instagram-style image */}
          <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-orange-100 to-pink-100">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>

          {/* White bottom section */}
          <div className="bg-white p-6">
            <h3 className="text-2xl font-bold text-center mb-2 text-orange-600">
              {cat.name}
            </h3>

            <p className="text-center text-gray-600 italic text-sm">
              "{cat.quirk}"
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
