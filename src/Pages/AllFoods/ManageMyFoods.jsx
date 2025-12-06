import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const ManageMyFoods = () => {
    const { user } = useContext(AuthContext);
    const [myFoods, setMyFoods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/foods?donator_email=${user.email}`)
                .then(res => res.json())
                .then(data => setMyFoods(data))
                .catch(err => console.log(err));
        }
    }, [user]);

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this food?");
        if (!confirm) return;

        try {
            const res = await fetch(`http://localhost:3000/foods/${id}`, {
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
    };

    const handleUpdate = (id) => {
        // Navigate to update page
        navigate(`/update-food/${id}`);
    };

    if (!user) {
        return (
            <div className="text-center mt-10 text-xl font-semibold">
                You must be logged in to manage your foods.
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center mb-6">
                My Foods
            </h2>

            {myFoods.length === 0 && (
                <p className="text-center text-gray-600 mt-10">
                    You have not added any foods yet.
                </p>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myFoods.map(food => (
                    <div key={food._id} className="card bg-white shadow-lg rounded-xl overflow-hidden">
                        <img
                            src={food.food_image}
                            alt={food.food_name}
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{food.food_name}</h3>
                            <p className="mt-2 text-gray-700"><b>Quantity:</b> {food.food_quantity}</p>
                            <p className="text-gray-700"><b>Pickup Location:</b> {food.pickup_location}</p>
                            <p className="text-gray-700"><b>Expire Date:</b> {food.expire_date}</p>

                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => handleUpdate(food._id)}
                                    className="btn btn-primary flex-1"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(food._id)}
                                    className="btn btn-error flex-1"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageMyFoods;
