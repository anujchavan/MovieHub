import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
    scrollToSection('movies');
    if (pageNo === 1) {
      setPageNo(1);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const nextPage = () => {
    scrollToSection('movies');
    setPageNo(pageNo + 1);
  };

  const getVisiblePages = () => {
    let start = Math.max(1, pageNo - 1);
    let end = Math.min(movies.total_pages, pageNo + 1);

    if (pageNo === 1) end = Math.min(movies.total_pages, 3); // Special case for first page
    if (pageNo === movies.total_pages) start = Math.max(1, movies.total_pages - 2); // Special case for last page

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <Banner movies={movies} />

      <div className='pt-5 moviesBackground' id='movies'>
        <div className='m-3 text-white text-2xl font-bold text-center'>
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

        {/* <div className='text-white py-5 rounded-md flex justify-center items-center'>
          <div className='pagination navigation hover:cursor-pointer' onClick={prevPage}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>

          <div className='pagination text-xl mx-8'>
            {pageNo}
          </div>

          <div className='pagination navigation hover:cursor-pointer' onClick={nextPage}>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div> */}

        <div className='text-white flex justify-between items-center py-5'>
          <div className='paginationRecord'>
            Showing {(movies.page - 1) * 20 + 1} to {' '} {Math.min(movies.page * 20, movies.total_results)} of {movies.total_results} Results
          </div>

          <div className='font-medium hover:cursor-pointer'>
            <button className='navigation previous border py-2 px-4' onClick={prevPage} disabled={pageNo === 1}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>

            {getVisiblePages().map((page) => (
              <button
                key={page}
                className={`navigation border py-2 px-4 pagination-page ${pageNo === page ? 'bg-cyan-400' : ''}`}
                onClick={() => { setPageNo(page); scrollToSection('movies'); }}
              >
                {page}
              </button>
            ))}

            <button className='navigation next border py-2 px-4' onClick={nextPage} disabled={pageNo === movies.total_pages}>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Movies