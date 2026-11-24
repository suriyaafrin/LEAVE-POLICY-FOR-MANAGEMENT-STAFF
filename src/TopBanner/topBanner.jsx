
import React from "react";
import topImg from "../TopbBannerImg/topImg.svg";
import { useNavigate } from "react-router";

const TopBanner = () => {
    const navigate = useNavigate();

    const handleExplore = () => {
        navigate("/dashboard");
    };

    return (
        <section className="relative w-full min-h-screen rounded-2xl overflow-hidden bg-[#EAF3FF]">

            {/* Banner Image */}
            <img
                src={topImg}
                alt="Leave management illustration"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Banner Content */}
            <div className="relative z-10 min-h-screen w-full p-8 md:p-12 flex flex-col justify-center items-start gap-4">

                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 leading-tight max-w-lg">
                    Simplify your leave management
                </h1>

                <p className="text-gray-600 text-base leading-7 max-w-md">
                    Manage leave requests, track balances, and stay updated
                    — all in one place.
                </p>

                {/* Explore Button */}
                <button
                    type="button"
                    onClick={handleExplore}
                    className="px-6 py-3 bg-blue-900 text-white rounded-xl font-medium hover:bg-blue-800 transition duration-200 cursor-pointer"
                >
                    Explore Leave Policy
                </button>

            </div>
        </section>
    );
};

export default TopBanner;
