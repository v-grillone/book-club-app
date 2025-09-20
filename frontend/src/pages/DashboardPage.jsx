import api from "../lib/axios";
import { useEffect, useState } from "react";
import BookClubCard from "../components/BookClubCard";
import { Link } from "react-router";
import { useNavigate, useLocation } from "react-router";

function DashboardPage() {
  const [bookClubs, setBookClubs] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBookClubs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookClubs(res.data);
      } catch (error) {
        console.error("Error fetching book clubs.", error);
      }
    };
    fetchBookClubs();
  }, []);

  const dashboardClick = (clubId) => {
    navigate(`/${clubId}`)
  }

  // Filter clubs where the user is a member
  const userClubs = bookClubs.filter((club) => club.members.includes(userId));


  const location = useLocation();
  const searchResults = location.state?.results || [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6">
      <h2 className="text-3xl font-bold mb-10 text-center">Your Book Clubs</h2>


      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {searchResults.map((club) => (
            <div key={club._id} onClick={() => dashboardClick(club._id)}>
              <BookClubCard club={club} onDashboard />
            </div>
          ))}
        </div>
      ) : userClubs.length === 0 ? (
        <div className="text-center bg-base-100 rounded-xl p-8 shadow-lg max-w-md mx-auto">
          <p className="text-lg mb-4">You haven't joined any clubs yet.</p>
          <Link to={"/explore"} className="btn btn-primary">Explore Clubs</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
          {userClubs.map((club) => (
            <div key={club._id} onClick={() => {dashboardClick(club._id)}}>
              <BookClubCard club={club} onDashboard />
            </div>
          ))}
        </div>
      )}
      <div className="mt-10 text-center">
        <p className="text-2xl mb-4 font-semibold">Find more clubs</p>
        <Link to="/explore" className="btn btn-primary">Explore Clubs</Link>
      </div>
    </div>
  );
}

export default DashboardPage;
