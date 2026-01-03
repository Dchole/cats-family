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
      <Link
        href={`/cats/${cat.id}`}
        aria-label={`View details about ${cat.name}`}
      >
        <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden border-4 border-[#8B9A8B]/30 hover:border-[#D4766A] transition-colors cursor-pointer group">
          <motion.div
            className="absolute top-4 right-4 text-[#8B6F47] z-10"
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-hidden="true"
          >
            <Sparkles size={24} />
          </motion.div>

          {/* Instagram-style image */}
          <div className="relative w-full aspect-square overflow-hidden bg-[#F5F1EA]">
            <Image
              src={cat.image}
              alt={`${cat.name}, a ${cat.age} year old ${cat.breed} cat`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>

          {/* White bottom section */}
          <div className="bg-white p-6">
            <h3 className="text-2xl font-bold text-center mb-2 text-[#D4766A]">
              {cat.name}
            </h3>

            <p className="text-center text-gray-600 italic text-sm">
              &quot;{cat.quirk}&quot;
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
