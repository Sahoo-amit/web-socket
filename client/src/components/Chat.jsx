import React from "react";
import Navbar from "./Navbar";
import ChatBox from "./ChatBox";

const Chat = () => {
  return (
    <div className="flex flex-col h-full w-full bg-white rounded-md shadow-sm">
      {/* Top Navbar */}
      <div className="border-b border-gray-200 px-4 py-3">
        <Navbar />
      </div>

      {/* Chat Messages + Input Box */}
      <div className="flex-1 overflow-y-auto p-4">
        <ChatBox />
      </div>
    </div>
  );
};

export default Chat;
