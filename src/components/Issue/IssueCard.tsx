/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

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
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      setVoteCount(votes);
      setUserVote(null);
    } else if (userVote === null) {
      setVoteCount(voteCount + (type === "up" ? 1 : -1));
      setUserVote(type);
    } else {
      setVoteCount(type === "up" ? voteCount + 2 : voteCount - 2);
      setUserVote(type);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex gap-4 p-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 p-0 ${userVote === "up" ? "text-accent" : "text-muted-foreground"}`}
            onClick={() => handleVote("up")}
          >
            <ArrowBigUp
              className={`h-6 w-6 ${userVote === "up" ? "text-accent" : "text-muted-foreground"}`}
            />
          </Button>
          <span
            className={`text-sm font-semibold ${
              userVote === "up"
                ? "text-accent"
                : userVote === "down"
                ? "text-destructive"
                : "text-foreground"
            }`}
          >
            {voteCount}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 p-0 ${userVote === "down" ? "text-destructive" : "text-muted-foreground"}`}
            onClick={() => handleVote("down")}
          >
            <ArrowBigDown
              className={`h-6 w-6 ${userVote === "down" ? "text-destructive" : "text-muted-foreground"}`}
            />
          </Button>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {/* Author + Date */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Link to={`/profile/${author}`} className="hover:underline font-medium">
              u/{author}
            </Link>
            <span>•</span>
            <span>{createdAt}</span>
          </div>

          {/* Title */}
          <Link to={`/post/${id}`} className="block group">
            <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {title}
            </h2>
          </Link>

          {/* Image */}
          {imageUrl && (
            <Link to={`/post/${id}`} className="block mb-3">
              <img src={imageUrl} alt={title} className="w-full rounded-md max-h-96 object-cover" />
            </Link>
          )}

          {/* Description */}
          <p className="text-sm text-foreground/80 mb-3 line-clamp-3">{description}</p>

          {/* Comment + Share Buttons */}
          <div className="flex items-center gap-4 text-muted-foreground">
            <Button variant="ghost" size="sm" className="gap-2 h-8">
              <Link to={`/post/${id}`} className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {commentCount} Comments
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 h-8 flex items-center">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IssueCard;
