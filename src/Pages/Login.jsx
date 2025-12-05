import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaEyeSlash } from "react-icons/fa"
import { FaEye } from "react-icons/fa";
const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const { loginUser, signInWithGoogle,user,setUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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
            .catch((err) => {
                setError(err.message);
            });
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
        <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-orange-200-100 via-orange-50 to-orange-100 px-5">

            <Toaster position="top-right" />

            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-green-200">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Login to GreenNest
                </h1>
                {error && <p className="mb-4 text-red-500 text-center text-sm">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4 text-black">
                    <div>

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}        
                            onChange={handleChange}          
                            required
                            className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />

                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 cursor-pointer text-green-600 font-semibold"
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                        Login
                    </button>
                </form>
                   <div className="flex items-center justify-center mt-4 gap-2">
                                      <button 
                                          onClick={handleGoogleSignIn}
                                          className="flex items-center gap-2 border border-gray-300 p-2 rounded-lg hover:bg-gray-100 w-full justify-center text-black"
                                      >
                                          <FcGoogle size={24} /> <p>Continue with Google</p>
                                      </button>
                                  </div>
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
