import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/auth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await authApi.login(email, password);
      const token = res.data.data.token;

      login(token);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-74px)] bg-background">
      <div className="bg-surface shadow-sm rounded-lg p-8 w-full max-w-md">
        <h1 className="text-center text-text-primary text-2xl font-bold">
          Login
        </h1>
        <p className="text-center text-text-secondary">
          Sign in to your account
        </p>
        <input
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-text-primary mt-4"
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage("");
          }}
        />
        <input
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-text-primary mt-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
          }}
        />
        <button
          className="w-full bg-primary text-white py-2 rounded-md font-medium mt-4"
          onClick={handleLogin}
        >
          Login
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
