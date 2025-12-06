import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const FoodRequest = ({ food }) => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [requests, setRequests] = useState([]);
    const [loadingRequests, setLoadingRequests] = useState(true);

    // Fetch requests for this food (only food owner)
    useEffect(() => {
        if (!food || !user) return; // wait until food & user exist

        if (user?.email === food?.donator_email) {
            setLoadingRequests(true);
            fetch(`http://localhost:3000/requests?foodId=${food._id}`)
                .then((res) => res.json())
                .then((data) => setRequests(data))
                .catch((err) => console.log(err))
                .finally(() => setLoadingRequests(false));
        }
    }, [food, user]);

    const onRequestSubmit = async (data) => {
        if (!user) {
            toast.error("You must be logged in!");
            return;
        }
        if (!food?._id) {
            toast.error("Food data not loaded yet!");
            return;
        }

        const requestData = {
            foodId: food._id,
            foodName: food.food_name,
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
            } else {
                toast.error("Failed to submit request.");
            }
        } catch (err) {
            toast.error("Something went wrong!");
            console.log(err);
        }
    };

    const handleRequestAction = async (requestId, action) => {
        try {
            // Update request status
            await fetch(`http://localhost:3000/food-requests/${requestId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: action === "accept" ? "accepted" : "rejected",
                }),
            });

            // If accepted, update food status to donated
            if (action === "accept") {
                await fetch(`http://localhost:3000/foods/${food._id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ food_status: "donated" }),
                });
            }

            // Update local requests state
            setRequests((prev) =>
                prev.map((r) =>
                    r._id === requestId
                        ? { ...r, status: action === "accept" ? "accepted" : "rejected" }
                        : r
                )
            );

            toast.success(`Request ${action === "accept" ? "Accepted" : "Rejected"}`);
        } catch (err) {
            toast.error("Action failed");
            console.log(err);
        }
    };

    if (!food) return <p>Loading food details...</p>; // wait until food is loaded

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Toaster />
            <div className="bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-2">{food?.food_name}</h2>
                <p><b>Quantity:</b> {food?.food_quantity}</p>
                <p><b>Pickup Location:</b> {food?.pickup_location}</p>
                <p><b>Expire Date:</b> {new Date(food?.expire_date).toLocaleDateString()}</p>
                <p><b>Status:</b> {food?.food_status}</p>

                {/* Request Food Button */}
                {user && user?.email !== food?.donator_email && (
                    <button
                        className="btn btn-primary mt-4"
                        onClick={() => setModalOpen(true)}
                    >
                        Request Food
                    </button>
                )}
            </div>

            {/* Request Modal */}
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

                        <form
                            onSubmit={handleSubmit(onRequestSubmit)}
                            className="space-y-3"
                        >
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
                            <button type="submit" className="btn btn-success w-full">
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Food Requests Table (Only for food owner) */}
            {user?.email === food?.donator_email && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Food Requests</h3>
                    {loadingRequests ? (
                        <p>Loading requests...</p>
                    ) : requests.length === 0 ? (
                        <p>No requests yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>Requester</th>
                                        <th>Location</th>
                                        <th>Reason</th>
                                        <th>Contact</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((req) => (
                                        <tr key={req._id}>
                                            <td>
                                                <div className="flex items-center space-x-2">
                                                    {req.requester_photo && (
                                                        <img
                                                            src={req.requester_photo}
                                                            alt=""
                                                            className="w-8 h-8 rounded-full"
                                                        />
                                                    )}
                                                    <span>{req.requester_name}</span>
                                                </div>
                                            </td>
                                            <td>{req.location}</td>
                                            <td>{req.reason}</td>
                                            <td>{req.contact_no}</td>
                                            <td>{req.status}</td>
                                            <td>
                                                {req.status === "pending" ? (
                                                    <div className="flex gap-2">
                                                        <button
                                                            className="btn btn-sm btn-success"
                                                            onClick={() =>
                                                                handleRequestAction(req._id, "accept")
                                                            }
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-error"
                                                            onClick={() =>
                                                                handleRequestAction(req._id, "reject")
                                                            }
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="font-medium">{req.status}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FoodRequest;
