
import React, { useState } from "react";
import {
    CalendarDays,
    Clock,
    ArrowUpRight,
    CheckCircle2,
    X,
} from "lucide-react";

import LeaveApplication from "../employeeDashboard/leaveApplication.jsx";

// ==========================================
// LEAVE DATA
// ==========================================

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

// ==========================================
// FORM LEAVE NAMES
// ==========================================

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

// ==========================================
// HR PROFILE
// ==========================================

const hrProfile = {
    name: "Suriya Afrin",
    employeeId: "HR-001",
    department: "Human Resources",
    email: "suriya@example.com",
    joiningDate: "2024-01-15",
    gender: "Female",
};

// ==========================================
// HR MY LEAVE BALANCE
// ==========================================

const HRMyLeaveBalance = () => {
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // ======================================
    // OPEN FORM FOR SELECTED LEAVE TYPE
    // ======================================

    const handleLeaveClick = (leave) => {
        const isUntold = leave.shortName === "UL";

        const remainingDays = Math.max(
            0,
            leave.proposed - leave.used
        );

        setSelectedLeave({
            leaveType:
                FORM_LEAVE_NAMES[leave.shortName] || leave.name,
            remainingDays: isUntold ? null : remainingDays,
            isUntoldLeave: isUntold,
            isExtendedUnpaidLeave: false,
        });
    };

    // ======================================
    // OPEN BLANK LEAVE APPLICATION FORM
    // ======================================

    const handleOpenBlankForm = () => {
        setSelectedLeave({
            leaveType: "",
            remainingDays: null,
            isUntoldLeave: false,
            isExtendedUnpaidLeave: false,
        });
    };

    // ======================================
    // SUBMIT LEAVE APPLICATION
    // ======================================

    const handleLeaveSubmit = (data) => {
        const newLeaveApplication = {
            ...data,
            employeeName: hrProfile.name,
            employeeId: hrProfile.employeeId,
            department: hrProfile.department,
            email: hrProfile.email,
            joiningDate: hrProfile.joiningDate,
            status: "pending",
            appliedAt: new Date().toISOString(),
        };

        console.log(
            "HR Leave Application Submitted:",
            newLeaveApplication
        );

        // Close application form
        setSelectedLeave(null);

        // Show success modal
        setShowSuccessModal(true);
    };

    // ======================================
    // SUMMARY CALCULATIONS
    // ======================================

    const totalExisting = leaveData.reduce(
        (total, leave) => total + leave.existing,
        0
    );

    const totalProposed = leaveData.reduce(
        (total, leave) => total + leave.proposed,
        0
    );

    const totalRemaining = leaveData.reduce(
        (total, leave) =>
            total + Math.max(0, leave.proposed - leave.used),
        0
    );

    // ======================================
    // CLOSE SUCCESS MODAL
    // ======================================

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    // ======================================
    // JSX
    // ======================================

    return (
        <>
            {/* ======================================
                MY LEAVE BALANCE CARD
            ====================================== */}

            <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

                {/* HEADER */}

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

                    <button
                        type="button"
                        onClick={handleOpenBlankForm}
                        className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:text-indigo-600"
                        title="Apply for leave"
                    >
                        <ArrowUpRight size={16} />
                    </button>

                </div>

                {/* SUMMARY */}

                <div className="mt-4 grid grid-cols-3 gap-2">

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

                {/* LEAVE DETAILS */}

                <div className="mt-4 space-y-4">

                    {leaveData.map((leave) => {
                        const remaining = Math.max(
                            0,
                            leave.proposed - leave.used
                        );

                        const percentage =
                            leave.proposed > 0
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
                                {/* LEAVE TITLE */}

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
                                            {" "}/ {leave.proposed} days
                                        </span>
                                    </p>

                                </div>

                                {/* PROGRESS BAR */}

                                <div
                                    className={`h-2 w-full overflow-hidden rounded-full ${leave.lightColor}`}
                                >
                                    <div
                                        className={`h-full rounded-full ${leave.color} transition-all duration-300`}
                                        style={{
                                            width: `${percentage}%`,
                                        }}
                                    />
                                </div>

                                {/* EXISTING / USED / REMAINING */}

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

                                {/* PAYMENT POLICY */}

                                <p className="mt-1 text-[10px] text-gray-400">
                                    Payment: {leave.payment}
                                </p>

                                {isUntold && (
                                    <p className="mt-1 text-[10px] font-medium text-gray-500">
                                        Click to report an absence and provide a reason
                                    </p>
                                )}

                            </button>
                        );
                    })}

                </div>

                {/* FOOTER */}

                <div className="mt-4 flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3">

                    <Clock
                        size={15}
                        className="shrink-0 text-gray-400"
                    />

                    <p className="text-[11px] text-gray-500">
                        Leave balance based on proposed leave policy
                    </p>

                </div>

            </div>

            {/* ======================================
                LEAVE APPLICATION FORM
            ====================================== */}

            {selectedLeave && (
                <LeaveApplication
                    leaveType={selectedLeave.leaveType}
                    remainingDays={selectedLeave.remainingDays}
                    isUntoldLeave={selectedLeave.isUntoldLeave}
                    isExtendedUnpaidLeave={selectedLeave.isExtendedUnpaidLeave}
                    employeeName={hrProfile.name}
                    employeeId={hrProfile.employeeId}
                    department={hrProfile.department}
                    email={hrProfile.email}
                    joiningDate={hrProfile.joiningDate}
                    gender={hrProfile.gender}
                    onSubmit={handleLeaveSubmit}
                    onClose={() => setSelectedLeave(null)}
                />
            )}

            {/* ======================================
                SUCCESS MODAL
            ====================================== */}

            {showSuccessModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">

                    <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">

                        {/* CLOSE BUTTON */}

                        <button
                            type="button"
                            onClick={handleCloseSuccessModal}
                            className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                            aria-label="Close success modal"
                        >
                            <X size={20} />
                        </button>

                        {/* SUCCESS ICON */}

                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">

                            <CheckCircle2
                                size={36}
                                className="text-green-600"
                            />

                        </div>

                        {/* SUCCESS MESSAGE */}

                        <h2 className="text-xl font-bold text-gray-800">
                            Application Submitted!
                        </h2>

                        <p className="mt-2 text-sm leading-relaxed text-gray-500">
                            Your leave application has been submitted successfully.
                            Your application is now waiting for approval.
                        </p>

                        {/* STATUS */}

                        <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2">

                            <span className="h-2 w-2 rounded-full bg-amber-500" />

                            <span className="text-xs font-semibold text-amber-700">
                                Pending Approval
                            </span>

                        </div>

                        {/* OK BUTTON */}

                        <button
                            type="button"
                            onClick={handleCloseSuccessModal}
                            className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                            Okay, Got It
                        </button>

                    </div>

                </div>
            )}

        </>
    );
};

export default HRMyLeaveBalance;
