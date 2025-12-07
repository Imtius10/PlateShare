import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Commet } from "react-loading-indicators";

const MyRequest = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    
    

    useEffect(() => {
       

        if (!user) return;

        fetch(`https://plate-share-server-nu.vercel.app/my-requests?userEmail=${user.email}`)
            .then(res => res.json())
            .then(data => setRequests(data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [user,loading]);

    if (!user) return <p className="text-center mt-10 text-lg font-semibold text-[#ba692b]">Please login to view your requests.</p>;
    if (loading) {
        return <div className='flex justify-center items-center mx-auto min-h-full min-w-full'><Commet color={["#673a18", "#915221", "#ba692b", "#d48244"]} /></div>
    }

    const statusColor = (status) => {
        if (status === "pending") return "text-yellow-600";
        if (status === "accepted") return "text-green-600";
        if (status === "rejected") return "text-red-600";
        return "text-gray-600";
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-[#ba692b] text-center">My Food Requests</h2>
            {requests.length === 0 ? (
                <p className="text-center text-gray-600 mt-10">You haven't requested any food yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border border-gray-200">
                        <thead className="bg-[#f3e4da]">
                            <tr>
                                <th className="text-left">Food Name</th>
                                <th className="text-left">Status</th>
                                <th className="text-left">Requested On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(r => (
                                <tr key={r._id} className="hover:bg-gray-50 transition">
                                    <td>{r.foodName}</td>
                                    <td className={`font-semibold ${statusColor(r.status)}`}>{r.status}</td>
                                    <td>{new Date(r.createdAt).toLocaleString()}</td>
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
