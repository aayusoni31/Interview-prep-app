import React, { useState, useContext } from "react";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    // basic validation
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    setError("");
    // login api call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }

    console.log(email, password);
  };

  return (
    <div className="w-[90vw] md:w-[400px] flex flex-col justify-center">
      {/* Heading */}
      <h3 className="text-xl font-semibold text-black">Welcome Back</h3>

      <p className="text-xs text-gray-600 mt-1 mb-6">
        Please enter your details to login
      </p>

      {/* Form */}
      <form onSubmit={handleLogin}>
        <Input
          type="text"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
        />

        <Input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="••••••••"
        />

        {/* Error */}
        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2.5 rounded-md font-medium hover:bg-orange-500 transition-all duration-300"
        >
          LOGIN
        </button>

        {/* Switch to Signup */}
        <p className="text-[13px] text-gray-700 mt-4 text-center">
          Don’t have an account?{" "}
          <button
            type="button"
            className="font-medium text-orange-600 hover:underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
