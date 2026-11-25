
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import logo from "../logo/logo.svg";

import {
    Bell,
    Languages,
    Mail,
    Moon,
    Search,
    UserRound,
    Menu,
    ChevronDown,
    LayoutDashboard,
    Users
} from "lucide-react";

const Index = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    // Current role check
    const isHRDashboard = location.pathname.startsWith("/hr");
    const currentRole = isHRDashboard ? "hr" : "employee";

    const currentDashboard = isHRDashboard
        ? "HR Dashboard"
        : "Employee Dashboard";

    // Dashboard switching
    const handleDashboardChange = (path) => {
        navigate(path);
        setIsDashboardOpen(false);
    };

    // Page titles
    const pageTitle = {
        "/": "Home",

        "/hr/dashboard": "HR Dashboard",
        "/hr/leave-history": "Leave History",
        "/hr/explore-leave": "Explore Leave",

        "/employee/dashboard": "Employee Dashboard",
        "/employee/employees": "Employees",
        "/employee/leave-history": "Leave History",
        "/employee/explore-leave": "Explore Leave",

        "/leave-application": "Leave Application",

        "/hr-login": "HR Login",
        "/employee-login": "Employee Login"
    };

    // Sidebar menu
    const sidebarMenu = [
        {
            name: "Dashboard",
            path: isHRDashboard
                ? "/hr/dashboard"
                : "/employee/dashboard"
        },
        {
            name: "Employees",
            path: "/employee/employees"
        },
        {
            name: "Leave History",
            path: isHRDashboard
                ? "/hr/leave-history"
                : "/employee/leave-history"
        },
        {
            name: "Explore Leave",
            path: isHRDashboard
                ? "/hr/explore-leave"
                : "/employee/explore-leave"
        }
    ];

    // Sidebar navigation
    const handleSidebarNavigation = (item) => {
        navigate(item.path);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Left Sidebar */}
            <aside
                className={`bg-white min-h-screen overflow-hidden flex-shrink-0 transition-all duration-300 ease-in-out ${
                    isSidebarOpen
                        ? "w-64 p-5 border-r border-gray-200"
                        : "w-0 p-0 border-r-0"
                }`}
            >
                {/* Logo */}
                <div className="pb-5 mb-5 border-b border-gray-200">
                    <img
                        src={logo}
                        alt="Selopia Leave"
                        className="w-44 h-auto"
                    />
                </div>

                {/* Sidebar Menu */}
                <nav className="flex flex-col gap-2">
                    {sidebarMenu.map((item) => {
                        const isActive =
                            location.pathname === item.path;

                        return (
                            <button
                                key={item.name}
                                onClick={() =>
                                    handleSidebarNavigation(item)
                                }
                                className={`p-3 text-left rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? "bg-blue-900 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {item.name}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Right Side */}
            <div className="flex-1 min-w-0">

                {/* Top Header */}
                <header className="min-h-16 bg-white border-b border-gray-200 flex items-center justify-between px-5 gap-4">

                    {/* Left Header */}
                    <div className="flex items-center gap-3">

                        {/* Sidebar Toggle */}
                        <button
                            onClick={() =>
                                setIsSidebarOpen(!isSidebarOpen)
                            }
                            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
                            title="Toggle Sidebar"
                        >
                            <Menu size={20} />
                        </button>

                        {/* Dashboard Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsDashboardOpen(!isDashboardOpen)
                                }
                                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                            >
                                <LayoutDashboard size={18} />

                                <span className="text-sm font-semibold">
                                    {currentDashboard}
                                </span>

                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${
                                        isDashboardOpen
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />
                            </button>

                            {/* Dropdown Options */}
                            {isDashboardOpen && (
                                <div className="absolute left-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-50">

                                    {/* HR Dashboard */}
                                    <button
                                        onClick={() =>
                                            handleDashboardChange(
                                                "/hr/dashboard"
                                            )
                                        }
                                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${
                                            isHRDashboard
                                                ? "bg-blue-50 text-blue-900"
                                                : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                    >
                                        <LayoutDashboard size={18} />
                                        <span>HR Dashboard</span>
                                    </button>

                                    {/* Employee Dashboard */}
                                    <button
                                        onClick={() =>
                                            handleDashboardChange(
                                                "/employee/dashboard"
                                            )
                                        }
                                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${
                                            !isHRDashboard
                                                ? "bg-blue-50 text-blue-900"
                                                : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                    >
                                        <Users size={18} />
                                        <span>Employee Dashboard</span>
                                    </button>

                                </div>
                            )}
                        </div>

                        {/* Page Title */}
                        <h2 className="text-sm font-medium text-gray-700">
                            {pageTitle[location.pathname] || "Dashboard"}
                        </h2>
                    </div>

                    {/* Right Header Icons */}
                    <div className="flex items-center gap-2">

                        <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100">
                            <Moon size={18} />
                        </button>

                        <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100">
                            <Search size={18} />
                        </button>

                        <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100">
                            <Languages size={18} />
                        </button>

                        <button className="relative p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100">
                            <Bell size={18} />
                        </button>

                        <button className="relative p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100">
                            <Mail size={18} />
                        </button>

                        <button className="ml-2 flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition">
                            <UserRound size={18} />
                            <span>Login</span>
                        </button>

                    </div>
                </header>

                {/* Dynamic Page Content */}
                <main className="w-full">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default Index;
