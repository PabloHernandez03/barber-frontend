import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/citas" element={<AdminPage />} />
        <Route path="/" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
