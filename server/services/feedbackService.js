exports.generateFeedback = (missingSkills = [], role) => {
  const feedback = [];

  // 🔹 General suggestions
  feedback.push("Improve your resume by adding more project-based experience");
  feedback.push("Ensure your resume clearly highlights your key skills");

  // 🔹 Role-based suggestions
  if (role === "SDE") {
    feedback.push("Focus on Data Structures and Algorithms (DSA)");
  }

  if (role === "AIML") {
    feedback.push("Build and showcase machine learning projects");
  }

  if (role === "DEVOPS") {
    feedback.push("Gain hands-on experience with CI/CD pipelines");
  }

  if (role === "DATASCIENCE") {
    feedback.push("Work on real-world datasets and case studies");
  }

  // 🔹 Missing skill-based suggestions
  missingSkills.forEach((skill) => {
    const s = skill.toLowerCase();

    if (s === "mongodb") {
      feedback.push("Add backend projects using MongoDB");
    }

    if (s === "sql") {
      feedback.push("Practice SQL queries and database design");
    }

    if (s === "git") {
      feedback.push("Use GitHub actively and showcase your repositories");
    }

    if (s === "node") {
      feedback.push("Build backend APIs using Node.js and Express");
    }

    if (s === "react") {
      feedback.push("Create interactive frontend projects using React");
    }

    if (s === "machine learning") {
      feedback.push("Build ML models and include them in your projects");
    }

    if (s === "tensorflow") {
      feedback.push("Learn TensorFlow and build deep learning projects");
    }

    if (s === "pandas") {
      feedback.push("Practice data analysis using Pandas on datasets");
    }

    if (s === "numpy") {
      feedback.push("Strengthen your understanding of NumPy for numerical computing");
    }
  });

  // 🔹 Remove duplicates
  const uniqueFeedback = [...new Set(feedback)];

  return uniqueFeedback;
};