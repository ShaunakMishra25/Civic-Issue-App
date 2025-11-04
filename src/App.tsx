import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Profile from "./pages/profile";
import IssueDetailPage from "./pages/IssueDetailPage";
import LoginView from "./components/auth/LoginView";
import SignUp from "./components/auth/SignUp";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        }
      />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/post/:id" element={<IssueDetailPage />} />
    </Routes>
  );
};

export default App;
