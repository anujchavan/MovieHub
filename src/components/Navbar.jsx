import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import MovieIcon from '../assets/MovieIcon.svg';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ search, setSearch }) => {

  const location = useLocation();

  return (
    <div className='flex items-center justify-between py-7'>

      <div className='flex space-x-3'>
        <img className='w-[40px]' src={MovieIcon} alt="MovieIcon" />
        <Link className='text-white text-2xl font-medium heading' to="/" onClick={() => setSearch('')}>Movies</Link>
        <Link className='text-white text-2xl font-medium heading' to="/watchlist">Watchlist</Link>
      </div>

      {location.pathname === '/' &&
        <div className='flex justify-center'>
          <div>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='searchIcon searchIconMovies' />
            <input
              className='h-[2.5rem] w-[18rem] searchMovies outline-none rounded-md pl-[45px]'
              type="text"
              placeholder='Search Movie'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      }

    </div>
  )
}

export default Navbar;