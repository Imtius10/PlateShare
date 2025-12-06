import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FoodRequestsTable = ({ foodId, ownerEmail, currentUserEmail }) => {
    const [requests, setRequests] = useState([]);
    const isOwner = ownerEmail === currentUserEmail;

    useEffect(() => {
        if (!isOwner) return;

        fetch(`http://localhost:3000/requests/food/${foodId}`)
            .then(res => res.json())
            .then(data => setRequests(data))
            .catch(err => console.error(err));
    }, [foodId, isOwner]);

    const handleAccept = async (reqId) => {
        try {
            // Update request status
            await fetch(`http://localhost:3000/requests/${reqId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "accepted" }),
            });

            // Update food status
            await fetch(`http://localhost:3000/foods/${foodId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "donated" }),
            });

            // Update state locally
            setRequests(prev => prev.map(r => r._id === reqId ? { ...r, status: "accepted" } : r));
            toast.success("Request accepted and food marked as donated!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to accept request");
        }
    };

    const handleReject = async (reqId) => {
        try {
            await fetch(`http://localhost:3000/requests/${reqId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "rejected" }),
            });

            setRequests(prev => prev.map(r => r._id === reqId ? { ...r, status: "rejected" } : r));
            toast.success("Request rejected!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to reject request");
        }
    };

    if (!isOwner) return null;

    return (
        <div className="mt-10 p-5 border rounded-xl shadow bg-white">
            <h2 className="text-2xl font-bold mb-4 text-[#ba692b]">Food Requests</h2>
            {requests.length === 0 ? (
                <p>No requests yet.</p>
            ) : (
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
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
                                <td>{req.requester_name}</td>
                                <td>{req.requester_email}</td>
                                <td>{req.location}</td>
                                <td>{req.contact_no}</td>
                                <td>{req.reason}</td>
                                <td
                                    className={
                                        req.status === "pending"
                                            ? "text-yellow-600 font-semibold"
                                            : req.status === "accepted"
                                                ? "text-green-600 font-semibold"
                                                : "text-red-600 font-semibold"
                                    }
                                >
                                    {req.status}
                                </td>
                                <td>
                                    {req.status === "pending" ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleAccept(req._id)}
                                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleReject(req._id)}
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
            )}
        </div>
    );
};

export default FoodRequestsTable;
