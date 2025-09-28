import { useState, useEffect, useCallback, useContext } from "react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router';
import { UserContext } from "../context/UserContextContext.jsx";

function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { setUser } = useContext(UserContext);

  // Initilize navigate
  const navigate = useNavigate()

  // Apply theme to <html>
  const applyTheme = useCallback((isDark) => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "autumn");
  }, []);

  // Load settings from API + localStorage theme first for instant UX
  useEffect(() => {
    // Instant theme load
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme !== null) {
      const isDark = savedTheme === "true";
      setDarkMode(isDark);
      applyTheme(isDark);
    }

    // Fetch settings from backend
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/user/settings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDarkMode(res.data.darkMode);
        setNotifications(res.data.notifications);
        setUsername(res.data.username);
        applyTheme(res.data.darkMode);
      } catch (error) {
        console.error("Error fetching settings", error);
        toast.error("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [applyTheme]);

  // React to theme changes instantly
  useEffect(() => {
    if (!loading) {
      applyTheme(darkMode);
    }
  }, [darkMode, loading, applyTheme]);

  const handleSave = async () => {
    const previousDarkMode = localStorage.getItem("darkMode");

    try {
      const token = localStorage.getItem("token");

      // Optimistic update
      localStorage.setItem("darkMode", darkMode);
      applyTheme(darkMode);

      await api.patch(
        "/user/settings",
        { darkMode, notifications, ...(username && { username }) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedRes = await api.get("/user/me", {
        headers: { Authorization: `Bearer: ${token}`}
      });
      setUser(updatedRes.data);

      toast.success("Settings saved!");
    } catch (error) {
      console.error("Error saving settings", error);

      // Revert to previous theme
      if (previousDarkMode !== null) {
        const isDark = previousDarkMode === "true";
        setDarkMode(isDark);
        localStorage.setItem("darkMode", isDark);
        applyTheme(isDark);
      }

      toast.error("Failed to save settings.");
    }
  };

  const handleChangePassword = async () => {
    if(newPassword !== confirmNewPassword) return toast.error("Passwords do not match.");
    try {
      const token = localStorage.getItem("token");
      await api.patch('/user/change-password',
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password changed successfully!");
      document.getElementById("change_password_modal").close();

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");     
    } catch (error) {
      console.error("Error changing password.", error);
      toast.error(error.response?.data?.message || "Error changing password. Please try again.");      
    }
  }

  const handleLogoutAll = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.post('/user/logout-all', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Clear local token and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      toast.success("Logged out from all devices!");
      navigate('/login');   
    } catch (error) {
      console.error("Error logging out from all devices", error);
      toast.error("Failed to logout from all devices.");      
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="w-full max-w-2xl space-y-6">
        {/* Profile Section */}
        <div className="bg-base-100 p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Profile</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Change username</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter new username"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-base-100 p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Preferences</h2>

          <div className="flex items-center justify-between">
            <span className="font-medium">Dark Mode</span>
            <input
              type="checkbox"
              className="toggle"
              checked={darkMode}
              onChange={() => setDarkMode((prev) => !prev)}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">Enable Notifications</span>
            <input
              type="checkbox"
              className="toggle"
              checked={notifications}
              onChange={() => setNotifications((prev) => !prev)}
            />
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-base-100 p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Security</h2>

          <button className="btn btn-outline btn-error w-full" onClick={() => document.getElementById('change_password_modal').showModal()}>
            Change Password
          </button>

          <dialog id="change_password_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Change Password</h3>
              <div className="form-control mb-3">
                <input 
                  type="password" 
                  placeholder="Current password" 
                  className="input input-bordered"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)} />
              </div>
              <div className="form-control mb-3">
                <input 
                  type="password" 
                  placeholder="New password" 
                  className="input input-bordered"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <div className="form-control mb-3">
                <input 
                  type="password" 
                  placeholder="Confirm new password" 
                  className="input input-bordered"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)} />
              </div>
              <div className="modal-action">
                <button className="btn btn-primary" onClick={handleChangePassword}>Save</button>
                <form method="dialog">
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>

          <button className="btn btn-outline btn-error w-full" onClick={handleLogoutAll}>
            Logout from All Devices
          </button>
        </div>

        {/* Save Button */}
        <button className="btn btn-primary w-full" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;



