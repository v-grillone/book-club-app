import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios.js";

function SignupPage() {
  const [form, setForm] = useState({
    username: "",
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
      const res = await api.post('/user/sign-up', form);
      console.log('User created:', res.data);

      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);      
      }
    }
  
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-base-200 shadow-sm px-6 justify-center">
        <Link to="/" className="btn btn-ghost text-xl">
          Readsocial
        </Link>
      </div>

      {/* Signup Card */}
      <div className="flex flex-1 justify-center items-center">
        <div className="card w-full max-w-md shadow-lg bg-base-200">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Your username"
                  value={form.username}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

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
                Create Account
              </button>
            </form>

            <p className="text-center mt-4 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
