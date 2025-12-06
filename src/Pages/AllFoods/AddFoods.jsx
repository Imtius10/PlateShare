import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const AddFoods = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        if (!user) {
            toast.error("You must be logged in!");
            return;
        }

        setLoading(true);

        try {
            // Optional image handling
            const imageUrl =
                data.foodImage && data.foodImage.length > 0
                    ? "IMAGE_LINK_WILL_BE_ADDED_LATER" // placeholder
                    : "";

            const foodInfo = {
                food_name: data.foodName,
                food_image: imageUrl,
                food_quantity: data.foodQuantity,
                pickup_location: data.pickupLocation,
                expire_date: data.expireDate,
                notes: data.notes || "",

                // Auto-filled donor info
                donator_name: user.displayName,
                donator_email: user.email,
                donator_image: user.photoURL || "",

                food_status: "Available",
                createdAt: new Date(),
            };

            const res = await fetch("http://localhost:5000/foods", {
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
            <h2 className="text-2xl font-semibold mb-4 text-center">Add Food</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Food Name */}
                <div>
                    <label className="font-medium">Food Name</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        {...register("foodName", { required: true })}
                    />
                </div>

                {/* Image Upload (optional) */}
                <div>
                    <label className="font-medium">Food Image (Optional)</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        {...register("foodImage")}
                        accept="image/*"
                    />
                </div>

                {/* Quantity */}
                <div>
                    <label className="font-medium">Food Quantity</label>
                    <input
                        type="text"
                        placeholder="Serves 2 people"
                        className="input input-bordered w-full"
                        {...register("foodQuantity", { required: true })}
                    />
                </div>

                {/* Pickup Location */}
                <div>
                    <label className="font-medium">Pickup Location</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        {...register("pickupLocation", { required: true })}
                    />
                </div>

                {/* Expire Date */}
                <div>
                    <label className="font-medium">Expire Date</label>
                    <input
                        type="date"
                        className="input input-bordered w-full"
                        {...register("expireDate", { required: true })}
                    />
                </div>

                {/* Additional Notes */}
                <div>
                    <label className="font-medium">Additional Notes</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
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
                    className="btn btn-success w-full mt-3"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Food"}
                </button>
            </form>
        </div>
    );
};

export default AddFoods;
