import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-slate-50 dark:bg-slate-950">
      <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
        Welcome to SkillSync AI
      </h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl">
        Analyze your resume against your dream role and get a personalized roadmap to land your next job.
      </p>
      <Link 
        to="/upload" 
        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition shadow-lg hover:scale-105"
      >
        Get Started
      </Link>
    </div>
  );
}