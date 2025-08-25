import React from 'react'
import { formatDate } from '../lib/utils';

function BookClubCard({ club }) {
  return (
    <div className="card card-side bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition duration-300 w-full max-w-2xl mx-auto">
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
        <p>Members: {club.members}</p>
        <p>Speed: {club.speed} pages a day.</p>
        <p>Start date: {formatDate(new Date(club.startDate))}</p>
        {/* <button className='btn btn-primary'>Join</button> */}
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Join</button>
        </div>
      </div>
    </div>
  )
}

export default BookClubCard