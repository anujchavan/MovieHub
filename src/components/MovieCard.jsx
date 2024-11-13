import React from 'react'

const MovieCard = ({ movie, poster, movieTitle, watchList, handleWatchList, removeMovieWatchList }) => {

  const isMovieInWatchlist = (movie) => {
    for (let i = 0; i < watchList.length; i++) {
      if (watchList[i].id === movie.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className='movieCard m-4' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${poster})` }}>
      {isMovieInWatchlist(movie) ?
        <div onClick={() => removeMovieWatchList(movie)} className='flex justify-center items-center rounded-lg m-2 h-8 w-8 bg-gray-900/70'>
          &#10060;
        </div> :
        <div onClick={() => handleWatchList(movie)} className='flex justify-center items-center rounded-lg m-2 h-8 w-8 bg-gray-900/70'>
          &#128525;
        </div>
      }

      <div className='movieTitle text-white text-xl text-center p-2 bg-gray-900/60'>
        {movieTitle}
      </div>
    </div>
  )
}

export default MovieCard