import React from "react";
import Users from "../components/Users";
import Chat from "../components/Chat";

const Home = () => {
  return (
    <div className="h-screen w-full bg-gray-100">
      <div className="flex h-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
        {/* Sidebar - Users List */}
        <div className="w-1/4 min-w-[250px] border-r border-gray-300 bg-white p-4 overflow-y-auto">
          <Users />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;
