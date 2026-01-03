"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { LucideIcon } from "lucide-react";

interface StatCounterProps {
  icon: LucideIcon;
  value: number;
  label: string;
  suffix?: string;
  index: number;
}

export default function StatCounter({
  icon: Icon,
  value,
  label,
  suffix = "",
  index
}: StatCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      delay: index * 0.2
    });
    return controls.stop;
  }, [count, value, index]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow border-2 border-[#8B9A8B]/20"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        className="text-[#D4766A]"
      >
        <Icon size={40} />
      </motion.div>

      <div className="text-4xl font-bold text-[#D4766A]">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>

      <div className="text-sm text-gray-600 text-center">{label}</div>
    </motion.div>
  );
}
