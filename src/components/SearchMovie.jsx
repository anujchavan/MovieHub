import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import NoMovieFound from '../assets/NoMovieFound.png'

const SearchMovie = ({ search }) => {

  const apiKey = import.meta.env.VITE_tmdb_api_key;

  const [searchMovie, setSearchMovie] = useState({});
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/search/movie';

    axios.get(`${url}?api_key=${apiKey}&query=${search}&language=en-US&page=${pageNo}`)
      .then((res) => setSearchMovie(res.data))
  }, [search, pageNo]);

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
    let end = Math.min(searchMovie.total_pages, pageNo + 1);

    if (pageNo === 1) end = Math.min(searchMovie.total_pages, 3); // Special case for first page
    if (pageNo === searchMovie.total_pages) start = Math.max(1, searchMovie.total_pages - 2); // Special case for last page

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  console.log("Search movie", searchMovie);

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

      {searchMovie.total_pages > 1 &&
        <div className='text-white flex justify-between items-center py-5'>
          <div className='paginationRecord'>
            Showing {(searchMovie.page - 1) * 20 + 1} to {' '} {Math.min(searchMovie.page * 20, searchMovie.total_results)} of {searchMovie.total_results} Results
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

            <button className='navigation next border py-2 px-4' onClick={nextPage} disabled={pageNo === searchMovie.total_pages}>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
      }
    </div>
  )
}

export default SearchMovie