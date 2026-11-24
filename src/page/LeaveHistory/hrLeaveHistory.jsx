
import React, { useMemo, useState } from "react";
import {
    Search,
    Users,
    CalendarDays,
    X,
    CheckCircle2,
    XCircle,
    Clock,
    BriefcaseBusiness,
    Eye,
    UserRound,
} from "lucide-react";

// Employee এবং HR সবার Leave History
const employees = [
    {
        id: "EMP-001",
        name: "Rahim Uddin",
        role: "Frontend Developer",
        department: "Software Development",
        image: "https://i.pravatar.cc/150?img=12",
        leaves: [
            { type: "Annual Leave", start: "2026-01-12", end: "2026-01-14", days: 3, reason: "Family trip", status: "Approved" },
            { type: "Casual Leave", start: "2026-02-08", end: "2026-02-08", days: 1, reason: "Personal work", status: "Approved" },
            { type: "Sick Leave", start: "2026-03-15", end: "2026-03-16", days: 2, reason: "Fever and illness", status: "Approved" },
            { type: "Casual Leave", start: "2026-04-20", end: "2026-04-21", days: 2, reason: "Personal reason", status: "Rejected" },
            { type: "Study Leave", start: "2026-07-05", end: "2026-07-06", days: 2, reason: "Exam preparation", status: "Pending" },
        ],
    },
    {
        id: "EMP-002",
        name: "Nusrat Jahan",
        role: "UI Designer",
        department: "Design",
        image: "https://i.pravatar.cc/150?img=47",
        leaves: [
            { type: "Annual Leave", start: "2026-01-20", end: "2026-01-22", days: 3, reason: "Personal vacation", status: "Approved" },
            { type: "Sick Leave", start: "2026-03-10", end: "2026-03-10", days: 1, reason: "Not feeling well", status: "Approved" },
            { type: "Casual Leave", start: "2026-06-15", end: "2026-06-16", days: 2, reason: "Family program", status: "Pending" },
        ],
    },
    {
        id: "EMP-003",
        name: "Tanvir Ahmed",
        role: "Backend Developer",
        department: "Software Development",
        image: "https://i.pravatar.cc/150?img=13",
        leaves: [
            { type: "Casual Leave", start: "2026-02-12", end: "2026-02-12", days: 1, reason: "Personal work", status: "Approved" },
            { type: "Annual Leave", start: "2026-05-05", end: "2026-05-08", days: 4, reason: "Travel", status: "Rejected" },
            { type: "Sick Leave", start: "2026-09-10", end: "2026-09-11", days: 2, reason: "Medical issue", status: "Approved" },
        ],
    },
    {
        id: "EMP-004",
        name: "Sadia Islam",
        role: "QA Engineer",
        department: "Quality Assurance",
        image: "https://i.pravatar.cc/150?img=44",
        leaves: [
            { type: "Sick Leave", start: "2026-01-08", end: "2026-01-09", days: 2, reason: "Fever", status: "Approved" },
            { type: "Casual Leave", start: "2026-04-18", end: "2026-04-18", days: 1, reason: "Personal work", status: "Rejected" },
            { type: "Annual Leave", start: "2026-08-10", end: "2026-08-12", days: 3, reason: "Family vacation", status: "Pending" },
        ],
    },
    {
        id: "EMP-005",
        name: "Imran Hossain",
        role: "Product Manager",
        department: "Management",
        image: "https://i.pravatar.cc/150?img=14",
        leaves: [
            { type: "Annual Leave", start: "2026-03-02", end: "2026-03-04", days: 3, reason: "Personal vacation", status: "Approved" },
            { type: "Casual Leave", start: "2026-07-12", end: "2026-07-12", days: 1, reason: "Personal reason", status: "Pending" },
        ],
    },
    {
        id: "EMP-006",
        name: "Farhana Akter",
        role: "HR Executive",
        department: "Human Resources",
        image: "https://i.pravatar.cc/150?img=45",
        leaves: [
            { type: "Maternity Leave", start: "2026-02-01", end: "2026-02-05", days: 5, reason: "Family reason", status: "Approved" },
            { type: "Casual Leave", start: "2026-06-20", end: "2026-06-20", days: 1, reason: "Personal work", status: "Pending" },
        ],
    },
    {
        id: "EMP-007",
        name: "Mehedi Hasan",
        role: "DevOps Engineer",
        department: "IT Operations",
        image: "https://i.pravatar.cc/150?img=15",
        leaves: [
            { type: "Annual Leave", start: "2026-04-05", end: "2026-04-07", days: 3, reason: "Travel", status: "Approved" },
            { type: "Sick Leave", start: "2026-10-10", end: "2026-10-10", days: 1, reason: "Illness", status: "Rejected" },
        ],
    },
    {
        id: "EMP-008",
        name: "Tasnim Rahman",
        role: "Content Writer",
        department: "Marketing",
        image: "https://i.pravatar.cc/150?img=46",
        leaves: [
            { type: "Casual Leave", start: "2026-03-18", end: "2026-03-19", days: 2, reason: "Personal work", status: "Approved" },
            { type: "Study Leave", start: "2026-08-15", end: "2026-08-16", days: 2, reason: "Exam", status: "Pending" },
        ],
    },


    {
        id: "HR-001",
        name: "Suriya Afrin",
        role: "HR Manager",
        department: "Human Resources",
        image: "https://i.pravatar.cc/150?img=47",
        isHR: true,
        leaves: [
            { type: "Annual Leave", start: "2026-01-05", end: "2026-01-07", days: 3, reason: "Family vacation", status: "Approved" },
            { type: "Casual Leave", start: "2026-03-12", end: "2026-03-12", days: 1, reason: "Personal work", status: "Approved" },
            { type: "Sick Leave", start: "2026-05-18", end: "2026-05-19", days: 2, reason: "Fever and illness", status: "Approved" },
            { type: "Annual Leave", start: "2026-09-20", end: "2026-09-22", days: 3, reason: "Personal vacation", status: "Pending" },
            { type: "Casual Leave", start: "2026-10-15", end: "2026-10-15", days: 1, reason: "Personal reason", status: "Rejected" },
        ],
    },
];

const statusStyle = {
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Rejected: "bg-rose-50 text-rose-700 border-rose-200",
};

const statusIcon = {
    Approved: CheckCircle2,
    Pending: Clock,
    Rejected: XCircle,
};

const formatDate = (date) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const HrLeaveHistory = () => {
    const [search, setSearch] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedYear, setSelectedYear] = useState("2026");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredEmployees = useMemo(() => {
        return employees.filter((employee) =>
            `${employee.name} ${employee.id} ${employee.role}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search]);


    const filteredLeaves = selectedEmployee?.leaves.filter((leave) => {
        const yearMatch = leave.start.startsWith(selectedYear);
        const statusMatch =
            statusFilter === "All" || leave.status === statusFilter;

        return yearMatch && statusMatch;
    }) || [];

    const getCounts = (employee) => {
        const leaves = employee.leaves;

        return {
            total: leaves.length,
            approved: leaves.filter((l) => l.status === "Approved").length,
            pending: leaves.filter((l) => l.status === "Pending").length,
            rejected: leaves.filter((l) => l.status === "Rejected").length,
        };
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6">
            <div className="mx-auto max-w-[1500px] space-y-6">

                {/* Header */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-indigo-600">
                            <CalendarDays size={20} />
                            <span className="text-sm font-semibold">Leave Management</span>
                        </div>

                        <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
                            HR Leave History
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            View leave records of all employees and HR.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 shadow-sm">
                        <Users className="text-indigo-600" size={22} />
                        <div>
                            <p className="text-xl font-bold text-slate-800">
                                {employees.length}
                            </p>
                            <p className="text-xs text-slate-500">Total Members</p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search
                            size={19}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="text"
                            placeholder="Search employee or HR..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>

                    <p className="text-sm text-slate-500">
                        Showing <span className="font-bold text-indigo-600">{filteredEmployees.length}</span> members
                    </p>
                </div>

                {/* Employee Cards */}
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800">
                            All Members
                        </h2>
                        <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                            Employees + HR
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredEmployees.map((employee) => {
                            const counts = getCounts(employee);

                            return (
                                <div
                                    key={employee.id}
                                    onClick={() => {
                                        setSelectedEmployee(employee);
                                        setSelectedYear("2026");
                                        setStatusFilter("All");
                                    }}
                                    className={`group cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                                        employee.isHR
                                            ? "border-orange-200 hover:border-orange-400"
                                            : "border-slate-200 hover:border-indigo-300"
                                    }`}
                                >
                                    {/* Card Top */}
                                    <div className={`h-2 ${employee.isHR ? "bg-orange-500" : "bg-blue-900"}`} />

                                    <div className="p-5">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <img
                                                    src={employee.image}
                                                    alt={employee.name}
                                                    className="h-14 w-14 rounded-full border-2 border-white object-cover shadow"
                                                />
                                                <span className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${employee.isHR ? "bg-orange-500" : "bg-emerald-500"}`} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="truncate font-bold text-slate-800">
                                                        {employee.name}
                                                    </h3>

                                                    {employee.isHR && (
                                                        <span className="rounded-md bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-700">
                                                            HR
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    {employee.role}
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    {employee.id}
                                                </p>
                                            </div>

                                            <Eye
                                                size={19}
                                                className="shrink-0 text-slate-300 transition group-hover:text-indigo-600"
                                            />
                                        </div>

                                        <div className="mt-4 border-t border-slate-100 pt-4">
                                            <p className="mb-3 text-xs text-slate-500">
                                                Leave Applications
                                            </p>

                                            <div className="grid grid-cols-4 gap-2 text-center">
                                                <div className="rounded-lg bg-slate-50 p-2">
                                                    <p className="text-lg font-bold text-slate-800">{counts.total}</p>
                                                    <p className="text-[10px] text-slate-500">Total</p>
                                                </div>

                                                <div className="rounded-lg bg-emerald-50 p-2">
                                                    <p className="text-lg font-bold text-emerald-700">{counts.approved}</p>
                                                    <p className="text-[10px] text-emerald-600">Approved</p>
                                                </div>

                                                <div className="rounded-lg bg-amber-50 p-2">
                                                    <p className="text-lg font-bold text-amber-700">{counts.pending}</p>
                                                    <p className="text-[10px] text-amber-600">Pending</p>
                                                </div>

                                                <div className="rounded-lg bg-rose-50 p-2">
                                                    <p className="text-lg font-bold text-rose-700">{counts.rejected}</p>
                                                    <p className="text-[10px] text-rose-600">Rejected</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`mt-4 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${
                                            employee.isHR
                                                ? "bg-orange-50 text-orange-700 group-hover:bg-orange-500 group-hover:text-white"
                                                : "bg-indigo-50 text-indigo-700 group-hover:bg-blue-900 group-hover:text-white"
                                        }`}>
                                            View Leave History
                                            <Eye size={16} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredEmployees.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                            <UserRound className="mx-auto mb-3 text-slate-300" size={35} />
                            <h3 className="font-semibold text-slate-700">No member found</h3>
                            <p className="mt-1 text-sm text-slate-500">Try another name or employee ID.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Leave History Modal */}
            {selectedEmployee && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm"
                    onClick={() => setSelectedEmployee(null)}
                >
                    <div
                        className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className={`sticky top-0 z-10 flex items-center justify-between border-b p-5 ${
                            selectedEmployee.isHR ? "border-orange-100 bg-orange-50" : "border-indigo-100 bg-indigo-50"
                        }`}>
                            <div className="flex items-center gap-3">
                                <img
                                    src={selectedEmployee.image}
                                    alt={selectedEmployee.name}
                                    className="h-12 w-12 rounded-full border-2 border-white object-cover shadow"
                                />

                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="text-lg font-bold text-slate-800">
                                            {selectedEmployee.name}
                                        </h2>
                                        {selectedEmployee.isHR && (
                                            <span className="rounded-md bg-orange-200 px-2 py-1 text-xs font-bold text-orange-800">
                                                HR
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-500">
                                        {selectedEmployee.role} · {selectedEmployee.id}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedEmployee(null)}
                                className="rounded-full bg-white p-2 text-slate-500 transition hover:bg-rose-100 hover:text-rose-600"
                            >
                                <X size={21} />
                            </button>
                        </div>

                        <div className="space-y-5 p-5">
                            {/* Filters */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="font-bold text-slate-800">Leave Records</h3>
                                    <p className="text-xs text-slate-500">
                                        {selectedEmployee.department}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400"
                                    >
                                        <option value="2026">2026</option>
                                        <option value="2025">2025</option>
                                        <option value="2024">2024</option>
                                    </select>

                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400"
                                    >
                                        <option value="All">All Status</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-500">Applications</p>
                                    <p className="mt-1 text-2xl font-bold text-slate-800">{filteredLeaves.length}</p>
                                </div>

                                <div className="rounded-xl bg-emerald-50 p-4">
                                    <p className="text-xs text-emerald-600">Approved</p>
                                    <p className="mt-1 text-2xl font-bold text-emerald-700">
                                        {filteredLeaves.filter(l => l.status === "Approved").length}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-amber-50 p-4">
                                    <p className="text-xs text-amber-600">Pending</p>
                                    <p className="mt-1 text-2xl font-bold text-amber-700">
                                        {filteredLeaves.filter(l => l.status === "Pending").length}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-rose-50 p-4">
                                    <p className="text-xs text-rose-600">Rejected</p>
                                    <p className="mt-1 text-2xl font-bold text-rose-700">
                                        {filteredLeaves.filter(l => l.status === "Rejected").length}
                                    </p>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto rounded-xl border border-slate-200">
                                <table className="w-full min-w-[850px] text-left text-sm">
                                    <thead className="bg-slate-100 text-xs uppercase text-slate-600">
                                    <tr>
                                        <th className="px-4 py-4">SL</th>
                                        <th className="px-4 py-4">Leave Type</th>
                                        <th className="px-4 py-4">Start Date</th>
                                        <th className="px-4 py-4">End Date</th>
                                        <th className="px-4 py-4">Days</th>
                                        <th className="px-4 py-4">Reason</th>
                                        <th className="px-4 py-4">Status</th>
                                    </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                    {filteredLeaves.map((leave, index) => {
                                        const Icon = statusIcon[leave.status];

                                        return (
                                            <tr key={`${leave.start}-${index}`} className="transition hover:bg-slate-50">
                                                <td className="px-4 py-4 font-medium text-slate-500">{index + 1}</td>

                                                <td className="px-4 py-4">
                                                        <span className="inline-flex items-center gap-2 font-semibold text-slate-700">
                                                            <BriefcaseBusiness size={15} className="text-indigo-500" />
                                                            {leave.type}
                                                        </span>
                                                </td>

                                                <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                                                    {formatDate(leave.start)}
                                                </td>

                                                <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                                                    {formatDate(leave.end)}
                                                </td>

                                                <td className="px-4 py-4">
                                                        <span className="rounded-lg bg-indigo-50 px-3 py-1 font-bold text-indigo-700">
                                                            {leave.days} {leave.days === 1 ? "Day" : "Days"}
                                                        </span>
                                                </td>

                                                <td className="max-w-[200px] px-4 py-4 text-slate-500">
                                                    {leave.reason}
                                                </td>

                                                <td className="px-4 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyle[leave.status]}`}>
                                                            <Icon size={14} />
                                                            {leave.status}
                                                        </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>

                                {filteredLeaves.length === 0 && (
                                    <div className="p-10 text-center">
                                        <CalendarDays className="mx-auto mb-2 text-slate-300" size={35} />
                                        <p className="font-semibold text-slate-700">No leave records found</p>
                                        <p className="mt-1 text-sm text-slate-500">
                                            No records for {selectedYear} with this status.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <p className="text-right text-xs text-slate-400">
                                Showing {filteredLeaves.length} leave records
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HrLeaveHistory;
