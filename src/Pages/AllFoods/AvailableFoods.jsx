import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { NavLink, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

const AvailableFoods = () => {
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();
    const id = useParams();
    useEffect(() => {
        fetch("http://localhost:3000/foods?status=Available")
            .then((res) => res.json())
            .then((data) => setFoods(data))
            .catch((err) => console.log(err));
    }, []);

    const handleViewDetails = (id) => {
        if (!user) {
            toast.error("You must be logged in!");
            navigate("/login");
            return;
        }
        navigate(`/foods/${id}`);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center mb-6">Available Foods</h2>

            {/* Foods Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods.map((food) => (
                    <div
                        key={food._id}
                        className="card bg-white shadow-lg rounded-xl overflow-hidden"
                    >
                        <img
                            src={food.food_image}
                            alt={food.food_name}
                            className="h-48 w-full object-cover"
                        />

                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{food.food_name}</h3>

                            {/* Donator */}
                            <div className="flex items-center gap-3 mt-2">
                                <img
                                    src={food.donator_image}
                                    alt="donator"
                                    className="w-10 h-10 rounded-full"
                                />
                                <p className="font-medium">{food.donator_name}</p>
                            </div>

                            {/* Details */}
                            <p className="mt-2 text-gray-700">
                                <b>Quantity:</b> {food.food_quantity}
                            </p>
                            <p className="text-gray-700">
                                <b>Pickup Location:</b> {food.pickup_location}
                            </p>
                            <p className="text-gray-700">
                                <b>Expire Date:</b> {food.expire_date}
                            </p>

                            {/* View Details */}
                            <button
                                onClick={() => handleViewDetails(food._id)}
                                className="btn btn-primary mt-2 w-full"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {foods.length === 0 && (
                <p className="text-center text-gray-600 mt-10">No available foods found.</p>
            )}
        </div>
    );
};

export default AvailableFoods;
