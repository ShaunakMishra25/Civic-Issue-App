import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowBigUp, MessageSquare, Share2, ArrowLeft } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { getIssueById, updateIssue, addComment, type Issue, type Comment } from "../lib/issues";
import { useAuth } from "../contexts/AuthContext";

const IssueDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [issue, setIssue] = useState<Issue | null>(null);

  const [voteCount, setVoteCount] = useState(0);
  const [userVote, setUserVote] = useState<boolean>(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (id) {
      const loadedIssue = getIssueById(id);
      if (loadedIssue) {
        setIssue(loadedIssue);
        setVoteCount(loadedIssue.votes);
        setComments(loadedIssue.comments || []);
      }
    }
  }, [id]);

  if (!issue) {
    return (
      <div>
        <Navbar />
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Issue not found</p>
                <Button onClick={() => navigate("/")} className="mt-4">
                  Go Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const handleVote = () => {
    if (!issue || !id) return;

    let newVoteCount = voteCount;
    let newUserVote = userVote;

    if (userVote) {
      newVoteCount = voteCount - 1;
      newUserVote = false;
    } else {
      newVoteCount = voteCount + 1;
      newUserVote = true;
    }

    setVoteCount(newVoteCount);
    setUserVote(newUserVote);

    updateIssue(id, { votes: newVoteCount });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newComment.trim() || !user) return;

    const newCommentObj = addComment(id, {
      author: user.username,
      text: newComment,
    });

    if (newCommentObj) {
      setComments([...comments, newCommentObj]);
      setNewComment("");
      
      const updatedIssue = getIssueById(id);
      if (updatedIssue) {
        setIssue(updatedIssue);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <main className="p-8">
        <div className="max-w-5xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 px-4 py-2 rounded-lg transition-all duration-300 ease-out"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Issues
          </Button>

          <Card className="mb-6 bg-gradient-to-br from-gray-800/90 to-gray-800/50 border border-gray-700/50 shadow-2xl backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex gap-6">
                <div className="flex flex-col items-center gap-2 pt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-10 w-10 p-0 rounded-lg transition-all duration-300 ease-out ${
                      userVote 
                        ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 scale-105" 
                        : "text-gray-400 hover:bg-gray-700/50 hover:text-blue-400"
                    }`}
                    onClick={handleVote}
                  >
                    <ArrowBigUp
                      className={`h-5 w-5 transition-transform duration-300 ease-out ${userVote ? "scale-105" : ""}`}
                    />
                  </Button>
                  <span
                    className={`text-sm font-bold transition-colors duration-300 ease-out ${
                      userVote ? "text-blue-400" : "text-gray-300"
                    }`}
                  >
                    {voteCount}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                    <Link to={`/profile/${issue.author}`} className="hover:text-blue-400 hover:underline font-medium transition-colors duration-300 ease-out">
                      u/{issue.author}
                    </Link>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-500">{issue.createdAt}</span>
                  </div>

                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-3xl font-bold text-gray-100 mb-2">{issue.title}</CardTitle>
                  </CardHeader>

                  {issue.imageUrl && (
                    <div className="mb-6 rounded-xl overflow-hidden border border-gray-700/50 bg-gray-900/50">
                      <img
                        src={issue.imageUrl}
                        alt={issue.title}
                        className="w-full h-auto rounded-xl max-h-96 object-contain"
                      />
                    </div>
                  )}

                  <p className="text-gray-200 mb-6 whitespace-pre-wrap leading-relaxed text-base">{issue.description}</p>

                  <div className="flex items-center gap-6 text-gray-400 pt-4 border-t border-gray-700/50">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      {comments.length} Comments
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2 h-8">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800/90 to-gray-800/50 border border-gray-700/50 shadow-xl backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-100">Comments ({comments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {user ? (
                <form onSubmit={handleAddComment} className="mb-8">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-4 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl mb-4 min-h-[120px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 ease-out resize-none"
                  />
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all duration-300 ease-out"
                  >
                    Post Comment
                  </Button>
                </form>
              ) : (
                <div className="mb-8 p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-center">
                  <p className="text-gray-400 mb-3">Please log in to add a comment</p>
                  <Link to="/login">
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold">
                      Login
                    </Button>
                  </Link>
                </div>
              )}

              <div className="space-y-6">
                {comments.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <p className="text-gray-400 text-lg mb-1">No comments yet</p>
                    <p className="text-gray-500 text-sm">Be the first to comment!</p>
                  </div>
                ) : (
                  comments.map((comment: any) => (
                    <div key={comment.id} className="border-b border-gray-700/50 pb-6 last:border-0">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <Link to={`/profile/${comment.author}`} className="hover:text-blue-400 hover:underline font-medium transition-colors duration-300 ease-out">
                          u/{comment.author}
                        </Link>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-500">{comment.createdAt}</span>
                      </div>
                      <p className="text-gray-200 leading-relaxed">{comment.text}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default IssueDetailPage;

