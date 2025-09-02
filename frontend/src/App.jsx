import { Route, Routes, useLocation } from 'react-router';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import BookClubPage from './pages/BookClubPage';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

function App() {

  const location = useLocation();
  // Paths where we dont want the navbar displayed
  const hiddenNavbarPaths = ["/", "/sign-up", "/login"]
  const showNavbar = !hiddenNavbarPaths.includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<HomePage />} />
        <Route path="/bookclub/:id" element={<BookClubPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
