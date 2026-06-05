import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import UploadPage from "./pages/UploadPage";
import DashboardPage from "./pages/DashboardPage";
import SkillAnalysisPage from "./pages/SkillAnalysisPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/skill-analysis" element={<SkillAnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;