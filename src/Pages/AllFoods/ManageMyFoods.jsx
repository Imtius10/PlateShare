import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageMyFoods = () => {
    const { user } = useContext(AuthContext);
    const [myFoods, setMyFoods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email) return;

        fetch(`https://plate-share-server-nu.vercel.app/foods?donator_email=${user.email}`)
            .then(res => res.json())
            .then(data => setMyFoods(data))
            .catch(err => console.log(err));
    }, [user]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ba692b",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`https://plate-share-server-nu.vercel.app/foods/${id}`, {
                    method: "DELETE",
                });
                const data = await res.json();

                if (data.deletedCount > 0) {
                    toast.success("Food deleted successfully!");
                    setMyFoods(prev => prev.filter(food => food._id !== id));
                } else {
                    toast.error("Failed to delete food.");
                }
            } catch (err) {
                console.error(err);
                toast.error("Error deleting food.");
            }
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update-food/${id}`);
    };

    if (!user) {
        return (
            <div className="text-center mt-10 text-xl font-semibold text-[#ba692b]">
                You must be logged in to manage your foods.
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#ba692b]">My Foods</h2>

            {myFoods.length === 0 ? (
                <p className="text-center text-gray-600 mt-10">
                    You have not added any foods yet.
                </p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myFoods.map(food => (
                        <div key={food._id} className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                            <img
                                src={food.food_image}
                                alt={food.food_name}
                                className="h-48 w-full object-cover rounded-t-2xl"
                            />
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-[#ba692b]">{food.food_name}</h3>
                                <p className="mt-2 text-gray-700"><b>Quantity:</b> {food.food_quantity}</p>
                                <p className="text-gray-700"><b>Pickup Location:</b> {food.pickup_location}</p>
                                <p className="text-gray-700"><b>Expire Date:</b> {new Date(food.expire_date).toLocaleDateString()}</p>

                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => handleUpdate(food._id)}
                                        className="flex-1 px-4 py-2 bg-[#ba692b] text-white rounded-lg hover:bg-[#a35a24] transition"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(food._id)}
                                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageMyFoods;
