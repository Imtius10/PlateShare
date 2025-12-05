import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import one from '../../assets/photorealistic-kid-refugee-camp (1).jpg'
import two from '../../assets/photorealistic-kid-refugee-camp.jpg'
import three from '../../assets/three.jpeg'

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Swiper
                
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide><img src={one} alt="" /></SwiperSlide>
                <SwiperSlide><img src={two} alt="" /></SwiperSlide>
                <SwiperSlide><img src={three} alt="" /></SwiperSlide>
                <SwiperSlide><img src={one} alt="" /></SwiperSlide>

            </Swiper>
            
        </div>
    );
};

export default Home;