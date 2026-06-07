import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Subcomponents
import MobileNav from "@/components/MobileNav";
import DetectedSkills from "@/components/skill-analysis/DetectedSkills";
import MissingSkills from "@/components/skill-analysis/MissingSkills";
import CoverageSection from "@/components/skill-analysis/CoverageSection";
import GapAnalysis from "@/components/skill-analysis/GapAnalysis";
import PriorityLearningAreas from "@/components/skill-analysis/PriorityLearningAreas";

export default function SkillAnalysisPage() {
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
        <div className="text-slate-400 animate-pulse text-lg">Loading Analysis...</div>
      </div>
    );
  }

  const { matchedSkills = [], missingSkills = [], roadmap = [] } = analysisData;
  const totalSkills = matchedSkills.length + missingSkills.length;

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
            <Link to="/dashboard" className="text-slate-500 px-3 py-1 hover:text-slate-300 transition-colors">
              Dashboard
            </Link>
            <span className="text-slate-600">→</span>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Skill Analysis
            </div>
            <span className="text-slate-600">→</span>
            <Link to="/roadmap" className="text-slate-500 px-3 py-1 hover:text-slate-300 transition-colors">Roadmap</Link>
            <span className="text-slate-600">→</span>
            <Link to="/feedback" className="text-slate-500 px-3 py-1 hover:text-slate-300 transition-colors">Feedback</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-32 flex flex-col gap-12">
        {/* Sections 1 & 2: Detected vs Missing Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <DetectedSkills matchedSkills={matchedSkills} totalSkills={totalSkills} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MissingSkills missingSkills={missingSkills} />
          </motion.div>
        </div>

        {/* Section 3: Job Description Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <CoverageSection matchedSkills={matchedSkills} missingSkills={missingSkills} />
        </motion.div>

        {/* Section 4: Gap Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <GapAnalysis matchedSkills={matchedSkills} missingSkills={missingSkills} />
        </motion.div>

        {/* Section 5: Priority Learning Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <PriorityLearningAreas roadmap={roadmap} />
        </motion.div>
      </main>
    </div>
  );
}
