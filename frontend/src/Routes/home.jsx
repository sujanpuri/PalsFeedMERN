import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Import icons
import axios from "axios";
import { useUser } from "../Components/userContext"; // Import user context

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchUser} = useUser(); // Get fetchUser function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.BACKEND_URI}/login`,
        { email, password },
        { withCredentials: true } //allows sending cookies (JWT/session) with the request, enabling authentication persistence.
      );
      if (response.data.status) {
        await fetchUser(); // Fetch user data after login
        navigate("/page");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Login Unsuccessfull");
      console.log("Error login: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login / Sign Up
        </h2>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <p className="text-sm text-gray-600 text-center">
            Don't have an account?
            <Link to="/signup" className="text-blue-500 hover:underline ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Home;
