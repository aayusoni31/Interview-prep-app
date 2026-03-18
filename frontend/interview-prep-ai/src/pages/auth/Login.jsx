import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-[90vw] md:[33vw] -7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please Enter your Details to login
      </p>
      <form onSubmit={handleLogin} action="">
        <input
          type="text"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
        />
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="••••••••"
        />
      </form>
    </div>
  );
};

export default Login;
