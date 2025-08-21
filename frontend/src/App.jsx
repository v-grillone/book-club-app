import { Route, Routes } from 'react-router';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import BookClubPage from './pages/BookClubPage';

import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<HomePage />} />
        <Route path="/bookclub/:id" element={<BookClubPage />} />
      </Routes>

    </div>
  )
}

export default App
