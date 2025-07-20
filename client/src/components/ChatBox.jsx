import React, { useState, useEffect, useRef } from "react";
import { authStore } from "./Store";
import { SelectedUser } from "./SelectedUser";
import toast from "react-hot-toast";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [showMessages, setShowMessages] = useState([]);
  const token = authStore((state) => state.token);
  const id = authStore((state) => state.id);
  const currentUser = SelectedUser((state) => state.currentUser);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getAllMessages = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(
        `https://web-socket-vfg3.vercel.app/api/message/${currentUser?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setShowMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    if (message.trim() === "") {
      toast.error("Message can't be empty.");
      return;
    }
    try {
      await fetch(`https://web-socket-vfg3.vercel.app/api/message/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiver: currentUser?._id, content: message }),
      });
      setMessage("");
      getAllMessages();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, [currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [showMessages]);

  return (
    <div className="flex flex-col h-full border rounded-lg shadow-md">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-3 font-semibold rounded-t-lg">
        {currentUser?.username
          ? `Chat with ${currentUser.username}`
          : "Select a user to chat"}
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-2">
        {showMessages?.map((item, index) => (
          <div
            key={index}
            className={`max-w-[60%] px-4 py-2 rounded-lg text-white ${
              item.sender === id
                ? "bg-blue-500 self-end ml-auto"
                : "bg-gray-400 self-start mr-auto"
            }`}
          >
            {item.content}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={sendMessage}
        className="flex border-t p-3 gap-2 bg-white rounded-b-lg"
      >
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
