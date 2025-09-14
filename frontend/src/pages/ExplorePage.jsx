import BookClubCard from "../components/BookClubCard.jsx";
import api from "../lib/axios.js";
import { useEffect, useState} from "react";

function ExplorePage() {

  const [bookClubs, setBookClubs] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBookClubs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setBookClubs(res.data);        
      } catch (error) {
        console.error("Error fetching book clubs.", error);        
      }
    }

    fetchBookClubs();
  }, []);

  return (
    <>
      <div className="bg-base-200 min-h-screen grid grid-cols-1 gap-6 p-6">
        {Array.isArray(bookClubs) && bookClubs
        .filter((club) => !club.members.includes(userId))
        .map((club) => (
        <BookClubCard key={club._id} club={club} />
        ))}
      </div>
    </>
  )
}

export default ExplorePage