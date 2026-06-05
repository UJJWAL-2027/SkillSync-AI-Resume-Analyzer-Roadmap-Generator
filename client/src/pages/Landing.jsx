import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ReadinessScore from "@/components/ReadinessScore";
import RoadmapPreview from "@/components/RoadmapPreview";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-200 font-sans selection:bg-purple-500/30 overflow-x-hidden relative">
      {/* Background ambient orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/8 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/8 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] rounded-full bg-sky-600/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <HowItWorks />
        <Features />
        <ReadinessScore />
        <RoadmapPreview />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}