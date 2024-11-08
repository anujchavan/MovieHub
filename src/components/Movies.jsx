import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Movies = ({ watchList, handleWatchList, removeMovieWatchList }) => {

  const [movies, setMovies] = useState({});
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/movie/popular';

    axios.get(`${url}?api_key=dbb2067525f57797049487b94ce637a0&language=en-US&page=${pageNo}`)
      .then((res) => setMovies(res.data))
  }, [pageNo]);

  const prevPage = () => {
    if (pageNo === 1) {
      setPageNo(1);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const nextPage = () => {
    setPageNo(pageNo + 1);
  };

  console.log(movies)

  return (
    <div className='py-5'>
      <div className='m-3 text-2xl font-bold text-center'>
        Trending Movies
      </div>

      <div className='flex flex-wrap'>
        {movies?.results?.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              poster={movie.poster_path}
              movieTitle={movie.original_title}
              watchList={watchList}
              handleWatchList={handleWatchList}
              removeMovieWatchList={removeMovieWatchList}
            />
          )
        })}
      </div>

      <div className='bg-blue-300 p-3 mt-4 rounded-md flex justify-center items-center'>
        <div className='px-4 hover:cursor-pointer' onClick={prevPage}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>

        <div className='text-xl px-4'>
          {pageNo}
        </div>

        <div className='px-4 hover:cursor-pointer' onClick={nextPage}>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </div>
  )
}

export default Movies