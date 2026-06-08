const express = require("express");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log("Loading routes/index.js...");
app.use("/api", routes);
console.log("Mounted /api routes in server.js");

// Test route
app.get("/", (req, res) => {
  res.send("SkillSync API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




