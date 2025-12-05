import React, { useState } from "react";
import { Link } from "react-router";
import { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-200 via-orange-50 to-orange-100 px-5">

            <Toaster position="top-right" />

            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-[#fab158]">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Create an Account
                </h1>

                <form className="space-y-4 text-black">

                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Full Name"
                        required
                        className="w-full border border-[#fab158] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    {/* Photo URL */}
                    <input
                        type="text"
                        name="photo_url"
                        placeholder="Photo URL"
                        required
                        className="w-full border border-[#fab158] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        className="w-full border border-[#fab158] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full border border-[#fab158] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />

                        {/* Eye Toggle */}
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 cursor-pointer text-[#fab158] font-semibold"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-full text-white py-3 rounded-lg font-semibold transition"
                    >
                        Register
                    </button>
                </form>

                {/* Google Login */}
                <div className="flex items-center justify-center mt-4 gap-2">
                    <button
                        className="flex items-center gap-2 border border-gray-300 p-2 rounded-lg hover:bg-gray-100 w-full justify-center text-black"
                    >
                        <FcGoogle size={24} /> <p>Continue with Google</p>
                    </button>
                </div>

                {/* Redirect to Login */}
                <p className="text-center mt-4 text-[#fab158] text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#fab158] font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
