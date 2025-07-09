import React from "react";
import { authStore } from "./Store";

const Navbar = () => {
  const removeToken = authStore((state) => state.removeToken);
  const username = authStore((state) => state.username);

  const handleLogout = () => {
    removeToken();
  };

  return (
    <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-2 rounded-md">
      <h1 className="text-lg font-semibold">Logged in as: {username}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 transition px-4 py-1 rounded text-sm"
      >
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
