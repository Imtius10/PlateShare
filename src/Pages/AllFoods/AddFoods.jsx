import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const AddFoods = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, watch } = useForm();
    const [loading, setLoading] = useState(false);

    const imageUrl = watch("foodImageUrl"); // live preview

    const onSubmit = async (data) => {
        if (!user) {
            toast.error("You must be logged in!");
            return;
        }

        if (data.foodImageUrl && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(data.foodImageUrl)) {
            toast.error("Please enter a valid image URL");
            return;
        }

        setLoading(true);

        try {
            const foodInfo = {
                food_name: data.foodName,
                food_image: data.foodImageUrl || "",
                food_quantity: data.foodQuantity,
                pickup_location: data.pickupLocation,
                expire_date: data.expireDate,
                notes: data.notes || "",
                donator_name: user.displayName,
                donator_email: user.email,
                donator_image: user.photoURL || "",
                food_status: "Available",
                createdAt: new Date(),
            };

            const res = await fetch("http://localhost:3000/foods", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(foodInfo),
            });

            const result = await res.json();

            if (result.insertedId) {
                toast.success("Food Added Successfully!");
                reset();
            } else {
                toast.error("Failed to add food");
            }
        } catch (err) {
            toast.error("Something went wrong!");
            console.log(err);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <Toaster />
            <h2 className="text-2xl font-semibold mb-4 text-center" style={{ color: "#ba692b" }}>
                Add Food
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Food Name */}
                <div>
                    <label className="font-medium" style={{ color: "#ba692b" }}>Food Name</label>
                    <input
                        type="text"
                        className="input input-bordered w-full border-[#ba692b]"
                        {...register("foodName", { required: true })}
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="font-medium" style={{ color: "#ba692b" }}>Food Image URL (Optional)</label>
                    <input
                        type="url"
                        className="input input-bordered w-full border-[#ba692b]"
                        {...register("foodImageUrl")}
                        placeholder="https://example.com/food.jpg"
                    />
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg mt-2 border-2 border-[#ba692b]"
                        />
                    )}
                </div>

                {/* Quantity */}
                <div>
                    <label className="font-medium" style={{ color: "#ba692b" }}>Food Quantity</label>
                    <input
                        type="text"
                        placeholder="Serves 2 people"
                        className="input input-bordered w-full border-[#ba692b]"
                        {...register("foodQuantity", { required: true })}
                    />
                </div>

                {/* Pickup Location */}
                <div>
                    <label className="font-medium" style={{ color: "#ba692b" }}>Pickup Location</label>
                    <input
                        type="text"
                        className="input input-bordered w-full border-[#ba692b]"
                        {...register("pickupLocation", { required: true })}
                    />
                </div>

                {/* Expire Date */}
                <div>
                    <label className="font-medium" style={{ color: "#ba692b" }}>Expire Date</label>
                    <input
                        type="date"
                        className="input input-bordered w-full border-[#ba692b]"
                        {...register("expireDate", { required: true })}
                    />
                </div>

                {/* Additional Notes */}
                <div>
                    <label className="font-medium" style={{ color: "#ba692b" }}>Additional Notes</label>
                    <textarea
                        className="textarea textarea-bordered w-full border-[#ba692b]"
                        {...register("notes")}
                    ></textarea>
                </div>

                {/* Donor Info */}
                <div className="bg-gray-100 p-3 rounded-lg">
                    <p><b>Donor Name:</b> {user?.displayName}</p>
                    <p><b>Email:</b> {user?.email}</p>
                </div>

                <button
                    type="submit"
                    className="w-full mt-3 py-2 rounded-xl font-semibold text-white"
                    style={{ backgroundColor: "#ba692b" }}
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Food"}
                </button>
            </form>
        </div>
    );
};

export default AddFoods;
