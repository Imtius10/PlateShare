import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { PiUserCircleCheckThin } from "react-icons/pi";
import logo from '../../assets/plateshareLogo.png';

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
                        ? "underline text-[#ba692b] font-semibold text-lg"
                        : "font-semibold text-lg text-gray-800 hover:text-[#ba692b] transition"
                }
                to="/"
            >
                Home
            </NavLink>

            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? "underline text-[#ba692b] font-semibold text-lg"
                        : "font-semibold text-lg text-gray-800 hover:text-[#ba692b] transition"
                }
                to="/availabelfood"
            >
                Available Foods
            </NavLink>

            {user && (
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? "underline text-[#ba692b] font-semibold text-lg"
                            : "font-semibold text-lg text-gray-800 hover:text-[#ba692b] transition"
                    }
                    to={`/food-request/${user.email}`}
                >
                    My Requests
                </NavLink>
            )}
        </>
    );

    return (
        <div className="navbar bg-[#fff8f0] shadow-md px-4 py-2">
            {/* LEFT SIDE */}
            <div className="navbar-start flex items-center gap-2">
                {/* MOBILE DROPDOWN */}
                <div className="dropdown lg:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="btn btn-ghost text-[#ba692b]"
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
                        <ul className="menu dropdown-content bg-[#fff8f0] rounded-box mt-3 p-2 shadow-lg w-52 flex flex-col gap-2">
                            <li>{links}</li>
                            <li>
                                {user ? (
                                    <>
                                       
                                        <NavLink to="/managefood">
                                            Manage My Food
                                        </NavLink>
                                        <NavLink to="/owner-requests">
                                            Add Food
                                        </NavLink>
                                        <button
                                            onClick={handleLogout}
                                            className="btn bg-[#ba692b] text-white w-full hover:bg-[#d88a55]"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to="/login">
                                            <button className="btn bg-[#ba692b] text-white w-full hover:bg-[#d88a55]">Login</button>
                                        </NavLink>

                                        <NavLink to="/register">
                                            <button className="btn bg-[#ba692b] text-white w-full hover:bg-[#d88a55] mt-2">
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
                <NavLink to="/" className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="logo"
                        className="h-14 w-14 rounded-full object-cover shadow-md"
                    />
                    <span className="text-2xl font-bold text-[#ba692b]">Plate Share</span>
                </NavLink>
            </div>

            {/* CENTER LINKS (DESKTOP) */}
            <div className="navbar-center hidden lg:flex gap-6">{links}</div>

            {/* RIGHT SIDE */}
            <div className="navbar-end hidden lg:flex items-center gap-3">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-12 h-12 rounded-full bg-[#ba692b] flex items-center justify-center">
                                <PiUserCircleCheckThin size={28} color="white" />
                            </div>
                        </label>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow-lg bg-[#fff8f0] rounded-box w-52 text-center"
                        >
                            <li className="font-bold text-center text-[#ba692b]">{user.displayName || "User"}</li>
                            <li>
                                <NavLink to="/managefood">
                                    Manage My Food
                                </NavLink>  
                         </li>
                            
                            <li>
                                <NavLink to="/addfoods">
                                    Add Food
                                </NavLink>
                           </li>
                            <li>
                                <NavLink to="/owner-requests">
                                    Requested Food
                                </NavLink>
                           </li>
                          
                            <li> <NavLink to="/food-request/:ownerEmail">
                                Food req owner Email
                            </NavLink></li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="btn bg-[#ba692b] text-white w-full hover:bg-[#d88a55]"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <NavLink to="/login">
                            <button className="btn bg-[#ba692b] text-white rounded-3xl hover:bg-[#d88a55]">Login</button>
                        </NavLink>

                        <NavLink to="/register">
                            <button className="btn bg-[#ba692b] text-white rounded-3xl hover:bg-[#d88a55]">Register</button>
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
