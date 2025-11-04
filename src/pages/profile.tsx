import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import IssueCard from "../components/Issue/IssueCard";
import { mockUsers, getUserIssues } from "../lib/mock";
import { getUsers } from "../lib/auth";
import { useAuth } from "../contexts/AuthContext";
import { getIssues } from "../lib/issues";

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuth();
  
  const mockUser = username ? mockUsers[username] : null;
  const allUsers = getUsers();
  const authUser = username ? allUsers.find(u => u.username === username) : null;
  
  const user = mockUser || (authUser ? {
    username: authUser.username,
    email: authUser.email,
    joinDate: authUser.joinDate,
    totalIssues: authUser.totalIssues || 0,
    totalVotes: authUser.totalVotes || 0,
    bio: authUser.bio || "",
  } : null);
  
  const mockUserIssues = username ? getUserIssues(username) : [];
  const allIssues = getIssues();
  const authUserIssues = username ? allIssues.filter(issue => issue.author === username) : [];
  const userIssues = mockUserIssues.length > 0 ? mockUserIssues : authUserIssues;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <p className="text-center text-gray-400">User not found</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <main className="p-8">
        <div className="max-w-5xl mx-auto">
          <Card className="mb-8 bg-gradient-to-br from-gray-800/90 to-gray-800/50 border border-gray-700/50 shadow-2xl backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-4xl font-bold text-gray-100 mb-2">u/{user.username}</CardTitle>
              <CardDescription className="text-gray-400 text-base">Member since {user.joinDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200 mb-6 text-lg leading-relaxed">{user.bio}</p>
              <div className="flex gap-8 text-sm">
                <div className="px-6 py-3 rounded-xl bg-blue-600/10 border border-blue-500/20">
                  <span className="font-bold text-2xl text-blue-400 block">{user.totalIssues}</span>
                  <span className="text-gray-400">Issues Reported</span>
                </div>
                <div className="px-6 py-3 rounded-xl bg-cyan-600/10 border border-cyan-500/20">
                  <span className="font-bold text-2xl text-cyan-400 block">{user.totalVotes}</span>
                  <span className="text-gray-400">Total Votes Received</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
              Issues by {user.username}
            </h2>
            {userIssues.length === 0 ? (
              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <p className="text-gray-400 text-lg">
                    {user.username} hasn't reported any issues yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col gap-6">
                {userIssues.map((issue) => (
                  <IssueCard key={issue.id} {...issue} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

