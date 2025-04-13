import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import LivePage from "./page/live/page.jsx";
import MatchDetailsPage from "./page/matchdetails/page.jsx";
import MatchStats from "./page/match-stats/page.jsx";
import AdminPage from "./page/admin/page.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="live" element={<LivePage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="match-finder" element={<MatchDetailsPage />} />
        <Route path="match-stats" element={<MatchStats />} />

        <Route
          path="*"
          element={<div className="border text-4xl p-5">NOT FOUND !!!</div>}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
