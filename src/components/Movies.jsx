import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Banner from './Banner';

const Movies = ({ watchList, handleWatchList, removeMovieWatchList }) => {

  const apiKey = import.meta.env.VITE_tmdb_api_key;

  const [movies, setMovies] = useState({});
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/movie/popular';

    axios.get(`${url}?api_key=${apiKey}&language=en-US&page=${pageNo}`)
      .then((res) => setMovies(res.data))
  }, [pageNo]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  };

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

  return (
    <>
      <Banner movies={movies} />

      <div className='pt-5 moviesBackground' id='movies'>
        <div className='m-3 text-white text-2xl font-bold text-center font-serif'>
          Trending Movies
        </div>

        <div className='flex flex-wrap justify-center columns-5'>
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
          <div className='hover:cursor-pointer' onClick={prevPage}>
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => scrollToSection('movies')} />
          </div>

          <div className='text-xl px-8'>
            {pageNo}
          </div>

          <div className='hover:cursor-pointer' onClick={nextPage}>
            <FontAwesomeIcon icon={faArrowRight} onClick={() => scrollToSection('movies')} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Movies