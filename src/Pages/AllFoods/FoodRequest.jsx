import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const MyRequest = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/my-requests?userEmail=${user.email}`)
            .then((res) => res.json())
            .then((data) => setRequests(data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [user]);

    if (!user)
        return (
            <p className="text-center mt-10 text-[#ba692b] font-semibold">
                Please login to view your requests.
            </p>
        );

    if (loading)
        return (
            <p className="text-center mt-10 text-[#ba692b] font-semibold">
                Loading your requests...
            </p>
        );

    return (
        <div className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl">
            <h2 className="text-3xl font-bold text-[#ba692b] mb-6 text-center">
                My Requests
            </h2>

            {requests.length === 0 ? (
                <p className="text-center text-gray-600">
                    You have not requested any food yet.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border border-gray-200 rounded-xl">
                        <thead className="bg-[#ffe6d6] text-[#ba692b] font-semibold">
                            <tr>
                                <th>Food Name</th>
                                <th>Owner Email</th>
                                <th>Location</th>
                                <th>Reason</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((r) => (
                                <tr
                                    key={r._id}
                                    className="hover:bg-[#fff2e6] transition-colors duration-200"
                                >
                                    <td className="font-medium">{r.foodName}</td>
                                    <td>{r.owner_email}</td>
                                    <td>{r.location}</td>
                                    <td>{r.reason}</td>
                                    <td
                                        className={
                                            r.status === "pending"
                                                ? "text-yellow-600 font-semibold"
                                                : r.status === "accepted"
                                                    ? "text-green-600 font-semibold"
                                                    : "text-red-600 font-semibold"
                                        }
                                    >
                                        {r.status}
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

export default MyRequest;
