import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import FoodRequestsTable from "./FoodRequestsTable";
import toast, { Toaster } from "react-hot-toast";
import { Commet } from "react-loading-indicators";

const FoodDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       
        fetch(`https://plate-share-server-nu.vercel.app/foods/${id}`)
            .then((res) => res.json())
            .then((data) => setFood(data))
            .catch((err) => {
                console.log(err);
                toast.error("Failed to fetch food details");
            })
            .finally(() => setLoading(false));
    }, [id,loading]);

    if (loading) {
        return <div className='flex justify-center items-center mx-auto min-h-full min-w-full'><Commet color={["#673a18", "#915221", "#ba692b", "#d48244"]} /></div>
    }
    if (!food)
        return <p className="text-center mt-10 text-[#ba692b] font-semibold">Food not found</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl">
            <Toaster />
            {/* Food Image */}
            <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                    src={food.food_image}
                    alt={food.food_name}
                    className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* Food Info */}
            <div className="mt-5">
                <h2 className="text-3xl font-bold text-[#ba692b]">{food.food_name}</h2>
                <div className="mt-3 space-y-1 text-gray-700">
                    <p><span className="font-semibold">Quantity:</span> {food.food_quantity}</p>
                    <p><span className="font-semibold">Pickup Location:</span> {food.pickup_location}</p>
                    <p><span className="font-semibold">Expire Date:</span> {new Date(food.expire_date).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Status:</span> <span className={`font-bold ${food.status === "Available" ? "text-green-600" : "text-red-600"}`}>{food.status || "Pending"}</span></p>
                    <p className="mt-3 bg-[#fff2e6] text-[#ba692b] p-3 rounded-lg">{food.notes || "No additional notes."}</p>
                </div>
            </div>

            {/* Food Requests Table (Owner Only) */}
            {user?.email === food.donator_email && (
                <div className="mt-8">
                    <h3 className="text-2xl font-bold text-[#ba692b] mb-4">Food Requests</h3>
                    <FoodRequestsTable foodId={food._id} ownerEmail={food.donator_email} currentUserEmail={user?.email} />
                </div>
            )}
        </div>
    );
};

export default FoodDetails;
