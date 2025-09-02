import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios.js"

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/user/login', form);
      localStorage.setItem("token", res.data.token);

      console.log("Login successful:", res.data);
      navigate('/explore');
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);      
    }
    // TODO: Hook this up to your backend API (e.g. POST /api/auth/login)
    console.log("Login submitted:", form);
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-base-200 shadow-sm px-6 justify-center">
        <Link to="/" className="btn btn-ghost text-xl">
            Readsocial
        </Link>
      </div>

      {/* Login Card */}
      <div className="flex flex-1 justify-center items-center">
        <div className="card w-full max-w-md shadow-lg bg-base-200">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-6">Log In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full mt-4">
                Log In
              </button>
            </form>

            <p className="text-center mt-4 text-sm">
              Don’t have an account?{" "}
              <Link to="/sign-up" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
