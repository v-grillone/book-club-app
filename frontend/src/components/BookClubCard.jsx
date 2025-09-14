import { formatDate } from '../lib/utils';
import api from '../lib/axios';

function BookClubCard({ club, onDashboard }) {

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/user/join",
        { clubId: club._id },
        { headers: { Authorization: `Bearer ${token}`}}
      );

      alert("You joined the club!");
      
    } catch (error) {
      console.error("Error joining club:", error);
      alert(error.response?.data?.message || "Failed to join club.");
      
    }
  }

  return (
    <div className={`card card-side bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition duration-300 w-full max-w-2xl max-h-80 mx-auto ${onDashboard && 'cursor-pointer'}`}>
      <figure className='w-4/12'>
        <img
          src={club.coverImageURL}
          alt="Movie"
          className="h-full w-full object-cover rounded-l-xl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{club.title}</h2>
        <p>By: {club.author}</p>
        <p>Genre: {club.genre}</p>
        <p>Members: {club.members.length}</p>
        <p>Speed: {club.speed} pages a day.</p>
        <p>Start date: {formatDate(new Date(club.startDate))}</p>
        {!onDashboard && (
          <div className="card-actions justify-end">
            <button onClick={handleJoin} className="btn btn-primary">Join</button>
        </div>
        )}
      </div>
    </div>
  )
}

export default BookClubCard