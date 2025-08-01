import banner1 from "../../assets/banner/comunity.png";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";
import banner4 from "../../assets/banner/banner4.png";
import banner5 from "../../assets/banner/banner5.png";
import banner6 from "../../assets/banner/banner6.png";
import banner7 from "../../assets/banner/banner7.png";
import banner8 from "../../assets/banner/banner8.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { useState } from "react";

const Banner = () => {
  const [thumbsSwiper, ] = useState(null);
  const banners = [banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8];

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg">
      {/* Main Banner Swiper */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          "--swiper-navigation-size": "28px",
        }}
        loop={true}
        spaceBetween={0}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="main-swiper h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-t-xl"
      >
        {banners.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={img}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;