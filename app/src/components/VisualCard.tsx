"use client";
import { motion } from "framer-motion";

interface VisualCardProps {
  name: string;
  height: number;
  onClick: () => void;
}

export const VisualCard = ({ name, height, onClick }: VisualCardProps) => {
  return (
    <motion.div 
      onClick={onClick}
      className="flex flex-col items-center gap-4 cursor-pointer group"
      whileHover={{ y: -5 }}
    >
      <div className="relative w-full flex items-end justify-center h-32 px-4">
        <motion.div
          layoutId={`bar-${name}`}
          className="w-full bg-[#7CFFAB] rounded-2xl shadow-sm group-hover:shadow-lg transition-shadow"
          style={{ height: `${height}%` }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        />
      </div>
      <span className="text-sm font-semibold text-slate-600">{name}</span>
    </motion.div>
  );
};