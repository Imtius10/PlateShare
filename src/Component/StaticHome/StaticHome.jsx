import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import AOS from "aos";
import "aos/dist/aos.css";


const timelineSteps = [
    {
        title: "Collect Surplus Food",
        desc: "We gather excess food from individuals, restaurants, and events instead of letting it go to waste.",
    },
    {
        title: "Verify & Store",
        desc: "Food is checked for safety and stored properly before distribution.",
    },
    {
        title: "Match With Needy People",
        desc: "We connect donors with people nearby who need the food the most.",
    },
    {
        title: "Deliver & Serve",
        desc: "Volunteers ensure the food reaches the right hands quickly.",
    },
];


const howItWorksSteps = [
    {
        title: "Post Food",
        desc: "Donors can post their surplus food using our easy-to-use platform.",
    },
    {
        title: "Find Food",
        desc: "Needy people can browse available food and request for pickup.",
    },
    {
        title: "Collect Food",
        desc: "Volunteers deliver the food safely to those in need.",
    },
];

const StaticHome = () => {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const springProps = useSpring({
        from: { transform: "scale(1)" },
        to: { transform: "scale(1.05)" },
        config: { tension: 200, friction: 12 },
    });

    return (
        <div className="w-full">
            
            <section className="py-20 bg-[#fff8f0]">
                <div className="max-w-[1200px] mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-[#ba692b] mb-16">
                        How We Help the Community
                    </h2>
                    <div className="flex flex-col gap-20 relative">
                        {timelineSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                className="relative w-full flex items-center"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                            >
                                {i % 2 === 0 ? (
                                    <>
                                        <div className="w-1/2 text-right pr-10">
                                            <h3 className="text-3xl font-bold text-[#ba692b]">{step.title}</h3>
                                            <p className="text-gray-700 text-lg">{step.desc}</p>
                                        </div>
                                        <div className="w-1/2 flex justify-start">
                                            <div className="w-8 h-8 bg-[#ba692b] rounded-full border-2 border-white shadow-md"></div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-1/2 flex justify-end">
                                            <div className="w-8 h-8 bg-[#ba692b] rounded-full border-2 border-white shadow-md"></div>
                                        </div>
                                        <div className="w-1/2 text-left pl-10">
                                            <h3 className="text-3xl font-bold text-[#ba692b]">{step.title}</h3>
                                            <p className="text-gray-700 text-lg">{step.desc}</p>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            
            <section className="py-20 bg-white">
                <div className="max-w-[1200px] mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-[#ba692b] mb-12">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {howItWorksSteps.map((step, i) => (
                            <animated.div
                                key={i}
                                style={springProps}
                                className="bg-[#fff2e6] p-8 rounded-xl shadow-lg border border-[#ba692b]/20"
                                data-aos="fade-up"
                            >
                                <h3 className="text-2xl font-bold mb-4 text-[#ba692b]">{step.title}</h3>
                                <p className="text-gray-700">{step.desc}</p>
                            </animated.div>
                        ))}
                    </div>
                </div>
            </section>

            
            <section className="py-20 bg-[#fff8f0]">
                <div className="max-w-[1200px] mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-[#ba692b] mb-12">Our Mission</h2>
                    <motion.p
                        className="text-gray-700 text-lg max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Plate Share is dedicated to reducing food waste while helping those in need. Our platform
                        connects donors with people who are hungry or vulnerable in the community, ensuring that
                        surplus food reaches the right hands quickly and safely.
                    </motion.p>
                    <div className="mt-12 grid md:grid-cols-3 gap-10">
                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md border border-[#ba692b]/20"
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-2xl font-bold text-[#ba692b] mb-2">500+</h3>
                            <p className="text-gray-700">Food Donations</p>
                        </motion.div>
                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md border border-[#ba692b]/20"
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-2xl font-bold text-[#ba692b] mb-2">1200+</h3>
                            <p className="text-gray-700">People Fed</p>
                        </motion.div>
                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md border border-[#ba692b]/20"
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-2xl font-bold text-[#ba692b] mb-2">150+</h3>
                            <p className="text-gray-700">Active Volunteers</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StaticHome;
