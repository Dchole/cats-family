"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

export default function FloatingPaws() {
  const [dimensions, setDimensions] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080
  }));

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    // Set initial dimensions if not already set
    if (dimensions.width === 1920) {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dimensions.width]);

  // Generate random values once using useState to ensure purity
  const [pawsData] = useState(() =>
    Array.from({ length: 6 }).map(() => ({
      initialX: Math.random() * 1920,
      initialRotate: Math.random() * 360,
      animateRotate: Math.random() * 360 + 360,
      animateXOffset: Math.random() * 200 - 100, // Random offset from initial position
      duration: 15 + Math.random() * 10
    }))
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
            x: paw.initialX + paw.animateXOffset
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
