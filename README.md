# SkillSync AI Resume Analyzer & Roadmap Generator

## 🧠 Description

SkillSync AI analyzes resumes against target job roles and provides:
- Job readiness score
- Skill gap detection
- Personalized roadmap
- Actionable feedback

## 🚀 Features
- Resume parsing (PDF)
- Skill extraction
- Job readiness score
- Skill gap detection
- Personalized roadmap
- Feedback system

## 🛠 Tech Stack
- React.js (Frontend)
- Node.js + Express (Backend)
- MongoDB
- pdf-parse, multer

## ⚙️ How It Works

1. Upload resume (PDF)
2. Extract text using pdf-parse
3. Identify skills using rule-based logic
4. Compare with job role
5. Generate score + roadmap + feedback

## 🔗 API
POST /api/resume/upload

## 📊 Sample API Response

{
  "success": true,
  "data": {
    "role": "SDE",
    "level": "Intermediate",
    "score": 57,
    "matchedSkills": ["javascript", "react"],
    "missingSkills": ["node", "mongodb"],
    "roadmap": [...],
    "feedback": [...]
  }
}