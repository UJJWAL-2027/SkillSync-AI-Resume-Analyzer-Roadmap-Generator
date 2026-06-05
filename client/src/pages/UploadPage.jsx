import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Zap, Shield, ChevronRight, CheckCircle2 } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { UploadCard } from "@/components/UploadCard";
import { RoleSelector } from "@/components/RoleSelector";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import api from "@/services/api";

export default function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalyze = async () => {
    if (!file || !role) {
      setError("Please select both a resume and a target role.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess(false);
    setAnalysisData(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("role", role);

    try {
      const response = await api.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Analysis Result:", response.data);
      localStorage.setItem("analysisResult", JSON.stringify(response.data.data));
      setAnalysisData(response.data);
      setSuccess(true);
      navigate("/dashboard");
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err.message || "Failed to analyze resume. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] relative flex flex-col font-sans text-slate-200 selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] rounded-full bg-sky-600/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Sticky Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all duration-300">
              <span className="text-white font-bold text-sm tracking-wide">SS</span>
            </span>
            <span className="text-slate-100 font-semibold text-lg tracking-tight">SkillSync</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-2 text-sm font-medium">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Upload
            </span>
            <span className="text-slate-600">→</span>
            <span className="text-slate-500 px-3 py-1">Analyze</span>
            <span className="text-slate-600">→</span>
            <span className="text-slate-500 px-3 py-1">Roadmap</span>
          </div>
        </div>
      </header>

      {/* Split Hero Layout */}
      <main id="upload-section" className="flex-1 flex flex-col justify-center items-center p-6 w-full max-w-7xl mx-auto pt-32 pb-20 relative z-10 min-h-screen">
        <div className="w-full grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Text and Features */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8 max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium w-fit">
              <Sparkles className="w-4 h-4" />
              AI-Powered Analysis
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-tight">
              Analyze Your Resume with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI Precision</span>
            </h1>
            
            <p className="text-lg text-slate-400 leading-relaxed">
              Discover missing skills, measure job readiness, and follow a personalized roadmap to land your next tech role.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                  <Zap className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="font-medium text-[15px]">Instant skill gap identification</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <span className="font-medium text-[15px]">Secure and private analysis</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Floating Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md mx-auto lg:ml-auto"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
              
              <div className="relative flex flex-col p-8 bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_0_40px_rgba(99,102,241,0.1)]">
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Start Analysis</h3>
                  <p className="text-sm text-slate-400">Upload your PDF resume to begin</p>
                </div>

                <div className="flex flex-col gap-6">
                  <UploadCard file={file} setFile={setFile} />

                  <RoleSelector value={role} onChange={setRole} />

                  <AnimatePresence>
                    {success && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 mt-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-semibold">Analysis complete!</p>
                            {analysisData?.role && (
                              <p className="mt-0.5 text-emerald-300/80">Role: {analysisData.role}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {error && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 mt-1 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 flex items-start gap-2">
                          <div className="mt-0.5">⚠️</div>
                          <div>{error}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button 
                    onClick={handleAnalyze} 
                    disabled={!file || !role || isLoading}
                    className="w-full h-14 text-base font-semibold rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2 flex items-center justify-center gap-2 group/btn"
                  >
                    {isLoading ? "Analyzing..." : "Analyze Resume"}
                    {!isLoading && <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {isLoading && <LoadingOverlay />}
      </AnimatePresence>
    </div>
  );
}
