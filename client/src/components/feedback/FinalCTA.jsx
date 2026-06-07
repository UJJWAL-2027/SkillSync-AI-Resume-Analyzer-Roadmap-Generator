import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, Map } from "lucide-react";

export default function FinalCTA({ onUpload, isLoading = false }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  return (
    <div className="relative mt-12 bg-[#0F172A]/50 border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center gap-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />

      <div className="flex flex-col gap-2 relative z-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          Ready to improve your resume?
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-xl">
          Implement these suggestions and upload your improved resume to see your score increase
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
        {/* Back to Roadmap Button */}
        <Link
          to="/roadmap"
          className="flex items-center gap-2 px-6 h-12 rounded-xl bg-slate-900 border border-white/10 hover:border-white/20 hover:bg-slate-800 text-slate-200 hover:text-white transition-all duration-300 font-semibold"
        >
          <span className="text-sm">🗺️</span>
          Back to Roadmap
        </Link>

        {/* Upload Improved Resume Button */}
        <button
          onClick={handleButtonClick}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 h-12 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white transition-all duration-300 font-semibold shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="text-sm">📄</span>
          {isLoading ? "Analyzing..." : "Upload Improved Resume"}
        </button>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf"
          className="hidden"
        />
      </div>
    </div>
  );
}
