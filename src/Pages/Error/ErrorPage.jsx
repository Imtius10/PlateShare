import React from "react";
import { Link } from "react-router";
import { FaSadTear } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7efe7] px-4 text-center">
            {/* Sad Icons */}
            <div className="text-9xl mb-6 text-[#ba692b] flex items-center justify-center gap-4">
                <FaSadTear />
                <MdErrorOutline />
            </div>

            {/* Error Text */}
            <h1 className="text-4xl font-bold mb-4" style={{ color: "#ba692b" }}>
                Oops! Something went wrong.
            </h1>
            <p className="text-lg text-gray-700 mb-8">
                We couldn’t find what you were looking for, or an unexpected error occurred.
            </p>

           
            <Link
                to="/"
                className="px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition"
                style={{ backgroundColor: "#ba692b" }}
            >
                Go Back Home
            </Link>

            {/* Optional extra message */}
            <p className="mt-6 text-gray-500">
                If the problem persists, please contact support.
            </p>
        </div>
    );
};

export default ErrorPage;
