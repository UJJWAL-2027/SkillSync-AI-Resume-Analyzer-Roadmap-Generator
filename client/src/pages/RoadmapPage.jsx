import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RoadmapHero from "../components/roadmap/RoadmapHero";
import RoadmapReasons from "../components/roadmap/RoadmapReasons";
import LearningTimeline from "../components/roadmap/LearningTimeline";
import LearningModules from "../components/roadmap/LearningModules";
import RecommendedResources from "../components/roadmap/RecommendedResources";

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Navbar Matching Dashboard/SkillAnalysis */}
        <header className="flex flex-col md:flex-row items-center justify-between py-6 gap-4 md:gap-0 sticky top-0 bg-[#020617]/80 backdrop-blur-md z-50 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="text-white font-bold text-lg">ss</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">SkillSync</span>
          </div>

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
            <span className="text-slate-500 px-3 py-1 cursor-not-allowed">Feedback</span>
          </nav>
        </header>

        <main className="mt-8 flex flex-col gap-0 w-full">
          <RoadmapHero analysisData={analysisData} />
          <RoadmapReasons analysisData={analysisData} />
          <LearningTimeline analysisData={analysisData} />
          <LearningModules analysisData={analysisData} />
          <RecommendedResources analysisData={analysisData} />
        </main>
      </div>
    </div>
  );
}
