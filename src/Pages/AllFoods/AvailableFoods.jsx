import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Commet } from "react-loading-indicators";

const AvailableFoods = () => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3000/foods?status=Available")
            .then((res) => res.json())
            .then((data) => setFoods(data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [setLoading]);

    if (loading) {
        return (
            <div className="flex justify-center items-center mx-auto min-h-full min-w-full">
                <Commet color={["#673a18", "#915221", "#ba692b", "#d48244"]} />
            </div>
        );
    }

    const handleViewDetails = (id) => {
        if (!user) {
            toast.error("You must be logged in to request food!");
            navigate("/login");
            return;
        }
        navigate(`/foods/${id}`);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: "#ba692b" }}>
                Available Foods
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {foods.map((food) => (
                    <div
                        key={food._id}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="h-56 overflow-hidden rounded-t-2xl">
                            <img
                                src={food.food_image || "https://via.placeholder.com/400x300?text=No+Image"}
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
                                    src={food.donator_image || "https://via.placeholder.com/40x40?text=No+Photo"}
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

            {foods.length === 0 && (
                <p className="text-center text-gray-500 mt-12 text-lg">No available foods found.</p>
            )}
        </div>
    );
};

export default AvailableFoods;
