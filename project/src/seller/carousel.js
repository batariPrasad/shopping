
import Slider from 'react-slick';  // Import Slider from react-slick
import 'slick-carousel/slick/slick.css';  // Import slick-carousel styles
import 'slick-carousel/slick/slick-theme.css'; // Import slick-carousel theme styles
// import './App.css'; // Import your custom styles
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';



function Carousel() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);

  // Define settings for the thumbnail carousel with pagination dots and RTL support
  const thumbnailSliderSettings = {
    dots: true,               // Enable pagination dots
    infinite: true,           // Loop the slides infinitely
    speed: 1000,              // Transition speed
    slidesToShow: 3,          // Show 3 thumbnails at a time
    slidesToScroll: 2,        // Scroll two thumbnails at a time
    focusOnSelect: true,      // Enable click to select thumbnails
    autoplay: true,           // Enable autoplay for thumbnail carousel
    autoplaySpeed: 1500,      // Speed of autoplay for thumbnail carousel
    rtl: true,                // Enable RTL (right-to-left) direction
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
            <img src="1.png" className="d-block w-100" height="400" alt="Slide 1" />
            <div className="carousel-caption d-none d-md-block">
              <h1>Example headline.</h1>
              <p className="opacity-75">Some representative placeholder content for the first slide of the carousel.</p>
              <p><Link className="btn btn-lg btn-primary" to="/register"  >Sign up today</Link></p>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <img src="2.png" className="d-block w-100" height="400" alt="Slide 2" />
            <div className="carousel-caption d-none d-md-block">
              <h1>Another example headline.</h1>
              <p>Some representative placeholder content for the second slide of the carousel.</p>
              <p><a className="btn btn-lg btn-primary" href="#" data-bs-toggle="modal" data-bs-target="#contact">Learn more</a></p>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item">
            <img src="3.png" className="d-block w-100" height="400" alt="Slide 3" />
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
      <section className="thumbnail-carousel-container" style={{ direction: 'rtl' }}>
        <Slider
          {...thumbnailSliderSettings}
          ref={thumbnailSliderRef}
        >
          <div>
            <img src="1.png" alt="Thumbnail 1" />
          </div>
          <div>
            <img src="2.png" alt="Thumbnail 2" />
          </div>
          <div>
            <img src="1.png" alt="Thumbnail 3" />
          </div>
          <div>
            <img src="2.png" alt="Thumbnail 4" />
          </div>
          <div>
            <img src="1.png" alt="Thumbnail 5" />
          </div>
          <div>
            <img src="2.png" alt="Thumbnail 6" />
          </div>
          <div>
            <img src="1.png" alt="Thumbnail 7" />
          </div>
          <div>
            <img src="2.png" alt="Thumbnail 8" />
          </div>
          <div>
            <img src="1.png" alt="Thumbnail 9" />
          </div>
        </Slider>
      </section>

      <div className='row mt-5'>
        {/* <div className='col-lg-2'></div> */}
        <div className='col-lg-3'>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="bangalore.png" />
        <Card.Body>
          <Card.Title>
            <Link to='/bangalore' className='text-decoration-none' >  bangalore  </Link>
          </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <div className='text-center'> <Button variant="primary" className='text-center'> <Link to='/bangalore' className='text-decoration-none text-danger ' >  bangalore  </Link>   </Button></div>
        </Card.Body>
      </Card>

        </div>
        <div className='col-lg-3'>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="bangalore.png" />
        <Card.Body>
          <Card.Title>
            <Link to='/bangalore' className='text-decoration-none' >  bangalore  </Link>
          </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <div className='text-center'> <Button variant="primary" className='text-center'> <Link to='/bangalore' className='text-decoration-none text-danger ' >  bangalore  </Link>   </Button></div>
        </Card.Body>
      </Card>

        </div>
        <div className='col-lg-3'>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="bangalore.png" />
        <Card.Body>
          <Card.Title>
            <Link to='/hyderabad' className='text-decoration-none' >  Hyderabad  </Link>
          </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <div className='text-center'> <Button variant="primary" className='text-center'> <Link to='/hyderabad' className='text-decoration-none text-danger ' >  Hyderabad  </Link>   </Button></div>
        </Card.Body>
      </Card>

        </div>
        <div className='col-lg-3'>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="bangalore.png" />
        <Card.Body>
          <Card.Title>
            <Link to='/bangalore' className='text-decoration-none' >  bangalore  </Link>
          </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <div className='text-center'> <Button variant="primary" className='text-center'> <Link to='/bangalore' className='text-decoration-none text-danger ' >  bangalore  </Link>   </Button></div>
        </Card.Body>
      </Card>

        </div>
      </div>
    </>

  );
}

export default Carousel;
