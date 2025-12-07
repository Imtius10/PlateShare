import React, { useContext, useEffect, useState } from 'react';
import HomeSwiper from '../Swiper/HomeSwpiper';
import StaticHome from '../StaticHome/StaticHome';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { NavLink, useNavigate } from "react-router";
import toast from 'react-hot-toast';
import { Commet } from 'react-loading-indicators';

const Home = () => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const [foods, setFood] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch("https://plate-share-server-nu.vercel.app/foods?status=Available")
            .then(res => res.json())
            .then(data => setFood(data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [setLoading]);

    const handleViewDetails = (id) => {
        if (!user) {
            toast.error("You must be logged in to request food!");
            navigate("/login");
            return;
        }
        navigate(`/foods/${id}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Commet color={["#673a18", "#915221", "#ba692b", "#d48244"]} />
            </div>
        );
    }

    const sortedFoods = [...foods].sort((a, b) => {
        const getNum = (str) => parseInt(str.match(/\d+/)?.[0] || 0);
        return getNum(b.food_quantity) - getNum(a.food_quantity);
    });

    return (
        <div>
            <HomeSwiper />
            <div className='className="max-w-7xl mx-auto p-6'>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedFoods.slice(0, 6).map((food) => (
                        <div
                            key={food._id}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="h-56 overflow-hidden rounded-t-2xl">
                                <img
                                    src={food.food_image}
                                    alt={food.food_name}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-5">
                                <h3 className="text-2xl font-semibold mb-3" style={{ color: "#ba692b" }}>
                                    {food.food_name}
                                </h3>

                                <div className="flex items-center gap-3 mb-3">
                                    <img
                                        src={food.donator_image || ""}
                                        alt="donator"
                                        className="w-10 h-10 rounded-full border-2"
                                        style={{ borderColor: "#ba692b" }}
                                    />
                                    <p className="font-medium text-gray-700">{food.donator_name}</p>
                                </div>

                                <p className="text-gray-600 mb-1">
                                    <span className="font-semibold">Quantity:</span> {food.food_quantity}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-semibold">Pickup Location:</span> {food.pickup_location}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-semibold">Expire Date:</span> {food.expire_date}
                                </p>

                                <button
                                    onClick={() => handleViewDetails(food._id)}
                                    className="w-full py-2 rounded-xl font-semibold text-white transition-colors duration-300"
                                    style={{ backgroundColor: "#ba692b" }}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}


                </div>
                <div className="w-full flex justify-center mt-6">
                    <NavLink to={'/availabelfood'}>
                        <button
                            className="px-8 py-3 rounded-2xl font-semibold text-white bg-orange-400 
        hover:bg-orange-500 active:scale-95 transition-all duration-300 shadow-lg"
                        >
                            See Available Foods
                        </button>
                   </NavLink>
                </div>

            </div>


            <StaticHome />
        </div>
    );
};

export default Home;
