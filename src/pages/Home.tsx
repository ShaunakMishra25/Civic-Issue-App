import React from "react";
import Navbar from "../components/layout/Navbar";
import IssueCard from "../components/Issue/IssueCard";

const mockPosts = [
  {
    id: "1",
    title: "First Post",
    description: "This is the first post",
    imageUrl: "https://picsum.photos/400/300",
    author: "John Doe",
    votes: 10,
    commentCount: 5,
    createdAt: "2022-01-01",
  },
  {
    id: "2",
    title: "Second Post",
    description: "This is the second post",
    imageUrl: "https://picsum.photos/400/300",
    author: "Jane Doe",
    votes: 5,
    commentCount: 2,
    createdAt: "2022-01-02",
  },
  {
    id: "3",
    title: "Third Post",
    description: "This is the third post",
    imageUrl: "https://picsum.photos/400/300",
    author: "Bob Smith",
    votes: 20,
    commentCount: 10,
    createdAt: "2022-01-03",
  },
];

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h2 className="text-3xl font-bold mb-6">Community Issues</h2>
        <div className="flex flex-col gap-4">
          {mockPosts.map((post) => (
            <IssueCard key={post.id} {...post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
