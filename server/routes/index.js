

const express = require("express");
const router = express.Router();

const resumeRoutes = require("./resumeRoutes");

console.log("Mounting /resume routes...");
router.use("/resume", resumeRoutes);
console.log("Mounted /resume routes in routes/index.js");

router.get("/", (req, res) => {
  res.send("API Routes Working");
});

module.exports = router;

