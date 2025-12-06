import React from 'react';
import HomeSwiper from '../Swiper/HomeSwpiper';
import AddFoods from '../../Pages/AllFoods/AddFoods';


const Home = () => {
    return (
        <div>
            <h1>Home</h1>
             <HomeSwiper></HomeSwiper>
             <AddFoods></AddFoods>
        </div>
    );
};

export default Home;