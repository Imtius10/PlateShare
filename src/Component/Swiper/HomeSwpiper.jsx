import React from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
        <div className="w-full flex justify-center py-10 bg-[#fff8f0]">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation
            >
                {slides.map((s, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full flex justify-center">
                            <div className="relative w-full max-w-4xl h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl border-2 border-[#ba692b]">
                                <img
                                    src={s.img}
                                    alt={`slide-${index}`}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                                {/* Gradient Overlay for Quote */}
                                <div className="absolute bottom-0 w-full bg-gradient-to-t from-[#ba692b]/80 via-transparent to-transparent p-6">
                                    <p className="text-center text-sm md:text-lg lg:text-xl font-semibold text-white drop-shadow-lg">
                                        {s.quote}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HomeSwiper;
