import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Login = () => {
    const { loginUser, signInWithGoogle, user, setUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        const { email, password } = formData;

        loginUser(email, password)
            .then(() => {
                toast.success("Login successful!");
                navigate(from, { replace: true });
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
                    Login to Plate Share
                </h1>

                {error && <p className="mb-4 text-red-500 text-center text-sm">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4 text-black">
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-[#ba692b] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#ba692b]"
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
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

                    <button
                        type="submit"
                        className="w-full bg-[#ba692b] text-white py-3 rounded-lg font-semibold hover:bg-[#9e5630] transition"
                    >
                        Login
                    </button>
                </form>

                <div className="flex items-center justify-center mt-4 gap-2">
                    <button
                        onClick={handleGoogleSignIn}
                        className="flex items-center gap-2 border border-gray-300 p-2 rounded-lg hover:bg-gray-100 w-full justify-center text-black"
                    >
                        <FcGoogle size={24} /> Continue with Google
                    </button>
                </div>

                <p className="text-center mt-4 text-[#ba692b] text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-semibold hover:underline">
                        Register
                    </Link>
                </p>

                <p className="text-center mt-1 text-[#ba692b] text-sm">
                    <Link to="/forgot-password" className="font-semibold hover:underline">
                        Forgot Password?
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
