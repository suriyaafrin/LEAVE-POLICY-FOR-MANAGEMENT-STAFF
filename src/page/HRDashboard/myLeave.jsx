import React, { useState } from "react";
import {
    CalendarDays,
    Clock,
    ArrowUpRight,
} from "lucide-react";
import LeaveApplication from "../employeeDashboard/leaveApplication.jsx";


const leaveData = [
    {
        name: "Annual Leave",
        shortName: "AL",
        payment: "With pay or encash",
        existing: 3,
        proposed: 3,
        used: 0,
        color: "bg-indigo-500",
        lightColor: "bg-indigo-100",
        textColor: "text-indigo-600",
    },
    {
        name: "Casual Leave",
        shortName: "CL",
        payment: "With pay",
        existing: 3,
        proposed: 3,
        used: 0,
        color: "bg-emerald-500",
        lightColor: "bg-emerald-100",
        textColor: "text-emerald-600",
    },
    {
        name: "Sick Leave",
        shortName: "SL",
        payment: "With pay",
        existing: 3,
        proposed: 3,
        used: 0,
        color: "bg-amber-500",
        lightColor: "bg-amber-100",
        textColor: "text-amber-600",
    },
    {
        name: "Maternity Leave",
        shortName: "ML",
        payment: "After joining",
        existing: 0,
        proposed: 3,
        used: 0,
        color: "bg-pink-500",
        lightColor: "bg-pink-100",
        textColor: "text-pink-600",
    },
    {
        name: "Quarantine Leave",
        shortName: "QL",
        payment: "As per Management decision",
        existing: 0,
        proposed: 3,
        used: 0,
        color: "bg-sky-500",
        lightColor: "bg-sky-100",
        textColor: "text-sky-600",
    },
    {
        name: "Study Leave",
        shortName: "STL",
        payment: "Without pay",
        existing: 0,
        proposed: 3,
        used: 0,
        color: "bg-violet-500",
        lightColor: "bg-violet-100",
        textColor: "text-violet-600",
    },
    {
        name: "Disability Leave",
        shortName: "DL",
        payment: "As per Management decision",
        existing: 0,
        proposed: 3,
        used: 0,
        color: "bg-orange-500",
        lightColor: "bg-orange-100",
        textColor: "text-orange-600",
    },
    {
        name: "Extra Ordinary Leave",
        shortName: "EOL",
        payment: "As per Management decision",
        existing: 0,
        proposed: 3,
        used: 0,
        color: "bg-rose-500",
        lightColor: "bg-rose-100",
        textColor: "text-rose-600",
    },
    {
        name: "Untold Leave",
        shortName: "UL",
        payment: "Without prior information",
        existing: 0,
        proposed: 0,
        used: 0,
        color: "bg-gray-500",
        lightColor: "bg-gray-100",
        textColor: "text-gray-600",
    },
];

// Leave names exactly as they appear in the application form's dropdown
const FORM_LEAVE_NAMES = {
    AL: "Annual Leave (AL)",
    CL: "Casual Leave (CL)",
    SL: "Sick Leave (SL)",
    ML: "Maternity Leave",
    QL: "Quarantine Leave",
    STL: "Study Leave",
    DL: "Disability Leave",
    EOL: "Extra Ordinary Leave",
    UL: "Untold Leave (UL)",
};

// Logged-in HR employee
const hrProfile = {
    name: "Suriya Afrin",
    employeeId: "HR-001",
    department: "Human Resources",
};

const HRMyLeaveBalance = () => {
    // Leave type the user clicked (null = form closed)
    const [selectedLeave, setSelectedLeave] = useState(null);

    // Leave click করলে application form এই page এর উপরেই open হবে
    const handleLeaveClick = (leave) => {
        const isUntold = leave.shortName === "UL";

        setSelectedLeave({
            leaveType: FORM_LEAVE_NAMES[leave.shortName] || leave.name,
            remainingDays: leave.proposed - leave.used,
            isUntoldLeave: isUntold,
        });
    };

    // Header arrow: open the form without a pre-selected leave type
    const handleOpenBlankForm = () => {
        setSelectedLeave({
            leaveType: "",
            remainingDays: null,
            isUntoldLeave: false,
        });
    };

    // Called when the form is submitted
    const handleLeaveSubmit = (data) => {
        // TODO: send `data` to your backend here
        console.log("Leave request submitted:", data);
    };

    // Summary calculation
    const totalExisting = leaveData.reduce(
        (total, leave) => total + leave.existing,
        0
    );

    const totalProposed = leaveData.reduce(
        (total, leave) => total + leave.proposed,
        0
    );

    const totalUsed = leaveData.reduce(
        (total, leave) => total + leave.used,
        0
    );

    const totalRemaining = leaveData.reduce(
        (total, leave) => total + (leave.proposed - leave.used),
        0
    );

    return (
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
                        <CalendarDays
                            size={18}
                            className="text-indigo-600"
                        />
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-gray-800">
                            My Leave
                        </h2>

                        <p className="text-[11px] text-gray-500">
                            Leave entitlement overview
                        </p>
                    </div>
                </div>

                {/* Open leave application */}
                <button
                    type="button"
                    onClick={handleOpenBlankForm}
                    className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:text-indigo-600"
                    title="Apply for leave"
                >
                    <ArrowUpRight size={16} />
                </button>
            </div>

            {/* Summary */}
            <div className="mt-4 grid grid-cols-3 gap-2">

                {/* Existing */}
                <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-[10px] text-gray-500">
                        Existing
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-gray-700">
                        {totalExisting}
                        <span className="ml-1 text-xs font-medium">
                            days
                        </span>
                    </h3>
                </div>

                {/* Proposed */}
                <div className="rounded-xl bg-indigo-50 p-3">
                    <p className="text-[10px] text-gray-500">
                        Proposed
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-indigo-600">
                        {totalProposed}
                        <span className="ml-1 text-xs font-medium">
                            days
                        </span>
                    </h3>
                </div>

                {/* Remaining */}
                <div className="rounded-xl bg-green-50 p-3">
                    <p className="text-[10px] text-gray-500">
                        Remaining
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-green-600">
                        {totalRemaining}
                        <span className="ml-1 text-xs font-medium">
                            days
                        </span>
                    </h3>
                </div>
            </div>

            {/* Leave Details */}
            <div className="mt-4 space-y-4">

                {leaveData.map((leave) => {
                    const remaining = leave.proposed - leave.used;

                    const percentage = leave.proposed > 0
                        ? (leave.used / leave.proposed) * 100
                        : 0;

                    const isUntold = leave.shortName === "UL";

                    return (
                        <button
                            key={leave.shortName}
                            type="button"
                            onClick={() => handleLeaveClick(leave)}
                            className="block w-full cursor-pointer rounded-lg text-left transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        >

                            {/* Leave Title */}
                            <div className="mb-1 flex items-center justify-between gap-2">

                                <div className="flex min-w-0 items-center gap-2">
                                    <span
                                        className={`h-2 w-2 shrink-0 rounded-full ${leave.color}`}
                                    />

                                    <p className="truncate text-xs font-semibold text-gray-700">
                                        {leave.name}
                                    </p>

                                    <span className="shrink-0 rounded-md bg-gray-100 px-1.5 py-0.5 text-[9px] text-gray-500">
                                        {leave.shortName}
                                    </span>
                                </div>

                                <p className="shrink-0 text-xs font-semibold text-gray-800">
                                    {remaining}
                                    <span className="font-normal text-gray-400">
                                        {" "} / {leave.proposed} days
                                    </span>
                                </p>
                            </div>

                            {/* Progress Bar */}
                            <div
                                className={`h-2 w-full overflow-hidden rounded-full ${leave.lightColor}`}
                            >
                                <div
                                    className={`h-full rounded-full ${leave.color} transition-all duration-300`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>

                            {/* Existing / Used / Remaining */}
                            <div className="mt-1 flex flex-wrap items-center justify-between gap-1 text-[10px] text-gray-500">
                                <span>
                                    Existing: {leave.existing}d
                                </span>

                                <span>
                                    Used: {leave.used}d
                                </span>

                                <span className={leave.textColor}>
                                    Remaining: {remaining}d
                                </span>
                            </div>

                            {/* Payment Policy */}
                            <p className="mt-1 text-[10px] text-gray-400">
                                Payment: {leave.payment}
                            </p>

                            {/* Untold Leave note */}
                            {isUntold && (
                                <p className="mt-1 text-[10px] font-medium text-gray-500">
                                    Click to report an absence and provide a reason
                                </p>
                            )}

                        </button>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3">
                <Clock
                    size={15}
                    className="shrink-0 text-gray-400"
                />

                <p className="text-[11px] text-gray-500">
                    Leave balance based on proposed leave policy
                </p>
            </div>

            {/* LEAVE APPLICATION FORM (opens over this page) */}
            {selectedLeave && (
                <LeaveApplication
                    leaveType={selectedLeave.leaveType}
                    remainingDays={selectedLeave.remainingDays}
                    isUntoldLeave={selectedLeave.isUntoldLeave}
                    employeeName={hrProfile.name}
                    employeeId={hrProfile.employeeId}
                    department={hrProfile.department}
                    onSubmit={handleLeaveSubmit}
                    onClose={() => setSelectedLeave(null)}
                />
            )}

        </div>
    );
};

export default HRMyLeaveBalance;