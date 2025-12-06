import React from "react";
import { motion } from "framer-motion";

const steps = [
    {
        title: "Collect Surplus Food",
        desc: "We gather excess food from individuals, restaurants, and events instead of letting it go to waste."
    },
    {
        title: "Verify & Store",
        desc: "Food is checked for safety and stored properly before distribution."
    },
    {
        title: "Match With Needy People",
        desc: "We connect donors with people nearby who need the food the most."
    },
    {
        title: "Deliver & Serve",
        desc: "Volunteers ensure the food reaches the right hands quickly."
    }
];

const Timeline = () => {
    return (
        <div className="relative w-full py-20 flex justify-center">
            <div className="relative w-full max-w-[1200px]">
                <div className="flex flex-col gap-20 relative">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            className="relative w-full flex items-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            
                            {i % 2 === 0 && (
                                <>
                                    <div className="w-1/2 text-right pr-10">
                                        <h3 className="text-3xl font-bold text-green-700">{step.title}</h3>
                                        <p className="text-gray-600 text-lg">{step.desc}</p>
                                    </div>
                                    <div className="w-1/2 flex justify-start">
                                        
                                    </div>
                                </>
                            )}

                          
                            {i % 2 === 1 && (
                                <>
                                    <div className="w-1/2 flex justify-end">
                                      
                                    </div>
                                    <div className="w-1/2 text-left pl-10">
                                        <h3 className="text-3xl font-bold text-plateShare">{step.title}</h3>
                                        <p className="text-gray-600 text-lg">{step.desc}</p>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
