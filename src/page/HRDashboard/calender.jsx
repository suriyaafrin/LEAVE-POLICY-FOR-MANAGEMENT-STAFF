
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, X } from "lucide-react";

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

// Calendar sizing
const EMPLOYEE_WIDTH = 150;
const DAY_WIDTH = 30;

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

const HRLeaveCalendar = () => {
    const [currentDate, setCurrentDate] = useState(
        new Date(2026, 10, 1)
    );

    const [leaves, setLeaves] = useState(initialLeaves);
    const [selectedLeave, setSelectedLeave] = useState(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const totalDays = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const monthName = currentDate.toLocaleString("en-US", {
        month: "long",
    });

    // Current month leave filter
    const visibleLeaves = leaves.filter((leave) => {
        const start = new Date(`${leave.start}T00:00:00`);
        const end = new Date(`${leave.end}T00:00:00`);

        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);

        return start <= monthEnd && end >= monthStart;
    });

    // Leave status count
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

    // Month navigation
    const changeMonth = (direction) => {
        setCurrentDate(new Date(year, month + direction, 1));
    };

    // Leave bar position
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

    // Calculate total leave days
    const getTotalLeaveDays = (leave) => {
        const start = new Date(`${leave.start}T00:00:00`);
        const end = new Date(`${leave.end}T00:00:00`);

        return (
            Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1
        );
    };

    // Update leave status
    const updateLeaveStatus = (leave, newStatus) => {
        const confirmed = window.confirm(
            `Are you sure you want to ${newStatus} this leave request?`
        );

        if (!confirmed) return;

        const updatedLeave = {
            ...leave,
            status: newStatus,
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
    };

    const handleApprove = (leave) => {
        updateLeaveStatus(leave, "approved");
    };

    const handleReject = (leave) => {
        updateLeaveStatus(leave, "rejected");
    };

    const selectedEmployee = selectedLeave
        ? employees.find(
            (emp) => emp.id === selectedLeave.employeeId
        )
        : null;

    return (
        <div className="relative w-full min-w-0 min-h-[440px] flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

            {/* Header */}
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

                {/* Month Navigation */}
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

            {/* Statistics */}
            <div className="flex shrink-0 flex-wrap gap-2">
                <div className="flex items-center gap-1.5 rounded-lg border border-gray-100 px-2.5 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm font-semibold text-gray-800">
                        {stats.approved}
                    </span>
                    <span className="text-xs text-gray-500">Approved</span>
                </div>

                <div className="flex items-center gap-1.5 rounded-lg border border-gray-100 px-2.5 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-sm font-semibold text-gray-800">
                        {stats.pending}
                    </span>
                    <span className="text-xs text-gray-500">Pending</span>
                </div>

                <div className="flex items-center gap-1.5 rounded-lg border border-gray-100 px-2.5 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="text-sm font-semibold text-gray-800">
                        {stats.rejected}
                    </span>
                    <span className="text-xs text-gray-500">Rejected</span>
                </div>
            </div>

            {/* Calendar */}
            <div className="flex-1 min-h-[280px] overflow-hidden rounded-xl border border-gray-200">
                <div className="h-full overflow-auto">
                    <div className="min-w-max">

                        {/* Calendar Header */}
                        <div
                            className="grid sticky top-0 z-20 border-b border-gray-200 bg-gray-50"
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

                                return (
                                    <div
                                        key={day}
                                        className="flex flex-col items-center justify-center border-l border-gray-100 py-1.5 text-[9px] text-gray-500"
                                    >
                                        <span>{weekdays[date.getDay()]}</span>

                                        <span
                                            className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                                                isToday
                                                    ? "bg-indigo-600 text-white"
                                                    : "text-gray-800"
                                            }`}
                                        >
                                            {day}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Employee Rows */}
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
                                    {/* Employee Information */}
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

                                    {/* Day Background */}
                                    {Array.from(
                                        { length: totalDays },
                                        (_, index) => {
                                            const day = index + 1;
                                            const weekday = new Date(
                                                year,
                                                month,
                                                day
                                            ).getDay();

                                            return (
                                                <div
                                                    key={day}
                                                    className={`border-l border-gray-100 ${
                                                        weekday === 5 || weekday === 6
                                                            ? "bg-gray-50"
                                                            : "bg-white"
                                                    }`}
                                                />
                                            );
                                        }
                                    )}

                                    {/* Leave Bars */}
                                    {employeeLeaves.map((leave, leaveIndex) => {
                                        const { start, span } = getLeavePosition(leave);

                                        return (
                                            <button
                                                key={`${leave.employeeId}-${leave.start}-${leaveIndex}`}
                                                type="button"
                                                onClick={() => setSelectedLeave(leave)}
                                                title={`Click to view details: ${employee.name} · ${leave.type} · ${leave.status}`}
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

            {/* Legend */}
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
                    <i className="mr-1 inline-block h-2.5 w-2.5 rounded border border-gray-200 bg-gray-100" />
                    Weekend
                </span>
            </div>

            {/* Leave Details Modal */}
            {selectedLeave && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
                    onClick={() => setSelectedLeave(null)}
                >
                    <div
                        className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-5 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
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
                                onClick={() => setSelectedLeave(null)}
                                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Employee Information */}
                        <div className="mt-4 rounded-xl bg-gray-50 p-4">
                            <h3 className="font-semibold text-gray-800">
                                {selectedEmployee?.name}
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                                {selectedEmployee?.role}
                            </p>
                        </div>

                        {/* Leave Type & Status */}
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="rounded-xl border border-gray-100 p-3">
                                <p className="text-xs text-gray-500">Leave Type</p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {selectedLeave.type} Leave
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-100 p-3">
                                <p className="text-xs text-gray-500">Status</p>

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

                        {/* Leave Duration */}
                        <div className="mt-3 rounded-xl border border-gray-100 p-3">
                            <p className="text-xs text-gray-500">Leave Duration</p>

                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-[11px] text-gray-400">From</p>
                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {formatDate(selectedLeave.start)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[11px] text-gray-400">To</p>
                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {formatDate(selectedLeave.end)}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 border-t border-gray-100 pt-3">
                                <p className="text-xs text-gray-500">Total Leave</p>
                                <p className="mt-1 text-lg font-bold text-indigo-600">
                                    {getTotalLeaveDays(selectedLeave)}{" "}
                                    {getTotalLeaveDays(selectedLeave) === 1 ? "Day" : "Days"}
                                </p>
                            </div>
                        </div>

                        {/* Reason */}
                        <div className="mt-3 rounded-xl border border-gray-100 p-3">
                            <p className="text-xs text-gray-500">Reason for Leave</p>
                            <p className="mt-1 text-sm font-medium text-gray-700">
                                {selectedLeave.reason || "No reason provided"}
                            </p>
                        </div>

                        {/* Applied Date */}
                        <div className="mt-3 rounded-xl border border-gray-100 p-3">
                            <p className="text-xs text-gray-500">Applied On</p>
                            <p className="mt-1 text-sm font-medium text-gray-700">
                                {selectedLeave.appliedDate
                                    ? formatDate(selectedLeave.appliedDate)
                                    : "Not available"}
                            </p>
                        </div>

                        {/* HR Approval Actions */}
                        {selectedLeave.status === "pending" && (
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleReject(selectedLeave)}
                                    className="flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
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
                        )}

                        {/* Already Reviewed */}
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

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedLeave(null)}
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
