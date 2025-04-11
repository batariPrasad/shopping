import Slider from 'react-slick';  // Import Slider from react-slick
import 'slick-carousel/slick/slick.css';  // Import slick-carousel styles
import 'slick-carousel/slick/slick-theme.css'; // Import slick-carousel theme styles
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

function Carousel() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);

  // Define settings for the thumbnail carousel with pagination dots and RTL support
  const thumbnailSliderSettings = {
    dots: true,               // Enable pagination dots
    slidesToShow: 4,          // Show 4 thumbnails at a time by default
    rtl: true,                // Enable RTL (right-to-left) direction
    responsive: [
      {
        breakpoint: 1200, // For screen widths 1200px and above
        settings: {
          slidesToShow: 4,  // Show 4 thumbnails at a time
        },
      },
      {
        breakpoint: 992, // For screen widths 992px and above (tablet size)
        settings: {
          slidesToShow: 3,  // Show 3 thumbnails at a time
        },
      },
      {
        breakpoint: 768, // For screen widths 768px and above (smaller tablet size)
        settings: {
          slidesToShow: 2,  // Show 2 thumbnails at a time
        },
      },
      {
        breakpoint: 576, // For screen widths 576px and above (mobile size)
        settings: {
          slidesToShow: 1,  // Show 1 thumbnail at a time
        },
      },
    ],
  };

  // Reference for the thumbnail slider
  const thumbnailSliderRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Logout function
  const logoutme = () => {
    localStorage.clear();
    setIsLoggedIn(false); // Update the state to reflect logout
  };

  return (
    <>
      <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        {/* Carousel Inner */}
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active">
            <img src="car1.png" className="d-block w-100" height="400" alt="Slide 1" />
            <div className="carousel-caption d-none d-md-block">
              <h1>Example headline.</h1>
              <p className="opacity-75">Some representative placeholder content for the first slide of the carousel.</p>
              <p><Link className="btn btn-lg btn-primary" to="/register"  >Sign up today</Link></p>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <img src="car2.png" className="d-block w-100" height="400" alt="Slide 2" />
            <div className="carousel-caption d-none d-md-block">
              <h1>Another example headline.</h1>
              <p>Some representative placeholder content for the second slide of the carousel.</p>
              <p><a className="btn btn-lg btn-primary" href="#" data-bs-toggle="modal" data-bs-target="#contact">Learn more</a></p>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item">
            <img src="car3.png" className="d-block w-100" height="400" alt="Slide 3" />
            <div className="carousel-caption d-none d-md-block text-end">
              <h1>One more for good measure.</h1>
              <p>Some representative placeholder content for the third slide of this carousel.</p>
              <p><a className="btn btn-lg btn-primary" href="#" data-bs-toggle="modal" data-bs-target="#contact">Browse gallery</a></p>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Thumbnail Carousel for Syncing with Pagination */}
      <section className="thumbnail-carousel-container mb-5 mt-5" style={{ direction: 'rtl' }}>
        <Slider
          {...thumbnailSliderSettings}
          ref={thumbnailSliderRef}
        >
          <div>
            <Link to="/electronics">
              <img src="4.png" alt="Thumbnail 3" />
            </Link>
          </div>
          <div>
            <Link to="/grocery">
              <img src="grocerysymbol2.png" alt="Thumbnail 2" />
            </Link>
          </div>
          <div>
            <img src="1.png" alt="Thumbnail 3" />
          </div>
          <div>
            <img src="2.png" alt="Thumbnail 4" />
          </div>
        </Slider>
        <Slider
          {...thumbnailSliderSettings}
          ref={thumbnailSliderRef}
          style={{
            backgroundImage: 'url(bg1.png)',
            backgroundSize: 'cover',
            height: '100%',
            marginTop: '10px',
            marginBottom: '15px',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
          className='mt-5'
        >
          <div>
            <Link to="/electronics">
              <img src="4.png" alt="Thumbnail 3" />
            </Link>
          </div>
          <div>
            <Link to="/grocery">
              <img src="grocerysymbol2.png" alt="Thumbnail 2" />
            </Link>
          </div>
          <div>
            <img src="1.png" alt="Thumbnail 3" />
          </div>
          <div>
            <img src="2.png" alt="Thumbnail 4" />
          </div>
          <div style={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '10px',
            textAlign: 'center',
            fontSize: '16px',
          }}>
            <marquee behavior="scroll" direction="left">The offer is live, do shopping more!</marquee>
          </div>
        </Slider>
      </section>
    </>
  );
}

export default Carousel;
