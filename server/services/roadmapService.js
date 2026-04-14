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

  missingSkills.forEach((skill, index) => {
    const key = skill.toLowerCase();
    const data = roadmapData[key];

    roadmap.push({
      week: index + 1,
      skill,
      title: data?.title || `Learn ${skill}`,
      topics: data?.topics || [`Basics of ${skill}`],
      resource: data?.resource || `Search "${skill} tutorial" on YouTube`,
      goal: data?.goal || `Practice ${skill} with projects`,
    });
  });

  return roadmap;
};