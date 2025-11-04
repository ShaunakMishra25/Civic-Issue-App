import { useState } from "react";
import { ArrowBigUp, MessageSquare, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { updateIssue } from "../../lib/issues";

interface IssueCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  author: string;
  votes: number;
  commentCount: number;
  createdAt: string;
}

export const IssueCard = ({
  id,
  title,
  description,
  imageUrl,
  author,
  votes,
  commentCount,
  createdAt,
}: IssueCardProps) => {
  const [voteCount, setVoteCount] = useState(votes);
  const [userVote, setUserVote] = useState<boolean>(false);

  const handleVote = () => {
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
    
    window.dispatchEvent(new Event("issuesUpdated"));
  };

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-gray-800/90 to-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-blue-500/10 group backdrop-blur-sm">
      <div className="flex gap-6 p-6">
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
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
            <Link 
              to={`/profile/${author}`} 
              className="hover:text-blue-400 hover:underline font-medium transition-colors duration-300 ease-out"
            >
              u/{author}
            </Link>
            <span className="text-gray-600">•</span>
            <span className="text-gray-500">{createdAt}</span>
          </div>

          <Link to={`/post/${id}`} className="block group/title">
            <h2 className="text-xl font-bold mb-3 text-gray-100 group-hover/title:text-blue-400 transition-colors duration-300 ease-out">
              {title}
            </h2>
          </Link>

          {imageUrl && (
            <Link to={`/post/${id}`} className="block mb-4 rounded-xl overflow-hidden bg-gray-900/50">
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-auto rounded-xl max-h-96 object-contain" 
              />
            </Link>
          )}

          <p className="text-sm text-gray-300 mb-4 line-clamp-3 leading-relaxed">{description}</p>

          <div className="flex items-center gap-6 text-gray-400 pt-2 border-t border-gray-700/50">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 h-9 hover:bg-gray-700/50 hover:text-blue-400 transition-colors duration-300 ease-out"
            >
              <Link to={`/post/${id}`} className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="font-medium">{commentCount} Comments</span>
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 h-9 hover:bg-gray-700/50 hover:text-blue-400 transition-colors duration-300 ease-out"
            >
              <Share2 className="h-4 w-4" />
              <span className="font-medium">Share</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IssueCard;