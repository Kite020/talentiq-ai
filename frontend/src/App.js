import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ResumePage from "./pages/ResumePage";
import JobsPage from "./pages/JobsPage";
import MatchPage from "./pages/MatchPage";
import RankingPage from "./pages/RankingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/resumes"
          element={<ResumePage />}
        />

        <Route
          path="/jobs"
          element={<JobsPage />}
        />

        <Route
          path="/match"
          element={<MatchPage />}
        />

        <Route
          path="/ranking"
          element={<RankingPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;