"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

export default function FloatingPaws() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Generate random values once
  const pawsData = useMemo(
    () =>
      Array.from({ length: 6 }).map(() => ({
        initialX: Math.random() * dimensions.width,
        initialRotate: Math.random() * 360,
        animateRotate: Math.random() * 360 + 360,
        animateX: Math.random() * dimensions.width,
        duration: 15 + Math.random() * 10
      })),
    [dimensions.width]
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {pawsData.map((paw, i) => (
        <motion.div
          key={i}
          className="absolute text-[#D4766A]/10"
          initial={{
            x: paw.initialX,
            y: -50,
            rotate: paw.initialRotate
          }}
          animate={{
            y: dimensions.height + 50,
            rotate: paw.animateRotate,
            x: paw.animateX
          }}
          transition={{
            duration: paw.duration,
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
