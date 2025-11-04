import React from "react";
import Navbar from "../components/layout/Navbar";
import IssueUploader from "../components/Issue/IssueUploader";

const Create: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <main className="p-8 max-w-4xl mx-auto">
        <IssueUploader />
      </main>
    </div>
  );
};

export default Create;

