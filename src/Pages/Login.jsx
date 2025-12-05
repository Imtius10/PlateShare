import React from 'react';

const Login = () => {
    
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-green-50 to-green-200 px-5">
                <Toaster position="top-right" />
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-green-200">
                    <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
                        Login to GreenNest
                    </h1>

                   

                    <form  className="space-y-4 text-black">
                        <div>

                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                
                                required
                                className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>

                        <div className="relative">
                            <input
                               
                                name="password"
                                placeholder="Password"
                                required
                                className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <span
                                
                                className="absolute right-3 top-3 cursor-pointer text-green-600 font-semibold"
                            >
                               
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center mt-4 text-green-700 text-sm">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-green-800 font-semibold hover:underline">
                            Register
                        </Link>
                    </p>
                    <p className="text-center mt-1 text-green-700 text-sm">
                        <Link to="/forgot-password" className="hover:underline font-semibold">
                            Forgot Password?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;