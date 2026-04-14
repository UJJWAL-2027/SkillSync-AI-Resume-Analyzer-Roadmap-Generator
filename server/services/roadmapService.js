// 🔥 Priority order (important skills first)
const priority = ["node", "express", "mongodb", "sql", "git"];

// 📦 Roadmap data
const roadmapData = {
  mongodb: {
    title: "Master MongoDB Basics",
    topics: ["CRUD operations", "Schema design", "Mongoose"],
    resource: "MongoDB University + YouTube (CodeWithHarry / Net Ninja)",
    goal: "Build a backend app using MongoDB",
  },

  sql: {
    title: "Learn SQL Fundamentals",
    topics: ["SELECT", "JOINS", "Indexes"],
    resource: "W3Schools + LeetCode SQL",
    goal: "Solve 20+ SQL problems",
  },

  git: {
    title: "Version Control with Git",
    topics: ["git basics", "branching", "merging"],
    resource: "freeCodeCamp Git Course",
    goal: "Push and manage projects on GitHub",
  },

  node: {
    title: "Backend Development with Node.js",
    topics: ["Express basics", "REST APIs", "Middleware"],
    resource: "Node.js Docs + freeCodeCamp",
    goal: "Build REST APIs using Node.js",
  },

  express: {
    title: "Master Express.js",
    topics: ["Routing", "Middleware", "API structure"],
    resource: "Express Docs + YouTube (Net Ninja)",
    goal: "Build scalable backend APIs",
  },

  "machine learning": {
    title: "Learn Machine Learning",
    topics: ["Supervised learning", "Regression", "Classification"],
    resource: "Andrew Ng ML Course (Coursera)",
    goal: "Build 2 ML models",
  },

  tensorflow: {
    title: "Deep Learning with TensorFlow",
    topics: ["Neural networks", "Model training"],
    resource: "TensorFlow Official Tutorials",
    goal: "Build a deep learning model",
  },

  pandas: {
    title: "Data Analysis with Pandas",
    topics: ["DataFrames", "Data cleaning"],
    resource: "Kaggle + YouTube (Krish Naik)",
    goal: "Analyze a dataset",
  },

  numpy: {
    title: "Numerical Computing with NumPy",
    topics: ["Arrays", "Matrix operations"],
    resource: "NumPy Docs + YouTube",
    goal: "Implement numerical operations",
  },
};

exports.generateRoadmap = (missingSkills = []) => {
  const roadmap = [];

  // 🔥 Sort skills by priority
  missingSkills.sort((a, b) => {
    const indexA = priority.indexOf(a.toLowerCase());
    const indexB = priority.indexOf(b.toLowerCase());

    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  let week = 1;

  // 🔥 GROUPING: Node + Express together
  const hasNode = missingSkills.includes("node");
  const hasExpress = missingSkills.includes("express");

  if (hasNode && hasExpress) {
    roadmap.push({
      week: week++,
      skill: "node + express",
      title: "Backend Development with Node.js & Express",
      topics: [
        "Node.js fundamentals",
        "Express routing",
        "Middleware",
        "REST APIs",
      ],
      resource: "Node.js Docs + Express Docs + freeCodeCamp",
      goal: "Build a complete backend API with Node.js and Express",
    });

    // Remove them so they are not added again
    missingSkills = missingSkills.filter(
      (skill) => skill !== "node" && skill !== "express"
    );
  }

  // 🔥 Add remaining skills
  missingSkills.forEach((skill) => {
    const key = skill.toLowerCase();
    const data = roadmapData[key];

    roadmap.push({
      week: week++,
      skill,
      title: data?.title || `Learn ${skill}`,
      topics: data?.topics || [`Basics of ${skill}`],
      resource: data?.resource || `Search "${skill} tutorial" on YouTube`,
      goal: data?.goal || `Practice ${skill} with projects`,
    });
  });

  return roadmap;
};