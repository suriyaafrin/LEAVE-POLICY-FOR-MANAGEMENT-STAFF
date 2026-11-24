
import React from "react";
import {
    Mail,
    Phone,
    Building2,
    CalendarDays,
    IdCard,
    UserRound,
} from "lucide-react";

const hrProfile = {
    name: "Suriya Afrin",
    employeeId: "HR-001",
    gender: "Female", // Male or Female
    designation: "HR Manager",
    department: "Human Resources",
    email: "suriya@company.com",
    phone: "+880 1700-000000",
    joiningDate: "15 January 2023",
    image: "https://i.pravatar.cc/300?img=47",
};

const HRProfile = () => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            {/* Profile Header */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                {/* Profile Image */}
                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                    <img
                        src={hrProfile.image}
                        alt={hrProfile.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Basic Information */}
                <div className="flex-1">

                    <h2 className="text-xl font-bold text-gray-800">
                        {hrProfile.name}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-indigo-600">
                        {hrProfile.designation}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        {hrProfile.department}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">

                        <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600">
                            {hrProfile.employeeId}
                        </span>

                        <span className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-600">
                            Active
                        </span>

                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-gray-100" />

            {/* Profile Details */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {/* Email */}
                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-blue-50 p-3">
                        <Mail size={18} className="text-blue-600" />
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs text-gray-500">
                            Email
                        </p>

                        <p className="truncate text-sm font-medium text-gray-700">
                            {hrProfile.email}
                        </p>
                    </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-green-50 p-3">
                        <Phone size={18} className="text-green-600" />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Phone
                        </p>

                        <p className="text-sm font-medium text-gray-700">
                            {hrProfile.phone}
                        </p>
                    </div>
                </div>

                {/* Department */}
                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-purple-50 p-3">
                        <Building2 size={18} className="text-purple-600" />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Department
                        </p>

                        <p className="text-sm font-medium text-gray-700">
                            {hrProfile.department}
                        </p>
                    </div>
                </div>

                {/* Joining Date */}
                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-orange-50 p-3">
                        <CalendarDays size={18} className="text-orange-600" />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Joining Date
                        </p>

                        <p className="text-sm font-medium text-gray-700">
                            {hrProfile.joiningDate}
                        </p>
                    </div>
                </div>

                {/* Gender */}
                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-pink-50 p-3">
                        <UserRound size={18} className="text-pink-600" />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Gender
                        </p>

                        <p className="text-sm font-medium text-gray-700">
                            {hrProfile.gender}
                        </p>
                    </div>
                </div>

                {/* Employee ID */}
                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-indigo-50 p-3">
                        <IdCard size={18} className="text-indigo-600" />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Employee ID
                        </p>

                        <p className="text-sm font-medium text-gray-700">
                            {hrProfile.employeeId}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HRProfile;
