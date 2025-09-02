import BookClubCard from "../components/BookClubCard.jsx";
import api from "../lib/axios.js";
import { useEffect, useState} from "react";

function HomePage() {

  const [bookClubs, setBookClubs] = useState([]);

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
      <div className="bg-base-100 grid grid-cols-1 gap-6 p-6">
        {Array.isArray(bookClubs) && bookClubs.map((club) => (
        <BookClubCard key={club._id} club={club} />
        ))}
      </div>
    </>

  )
}

export default HomePage