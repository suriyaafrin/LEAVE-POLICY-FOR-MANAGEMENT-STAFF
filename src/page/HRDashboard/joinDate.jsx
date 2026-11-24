
import React from "react";
import { BriefcaseBusiness, CalendarDays, Clock3 } from "lucide-react";

const HRJoiningDate = ({ joiningDate = "2024-01-15" }) => {
    const joinDate = new Date(`${joiningDate}T00:00:00`);
    const today = new Date();

    const formattedDate = joinDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    let years = today.getFullYear() - joinDate.getFullYear();
    let months = today.getMonth() - joinDate.getMonth();

    if (today.getDate() < joinDate.getDate()) {
        months--;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const totalMonths = Math.max(0, years * 12 + months);

    const serviceYears = Math.floor(totalMonths / 12);
    const serviceMonths = totalMonths % 12;

    return (
        <div className="w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <BriefcaseBusiness size={21} className="text-blue-600" />
                </div>

                <div>
                    <h2 className="text-base font-semibold text-gray-800">
                        Joining Date
                    </h2>
                    <p className="text-xs text-gray-500">
                        Employment information
                    </p>
                </div>
            </div>

            {/* Information Cards */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Joining Date */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                    <div className="flex items-center gap-2">
                        <CalendarDays size={17} className="text-blue-500" />
                        <p className="text-sm font-medium text-gray-500">
                            Date of Joining
                        </p>
                    </div>

                    <h3 className="mt-3 text-xl font-bold text-gray-800">
                        {formattedDate}
                    </h3>
                </div>

                {/* Total Service */}
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                    <div className="flex items-center gap-2">
                        <Clock3 size={17} className="text-blue-600" />
                        <p className="text-sm font-medium text-blue-600">
                            Total Service
                        </p>
                    </div>

                    <h3 className="mt-3 text-xl font-bold text-blue-700">
                        {serviceYears} Years {serviceMonths} Months
                    </h3>

                    <p className="mt-1 text-xs text-blue-500">
                        {totalMonths} months of service
                    </p>
                </div>

            </div>
        </div>
    );
};

export default HRJoiningDate;
