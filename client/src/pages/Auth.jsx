import React, { useState } from "react";
import { authStore } from "../components/Store";
import toast from "react-hot-toast";

const Auth = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const storeToken = authStore((state) => state.storeToken);

  const toggleAuth = () => setIsLogin(!isLogin);
  const showPassword = () => setShow(!show);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const val = isLogin ? "login" : "register";
    try {
      const res = await fetch(
        `https://web-socket-vfg3.vercel.app/api/auth/${val}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(data.msg);
        const username = isLogin ? data.userExist.username : data.user.username;
        const id = isLogin ? data.userExist._id : data.user._id;
        storeToken(username, data.token, id);
      } else {
        toast.error(data.msg);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {isLogin ? "Log In" : "Register"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={user.username}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                id="password"
                value={user.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-4 py-2 border rounded-md pr-16 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <span
                onClick={showPassword}
                className="absolute right-4 top-2 cursor-pointer text-sm text-blue-500 hover:underline"
              >
                {show ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Please wait..." : isLogin ? "Log In" : "Register"}
          </button>
        </form>

        {/* Toggle Mode */}
        <p className="text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={toggleAuth}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Click here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
