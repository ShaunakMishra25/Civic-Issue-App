import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import IssueCard from "../components/Issue/IssueCard";
import { getIssues, type Issue } from "../lib/issues";

const Home: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const location = useLocation();

  const refreshIssues = () => {
    setIssues(getIssues());
  };

  useEffect(() => {
    refreshIssues();
    
    window.addEventListener("storage", refreshIssues);
    window.addEventListener("issuesUpdated", refreshIssues);
    
    return () => {
      window.removeEventListener("storage", refreshIssues);
      window.removeEventListener("issuesUpdated", refreshIssues);
    };
  }, []);

  useEffect(() => {
    refreshIssues();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <main className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
            Community Issues
          </h2>
          <p className="text-gray-400 text-sm">Report and upvote civic issues in your community</p>
        </div>
        <div className="flex flex-col gap-6">
          {issues.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="inline-block p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
                <p className="text-gray-400 text-lg mb-2">No issues yet</p>
                <p className="text-gray-500 text-sm">Be the first to report one!</p>
              </div>
            </div>
          ) : (
            issues.map((post, index) => (
              <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <IssueCard {...post} />
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
