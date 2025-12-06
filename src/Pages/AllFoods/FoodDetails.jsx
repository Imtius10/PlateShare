import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import FoodRequestsTable from "./FoodRequestsTable";
import toast, { Toaster } from "react-hot-toast";

const FoodDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [requestData, setRequestData] = useState({
        location: "",
        reason: "",
        contact_no: "",
    });

    useEffect(() => {
        fetch(`http://localhost:3000/foods/${id}`)
            .then(res => res.json())
            .then(data => setFood(data))
            .catch(err => {
                console.log(err);
                toast.error("Failed to fetch food details");
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        setRequestData({ ...requestData, [e.target.name]: e.target.value });
    };

    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("You must be logged in to request food!");
            return;
        }

        const payload = {
            foodId: food._id,
            foodName: food.food_name,
            userEmail: user.email,
            requester_name: user.displayName,
            requester_photo: user.photoURL,
            location: requestData.location,
            reason: requestData.reason,
            contact_no: requestData.contact_no,
            status: "pending",
            createdAt: new Date(),
        };

        try {
            const res = await fetch("http://localhost:3000/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.insertedId) {
                toast.success("Food request submitted!");
                setShowModal(false);
                setRequestData({ location: "", reason: "", contact_no: "" });
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit request");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading food details...</p>;
    if (!food) return <p className="text-center mt-10">Food not found</p>;

    const isOwner = user?.email === food.donator_email;

    return (
        <div className="min-h-screen bg-[#f7efe7] py-10">
            <Toaster />
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
                <img
                    src={food.food_image}
                    alt={food.food_name}
                    className="w-full h-72 object-cover rounded-lg"
                />
                <h2 className="text-3xl font-bold mt-4 text-[#ba692b]">{food.food_name}</h2>
                <p><b>Quantity:</b> {food.food_quantity}</p>
                <p><b>Pickup Location:</b> {food.pickup_location}</p>
                <p><b>Expire Date:</b> {new Date(food.expire_date).toLocaleDateString()}</p>
                <p><b>Status:</b> {food.status || "pending"}</p>
                <p className="mt-3 bg-gray-100 p-3 rounded-lg">{food.notes || "No additional notes."}</p>

                {/* Request Button (Not owner) */}
                {!isOwner && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-5 w-full bg-[#ba692b] text-white py-3 rounded-lg font-semibold hover:bg-[#9e5630] transition"
                    >
                        Request Food
                    </button>
                )}

                {/* Food Requests Table (Owner only) */}
                {isOwner && (
                    <FoodRequestsTable
                        foodId={food._id}
                        ownerEmail={food.donator_email}
                        currentUserEmail={user?.email}
                    />
                )}
            </div>

            {/* Request Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-[#ba692b] font-bold text-xl"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-[#ba692b]">Request Food</h2>
                        <form className="space-y-3" onSubmit={handleRequestSubmit}>
                            <input
                                type="text"
                                name="location"
                                value={requestData.location}
                                onChange={handleChange}
                                placeholder="Your Location"
                                required
                                className="w-full border border-[#ba692b] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#ba692b]"
                            />
                            <textarea
                                name="reason"
                                value={requestData.reason}
                                onChange={handleChange}
                                placeholder="Why do you need this food?"
                                required
                                rows={3}
                                className="w-full border border-[#ba692b] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#ba692b]"
                            />
                            <input
                                type="text"
                                name="contact_no"
                                value={requestData.contact_no}
                                onChange={handleChange}
                                placeholder="Contact Number"
                                required
                                className="w-full border border-[#ba692b] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#ba692b]"
                            />
                            <button
                                type="submit"
                                className="w-full bg-[#ba692b] text-white py-3 rounded-lg font-semibold hover:bg-[#9e5630] transition"
                            >
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodDetails;
