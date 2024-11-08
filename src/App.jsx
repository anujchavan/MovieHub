import { Route, Routes } from 'react-router-dom'
import './App.css'
import Movies from './components/Movies'
import Navbar from './components/Navbar'
import WatchList from './components/WatchList'
import Banner from './components/Banner'
import { useEffect, useState } from 'react'

function App() {

  const [watchList, setWatchList] = useState([]);

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

  console.log("WatchList", watchList);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Banner />
              <Movies
                watchList={watchList}
                handleWatchList={handleWatchList}
                removeMovieWatchList={removeMovieWatchList}
              />
            </>
          }
        />
        <Route path='/watchlist' element={<WatchList watchList={watchList} setWatchList={setWatchList} />} />
      </Routes>
    </>
  )
}

export default App
