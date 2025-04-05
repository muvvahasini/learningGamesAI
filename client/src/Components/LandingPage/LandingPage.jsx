import Header from '../Header/Header';
import {Link} from 'react-router-dom';
import Slider from 'react-slick';
import imgOne from '../../assets/img-1.jpg';
import imgTwo from '../../assets/img-2.jpg';
import imgThree from '../../assets/img-3.jpg';
import imgFour from '../../assets/img-4.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';

const LandingPage = () =>{
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      }
   
    return (
    <>
    <Header/>
    <div className='landing-page'>
    <div className="slider-container">
          <Slider {...settings}>
            <div>
              <img src={imgFour} className='image-one' alt='..' />
            </div>
            <div>
            <img src={imgOne} className='image-one' alt='..' />
            </div>
            <div>
            <img src={imgTwo} className='image-one' alt='..' />
            </div>
            <div>
            <img src={imgThree} className='image-one' alt='..' />
            </div>
          </Slider>
        </div>
        <h1 className='heading-landing-page'>Well Come to SLAG a learning game platform</h1>
        <p>Where you can learn by playing games and gain ultimate knowledge in various feilds.</p>
        <Link to='/login'>Explore More ---</Link>
    </div>
    </>
)
}

export default LandingPage