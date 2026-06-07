import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RoadmapHero from "../components/roadmap/RoadmapHero";
import MobileNav from "@/components/MobileNav";
import RoadmapReasons from "../components/roadmap/RoadmapReasons";
import LearningTimeline from "../components/roadmap/LearningTimeline";
import LearningModules from "../components/roadmap/LearningModules";
import RecommendedResources from "../components/roadmap/RecommendedResources";
import ProgressTracker from "../components/roadmap/ProgressTracker";
import CareerReadinessPath from "../components/roadmap/CareerReadinessPath";

export default function RoadmapPage() {
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("analysisResult");
    if (!data) {
      navigate("/upload");
      return;
    }
    try {
      const parsedData = JSON.parse(data);
      // Depending on the structure stored, it might be { analysis: {...} } or directly {...}
      // based on previous pages: Dashboard does const { role, score, ... } = analysisData.analysis ? analysisData.analysis : analysisData;
      const actualData = parsedData.analysis ? parsedData.analysis : parsedData;
      setAnalysisData(actualData);
    } catch (e) {
      console.error("Failed to parse analysisResult", e);
      navigate("/upload");
    }
  }, [navigate]);

  if (!analysisData) return null;

  return (
    <div className="min-h-screen bg-[#020617] font-sans selection:bg-purple-500/30">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pb-24">
        {/* Sticky Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300">
                <span className="text-white font-bold text-sm tracking-wide">ss</span>
              </div>
              <span className="text-slate-100 font-semibold text-lg tracking-tight">SkillSync</span>
            </Link>

            <MobileNav />

            <nav className="hidden md:flex items-center gap-3 text-sm font-medium">
              <Link to="/dashboard" className="text-slate-500 px-3 py-1 hover:text-slate-300 transition-colors">
                Dashboard
              </Link>
              <span className="text-slate-600">→</span>
              <Link to="/skill-analysis" className="text-slate-500 px-3 py-1 hover:text-slate-300 transition-colors">
                Skill Analysis
              </Link>
              <span className="text-slate-600">→</span>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                Roadmap
              </div>
              <span className="text-slate-600">→</span>
              <Link to="/feedback" className="text-slate-500 px-3 py-1 hover:text-slate-300 transition-colors">Feedback</Link>
            </nav>
          </div>
        </header>

        <main className="mt-8 flex flex-col gap-0 w-full px-4 sm:px-6 pt-24">
          <RoadmapHero analysisData={analysisData} />
          <RoadmapReasons analysisData={analysisData} />
          <LearningTimeline analysisData={analysisData} />
          <LearningModules analysisData={analysisData} />
          <RecommendedResources analysisData={analysisData} />
          <ProgressTracker analysisData={analysisData} />
          <CareerReadinessPath analysisData={analysisData} />
        </main>
      </div>
    </div>
  );
}
