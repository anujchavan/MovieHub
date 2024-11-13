import React from 'react';
import MovieIcon from '../assets/MovieIcon.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex border space-x-8 items-center pl-3 py-4'>

      <img className='w-[40px]' src={MovieIcon} alt="MovieIcon" />

      <Link className='text-blue-500 text-3xl font-medium font-serif' to="/">Movies</Link>

      <Link className='text-blue-500 text-3xl font-medium font-serif' to="/watchlist">Watchlist</Link>

    </div>
  )
}

export default Navbar;