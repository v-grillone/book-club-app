import { useState } from "react";

function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [displayName, setDisplayName] = useState("");

  const handleSave = () => {
    // Example: send updated settings to backend
    console.log({
      darkMode,
      notifications,
      displayName,
    });
    alert("Settings saved!");
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="w-full max-w-2xl space-y-6">
        {/* Profile Section */}
        <div className="bg-base-100 p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Profile</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Display Name</span>
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
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

          <button className="btn btn-outline btn-error w-full">
            Change Password
          </button>

          <button className="btn btn-outline btn-error w-full">
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

