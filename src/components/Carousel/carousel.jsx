import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
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
        delay: 10000, // Slower transition time
        disableOnInteraction: false,
        pauseOnMouseEnter: true, // Stops autoplay on hover
        resumeOnMouseLeave: true, // Resumes autoplay when mouse leaves
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
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="carousel-slide">
          <img src={phone} alt="Phone Image" />
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="carousel-slide">
          <img src={accessories} alt="Accessories Image" />
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="carousel-slide">
          <img src={playstation} alt="PlayStation Image" />
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
