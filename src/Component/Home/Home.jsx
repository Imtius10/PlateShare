import React from 'react';
import HomeSwiper from '../Swiper/HomeSwpiper';
import AddFoods from '../../Pages/AllFoods/AddFoods';
import ScrollReveal from '../Scroll/TimeLine';
import Timeline from '../Scroll/TimeLine';
import StaticHome from '../StaticHome/StaticHome';


const Home = () => {
    return (
        <div>
            
             <HomeSwiper></HomeSwiper>
           
            <StaticHome></StaticHome>
        </div>
    );
};

export default Home;