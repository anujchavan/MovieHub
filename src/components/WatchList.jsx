import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons';
import genre from '../Utility/genre';

const WatchList = ({ watchList, setWatchList, removeMovieWatchList }) => {

  const [search, setSearch] = useState('');
  const [sortName, setSortName] = useState('');
  const [sortRating, setSortRating] = useState('');
  const [sortPopularity, setSortPopularity] = useState('');
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [selectedGenre, setSelectedGenre] = useState("All Genre");

  useEffect(() => {
    const allGenre = watchList.map((movie) => {
      return genre[movie.genre_ids[0]];
    });

    setGenreList(["All Genre", ...new Set(allGenre)]);
  }, [watchList]);

  useEffect(() => {
    if (search.length >= 1) {
      setSelectedGenre("All Genre");
    }
  }, [search]);

  const moviesByGenres = watchList.filter((movie) => {
    if (selectedGenre === "All Genre") {
      return true
    } else {
      return genre[movie.genre_ids[0]] === selectedGenre
    }
  });

  const searchMovie = moviesByGenres.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortByName = () => {
    setSortRating('');
    setSortPopularity('');

    const ascendingName = [...watchList].sort((movie1, movie2) =>
      movie1.title.localeCompare(movie2.title)
    );

    const descendingName = [...watchList].sort((movie1, movie2) =>
      movie2.title.localeCompare(movie1.title)
    );

    if (sortName === "") {
      setSortName("asc");
      setWatchList(ascendingName);
    } else if (sortName === 'asc') {
      setSortName('desc');
      setWatchList(descendingName);
    } else {
      setSortName('asc');
      setWatchList(ascendingName);
    }
  };

  const sortByRating = (property) => {
    setSortName('');
    setSortPopularity('');

    if (sortRating === "") {
      setSortRating("asc");
      ascendingSort(property);
    } else if (sortRating === 'asc') {
      setSortRating('desc');
      descendingSort(property);
    } else {
      setSortRating('asc');
      ascendingSort(property);
    }
  };

  const sortByPopularity = (property) => {
    setSortName('');
    setSortRating('');

    if (sortPopularity === "") {
      setSortPopularity("asc");
      ascendingSort(property);
    } else if (sortPopularity === 'asc') {
      setSortPopularity('desc');
      descendingSort(property);
    } else {
      setSortPopularity('asc');
      ascendingSort(property);
    }
  };

  // Ascending - Arrow pointing up
  const ascendingSort = (property) => {
    const ascendingSort = watchList.sort((movie1, movie2) => {
      return movie1[property] - movie2[property];
    });

    setWatchList([...ascendingSort]);
  };

  // Descending - Arrow pointing down
  const descendingSort = (property) => {
    const descendingSort = watchList.sort((movie1, movie2) => {
      return movie2[property] - movie1[property];
    });

    setWatchList([...descendingSort]);
  };

  return (
    <div>
      <div className='flex flex-wrap justify-center m-4'>
        {genreList.map((genre) => {
          return (
            <div onClick={() => setSelectedGenre(genre)} className={`flex justify-center items-center text-white font-bold rounded-md h-[2.5rem] w-[9rem] m-2 hover:cursor-pointer ${selectedGenre === genre ? 'bg-blue-400' : 'bg-gray-400/50'}`}>
              {genre}
            </div>
          )
        })}
      </div>

      <div className='flex justify-center my-4'>
        <div>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='searchIcon' />
          <input
            className='h-[2.5rem] w-[18rem] bg-gray-200 outline-none pl-[45px]'
            type="text"
            placeholder='Search Movie'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className='border-2 rounded-md m-8'>
        <table className='w-full'>
          <thead>
            <tr className='border-b-2 bg-slate-100'>
              <th className='w-[45%] p-2 text-left hover:cursor-pointer hover:bg-slate-200' onClick={sortByName}>
                <span>Name</span>
                {sortName === 'asc' && <FontAwesomeIcon icon={faArrowUp} className='pl-3' />}
                {sortName === 'desc' && <FontAwesomeIcon icon={faArrowDown} className='pl-3' />}
              </th>
              <th className='w-[15%] p-2 text-left hover:cursor-pointer hover:bg-slate-200' onClick={() => sortByRating('vote_average')}>
                <span>Rating</span>
                {sortRating === 'asc' && <FontAwesomeIcon icon={faArrowUp} className='pl-3' />}
                {sortRating === 'desc' && <FontAwesomeIcon icon={faArrowDown} className='pl-3' />}
              </th>
              <th className='w-[15%] p-2 text-left hover:cursor-pointer hover:bg-slate-200' onClick={() => sortByPopularity('popularity')}>
                <span>Popularity</span>
                {sortPopularity === 'asc' && <FontAwesomeIcon icon={faArrowUp} className='pl-3' />}
                {sortPopularity === 'desc' && <FontAwesomeIcon icon={faArrowDown} className='pl-3' />}
              </th>
              <th className='w-[15%] p-2 text-left'>Genre</th>
              <th className='w-[10%] p-2'></th>
            </tr>
          </thead>

          {watchList.length === 0 || searchMovie.length === 0 ?
            <tbody className='h-[40vh]'>
              <tr>
                <td colSpan="5" className='text-center text-lg font-semibold'>
                  {search.length === 0 && watchList.length === 0 && "The popcorn’s ready, but your list is empty!"}
                  {search.length >= 1 && searchMovie.length === 0 && "Oops! We couldn’t find any movies matching your search"}
                </td>
              </tr>
            </tbody>
            :
            <tbody>
              {searchMovie.map((movie) => {
                return (
                  <tr className='border-b-2'>
                    <td className='flex items-center m-2'>
                      <img className='h-[6rem]' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt='' />
                      <div className='px-3'>{movie.title}</div>
                    </td>
                    <td className='p-2'>{movie.vote_average.toFixed(1)}</td>
                    <td className='p-2'>{movie.popularity.toFixed(1)}</td>
                    <td className='p-2'>{genre[movie.genre_ids[0]]}</td>
                    <td onClick={() => removeMovieWatchList(movie)} className='p-2 hover:cursor-pointer text-center deleteMovie'>
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}

export default WatchList