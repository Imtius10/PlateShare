import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const MyRequest = ({ foodId, foodName, onRequestSubmitted }) => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        if (!user) {
            toast.error("You must be logged in to request food!");
            return;
        }

        setLoading(true);

        const requestData = {
            foodId,
            foodName,
            requester_name: user.displayName,
            requester_email: user.email,
            requester_photo: user.photoURL || "",
            location: data.location,
            reason: data.reason,
            contact_no: data.contactNo,
            status: "pending",
            createdAt: new Date(),
        };

        try {
            const res = await fetch("http://localhost:3000/food-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });
            const result = await res.json();

            if (result.insertedId) {
                toast.success("Food request submitted!");
                reset();
                setModalOpen(false);
                if (onRequestSubmitted) onRequestSubmitted(); // callback for parent
            } else {
                toast.error("Failed to submit request.");
            }
        } catch (err) {
            toast.error("Something went wrong!");
            console.log(err);
        }

        setLoading(false);
    };

    return (
        <>
            <Toaster />
            <button
                className="btn btn-primary"
                onClick={() => setModalOpen(true)}
            >
                Request Food
            </button>

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 relative">
                        <button
                            className="absolute top-2 right-2 btn btn-sm btn-circle"
                            onClick={() => setModalOpen(false)}
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-semibold mb-4">Request Food</h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            <div>
                                <label className="font-medium">Location</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    {...register("location", { required: true })}
                                />
                            </div>
                            <div>
                                <label className="font-medium">Why Need Food</label>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    {...register("reason", { required: true })}
                                ></textarea>
                            </div>
                            <div>
                                <label className="font-medium">Contact No.</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    {...register("contactNo", { required: true })}
                                />
                            </div>
                            <button
                                type="submit"
                                className={`btn btn-success w-full ${loading ? "loading" : ""}`}
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit Request"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyRequest;
