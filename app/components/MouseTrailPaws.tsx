"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint } from "lucide-react";

const MAX_PAWS = 20;
const PAW_LIFETIME = 2000;

interface PawTrail {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

export default function MouseTrailPaws() {
  const [pawTrails, setPawTrails] = useState<PawTrail[]>([]);
  const idCounter = useRef(0);
  const timeoutRefs = useRef<Map<number, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const pawId = ++idCounter.current;
      const newPaw: PawTrail = {
        id: pawId,
        x: e.clientX,
        y: e.clientY,
        rotation: Math.random() * 360
      };

      setPawTrails(prev => {
        // Keep only last MAX_PAWS for performance
        const updated = [...prev, newPaw].slice(-MAX_PAWS);
        return updated;
      });

      // Remove this paw after animation completes
      const timeout = setTimeout(() => {
        setPawTrails(prev => prev.filter(p => p.id !== pawId));
        timeoutRefs.current.delete(pawId);
      }, PAW_LIFETIME);

      timeoutRefs.current.set(pawId, timeout);
    };

    window.addEventListener("click", handleClick);

    // Cleanup function
    const cleanup = () => {
      window.removeEventListener("click", handleClick);
      // Clear all pending timeouts on unmount
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current.clear();
    };

    return cleanup;
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
