import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Banner from './Banner';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Movies = ({ watchList, handleWatchList, removeMovieWatchList }) => {

  const apiKey = import.meta.env.VITE_tmdb_api_key;

  const [movies, setMovies] = useState({});
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    AOS.init({ duration: 800 });  // duration (in milliseconds) of the animation

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

        <div className='flex flex-wrap justify-center'>
          {movies?.results?.map((movie, index) => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                poster={movie.poster_path}
                movieTitle={movie.original_title}
                watchList={watchList}
                handleWatchList={handleWatchList}
                removeMovieWatchList={removeMovieWatchList}
                aosDelay={index * 100}  // Adds a custom delay to each MovieCard so that each card appears one by one with a slight delay
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