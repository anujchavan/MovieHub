import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = ({ movies }) => {

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2500,
    cssEase: "linear",
    arrows: false
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {movies.results?.slice(0, 5).map((movie) => {
          return (
            <>
              <div className='movieBanner' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                <div className='w-full text-center text-white text-xl p-2 bg-gray-900/60'>{movie.title}</div>
              </div>
            </>
          )
        })}
      </Slider>
    </div>
  )
}

export default Banner