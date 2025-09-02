import React from "react";
import { Link } from "react-router";

function LandingPage() {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Hero Section */}
      <div className="hero flex-grow bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl"
            alt="Book Club"
          />
          <div>
            <h1 className="text-5xl font-bold">Join a Community of Readers</h1>
            <p className="py-6 text-lg">
              Discover, join, and create book clubs with readers who share your
              passion. Track your reading progress, discuss your favorite books,
              and stay motivated together.
            </p>
            <div className="flex space-x-4">
              <Link to="/sign-up" className="btn btn-primary btn-lg w-40">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary btn-lg w-40">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-8 py-12 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Join BookClub?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-md p-6 text-center">
            <h3 className="font-bold text-xl mb-2">📚 Discover New Reads</h3>
            <p>Find curated book clubs that match your favorite genres.</p>
          </div>
          <div className="card bg-base-100 shadow-md p-6 text-center">
            <h3 className="font-bold text-xl mb-2">👥 Connect with Readers</h3>
            <p>Meet like-minded readers and share your thoughts in discussions.</p>
          </div>
          <div className="card bg-base-100 shadow-md p-6 text-center">
            <h3 className="font-bold text-xl mb-2">⏱ Stay on Track</h3>
            <p>Keep up with your reading pace and finish books together.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
