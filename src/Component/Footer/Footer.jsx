import React from "react";
import { FaFacebookF, FaInstagram, FaPinterest } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-white text-[#9e5720] py-10 mt-16 border-t border-[#ba692b">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

                {/* Quick Links */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-2 text-[#ba692b]">
                        <li><a href="/about" className="hover:text-[#9e5720] transition">About</a></li>
                        <li><a href="/contact" className="hover:text-[#9e5720] transition">Contact</a></li>
                        <li><a href="/privacy-policy" className="hover:text-[#9e5720] transition">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Branding */}
                <div className="flex flex-col items-center justify-center space-y-2">
                    <h1 className="text-2xl font-bold text-[#ba692b]">Plate Share</h1>
                    <p className="text-[#ba692b] max-w-sm">
                        Growing happiness, one plate at a time.
                    </p>
                </div>

                {/* Social Icons */}
                <div className="flex flex-col md:items-end items-center space-y-3">
                    <h2 className="text-lg font-semibold">Follow Us</h2>
                    <div className="flex space-x-4 text-xl text-[#ba692b]">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#9e5720] transition"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#9e5720] transition"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://www.pinterest.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#9e5720] transition"
                        >
                            <FaPinterest />
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="text-center text-[#ba692b] mt-8 border-t border-[#ba692b] pt-4">
                © 2025 Plate Share. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
