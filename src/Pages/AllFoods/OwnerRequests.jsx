import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { Commet } from "react-loading-indicators";

const OwnerRequests = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        if (!user?.email) return;

        // Fetch requests for foods that belong to this owner
        fetch(`https://plate-share-server-nu.vercel.app/foods?donator_email=${user.email}`)
            .then(res => res.json())
            .then(async (foods) => {
                const allRequests = [];
                for (const food of foods) {
                    const res = await fetch(`https://plate-share-server-nu.vercel.app/requests/food/${food._id}`);
                    const data = await res.json();
                    allRequests.push(...data.map(r => ({ ...r, foodName: food.food_name })));
                }
                setRequests(allRequests);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [user]);

    const handleStatusChange = async (id, status) => {
        try {
            const res = await fetch(`https://plate-share-server-nu.vercel.app/requests/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (data.modifiedCount > 0) {
                setRequests(prev =>
                    prev.map(r => r._id === id ? { ...r, status } : r)
                );
                toast.success(`Request ${status}!`);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update request");
        }
    };

    if (!user) return <p className="text-center mt-10 text-[#ba692b] font-semibold">Please login to see requests.</p>;
    if (loading) {
        return <div className='flex justify-center items-center mx-auto min-h-full min-w-full'><Commet color={["#673a18", "#915221", "#ba692b", "#d48244"]} /></div>
    }

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
            <Toaster />
            <h2 className="text-3xl font-bold text-[#ba692b] mb-6 text-center">Food Requests</h2>

            {requests.length === 0 ? (
                <p className="text-center text-gray-600 mt-10">No requests yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-[#ba692b]">
                                <th>Food Name</th>
                                <th>Requester Name</th>
                                <th>Email</th>
                                <th>Location</th>
                                <th>Contact</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(req => (
                                <tr key={req._id}>
                                    <td>{req.foodName}</td>
                                    <td>{req.requester_name}</td>
                                    <td>{req.userEmail}</td>
                                    <td>{req.location}</td>
                                    <td>{req.contact_no}</td>
                                    <td>{req.reason}</td>
                                    <td className={`font-semibold ${req.status === "pending"
                                            ? "text-yellow-600"
                                            : req.status === "accepted"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}>
                                        {req.status}
                                    </td>
                                    <td>
                                        {req.status === "pending" ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleStatusChange(req._id, "accepted")}
                                                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(req._id, "rejected")}
                                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-500">Completed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OwnerRequests;
