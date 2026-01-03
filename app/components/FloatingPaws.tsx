"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

const DEFAULT_WIDTH = 1920;
const DEFAULT_HEIGHT = 1080;

export default function FloatingPaws() {
  const [dimensions, setDimensions] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : DEFAULT_WIDTH,
    height: typeof window !== "undefined" ? window.innerHeight : DEFAULT_HEIGHT
  }));
  const isInitialMount = useRef(true);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    // Set initial dimensions only on first mount
    if (isInitialMount.current && dimensions.width === DEFAULT_WIDTH) {
      handleResize();
      isInitialMount.current = false;
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty - we only want this to run once

  // Generate random values once using useState to ensure purity
  const [pawsData] = useState(() =>
    Array.from({ length: 6 }).map((_, index) => ({
      id: `paw-${index}-${Math.random().toString(36).substring(7)}`, // Unique stable ID
      initialX: Math.random() * DEFAULT_WIDTH,
      initialRotate: Math.random() * 360,
      animateRotate: Math.random() * 360 + 360,
      animateXOffset: Math.random() * 200 - 100,
      duration: 15 + Math.random() * 10,
      delay: index * 2
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {pawsData.map(paw => (
        <motion.div
          key={paw.id}
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
            delay: paw.delay,
            ease: "linear"
          }}
        >
          <PawPrint size={40} />
        </motion.div>
      ))}
    </div>
  );
}
