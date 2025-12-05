import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { PiUserCircleCheckThin } from "react-icons/pi";

const Navbar = () => {
    const { user, setUser, doSignOut } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        doSignOut().then(() => setUser(null));
    };

    const links = (
        <>
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? "underline text-[#75d705] font-semibold text-lg"
                        : "font-semibold text-lg"
                }
                to="/"
            >
                Home
            </NavLink>

            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? "underline text-[#75d705] font-semibold text-lg"
                        : "font-semibold text-lg"
                }
                to="/available-foods"
            >
                Available Foods
            </NavLink>

            {user && (
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? "underline text-[#75d705] font-semibold text-lg"
                            : "font-semibold text-lg"
                    }
                    to="/my-requests"
                >
                    My Requests
                </NavLink>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm px-4">
            {/* LEFT SIDE */}
            <div className="navbar-start">
                {/* MOBILE DROPDOWN */}
                <div className="dropdown">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </button>

                    {menuOpen && (
                        <ul className="menu dropdown-content bg-base-100 rounded-box mt-3 p-2 shadow w-52 flex flex-col gap-2">
                            <li>{links}</li>

                            <li>
                                {user ? (
                                    <>
                                        <NavLink to="/profile">
                                            <button className="btn btn-success w-full">Profile</button>
                                        </NavLink>

                                        <button
                                            onClick={handleLogout}
                                            className="btn btn-error w-full mt-2"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to="/login">
                                            <button className="btn btn-success w-full">Login</button>
                                        </NavLink>

                                        <NavLink to="/register">
                                            <button className="btn btn-success w-full mt-2">
                                                Register
                                            </button>
                                        </NavLink>
                                    </>
                                )}
                            </li>
                        </ul>
                    )}
                </div>

                {/* LOGO */}
                <NavLink to="/" className="btn btn-ghost text-xl">
                   
                </NavLink>
            </div>

            {/* CENTER LINKS (DESKTOP) */}
            <div className="navbar-center hidden lg:flex gap-5">{links}</div>

            {/* RIGHT SIDE */}
            <div className="navbar-end hidden lg:flex items-center gap-3">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-15 rounded-full bg-green-500">
                                <PiUserCircleCheckThin size={38} color="white" />
                            </div>
                        </label>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52 text-center"
                        >
                            <li className="font-bold text-center">
                                {user.displayName || "User"}
                            </li>

                            <li>
                                <NavLink to="/profile">Profile</NavLink>
                            </li>

                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 font-semibold"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <NavLink to="/login">
                            <button className="btn btn-success rounded-3xl">Login</button>
                        </NavLink>

                        <NavLink to="/register">
                            <button className="btn btn-success rounded-3xl">Register</button>
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
