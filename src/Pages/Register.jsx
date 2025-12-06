import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Register = () => {
    const { createUser, setUser, signInWithGoogle } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo_url = form.photo_url.value;

        // Password validation
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("Password must contain at least one lowercase letter");
            return;
        }

        setError("");

        createUser(email, password)
            .then((result) => {
                setUser(result.user);
                toast.success("Registered Successfully!");
                navigate("/");
            })
            .catch((err) => setError(err.message));
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((res) => {
                setUser(res.user);
                toast.success("Signed in with Google!");
                navigate("/");
            })
            .catch((err) => toast.error(err.message));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f7efe7] px-4">
            <Toaster position="top-right" />

            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-[#ba692b]">
                <h1 className="text-3xl font-bold text-center mb-6 text-[#ba692b]">
                    Create an Account
                </h1>

                {error && <p className="mb-4 text-red-500 text-center text-sm">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4 text-black">
                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        className="w-full border border-[#ba692b] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#ba692b]"
                    />

                    {/* Photo URL */}
                    <input
                        type="text"
                        name="photo_url"
                        placeholder="Photo URL"
                        required
                        className="w-full border border-[#ba692b] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#ba692b]"
                    />

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        className="w-full border border-[#ba692b] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#ba692b]"
                    />

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full border border-[#ba692b] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#ba692b]"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 cursor-pointer text-[#ba692b]"
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#ba692b] text-white py-3 rounded-lg font-semibold hover:bg-[#9e5630] transition"
                    >
                        Register
                    </button>
                </form>

                {/* Google Sign In */}
                <div className="flex items-center justify-center mt-4 gap-2">
                    <button
                        onClick={handleGoogleSignIn}
                        className="flex items-center gap-2 border border-gray-300 p-2 rounded-lg hover:bg-gray-100 w-full justify-center text-black"
                    >
                        <FcGoogle size={24} /> Continue with Google
                    </button>
                </div>

                {/* Redirect to Login */}
                <p className="text-center mt-4 text-[#ba692b] text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
