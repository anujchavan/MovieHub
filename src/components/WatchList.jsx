import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faArrowDown, faArrowUp, faCheck, faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import genre from '../Utility/genre';
import genreIcons from '../Utility/genreIcons';

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
    <div className='watchlistContainer moviesBackground'>
      <div className='flex justify-between mt-4 mb-7'>
        <div>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='searchIcon searchIconMovies' />
          <input
            className='searchMovies h-[2.5rem] w-[18rem] outline-none rounded-md pl-[45px]'
            type="text"
            placeholder='Search Movie'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <Listbox value={selectedGenre} onChange={setSelectedGenre}>
            <div className="relative mt-2 w-[12rem]">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm/6 hover:cursor-pointer">
                <span className="flex items-center">
                  <img alt="" src={genreIcons[selectedGenre]} className="size-5 shrink-0" />
                  <span className="ml-3 block truncate">{selectedGenre}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <FontAwesomeIcon icon={faAngleDown} />
                </span>
              </ListboxButton>

              <ListboxOptions
                transition
                className="genreOptions absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
              >
                {genreList.map((genre) => (
                  <ListboxOption
                    value={genre}
                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-cyan-400 data-[focus]:text-white hover:cursor-pointer"
                  >
                    <div className="flex items-center">
                      <img alt="" src={genreIcons[genre]} className="size-6 shrink-0" />
                      <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                        {genre}
                      </span>
                    </div>

                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
      </div>

      <div className='py-4'>
        <table className='watchlistTable w-full'>
          <thead>
            <tr className='text-white headBorder'>
              <th className='w-[45%] p-2 text-left hover:cursor-pointer' onClick={sortByName}>
                <span>Name</span>
                {sortName === 'asc' && <FontAwesomeIcon icon={faArrowUp} className='pl-3' />}
                {sortName === 'desc' && <FontAwesomeIcon icon={faArrowDown} className='pl-3' />}
              </th>
              <th className='w-[15%] p-2 text-left hover:cursor-pointer' onClick={() => sortByRating('vote_average')}>
                <span>Rating</span>
                {sortRating === 'asc' && <FontAwesomeIcon icon={faArrowUp} className='pl-3' />}
                {sortRating === 'desc' && <FontAwesomeIcon icon={faArrowDown} className='pl-3' />}
              </th>
              <th className='w-[15%] p-2 text-left hover:cursor-pointer' onClick={() => sortByPopularity('popularity')}>
                <span>Popularity</span>
                {sortPopularity === 'asc' && <FontAwesomeIcon icon={faArrowUp} className='pl-3' />}
                {sortPopularity === 'desc' && <FontAwesomeIcon icon={faArrowDown} className='pl-3' />}
              </th>
              <th className='w-[15%] p-2 text-left'>Genre</th>
              <th className='w-[10%] p-2'></th>
            </tr>
          </thead>

          {watchList.length === 0 || searchMovie.length === 0 ?
            <tbody className='h-[50vh] border'>
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
                  <tr className='tableBorder'>
                    <td className='flex items-center my-3 ps-2'>
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