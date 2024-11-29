import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Movies from './components/Movies';
import Navbar from './components/Navbar';
import WatchList from './components/WatchList';
import SearchMovie from './components/SearchMovie';

function App() {

  const [watchList, setWatchList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const localStorageWatchlist = localStorage.getItem("watchlistMovies");

    if (localStorageWatchlist) {
      setWatchList(JSON.parse(localStorageWatchlist));
    }
  }, []);

  const handleWatchList = (favMovie) => {
    const watchlistMovies = [...watchList, favMovie];

    localStorage.setItem("watchlistMovies", JSON.stringify(watchlistMovies));
    setWatchList(watchlistMovies);
  };

  const removeMovieWatchList = (removeMovie) => {
    const filteredWatchList = watchList.filter((movie) => {
      return movie.id !== removeMovie.id
    })

    localStorage.setItem("watchlistMovies", JSON.stringify(filteredWatchList));
    setWatchList(filteredWatchList);
  };

  return (
    <div className='App'>
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route
          path='/'
          element={
            search.length === 0 ?
              <Movies
                watchList={watchList}
                handleWatchList={handleWatchList}
                removeMovieWatchList={removeMovieWatchList}
              /> :
              <SearchMovie
                search={search}
              />
          }
        />
        <Route
          path='/watchlist'
          element={
            <WatchList
              watchList={watchList}
              setWatchList={setWatchList}
              removeMovieWatchList={removeMovieWatchList}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
