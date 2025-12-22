"use client";

import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

export default function FloatingPaws() {
  const paws = Array.from({ length: 6 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {paws.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-orange-300/20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
            rotate: Math.random() * 360
          }}
          animate={{
            y: window.innerHeight + 50,
            rotate: Math.random() * 360 + 360,
            x: Math.random() * window.innerWidth
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
        >
          <PawPrint size={40} />
        </motion.div>
      ))}
    </div>
  );
}
