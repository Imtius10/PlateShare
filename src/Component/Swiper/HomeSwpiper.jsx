import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import one from "../../assets/photorealistic-kid-refugee-camp (1).jpg";
import two from "../../assets/photorealistic-kid-refugee-camp.jpg";
import three from "../../assets/three.jpeg";

const HomeSwiper = () => {
    const slides = [
        {
            img: one,
            quote: "“Hunger is not an issue of charity, it is an issue of justice.”",
        },
        {
            img: two,
            quote: "“Share your surplus food — it could mean hope to someone.”",
        },
        {
            img: three,
            quote: "“If you can’t feed a hundred people, feed just one.”",
        },
        {
            img: one,
            quote: "“Food wasted is a life wasted. Share before you throw.”",
        },
    ];

    return (
        <div className="w-full">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation
            >
                {slides.map((s, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px]">
                            <img
                                src={s.img}
                                className="w-full h-full object-cover"
                                alt=""
                            />

                            {/* Quote Overlay */}
                            <div className="absolute bottom-6 left-6 bg-black/50 text-white p-4 rounded-lg text-lg md:text-xl max-w-[85%]">
                                {s.quote}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HomeSwiper;
