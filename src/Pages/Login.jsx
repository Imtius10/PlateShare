import React, { useState } from "react";
import { Link } from "react-router";
import { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
    const [showPass, setShowPass] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-orange-200-100 via-orange-50 to-orange-100 px-5">

            <Toaster position="top-right" />

            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-green-200">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Login to GreenNest
                </h1>

                <form className="space-y-4 text-black">

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            required
                            className="w-full border border-[#fab158] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPass ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full border border-[#fab158] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />

                        {/* Eye Toggle */}
                        <span
                            className="absolute right-3 top-3 cursor-pointer text-[#fab158]"
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-full text-white py-3 rounded-lg font-semibold  transition"
                    >
                        Login
                    </button>
                    <div className="flex items-center justify-center mt-4 gap-2">
                        <button
                            className="flex items-center gap-2 border border-gray-300 p-2 rounded-lg hover:bg-gray-100 w-full justify-center text-black"
                        >
                            <FcGoogle size={24} /> <p>Continue with Google</p>
                        </button>
                    </div>
                </form>

                {/* Links */}
                <p className="text-center mt-4 text-[#fab158] text-sm">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-[#fab158] font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </p>

                <p className="text-center mt-1 text-[#fab158] text-sm">
                    <Link
                        to="/forgot-password"
                        className="hover:underline font-semibold"
                    >
                        Forgot Password?
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
