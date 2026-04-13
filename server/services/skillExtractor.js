const predefinedSkills = [
  "javascript",
  "react",
  "node",
  "express",
  "mongodb",
  "python",
  "java",
  "c++",
  "sql",
  "html",
  "css",
  "machine learning",
  "tensorflow",
  "docker",
  "kubernetes",
  "aws",
];

exports.extractSkills = (text) => {
  const lowerText = text.toLowerCase();

  const foundSkills = predefinedSkills.filter((skill) =>
    lowerText.includes(skill)
  );

  return foundSkills;
};