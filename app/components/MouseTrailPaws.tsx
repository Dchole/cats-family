"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint } from "lucide-react";

interface PawTrail {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

export default function MouseTrailPaws() {
  const [pawTrails, setPawTrails] = useState<PawTrail[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newPaw: PawTrail = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        rotation: Math.random() * 360
      };

      setPawTrails(prev => {
        // Keep only last 20 paws for performance
        const updated = [...prev, newPaw].slice(-20);
        return updated;
      });

      // Remove this paw after animation completes
      setTimeout(() => {
        setPawTrails(prev => prev.filter(p => p.id !== newPaw.id));
      }, 2000);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {pawTrails.map(paw => (
          <motion.div
            key={paw.id}
            initial={{
              opacity: 0,
              scale: 0
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.2, 1]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute"
            style={{
              left: paw.x - 12,
              top: paw.y - 12,
              transform: `rotate(${paw.rotation}deg)`
            }}
          >
            <PawPrint
              size={24}
              className="text-[#D4766A]"
              fill="currentColor"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
