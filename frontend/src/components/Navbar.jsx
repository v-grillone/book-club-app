import { Link, useNavigate, useLocation } from "react-router";
import { useState } from 'react';
import api from '../lib/axios.js'
import toast from "react-hot-toast";

function Navbar() {

  const [searchBar, setSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const username = localStorage.getItem('username');

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    toast.success('Logout Successful!');
  }

  const handleSearch = async (e) => {
    if (e) e.preventDefault(); // only prevents default if e exists

    // Toggle the search bar
    setSearchBar((prev) => !prev);

    // If search bar is visible, proceed with searching
    if (searchBar) {
      // Stop if searchValue is empty or just spaces
      if (!searchValue.trim()) return

      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/search?q=${searchValue}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (location.pathname === '/explore') {
          navigate("/explore", { state: { results: res.data }});
        } else {
          navigate("/dashboard", { state: { results: res.data }});
        }

      } catch (error) {
        console.error("Error searching book clubs", error);
      }
    }
  };

  const handleEnterSearch = async (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }


  return (
    <div className="navbar bg-base-100 border-b-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to="/explore">Explore</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li onClick={handleLogout}><Link to="/login">Logout</Link></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/explore" className="btn btn-ghost text-xl">Readsocial</Link>
      </div>
      <div className="navbar-end">
        <p className="text-sm">Welcome, {username}</p>
        <button onClick={()=>document.getElementById('notification_modal').showModal()} className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        {searchBar && (
          <input 
          type="text" className={`pl-4 pr-4 py-1 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all duration-300 ease-in-out`} 
          placeholder="Search..."
          autoFocus
          value={searchValue}
          onChange={(e) => {setSearchValue(e.target.value)}}
          onKeyDown={handleEnterSearch} />
        )}
        <button onClick={handleSearch} className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <dialog id="notification_modal" className="modal">
          <div className="modal-box fixed top-16 right-0 max-w-[25%]">
            <h3 className="font-bold text-lg">Notifications</h3>
            <p className="py-4">Notification 1</p>
            <p className="py-4">Notification 2</p>
            <p className="py-4">Notification 3</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  )
}

export default Navbar