import { useEffect, useState } from 'react';
import api from '../lib/axios.js';
import { useParams } from 'react-router';

function BookClubPage() {

  const { id } = useParams();
  const [bookClub, setBookClub] = useState([]);

  useEffect(() => {
    const fetchBookClub = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookClub(res.data)
      } catch (error) {
        console.error("Error fetching book club.", error);
      }
    }
    fetchBookClub();
  }, []);

  return (
    <div className='min-h-screen'>
      <h3>Bookclub: {bookClub.title}</h3>
    </div>
  )
}

export default BookClubPage