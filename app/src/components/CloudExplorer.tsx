"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VisualCard } from "./VisualCard";
import { ResourceIcon } from "./ResourceIcon";
import { useCloudExplorer } from "../hooks/useCloudExplorer";


type ViewLevel = 'cluster' | 'namespace' | 'poduction' | 'resource';


export const CloudExplorer = () => {
  const [view, setView] = useState<ViewLevel>('cluster');
  const [path, setPath] = useState(['Cluster']);
  const { data, isLoading } = useCloudExplorer(view === 'resource' ? 'poduction' : view);

  const handleDrillDown = (name: string) => {
    const sequence: ViewLevel[] = ['cluster', 'namespace', 'poduction', 'resource'];
    const currentIndex = sequence.indexOf(view);
    
    if (currentIndex < sequence.length - 1) {
      const nextView = sequence[currentIndex + 1];
      setView(nextView);
      setPath(prev => [...prev, name.split(' ')[1]]); 
    }
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-[40px] p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-slate-100">

      <div className="flex justify-between items-start mb-16">
        <button onClick={() => { setView('cluster'); setPath(['Cluster']); }} 
                className="bg-slate-50 px-4 py-2 rounded-lg text-slate-600 font-bold text-xs uppercase tracking-tighter hover:bg-slate-100 transition-all">
          Last 30 Days
        </button>
        
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 bg-[#7CFFAB]/15 px-2 py-1.5 rounded-lg border border-[#7CFFAB]/30">
            {path.map((step, i) => (
              <div key={i} className="flex items-center">
                <span className="px-2 text-[11px] font-black text-emerald-800 uppercase tracking-tight">
                  {step}
                </span>
                {i < path.length - 1 && (
                    <span className="text-primary/40 text-[10px] mx-1">—</span>
                )}
              </div>
            ))}
          </div>
          <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest mr-1">
            Aggregated by: <span className="text-slate-600">{view}</span>
          </span>
        </div>
      </div>


      <div className="h-48 mb-12 flex justify-around items-end">
        <AnimatePresence mode="wait">
          {view === 'resource' ? (
            <motion.div 
              key="resource-icons" 
              className="flex gap-10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              {(['CPU', 'GPU', 'RAM', 'Storage', 'Network'] as const).map((type, i) => (
                <ResourceIcon key={type} type={type} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="bars" 
              className="grid grid-cols-4 gap-12 w-full"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              {data?.map((item, idx) => (
                <VisualCard 
                  key={item.id} 
                  name={item.name} 
                  height={idx === 0 ? 90 : idx === 1 ? 75 : idx === 2 ? 40 : 25} 
                  onClick={() => handleDrillDown(item.name)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      <div className="relative mt-20">
        <div className="absolute top-[-40px] left-0 w-full h-[1px] bg-slate-100" />
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
              <th className="pb-6 px-4">Name</th>
              <th className="pb-6">CPU</th>
              <th className="pb-6">RAM</th>
              <th className="pb-6">Storage</th>
              <th className="pb-6">Network</th>
              <th className="pb-6">GPU</th>
              <th className="pb-6">Efficiency</th>
              <th className="pb-6 text-right px-4">Total</th>
            </tr>
          </thead>
          <tbody className="relative">
            <AnimatePresence mode="popLayout">
              {data?.map((item) => (
                <motion.tr 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="group hover:bg-slate-50/80 transition-all cursor-pointer"
                  onClick={() => handleDrillDown(item.name)}
                >
                  <td className="py-5 px-4 font-bold text-slate-900 border-b border-slate-50">{item.name}</td>
                  <td className="py-5 text-slate-500 font-medium border-b border-slate-50">${item.cpu.toLocaleString()}</td>
                  <td className="py-5 text-slate-500 font-medium border-b border-slate-50">${item.ram.toLocaleString()}</td>
                  <td className="py-5 text-slate-500 font-medium border-b border-slate-50">${item.storage.toLocaleString()}</td>
                  <td className="py-5 text-slate-500 font-medium border-b border-slate-50">${item.network.toLocaleString()}</td>
                  <td className="py-5 text-slate-500 font-medium border-b border-slate-50">$0</td>
                  <td className="py-5 text-slate-500 font-medium border-b border-slate-50">{item.efficiency}%</td>
                  <td className="py-5 font-bold text-slate-900 text-right px-4 border-b border-slate-50">${item.total.toLocaleString()}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

