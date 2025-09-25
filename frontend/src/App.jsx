import { Route, Routes, useLocation } from 'react-router';
import { Toaster } from 'react-hot-toast';

import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage.jsx';
import BookClubPage from './pages/BookClubPage';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

function App() {

  const location = useLocation();
  // Paths where we dont want the navbar displayed
  const hiddenNavbarPaths = ["/", "/sign-up", "/login"]
  const showNavbar = !hiddenNavbarPaths.includes(location.pathname);

  return (
    <div>
      <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/:id" element={<BookClubPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
