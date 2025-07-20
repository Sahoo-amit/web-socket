import React, { useEffect, useState } from "react";
import { authStore } from "./Store";
import { SelectedUser } from "./SelectedUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const token = authStore((state) => state.token);
  const id = authStore((state) => state.id);
  const setCurrentUser = SelectedUser((state) => state.setCurrentUser);

  const getAllUser = async () => {
    try {
      const res = await fetch(
        `https://web-socket-t9z8.vercel.app/api/user/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter((val) =>
    val.username.toLowerCase().includes(searchByName.toLowerCase())
  );

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchByName}
          onChange={(e) => setSearchByName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((item, index) => (
            <div
              key={index}
              onClick={() => setCurrentUser(item)}
              className="p-3 bg-gray-100 rounded-md cursor-pointer hover:bg-blue-100 transition"
            >
              <p className="text-gray-800 font-medium">{item.username}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No user found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;