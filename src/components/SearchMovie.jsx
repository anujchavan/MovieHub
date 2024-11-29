import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NoMovieFound from '../assets/NoMovieFound.png'

const SearchMovie = ({ search }) => {

  const apiKey = import.meta.env.VITE_tmdb_api_key;

  const [searchMovie, setSearchMovie] = useState({});

  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/search/movie';

    axios.get(`${url}?api_key=${apiKey}&query=${search}&language=en-US&page=1`)
      .then((res) => setSearchMovie(res.data))
  }, [search]);

  return (
    <div id='movies'>
      {search.length >= 1 && searchMovie.total_results === 0 ?
        <div className='noMovieFound'>
          <img src={NoMovieFound} alt='No Movie Found' className='rounded-xl' />
        </div>
        :
        <>
          <div className='mb-3 text-white text-2xl font-bold text-center'>
            Movies
          </div>

          <div className='flex flex-wrap justify-center'>
            {searchMovie.results?.map((movie) => {
              return (
                <div className='movieCard m-4 relative' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})` }}>
                  <div className='movieTitle w-full text-white text-xl text-center p-2 bg-gray-900/60 absolute bottom-0'>
                    {movie.title}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      }
    </div>
  )
}

export default SearchMovie