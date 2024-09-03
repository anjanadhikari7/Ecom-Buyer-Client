import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Carousel.css";

import accessories from "../../assets/acc.jpg";
import playstation from "../../assets/playstation.jpg";
import home from "../../assets/home.png";
import phone from "../../assets/phones.jpg";

const Carousel = () => {
  return (
    <Swiper
      spaceBetween={20}
      rewind={true}
      centeredSlides={true}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        resumeOnMouseLeave: true,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="carousel-slide">
          <img src={home} alt="Home Image" />
          <Link to="/shop" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="carousel-slide">
          <img src={phone} alt="Phone Image" />
          <Link to="/shop" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="carousel-slide">
          <img src={accessories} alt="Accessories Image" />
          <Link to="/shop" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="carousel-slide">
          <img src={playstation} alt="PlayStation Image" />
          <Link to="/shop" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
