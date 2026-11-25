
import React, { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    CalendarDays,
    X,
    AlertCircle,
    UserCheck,
    Clock,
    ShieldCheck,
} from "lucide-react";

import { getHolidayForDate } from "../../Data/holidays.js";

// ==========================================
// CURRENT HR APPROVER
// ==========================================

const currentApprover = {
    name: "Suriya Afrin",
    employeeId: "HR-001",
    designation: "HR Manager",
    department: "Human Resources",
};

// ==========================================
// EMPLOYEES
// ==========================================

const employees = [
    { id: 1, name: "Rahim Uddin", role: "Frontend Developer" },
    { id: 2, name: "Nusrat Jahan", role: "UI Designer" },
    { id: 3, name: "Tanvir Ahmed", role: "Backend Developer" },
    { id: 4, name: "Sadia Islam", role: "QA Engineer" },
    { id: 5, name: "Imran Hossain", role: "Product Manager" },
    { id: 6, name: "Farhana Akter", role: "HR Executive" },
    { id: 7, name: "Mehedi Hasan", role: "DevOps Engineer" },
    { id: 8, name: "Tasnim Rahman", role: "Content Writer" },
];

// ==========================================
// INITIAL LEAVE DATA
// ==========================================

const initialLeaves = [
    {
        employeeId: 1,
        start: "2026-11-03",
        end: "2026-11-05",
        type: "Sick",
        status: "approved",
        reason: "Fever and physical illness",
        appliedDate: "2026-10-30",
    },
    {
        employeeId: 1,
        start: "2026-11-24",
        end: "2026-11-26",
        type: "Casual",
        status: "pending",
        reason: "Personal work",
        appliedDate: "2026-11-20",
    },
    {
        employeeId: 2,
        start: "2026-11-10",
        end: "2026-11-14",
        type: "Annual",
        status: "approved",
        reason: "Family vacation",
        appliedDate: "2026-11-01",
    },
    {
        employeeId: 3,
        start: "2026-11-18",
        end: "2026-11-19",
        type: "Casual",
        status: "rejected",
        reason: "Personal emergency",
        rejectionReason:
            "Insufficient leave balance for the requested period.",
        appliedDate: "2026-11-15",
    },
    {
        employeeId: 3,
        start: "2026-11-29",
        end: "2026-12-02",
        type: "Annual",
        status: "pending",
        reason: "Travel plan",
        appliedDate: "2026-11-21",
    },
    {
        employeeId: 4,
        start: "2026-11-06",
        end: "2026-11-06",
        type: "Sick",
        status: "approved",
        reason: "Medical appointment",
        appliedDate: "2026-11-04",
    },
    {
        employeeId: 4,
        start: "2026-11-23",
        end: "2026-11-25",
        type: "Sick",
        status: "approved",
        reason: "Recovery from illness",
        appliedDate: "2026-11-19",
    },
    {
        employeeId: 5,
        start: "2026-11-16",
        end: "2026-11-20",
        type: "Annual",
        status: "pending",
        reason: "Personal vacation",
        appliedDate: "2026-11-10",
    },
    {
        employeeId: 6,
        start: "2026-11-09",
        end: "2026-11-11",
        type: "Casual",
        status: "approved",
        reason: "Family event",
        appliedDate: "2026-11-06",
    },
    {
        employeeId: 7,
        start: "2026-11-12",
        end: "2026-11-13",
        type: "Casual",
        status: "rejected",
        reason: "Personal work",
        rejectionReason:
            "The requested dates conflict with an important project deadline.",
        appliedDate: "2026-11-09",
    },
    {
        employeeId: 7,
        start: "2026-11-27",
        end: "2026-11-30",
        type: "Annual",
        status: "approved",
        reason: "Planned vacation",
        appliedDate: "2026-11-15",
    },
    {
        employeeId: 8,
        start: "2026-11-02",
        end: "2026-11-04",
        type: "Sick",
        status: "pending",
        reason: "Not feeling well",
        appliedDate: "2026-10-31",
    },
    {
        employeeId: 2,
        start: "2026-12-07",
        end: "2026-12-09",
        type: "Casual",
        status: "pending",
        reason: "Personal reason",
        appliedDate: "2026-12-01",
    },
    {
        employeeId: 6,
        start: "2026-10-20",
        end: "2026-10-22",
        type: "Annual",
        status: "approved",
        reason: "Vacation",
        appliedDate: "2026-10-10",
    },
];

// ==========================================
// PREPARED LEAVE DATA
// ==========================================

const preparedLeaves = initialLeaves.map((leave) => ({
    ...leave,
    reviewedBy:
        leave.status === "pending" ? null : currentApprover,
    reviewedAt: null,
}));

// ==========================================
// STYLES & CONSTANTS
// ==========================================

const colors = [
    "bg-indigo-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-amber-500",
    "bg-violet-500",
    "bg-sky-500",
    "bg-red-500",
    "bg-emerald-500",
];

const statusStyles = {
    approved: "bg-green-50 text-green-700 border-green-300",
    pending: "bg-amber-50 text-amber-700 border-amber-300",
    rejected: "bg-red-50 text-red-700 border-red-300",
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const EMPLOYEE_WIDTH = 150;
const DAY_WIDTH = 30;

// ==========================================
// HELPER FUNCTIONS
// ==========================================

const getInitials = (name) =>
    name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

const formatDate = (dateString) =>
    new Date(`${dateString}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

const formatReviewDate = (dateString) => {
    if (!dateString) return "Not recorded";

    return new Date(`${dateString}T00:00:00`).toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }
    );
};

// ==========================================
// HR LEAVE CALENDAR
// ==========================================

const HRLeaveCalendar = () => {
    const [currentDate, setCurrentDate] = useState(
        new Date(2026, 10, 1)
    );

    const [leaves, setLeaves] = useState(preparedLeaves);
    const [selectedLeave, setSelectedLeave] = useState(null);

    const [rejectionReasonInput, setRejectionReasonInput] = useState("");
    const [rejectionError, setRejectionError] = useState("");

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const totalDays = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const monthName = currentDate.toLocaleString("en-US", {
        month: "long",
    });

    // ==========================================
    // VISIBLE LEAVES
    // ==========================================

    const visibleLeaves = leaves.filter((leave) => {
        const start = new Date(`${leave.start}T00:00:00`);
        const end = new Date(`${leave.end}T00:00:00`);

        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);

        return start <= monthEnd && end >= monthStart;
    });

    // ==========================================
    // STATISTICS
    // ==========================================

    const stats = {
        approved: visibleLeaves.filter(
            (l) => l.status === "approved"
        ).length,

        pending: visibleLeaves.filter(
            (l) => l.status === "pending"
        ).length,

        rejected: visibleLeaves.filter(
            (l) => l.status === "rejected"
        ).length,
    };

    // ==========================================
    // MONTH NAVIGATION
    // ==========================================

    const changeMonth = (direction) => {
        setCurrentDate(new Date(year, month + direction, 1));
    };

    // ==========================================
    // LEAVE BAR POSITION
    // ==========================================

    const getLeavePosition = (leave) => {
        const start = new Date(`${leave.start}T00:00:00`);
        const end = new Date(`${leave.end}T00:00:00`);

        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);

        const visibleStart = start < monthStart ? 1 : start.getDate();
        const visibleEnd = end > monthEnd ? totalDays : end.getDate();

        return {
            start: visibleStart,
            span: Math.max(1, visibleEnd - visibleStart + 1),
        };
    };

    // ==========================================
    // TOTAL LEAVE DAYS
    // ==========================================

    const getTotalLeaveDays = (leave) => {
        const start = new Date(`${leave.start}T00:00:00`);
        const end = new Date(`${leave.end}T00:00:00`);

        return (
            Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1
        );
    };

    // ==========================================
    // MODAL
    // ==========================================

    const openLeaveModal = (leave) => {
        setSelectedLeave(leave);
        setRejectionReasonInput("");
        setRejectionError("");
    };

    const closeLeaveModal = () => {
        setSelectedLeave(null);
        setRejectionReasonInput("");
        setRejectionError("");
    };

    // ==========================================
    // UPDATE LEAVE STATUS
    // ==========================================

    const updateLeaveStatus = (
        leave,
        newStatus,
        rejectionReason = ""
    ) => {
        const confirmed = window.confirm(
            `Are you sure you want to ${newStatus} this leave request?`
        );

        if (!confirmed) return;

        const reviewDate = new Date().toISOString().slice(0, 10);

        const updatedLeave = {
            ...leave,
            status: newStatus,

            reviewedBy: {
                ...currentApprover,
            },

            reviewedAt: reviewDate,

            rejectionReason:
                newStatus === "rejected"
                    ? rejectionReason.trim()
                    : "",
        };

        setLeaves((prev) =>
            prev.map((item) =>
                item.employeeId === leave.employeeId &&
                item.start === leave.start &&
                item.end === leave.end
                    ? updatedLeave
                    : item
            )
        );

        setSelectedLeave(updatedLeave);

        setRejectionReasonInput("");
        setRejectionError("");
    };

    // ==========================================
    // APPROVE & REJECT
    // ==========================================

    const handleApprove = (leave) => {
        updateLeaveStatus(leave, "approved");
    };

    const handleReject = (leave) => {
        if (!rejectionReasonInput.trim()) {
            setRejectionError(
                "Please write a reason before rejecting this leave."
            );
            return;
        }

        updateLeaveStatus(
            leave,
            "rejected",
            rejectionReasonInput
        );
    };

    // ==========================================
    // SELECTED EMPLOYEE
    // ==========================================

    const selectedEmployee = selectedLeave
        ? employees.find(
            (emp) => emp.id === selectedLeave.employeeId
        )
        : null;

    return (
        <div className="relative flex min-h-[440px] w-full min-w-0 flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

            {/* HEADER */}
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-2">

                <div>
                    <div className="flex items-center gap-2">
                        <CalendarDays
                            size={18}
                            className="text-indigo-600"
                        />

                        <h2 className="text-base font-semibold text-gray-800">
                            Team Leave Calendar
                        </h2>
                    </div>

                    <p className="mt-1 text-xs text-gray-500">
                        Team availability and leave requests
                    </p>
                </div>

                {/* MONTH NAVIGATION */}
                <div className="flex items-center gap-1.5">

                    <button
                        onClick={() => changeMonth(-1)}
                        className="rounded-lg border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-50"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <div className="min-w-[110px] text-center text-sm font-semibold text-gray-800">
                        {monthName} {year}
                    </div>

                    <button
                        onClick={() => changeMonth(1)}
                        className="rounded-lg border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-50"
                    >
                        <ChevronRight size={16} />
                    </button>

                </div>
            </div>

            {/* STATISTICS */}
            <div className="flex shrink-0 flex-wrap gap-2">

                <div className="flex items-center gap-1.5 rounded-lg border border-gray-100 px-2.5 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm font-semibold text-gray-800">
                        {stats.approved}
                    </span>
                    <span className="text-xs text-gray-500">
                        Approved
                    </span>
                </div>

                <div className="flex items-center gap-1.5 rounded-lg border border-gray-100 px-2.5 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-sm font-semibold text-gray-800">
                        {stats.pending}
                    </span>
                    <span className="text-xs text-gray-500">
                        Pending
                    </span>
                </div>

                <div className="flex items-center gap-1.5 rounded-lg border border-gray-100 px-2.5 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="text-sm font-semibold text-gray-800">
                        {stats.rejected}
                    </span>
                    <span className="text-xs text-gray-500">
                        Rejected
                    </span>
                </div>

            </div>

            {/* CALENDAR */}
            <div className="min-h-[280px] flex-1 overflow-hidden rounded-xl border border-gray-200">

                <div className="h-full overflow-auto">
                    <div className="min-w-max">

                        {/* CALENDAR HEADER */}
                        <div
                            className="sticky top-0 z-20 grid border-b border-gray-200 bg-gray-50"
                            style={{
                                gridTemplateColumns: `${EMPLOYEE_WIDTH}px repeat(${totalDays}, ${DAY_WIDTH}px)`,
                            }}
                        >

                            <div className="sticky left-0 z-30 flex items-center border-r border-gray-200 bg-gray-50 px-2 py-2 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                                Employee
                            </div>

                            {Array.from({ length: totalDays }, (_, index) => {
                                const day = index + 1;
                                const date = new Date(year, month, day);

                                const isToday =
                                    date.toDateString() === today.toDateString();

                                const holiday = getHolidayForDate(
                                    year,
                                    month,
                                    day
                                );

                                const isWeekend =
                                    date.getDay() === 5 ||
                                    date.getDay() === 6;

                                return (
                                    <div
                                        key={day}
                                        title={
                                            holiday?.name ||
                                            (isWeekend ? "Weekend" : "")
                                        }
                                        className={`flex flex-col items-center justify-center border-l py-1.5 text-[9px] ${
                                            holiday
                                                ? "border-red-100 bg-red-50 text-red-600"
                                                : isWeekend
                                                    ? "border-gray-100 bg-gray-100 text-gray-500"
                                                    : "border-gray-100 bg-gray-50 text-gray-500"
                                        }`}
                                    >
                                        <span>
                                            {weekdays[date.getDay()]}
                                        </span>

                                        <span
                                            className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                                                isToday
                                                    ? "bg-indigo-600 text-white"
                                                    : holiday
                                                        ? "text-red-700"
                                                        : "text-gray-800"
                                            }`}
                                        >
                                            {day}
                                        </span>

                                        {holiday && (
                                            <span className="mt-0.5 text-[7px] font-bold text-red-600">
                                                Holiday
                                            </span>
                                        )}
                                    </div>
                                );
                            })}

                        </div>

                        {/* EMPLOYEE ROWS */}
                        {employees.map((employee, employeeIndex) => {

                            const employeeLeaves = visibleLeaves.filter(
                                (leave) => leave.employeeId === employee.id
                            );

                            return (
                                <div
                                    key={employee.id}
                                    className="relative grid h-[54px] border-b border-gray-100 last:border-b-0"
                                    style={{
                                        gridTemplateColumns: `${EMPLOYEE_WIDTH}px repeat(${totalDays}, ${DAY_WIDTH}px)`,
                                    }}
                                >

                                    {/* EMPLOYEE INFORMATION */}
                                    <div className="sticky left-0 z-30 flex items-center gap-1.5 border-r border-gray-200 bg-white px-2">

                                        <div
                                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white ${colors[employeeIndex]}`}
                                        >
                                            {getInitials(employee.name)}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-xs font-semibold text-gray-800">
                                                {employee.name}
                                            </p>

                                            <p className="truncate text-[10px] text-gray-500">
                                                {employee.role}
                                            </p>
                                        </div>
                                    </div>

                                    {/* DAY BACKGROUND */}
                                    {Array.from(
                                        { length: totalDays },
                                        (_, index) => {

                                            const day = index + 1;

                                            const date = new Date(
                                                year,
                                                month,
                                                day
                                            );

                                            const weekday = date.getDay();

                                            const holiday = getHolidayForDate(
                                                year,
                                                month,
                                                day
                                            );

                                            const isWeekend =
                                                weekday === 5 ||
                                                weekday === 6;

                                            return (
                                                <div
                                                    key={day}
                                                    title={holiday?.name || ""}
                                                    className={`border-l ${
                                                        holiday
                                                            ? "border-red-100 bg-red-50"
                                                            : isWeekend
                                                                ? "border-gray-100 bg-gray-50"
                                                                : "border-gray-100 bg-white"
                                                    }`}
                                                />
                                            );
                                        }
                                    )}

                                    {/* LEAVE BARS */}
                                    {employeeLeaves.map((leave, leaveIndex) => {

                                        const { start, span } =
                                            getLeavePosition(leave);

                                        return (
                                            <button
                                                key={`${leave.employeeId}-${leave.start}-${leaveIndex}`}
                                                type="button"
                                                onClick={() => openLeaveModal(leave)}
                                                title={`${employee.name} · ${leave.type} · ${leave.status}`}
                                                className={`absolute z-10 flex h-6 cursor-pointer items-center overflow-hidden rounded-md border px-1 text-[9px] font-semibold transition hover:brightness-95 ${statusStyles[leave.status]}`}
                                                style={{
                                                    left: `${EMPLOYEE_WIDTH + (start - 1) * DAY_WIDTH}px`,
                                                    width: `${span * DAY_WIDTH - 4}px`,
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                }}
                                            >
                                                <span className="truncate">
                                                    {leave.type} · {leave.status}
                                                </span>
                                            </button>
                                        );
                                    })}

                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>

            {/* LEGEND */}
            <div className="flex shrink-0 flex-wrap gap-3 pt-1 text-[10px] text-gray-500">

                <span>
                    <i className="mr-1 inline-block h-2.5 w-2.5 rounded bg-green-500" />
                    Approved
                </span>

                <span>
                    <i className="mr-1 inline-block h-2.5 w-2.5 rounded bg-amber-500" />
                    Pending
                </span>

                <span>
                    <i className="mr-1 inline-block h-2.5 w-2.5 rounded bg-red-500" />
                    Rejected
                </span>

                <span>
                    <i className="mr-1 inline-block h-2.5 w-2.5 rounded border border-red-200 bg-red-50" />
                    Public Holiday
                </span>

                <span>
                    <i className="mr-1 inline-block h-2.5 w-2.5 rounded border border-gray-200 bg-gray-100" />
                    Weekend
                </span>

            </div>

            {/* ==========================================
                LEAVE DETAILS MODAL
            ========================================== */}

            {selectedLeave && (

                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
                    onClick={closeLeaveModal}
                >

                    <div
                        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* MODAL HEADER */}
                        <div className="flex items-start justify-between">

                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Leave Details
                                </h2>

                                <p className="mt-1 text-xs text-gray-500">
                                    Employee leave request information
                                </p>
                            </div>

                            <button
                                onClick={closeLeaveModal}
                                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                            >
                                <X size={18} />
                            </button>

                        </div>

                        {/* EMPLOYEE INFORMATION */}
                        <div className="mt-4 rounded-xl bg-gray-50 p-4">

                            <h3 className="font-semibold text-gray-800">
                                {selectedEmployee?.name}
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                                {selectedEmployee?.role}
                            </p>

                        </div>

                        {/* LEAVE TYPE & STATUS */}
                        <div className="mt-4 grid grid-cols-2 gap-3">

                            <div className="rounded-xl border border-gray-100 p-3">
                                <p className="text-xs text-gray-500">
                                    Leave Type
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {selectedLeave.type} Leave
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-100 p-3">
                                <p className="text-xs text-gray-500">
                                    Status
                                </p>

                                <span
                                    className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-semibold capitalize ${
                                        selectedLeave.status === "approved"
                                            ? "bg-green-50 text-green-700"
                                            : selectedLeave.status === "pending"
                                                ? "bg-amber-50 text-amber-700"
                                                : "bg-red-50 text-red-700"
                                    }`}
                                >
                                    {selectedLeave.status}
                                </span>
                            </div>

                        </div>

                        {/* LEAVE DURATION */}
                        <div className="mt-3 rounded-xl border border-gray-100 p-3">

                            <p className="text-xs text-gray-500">
                                Leave Duration
                            </p>

                            <div className="mt-3 grid grid-cols-2 gap-3">

                                <div>
                                    <p className="text-[11px] text-gray-400">
                                        From
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {formatDate(selectedLeave.start)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[11px] text-gray-400">
                                        To
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {formatDate(selectedLeave.end)}
                                    </p>
                                </div>

                            </div>

                            <div className="mt-3 border-t border-gray-100 pt-3">

                                <p className="text-xs text-gray-500">
                                    Total Leave
                                </p>

                                <p className="mt-1 text-lg font-bold text-indigo-600">
                                    {getTotalLeaveDays(selectedLeave)}{" "}
                                    {getTotalLeaveDays(selectedLeave) === 1
                                        ? "Day"
                                        : "Days"}
                                </p>

                            </div>

                        </div>

                        {/* REASON FOR LEAVE */}
                        <div className="mt-3 rounded-xl border border-gray-100 p-3">

                            <p className="text-xs text-gray-500">
                                Reason for Leave
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-700">
                                {selectedLeave.reason || "No reason provided"}
                            </p>

                        </div>

                        {/* REJECTION REASON */}
                        {selectedLeave.status === "rejected" && (

                            <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3">

                                <div className="flex items-center gap-2">

                                    <AlertCircle
                                        size={17}
                                        className="text-red-600"
                                    />

                                    <p className="text-sm font-semibold text-red-700">
                                        Reason for Rejection
                                    </p>

                                </div>

                                <p className="mt-2 text-sm leading-relaxed text-red-700">
                                    {selectedLeave.rejectionReason ||
                                        "No rejection reason provided."}
                                </p>

                            </div>

                        )}

                        {/* APPLIED DATE */}
                        <div className="mt-3 rounded-xl border border-gray-100 p-3">

                            <p className="text-xs text-gray-500">
                                Applied On
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-700">
                                {selectedLeave.appliedDate
                                    ? formatDate(selectedLeave.appliedDate)
                                    : "Not available"}
                            </p>

                        </div>

                        {/* REVIEWER INFORMATION */}
                        {selectedLeave.status !== "pending" &&
                            selectedLeave.reviewedBy && (

                                <div className="mt-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">

                                    <div className="mb-3 flex items-center gap-2">

                                        <div className="rounded-lg bg-indigo-100 p-2">
                                            {selectedLeave.status === "approved" ? (
                                                <ShieldCheck
                                                    size={18}
                                                    className="text-indigo-600"
                                                />
                                            ) : (
                                                <UserCheck
                                                    size={18}
                                                    className="text-indigo-600"
                                                />
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-gray-800">
                                                {selectedLeave.status === "approved"
                                                    ? "Approved By"
                                                    : "Rejected By"}
                                            </h3>

                                            <p className="text-[11px] text-gray-500">
                                                Review authority information
                                            </p>
                                        </div>

                                    </div>

                                    {/* REVIEWER NAME */}
                                    <div className="rounded-xl border border-indigo-100 bg-white p-3">

                                        <p className="text-xs text-gray-500">
                                            Name
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-gray-800">
                                            {selectedLeave.reviewedBy.name}
                                        </p>

                                        <div className="mt-3 grid grid-cols-2 gap-3">

                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    Designation
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-indigo-700">
                                                    {selectedLeave.reviewedBy.designation}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    Department
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-gray-700">
                                                    {selectedLeave.reviewedBy.department}
                                                </p>
                                            </div>

                                        </div>

                                        {/* REVIEWER ID */}
                                        <div className="mt-3 border-t border-gray-100 pt-3">

                                            <p className="text-xs text-gray-500">
                                                Employee ID
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-gray-700">
                                                {selectedLeave.reviewedBy.employeeId}
                                            </p>

                                        </div>

                                    </div>

                                    {/* REVIEW DATE */}
                                    <div className="mt-3 flex items-center gap-2">

                                        <Clock
                                            size={15}
                                            className="text-indigo-500"
                                        />

                                        <div>
                                            <p className="text-[11px] text-gray-500">
                                                Reviewed On
                                            </p>

                                            <p className="text-xs font-semibold text-gray-700">
                                                {formatReviewDate(
                                                    selectedLeave.reviewedAt
                                                )}
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            )}

                        {/* PENDING LEAVE ACTIONS */}
                        {selectedLeave.status === "pending" && (

                            <div className="mt-5">

                                {/* REJECTION REASON INPUT */}
                                <div className="mb-4">

                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Reason for Rejection

                                        <span className="ml-1 text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <textarea
                                        value={rejectionReasonInput}
                                        onChange={(e) => {
                                            setRejectionReasonInput(e.target.value);
                                            setRejectionError("");
                                        }}
                                        placeholder="Write why this leave request may be rejected..."
                                        rows={3}
                                        className={`w-full resize-none rounded-xl border p-3 text-sm text-gray-700 outline-none transition focus:ring-2 ${
                                            rejectionError
                                                ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                                                : "border-gray-200 focus:border-indigo-400 focus:ring-indigo-100"
                                        }`}
                                    />

                                    {rejectionError && (
                                        <p className="mt-1.5 text-xs font-medium text-red-500">
                                            {rejectionError}
                                        </p>
                                    )}

                                    <p className="mt-1 text-xs text-gray-400">
                                        Required only when rejecting a leave request.
                                    </p>

                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="grid grid-cols-2 gap-3">

                                    <button
                                        type="button"
                                        onClick={() => handleReject(selectedLeave)}
                                        disabled={!rejectionReasonInput.trim()}
                                        className="flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Reject Leave
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleApprove(selectedLeave)}
                                        className="flex items-center justify-center rounded-xl bg-emerald-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                    >
                                        Approve Leave
                                    </button>

                                </div>

                            </div>

                        )}

                        {/* ALREADY REVIEWED */}
                        {selectedLeave.status !== "pending" && (

                            <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-3 text-center">

                                <p className="text-xs text-gray-500">
                                    This leave request has already been reviewed.
                                </p>

                                <p className="mt-1 text-sm font-semibold capitalize text-gray-700">
                                    Current status: {selectedLeave.status}
                                </p>

                            </div>

                        )}

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={closeLeaveModal}
                            className="mt-3 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                        >
                            Close Details
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
};

export default HRLeaveCalendar;
