
import React from "react";
import { CalendarDays } from "lucide-react";

const LeaveDetails = () => {

    const today = "2026-11-26";

    const leaveEmployees = [
        {
            id: 1,
            name: "Rahim Uddin",
            role: "Frontend Developer",
            image: "https://i.pravatar.cc/100?img=12",
            leaveType: "Annual Leave",
            startDate: "2026-11-26",
            endDate: "2026-11-28",
        },
        {
            id: 2,
            name: "Nusrat Jahan",
            role: "UI Designer",
            image: "https://i.pravatar.cc/100?img=47",
            leaveType: "Sick Leave",
            startDate: "2026-11-26",
            endDate: "2026-11-26",
        },
        {
            id: 3,
            name: "Tanvir Ahmed",
            role: "Backend Developer",
            image: "https://i.pravatar.cc/100?img=13",
            leaveType: "Casual Leave",
            startDate: "2026-11-27",
            endDate: "2026-11-28",
        },
        {
            id: 4,
            name: "Sadia Islam",
            role: "QA Engineer",
            image: "https://i.pravatar.cc/100?img=44",
            leaveType: "Annual Leave",
            startDate: "2026-11-25",
            endDate: "2026-11-27",
        },
    ];

    // Only employees who are on leave today
    const todayLeave = leaveEmployees.filter(
        (employee) =>
            employee.startDate <= today &&
            employee.endDate >= today
    );

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                        Today's Leave
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Employees on leave today
                    </p>
                </div>

                <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                    {todayLeave.length} Employees
                </span>
            </div>

            {/* Employee List */}
            <div className="space-y-3">

                {todayLeave.length > 0 ? (
                    todayLeave.map((employee) => (
                        <div
                            key={employee.id}
                            className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition"
                        >
                            <img
                                src={employee.image}
                                alt={employee.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            <div className="min-w-0 flex-1">
                                <h3 className="text-sm font-semibold text-slate-800 truncate">
                                    {employee.name}
                                </h3>

                                <p className="text-xs text-slate-500">
                                    {employee.role}
                                </p>

                                <p className="text-xs text-blue-600 mt-1">
                                    {employee.leaveType}
                                </p>
                            </div>

                            <CalendarDays
                                size={17}
                                className="text-slate-400 shrink-0"
                            />
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <CalendarDays
                            size={28}
                            className="mx-auto text-slate-300 mb-2"
                        />
                        <p className="text-sm text-slate-500">
                            No employees on leave today
                        </p>
                    </div>
                )}

            </div>

        </div>
    );
};

export default LeaveDetails;
