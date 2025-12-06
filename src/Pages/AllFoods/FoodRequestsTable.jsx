import React, { useEffect, useState } from "react";
import axios from "axios";

const FoodRequestsTable = ({ foodId, ownerEmail, currentUserEmail }) => {
    const [requests, setRequests] = useState([]);
    const isOwner = ownerEmail === currentUserEmail;

    useEffect(() => {
        axios.get(`http://localhost:3000/requests/food/${foodId}`)
            .then(res => setRequests(res.data))
            .catch(err => console.log(err));
    }, [foodId]);

    const handleAccept = async (reqId) => {
        await axios.patch(`http://localhost:3000/food-requests/${reqId}`, { status: "accepted" });
        await axios.patch(`http://localhost:3000/foods/${foodId}`, { status: "donated" });

        setRequests(prev => prev.map(r => r._id === reqId ? { ...r, status: "accepted" } : r));
    };

    const handleReject = async (reqId) => {
        await axios.patch(`http://localhost:3000/food-requests/${reqId}`, { status: "rejected" });
        setRequests(prev => prev.map(r => r._id === reqId ? { ...r, status: "rejected" } : r));
    };

    if (!isOwner) return null;

    return (
        <div className="mt-10 p-6 border rounded-2xl shadow-lg bg-white max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-[#ba692b] text-center">Food Requests</h2>

            {requests.length === 0 ? (
                <p className="text-center text-gray-600">No requests yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border border-gray-200 rounded-xl">
                        <thead className="bg-[#ffe6d6] text-[#ba692b] font-semibold">
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
                                <tr key={req._id} className="hover:bg-[#fff2e6] transition-colors duration-200">
                                    <td className="font-medium">{req.requester_name}</td>
                                    <td>{req.requester_email}</td>
                                    <td>{req.location}</td>
                                    <td>{req.contact_no}</td>
                                    <td>{req.reason}</td>
                                    <td
                                        className={`font-semibold ${req.status === "pending"
                                                ? "text-yellow-600"
                                                : req.status === "accepted"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                    >
                                        {req.status}
                                    </td>
                                    <td>
                                        {req.status === "pending" ? (
                                            <div className="flex gap-2 justify-center">
                                                <button
                                                    onClick={() => handleAccept(req._id)}
                                                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleReject(req._id)}
                                                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-500 font-medium">Completed</span>
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

export default FoodRequestsTable;
