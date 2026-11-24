
import React, { useState } from "react";
import {
    CalendarDays,
    Clock,
    CheckCircle2,
    XCircle,
    Hourglass,
    Search,
    CalendarRange,
    Plane,
} from "lucide-react";

const leaveRecords = [
    {
        id: 1,
        leaveType: "Annual Leave",
        shortName: "AL",
        startDate: "2026-01-12",
        endDate: "2026-01-14",
        totalDays: 3,
        reason: "Family trip",
        status: "Approved",
    },
    {
        id: 2,
        leaveType: "Casual Leave",
        shortName: "CL",
        startDate: "2026-02-08",
        endDate: "2026-02-08",
        totalDays: 1,
        reason: "Personal work",
        status: "Approved",
    },
    {
        id: 3,
        leaveType: "Sick Leave",
        shortName: "SL",
        startDate: "2026-03-15",
        endDate: "2026-03-16",
        totalDays: 2,
        reason: "Fever and illness",
        status: "Approved",
    },
    {
        id: 4,
        leaveType: "Casual Leave",
        shortName: "CL",
        startDate: "2026-04-20",
        endDate: "2026-04-21",
        totalDays: 2,
        reason: "Personal reason",
        status: "Rejected",
    },
    {
        id: 5,
        leaveType: "Annual Leave",
        shortName: "AL",
        startDate: "2026-06-10",
        endDate: "2026-06-12",
        totalDays: 3,
        reason: "Vacation",
        status: "Approved",
    },
    {
        id: 6,
        leaveType: "Study Leave",
        shortName: "STL",
        startDate: "2026-07-05",
        endDate: "2026-07-06",
        totalDays: 2,
        reason: "Exam preparation",
        status: "Pending",
    },
    {
        id: 7,
        leaveType: "Sick Leave",
        shortName: "SL",
        startDate: "2026-08-18",
        endDate: "2026-08-18",
        totalDays: 1,
        reason: "Medical checkup",
        status: "Approved",
    },
    {
        id: 8,
        leaveType: "Untold Leave",
        shortName: "UL",
        startDate: "2026-10-22",
        endDate: "2026-10-23",
        totalDays: 2,
        reason: "Emergency personal absence",
        status: "Approved",
    },
];

const EmployeeLeaveHistory = () => {
    const [selectedYear, setSelectedYear] = useState("2026");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");

    // Format date
    const formatDate = (date) => {
        return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // Filter records
    const filteredRecords = leaveRecords.filter((leave) => {
        const matchesYear =
            new Date(`${leave.startDate}T00:00:00`).getFullYear() ===
            Number(selectedYear);

        const matchesSearch =
            leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            leave.reason.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            selectedStatus === "All" || leave.status === selectedStatus;

        return matchesYear && matchesSearch && matchesStatus;
    });

    // Summary calculations
    const approvedLeaves = filteredRecords.filter(
        (leave) => leave.status === "Approved"
    );

    const totalApprovedDays = approvedLeaves.reduce(
        (total, leave) => total + leave.totalDays,
        0
    );

    const totalApplications = filteredRecords.length;

    const pendingApplications = filteredRecords.filter(
        (leave) => leave.status === "Pending"
    ).length;

    const rejectedApplications = filteredRecords.filter(
        (leave) => leave.status === "Rejected"
    ).length;

    // Status color
    const statusStyle = {
        Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
        Pending: "bg-amber-100 text-amber-700 border-amber-200",
        Rejected: "bg-rose-100 text-rose-700 border-rose-200",
    };

    // Leave type color
    const leaveStyle = {
        "Annual Leave": "bg-indigo-100 text-indigo-700",
        "Casual Leave": "bg-orange-100 text-orange-700",
        "Sick Leave": "bg-rose-100 text-rose-700",
        "Study Leave": "bg-violet-100 text-violet-700",
        "Untold Leave": "bg-slate-200 text-slate-700",
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6">

            <div className="mx-auto max-w-[1600px] space-y-6">

                {/* Page Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-600">
                            <CalendarDays size={17} />
                            Employee Portal
                        </div>

                        <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
                            My Leave History
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            View all your leave records and application history.
                        </p>
                    </div>

                    {/* Year Filter */}
                    <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 shadow-sm">
                        <CalendarRange size={19} className="text-indigo-600" />

                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="bg-transparent text-sm font-semibold text-slate-700 outline-none"
                        >
                            <option value="2026">Year 2026</option>
                            <option value="2025">Year 2025</option>
                            <option value="2024">Year 2024</option>
                        </select>
                    </div>
                </div>

                {/* Employee Information */}
                <div className="rounded-2xl border border-indigo-100  bg-blue-900  p-5 text-white shadow-md md:p-6">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/15 text-2xl font-bold">
                            RU
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">
                                Rahim Uddin
                            </h2>

                            <p className="mt-1 text-sm text-indigo-100">
                                Frontend Developer
                            </p>

                            <div className="mt-2 flex flex-wrap gap-3 text-xs text-indigo-100">
                                <span>Employee ID: EMP-001</span>
                                <span>Department: Software Development</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-indigo-700">
                                Total Applications
                            </p>
                            <CalendarDays className="text-indigo-600" />
                        </div>

                        <h2 className="mt-3 text-3xl font-bold text-indigo-900">
                            {totalApplications}
                        </h2>

                        <p className="mt-1 text-xs text-indigo-600">
                            Leave requests this year
                        </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-emerald-700">
                                Approved Leave Days
                            </p>
                            <CheckCircle2 className="text-emerald-600" />
                        </div>

                        <h2 className="mt-3 text-3xl font-bold text-emerald-900">
                            {totalApprovedDays}
                        </h2>

                        <p className="mt-1 text-xs text-emerald-600">
                            Total approved days
                        </p>
                    </div>

                    <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-amber-700">
                                Pending Requests
                            </p>
                            <Hourglass className="text-amber-600" />
                        </div>

                        <h2 className="mt-3 text-3xl font-bold text-amber-900">
                            {pendingApplications}
                        </h2>

                        <p className="mt-1 text-xs text-amber-600">
                            Waiting for approval
                        </p>
                    </div>

                    <div className="rounded-2xl border border-rose-100 bg-rose-50 p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-rose-700">
                                Rejected Requests
                            </p>
                            <XCircle className="text-rose-600" />
                        </div>

                        <h2 className="mt-3 text-3xl font-bold text-rose-900">
                            {rejectedApplications}
                        </h2>

                        <p className="mt-1 text-xs text-rose-600">
                            Rejected applications
                        </p>
                    </div>

                </div>

                {/* Leave History Table */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    {/* Table Header */}
                    <div className="flex flex-col gap-4 border-b border-indigo-100 bg-blue-900 p-5 md:flex-row md:items-center md:justify-between">

                        <div>
                            <h2 className="text-lg font-bold text-white">
                                Leave Records
                            </h2>

                            <p className="mt-1 text-xs text-indigo-100">
                                Your complete leave history for {selectedYear}
                            </p>
                        </div>

                        {/* Search */}
                        <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2">
                            <Search size={17} className="text-slate-400" />

                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search leave..."
                                className="w-full bg-transparent text-sm text-slate-700 outline-none md:w-48"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="flex flex-wrap gap-2 border-b border-slate-100 px-5 py-4">
                        {["All", "Approved", "Pending", "Rejected"].map(
                            (status) => (
                                <button
                                    key={status}
                                    onClick={() => setSelectedStatus(status)}
                                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                                        selectedStatus === status
                                            ? "bg-indigo-600 text-white shadow-sm"
                                            : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                                    }`}
                                >
                                    {status}
                                </button>
                            )
                        )}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px] text-left">

                            <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
                            <tr>
                                <th className="px-5 py-4">SL</th>
                                <th className="px-5 py-4">Leave Type</th>
                                <th className="px-5 py-4">Start Date</th>
                                <th className="px-5 py-4">End Date</th>
                                <th className="px-5 py-4">Total Days</th>
                                <th className="px-5 py-4">Reason</th>
                                <th className="px-5 py-4">Status</th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">

                            {filteredRecords.length > 0 ? (
                                filteredRecords.map((leave, index) => (
                                    <tr
                                        key={leave.id}
                                        className="transition hover:bg-indigo-50/60"
                                    >
                                        <td className="px-5 py-4 text-sm font-semibold text-slate-500">
                                            {String(index + 1).padStart(2, "0")}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                    <span className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold ${
                                                        leaveStyle[leave.leaveType] ||
                                                        "bg-slate-100 text-slate-700"
                                                    }`}>
                                                        {leave.shortName}
                                                    </span>

                                                <span className="text-sm font-semibold text-slate-700">
                                                        {leave.leaveType}
                                                    </span>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {formatDate(leave.startDate)}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {formatDate(leave.endDate)}
                                        </td>

                                        <td className="px-5 py-4">
                                                <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-bold text-indigo-700">
                                                    {leave.totalDays} {leave.totalDays === 1 ? "Day" : "Days"}
                                                </span>
                                        </td>

                                        <td className="max-w-[200px] truncate px-5 py-4 text-sm text-slate-500">
                                            {leave.reason}
                                        </td>

                                        <td className="px-5 py-4">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyle[leave.status]}`}>
                                                    {leave.status === "Approved" && <CheckCircle2 size={14} />}
                                                    {leave.status === "Pending" && <Clock size={14} />}
                                                    {leave.status === "Rejected" && <XCircle size={14} />}
                                                    {leave.status}
                                                </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-5 py-16 text-center"
                                    >
                                        <div className="flex flex-col items-center">
                                            <Plane
                                                size={35}
                                                className="mb-3 text-slate-300"
                                            />

                                            <h3 className="font-semibold text-slate-700">
                                                No Leave Records Found
                                            </h3>

                                            <p className="mt-1 text-sm text-slate-400">
                                                No matching leave records for {selectedYear}.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-slate-500">
                            Showing {filteredRecords.length} of {leaveRecords.length} records
                        </p>

                        <p className="text-xs font-semibold text-indigo-700">
                            {selectedYear} Leave History
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EmployeeLeaveHistory;
