import React from "react";
import { FaFacebookF, FaInstagram, FaPinterest } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-white text-green-900 py-10 mt-16 border-t border-green-200">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

                {/* Quick Links */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-2 text-green-700">
                        <li><a href="/about" className="hover:text-green-900 transition">About</a></li>
                        <li><a href="/contact" className="hover:text-green-900 transition">Contact</a></li>
                        <li><a href="/privacy-policy" className="hover:text-green-900 transition">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Branding */}
                <div className="flex flex-col items-center justify-center space-y-2">
                    <h1 className="text-2xl font-bold text-green-900">GreenNest</h1>
                    <p className="text-green-600 max-w-sm">
                        Growing happiness, one plant at a time.
                    </p>
                </div>

                {/* Social Icons */}
                <div className="flex flex-col md:items-end items-center space-y-3">
                    <h2 className="text-lg font-semibold">Follow Us</h2>
                    <div className="flex space-x-4 text-xl text-green-700">

                        <a
                            href="https://instagram.com"
                            target="_blank"
                            className="hover:text-green-900 transition"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="https://facebook.com"
                            target="_blank"
                            className="hover:text-green-900 transition"
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            href="https://www.pinterest.com"
                            target="_blank"
                            className="hover:text-green-900 transition"
                        >
                            <FaPinterest />
                        </a>

                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="text-center text-green-600 mt-8 border-t border-green-200 pt-4">
                © 2025 GreenNest. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;