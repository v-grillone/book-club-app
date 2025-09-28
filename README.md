📚 ReadSocial – Book Club App

ReadSocial is a full-stack book club platform where readers can create and join book clubs, discuss books, and stay up-to-date with notifications.

Built with React, Node/Express, and MongoDB, it’s designed to be fast, simple, and customizable — perfect for readers who want a dedicated space to connect.

------------------------------------

✨ Features

- 🔐 User Authentication – Secure login and signup with JWT-based sessions

- 🌓 Dark Mode – Toggle between light and dark themes (persists between sessions)

- 🔔 Notifications System – Get real-time updates when posts are made in your clubs

- 📝 Book Club Pages – Join, view, and interact with book clubs

- 🔍 Search Functionality – Easily discover new book clubs

- ⚙️ Settings Page

    - Change username

    - Toggle notifications on/off

    - Change password

    - Logout from all devices (invalidates all active sessions)

 ---------------------------------------

🛠️ Tech Stack

Frontend
- React (with Context API for global state)
- React Router for navigation
- TailwindCSS + DaisyUI for styling
- Axios for API requests

Backend
- Node.js + Express.js
- MongoDB + Mongoose (for data modeling)
- JWT Authentication with token versioning for secure logout

-----------------------------------------

🚀 Getting Started

1️⃣ Clone the Repository

    - git clone https://github.com/your-username/readsocial.git
    - cd readsocial

2️⃣ Install Dependencies

Backend:

    - cd backend
    - npm install

Frontend:

    - cd frontend
    - npm install

3️⃣ Environment Variables

Create a .env file in backend/ with:

    - MONGO_URI=your_mongodb_connection_string
    - JWT_SECRET=your_jwt_secret
    - PORT=5000

4️⃣ Run the App

Backend:

    - npm run dev

Frontend:

    - npm run dev



