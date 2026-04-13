const express = require("express");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", routes);

// Test route
app.get("/", (req, res) => {
  res.send("SkillSync API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




