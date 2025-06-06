import { Link, Form, useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import SeeProductBtn from "../Shared/SeeProductBtn";

// try admin credentials (in a real app, these would come from a secure backend)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "password123"
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    // Check credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // set authentication token here
      localStorage.setItem("isAuthenticated", "true");
      navigate("/admin/orders"); // Redirect to dashboard after successful login /admin/dashboard
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Link
          to={"/"}
          preventScrollReset={true}
          className="text-base opacity-50 hover:opacity-100 hover:text-orange-400 transition-colors mb-4 inline-block"
        >
          &larr; Go back to home
        </Link>

        <Form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Administrator Login</h2>
            <p className="text-orange-400 mt-2 text-sm font-bold uppercase tracking-wide">
              Access your dashboard
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <SeeProductBtn full={true} action={"submit"}>
            Login
          </SeeProductBtn>
        </Form>
      </div>
    </div>
  );
}