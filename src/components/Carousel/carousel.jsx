import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Carousel.css";

import component from "../../assets/components.jpeg";
import console from "../../assets/console.jpg";
import home from "../../assets/home.png";

const Carousel = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
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
          <img src={console} alt="Console Image" />
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="carousel-slide">
          <img src={component} alt="Component Image" />
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
