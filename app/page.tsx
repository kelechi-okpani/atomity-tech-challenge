import { CloudExplorer } from "./src/components/CloudExplorer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] selection:bg-[#7CFFAB]/30">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-slate-100 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">
        
        <header className="w-full max-w-6xl mb-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-[11px] font-black tracking-[0.25em] text-slate-400 uppercase">
              Live Cloud Infrastructure
            </h2>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            Efficiency Explorer
          </h1>
          <p className="text-slate-500 max-w-2xl text-lg leading-relaxed">
            Drill down into clusters, namespaces, and pods to identify 
            resource-level cost optimizations.
          </p>
        </header>

        <CloudExplorer />

        <footer className="mt-16 w-full max-w-6xl flex justify-between items-center text-slate-400 border-t border-slate-200/60 pt-8">
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest">
            <span className="hover:text-slate-600 cursor-help transition-colors">Documentation</span>
            <span className="hover:text-slate-600 cursor-help transition-colors">API Status</span>
            <span className="hover:text-slate-600 cursor-help transition-colors">Support</span>
          </div>
          <p className="text-[11px] font-medium">
            &copy; {new Date().getFullYear()} CloudCompute Inc.
          </p>
        </footer>
      </div>
    </main>
  );
}