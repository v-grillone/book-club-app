import { Route, Routes } from 'react-router';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import BookClubPage from './pages/BookClubPage';

function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/bookclub/:id" element={<BookClubPage />} />
      </Routes>

    </div>
  )
}

export default App
