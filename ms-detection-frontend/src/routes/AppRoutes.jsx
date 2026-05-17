import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import PatientsPage from "../pages/PatientsPage";
import UploadPage from "../pages/UploadPage";
import ResultsPage from "../pages/ResultsPage";
import HistoryPage from "../pages/HistoryPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import SettingsPage from "../pages/SettingsPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/patients" element={<PatientsPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}

export default AppRoutes;