import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

// Subcomponents
import MobileNav from "@/components/MobileNav";
import DashboardHero from "@/components/dashboard/DashboardHero";
import QuickMetrics from "@/components/dashboard/QuickMetrics";
import SkillBreakdown from "@/components/dashboard/SkillBreakdown";
import PrioritySkills from "@/components/dashboard/PrioritySkills";
import StrengthsSection from "@/components/dashboard/StrengthsSection";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("analysisResult");
    if (!stored) {
      navigate("/upload");
    } else {
      try {
        setAnalysisData(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse analysisResult", e);
        navigate("/upload");
      }
    }
    setIsChecking(false);
  }, [navigate]);

  if (isChecking || !analysisData) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <div className="text-slate-400 animate-pulse text-lg">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] relative flex flex-col font-sans text-slate-200 selection:bg-indigo-500/30 overflow-x-hidden pb-24">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] rounded-full bg-sky-600/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
      </div>

      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all duration-300">
              <span className="text-white font-bold text-sm tracking-wide">SS</span>
            </span>
            <span className="text-slate-100 font-semibold text-lg tracking-tight">SkillSync</span>
          </Link>

          <MobileNav />

          {/* Progress Navigation */}
          <nav className="hidden md:flex items-center gap-3 text-sm font-medium">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Dashboard
            </div>
            <span className="text-slate-600">→</span>
            <Link to="/skill-analysis" className="text-slate-500 px-3 py-1 hover:text-slate-300 transition-colors">Skill Analysis</Link>
            <span className="text-slate-600">→</span>
            <Link to="/roadmap" className="text-slate-500 px-3 py-1 hover:text-slate-300 transition-colors">Roadmap</Link>
            <span className="text-slate-600">→</span>
            <Link to="/feedback" className="text-slate-500 px-3 py-1 hover:text-slate-300 transition-colors">Feedback</Link>
          </nav>
        </div>
      </header>

      {/* Main Dashboard Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-32 flex flex-col gap-12">
        {/* Title Block */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold w-fit uppercase tracking-wider">
            <LayoutDashboard className="w-3.5 h-3.5" />
            Workspace
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Resume Analysis Dashboard
          </h1>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl leading-relaxed">
            Track your readiness, identify skill gaps, and accelerate your path toward your target role.
          </p>
        </motion.div>

        {/* 1. Hero Card */}
        <DashboardHero analysis={analysisData} />

        {/* 2. Quick Metrics Grid */}
        <QuickMetrics analysis={analysisData} />

        {/* 3. Skill Breakdown (Bar Chart) */}
        <SkillBreakdown analysis={analysisData} />

        {/* 4. Priority Skills To Learn */}
        <PrioritySkills analysis={analysisData} />

        {/* 5. Strongest Areas */}
        <StrengthsSection analysis={analysisData} />
      </main>
    </div>
  );
}
