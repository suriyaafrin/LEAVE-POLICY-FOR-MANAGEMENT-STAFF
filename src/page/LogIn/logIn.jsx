
import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, Lock } from "lucide-react";

const LoginPage = ({ role }) => {
    const navigate = useNavigate();

    const isHR = role === "hr";

    return (
        <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center p-5">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-900 transition mb-8"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                {/* Logo / Brand */}
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-900 font-bold text-xl mb-5">
                    S
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900">
                    {isHR ? "HR Login" : "Employee Login"}
                </h1>

                <p className="text-gray-500 text-sm mt-2 mb-8">
                    {isHR
                        ? "Sign in to manage employees and leave requests."
                        : "Sign in to apply for leave and check your leave balance."}
                </p>

                {/* Login Form */}
                <form className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>

                        <div className="flex items-center border border-gray-200 rounded-xl px-4 focus-within:border-blue-500 transition">
                            <Mail size={18} className="text-gray-400" />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full py-3 px-3 outline-none text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <div className="flex items-center border border-gray-200 rounded-xl px-4 focus-within:border-blue-500 transition">
                            <Lock size={18} className="text-gray-400" />

                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full py-3 px-3 outline-none text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="text-sm text-blue-900 font-medium hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-blue-900 text-white font-medium hover:bg-blue-800 transition"
                    >
                        Sign In
                    </button>

                </form>

                <p className="text-center text-xs text-gray-400 mt-8">
                    © 2026 Selopia Leave. All rights reserved.
                </p>

            </div>
        </div>
    );
};

export default LoginPage;
