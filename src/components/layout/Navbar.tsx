import type React from "react";

const Navbar : React.FC= () => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      <div className="text-2xl font-bold text-blue-600">
        Civic<span className="text-gray-800">Upvote</span>
      </div>

      <div className="flex gap-6 text-gray-700 font-medium">
        <button className="hover:text-blue-600 transition-colors">Home</button>
        <button className="hover:text-blue-600 transition-colors">Create</button>
        <button className="hover:text-blue-600 transition-colors">Profile</button>
        <button className="hover:text-red-500 transition-colors">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
