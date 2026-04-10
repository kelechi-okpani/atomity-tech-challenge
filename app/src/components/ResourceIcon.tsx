"use client";
import { motion } from "framer-motion";
import { Cpu, Box, HardDrive, Activity, LayoutGrid } from "lucide-react";

const icons = {
  CPU: Cpu,
  GPU: LayoutGrid,
  RAM: Box,
  Storage: HardDrive,
  Network: Activity,
};

export const ResourceIcon = ({ type, index }: { type: keyof typeof icons; index: number }) => {
  const Icon = icons[type];

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: index * 0.05 
      }}
      className="flex flex-col items-center gap-3"
    >
      <div className="w-20 h-20 bg-[#7CFFAB] rounded-2xl flex items-center justify-center shadow-sm">
        <Icon size={32} className="text-emerald-900/70" strokeWidth={1.5} />
      </div>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        {type}
      </span>
    </motion.div>
  );
};