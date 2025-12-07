import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const UpdateFood = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [foodData, setFoodData] = useState({
        food_name: "",
        food_image: "",
        food_quantity: "",
        pickup_location: "",
        expire_date: "",
        notes: "",
    });

    useEffect(() => {
        fetch(`https://plate-share-server-nu.vercel.app/foods/${id}`)
            .then(res => res.json())
            .then(data => setFoodData(data))
            .catch(err => toast.error("Failed to load food data"));
    }, [id]);

    const handleChange = (e) => {
        setFoodData({ ...foodData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://plate-share-server-nu.vercel.app/foods/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(foodData),
            });
            const data = await res.json();
            if (data.modifiedCount > 0) {
                toast.success("Food updated successfully!");
                navigate("/manage-foods");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update food");
        }
    };

    if (!user) return <p className="text-center mt-10 text-[#ba692b]">Login to update food</p>;

    return (
        <div className="min-h-screen bg-[#f7efe7] flex items-center justify-center px-4">
            <Toaster />
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-[#ba692b] text-center">Update Food</h2>

                <input
                    type="text"
                    name="food_name"
                    value={foodData.food_name}
                    onChange={handleChange}
                    placeholder="Food Name"
                    required
                    className="w-full border border-[#ba692b] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#ba692b]"
                />
                <input
                    type="text"
                    name="food_image"
                    value={foodData.food_image}
                    onChange={handleChange}
                    placeholder="Food Image URL"
                    required
                    className="w-full border border-[#ba692b] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#ba692b]"
                />
                <input
                    type="text"
                    name="food_quantity"
                    value={foodData.food_quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    required
                    className="w-full border border-[#ba692b] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#ba692b]"
                />
                <input
                    type="text"
                    name="pickup_location"
                    value={foodData.pickup_location}
                    onChange={handleChange}
                    placeholder="Pickup Location"
                    required
                    className="w-full border border-[#ba692b] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#ba692b]"
                />
                <input
                    type="date"
                    name="expire_date"
                    value={foodData.expire_date?.split("T")[0] || ""}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#ba692b] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#ba692b]"
                />
                <textarea
                    name="notes"
                    value={foodData.notes}
                    onChange={handleChange}
                    placeholder="Additional Notes"
                    className="w-full border border-[#ba692b] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#ba692b]"
                />

                <button
                    type="submit"
                    className="w-full bg-[#ba692b] text-white py-3 rounded-lg font-semibold hover:bg-[#9e5630] transition"
                >
                    Update Food
                </button>
            </form>
        </div>
    );
};

export default UpdateFood;
