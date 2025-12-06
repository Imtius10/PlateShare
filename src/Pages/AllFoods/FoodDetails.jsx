import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import RequestFood from "./MyRequest"; // import the request food component

const FoodDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [food, setFood] = useState(null);

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            toast.error("You need to login first!");
            navigate("/login");
        }
    }, [user, navigate]);

    // Fetch food details
    useEffect(() => {
        const fetchFood = async () => {
            try {
                const res = await fetch(`http://localhost:3000/foods/${id}`);
                if (!res.ok) throw new Error("Food not found");
                const data = await res.json();
                setFood(data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch food details");
            }
        };
        fetchFood();
    }, [id]);

    if (!food) {
        return (
            <div className="flex justify-center mt-10 text-xl font-semibold">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
            {/* Food Image */}
            <img
                src={food.food_image}
                alt={food.food_name}
                className="w-full h-72 object-cover rounded-lg"
            />

            <h2 className="text-3xl font-bold mt-4">{food.food_name}</h2>

            {/* Donator */}
            <div className="flex items-center gap-3 mt-4">
                <img
                    src={food.donator_image}
                    alt="donor"
                    className="w-14 h-14 rounded-full"
                />
                <div>
                    <p className="text-lg font-semibold">{food.donator_name}</p>
                    <p className="text-gray-700">{food.donator_email}</p>
                </div>
            </div>

            {/* Food Info */}
            <div className="mt-5 space-y-2 text-gray-700">
                <p>
                    <b>Quantity:</b> {food.food_quantity}
                </p>
                <p>
                    <b>Pickup Location:</b> {food.pickup_location}
                </p>
                <p>
                    <b>Expire Date:</b> {new Date(food.expire_date).toLocaleDateString()}
                </p>
                <p>
                    <b>Status:</b>{" "}
                    <span
                        className={`font-semibold ${food.food_status === "Available" ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {food.food_status}
                    </span>
                </p>
            </div>

            {/* Notes */}
            <div className="mt-5">
                <h3 className="text-lg font-semibold">Additional Notes:</h3>
                <p className="text-gray-700 bg-gray-100 p-3 rounded-lg">
                    {food.notes || "No notes provided."}
                </p>
            </div>

            {/* Request Food Component */}
            {user?.email !== food.donator_email && food.food_status === "Available" && (
                <div className="mt-6">
                    <RequestFood
                        foodId={food._id}
                        foodName={food.food_name}
                        onRequestSubmitted={() => toast.success("Request submitted!")}
                    />
                </div>
            )}
        </div>
    );
};

export default FoodDetails;
