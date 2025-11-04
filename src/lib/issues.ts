import { mockIssues } from "./mock";

export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  author: string;
  votes: number;
  commentCount: number;
  createdAt: string;
  tags?: string[];
  comments?: Comment[];
}

const STORAGE_KEY = "civic_issues";

const defaultIssues: Issue[] = mockIssues;

export const getIssues = (): Issue[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultIssues));
    return defaultIssues;
  } catch (error) {
    console.error("Error reading issues from localStorage:", error);
    return defaultIssues;
  }
};

export const addIssue = (issue: Omit<Issue, "id" | "votes" | "commentCount" | "createdAt">): Issue => {
  const issues = getIssues();
  const newIssue: Issue = {
    ...issue,
    id: Date.now().toString(),
    votes: 0,
    commentCount: 0,
    createdAt: new Date().toISOString().split("T")[0],
    imageUrl: issue.imageUrl || undefined,
  };
  
  const updatedIssues = [newIssue, ...issues];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIssues));
  return newIssue;
};

export const updateIssue = (id: string, updates: Partial<Issue>): Issue | null => {
  const issues = getIssues();
  const index = issues.findIndex((issue) => issue.id === id);
  
  if (index === -1) return null;
  
  const updatedIssue = { ...issues[index], ...updates };
  issues[index] = updatedIssue;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
  return updatedIssue;
};

export const getIssueById = (id: string): Issue | null => {
  const issues = getIssues();
  return issues.find((issue) => issue.id === id) || null;
};

export const addComment = (issueId: string, comment: Omit<Comment, "id" | "createdAt">): Comment | null => {
  const issue = getIssueById(issueId);
  if (!issue) return null;

  const newComment: Comment = {
    ...comment,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split("T")[0],
  };

  const updatedComments = [...(issue.comments || []), newComment];
  const updatedIssue = {
    ...issue,
    comments: updatedComments,
    commentCount: updatedComments.length,
  };

  updateIssue(issueId, updatedIssue);
  return newComment;
};

