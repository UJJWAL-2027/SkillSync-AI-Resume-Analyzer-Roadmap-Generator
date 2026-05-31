import React, { useCallback, useState } from "react";
import { UploadCloud, FileText, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function UploadCard({ file, setFile }) {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      
      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles && droppedFiles.length > 0) {
        const droppedFile = droppedFiles[0];
        if (droppedFile.type === "application/pdf" || droppedFile.name.toLowerCase().endsWith(".pdf")) {
          setFile(droppedFile);
        } else {
          alert("Please upload a PDF file.");
        }
      }
    },
    [setFile]
  );

  const onChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0];
      if (selectedFile.type === "application/pdf" || selectedFile.name.toLowerCase().endsWith(".pdf")) {
        setFile(selectedFile);
      } else {
        alert("Please upload a PDF file.");
      }
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-full p-6 border border-dashed rounded-2xl cursor-pointer transition-all duration-300 group overflow-hidden bg-white/[0.02]",
        isDragActive
          ? "border-indigo-400 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.2)]"
          : "border-white/20 hover:border-indigo-500/50 hover:bg-white/[0.04]",
        file ? "border-solid border-indigo-500/50 bg-indigo-500/5" : ""
      )}
      onDragEnter={onDragEnter}
      onDragOver={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => document.getElementById("file-upload").click()}
    >
      <input
        id="file-upload"
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={onChange}
      />

      <AnimatePresence mode="wait">
        {file ? (
          <motion.div 
            key="file"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center justify-between w-full p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-slate-200 truncate pr-2">
                  {file.name}
                </span>
                <span className="text-xs text-slate-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            </div>
            <div className="flex flex-shrink-0 items-center gap-2 ml-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              <button
                onClick={removeFile}
                className="p-1.5 ml-1 bg-white/5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 text-center relative z-10 py-2"
          >
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 group-hover:border-indigo-500/30 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
              <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-indigo-400 transition-colors relative z-10" />
            </div>
            <div>
              <p className="text-[14px] font-medium text-slate-300">
                <span className="text-indigo-400 font-semibold drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">Click to upload</span> or drag & drop
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PDF (Max 5MB)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
