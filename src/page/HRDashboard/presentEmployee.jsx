
import React, { useState } from "react";
import {
    Users,
    UserCheck,
    UserX,
    X,
    CalendarDays,
} from "lucide-react";

// Sample employee attendance data
const employees = [
    { id: 1, name: "Rahim Uddin", department: "Engineering", status: "Present" },
    { id: 2, name: "Nusrat Jahan", department: "HR", status: "Present" },
    { id: 3, name: "Sabbir Ahmed", department: "Design", status: "Absent" },
    { id: 4, name: "Mehedi Hasan", department: "Marketing", status: "Present" },
    { id: 5, name: "Tanvir Ahmed", department: "Engineering", status: "Absent" },
    { id: 6, name: "Sadia Islam", department: "QA", status: "Present" },
    { id: 7, name: "Imran Hossain", department: "Management", status: "Absent" },
    { id: 8, name: "Farhana Akter", department: "HR", status: "Present" },
];

const PresentEmployee = () => {
    const [selectedStatus, setSelectedStatus] = useState(null);

    // Calculate attendance
    const presentEmployees = employees.filter(
        (emp) => emp.status === "Present"
    );

    const absentEmployees = employees.filter(
        (emp) => emp.status === "Absent"
    );

    const totalEmployees = employees.length;

    const presentPercentage =
        (presentEmployees.length / totalEmployees) * 100;

    const absentPercentage =
        (absentEmployees.length / totalEmployees) * 100;

    // Select employee status
    const handleStatusClick = (status) => {
        setSelectedStatus((prev) =>
            prev === status ? null : status
        );
    };

    const filteredEmployees =
        selectedStatus === "Present"
            ? presentEmployees
            : absentEmployees;

    return (
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                    <Users size={22} className="text-indigo-600" />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-gray-800">
                        Employee Attendance
                    </h2>
                    <p className="text-xs text-gray-500">
                        Present and absent employee overview
                    </p>
                </div>
            </div>

            {/* Donut Chart */}
            <div className="flex flex-col items-center">

                <div
                    className="relative flex h-52 w-52 items-center justify-center rounded-full transition-all"
                    style={{
                        background: `conic-gradient(
                            #10B981 0% ${presentPercentage}%,
                            #F87171 ${presentPercentage}% 100%
                        )`,
                    }}
                >
                    {/* Clickable Present Area */}
                    <button
                        type="button"
                        onClick={() => handleStatusClick("Present")}
                        title="Show present employees"
                        aria-label="Show present employees"
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: `conic-gradient(
                                transparent 0% ${presentPercentage}%,
                                transparent ${presentPercentage}% 100%
                            )`,
                            clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)`,
                            opacity: 0,
                        }}
                    />

                    {/* Chart inner circle */}
                    <div className="pointer-events-none flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white shadow-inner">
                        <span className="text-3xl font-bold text-gray-800">
                            {totalEmployees}
                        </span>
                        <span className="mt-1 text-xs text-gray-500">
                            Total Employees
                        </span>
                    </div>

                    {/* Chart segment buttons */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute inset-0">
                            <button
                                type="button"
                                onClick={() => handleStatusClick("Present")}
                                className="absolute inset-0 cursor-pointer rounded-full"
                                aria-label="View present employees"
                                style={{
                                    background: "transparent",
                                    clipPath: `polygon(50% 0%, 100% 0%, 100% 100%, 50% 50%)`,
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => handleStatusClick("Absent")}
                                className="absolute inset-0 cursor-pointer rounded-full"
                                aria-label="View absent employees"
                                style={{
                                    background: "transparent",
                                    clipPath: `polygon(50% 50%, 50% 100%, 0% 100%, 0% 0%, 50% 0%)`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Attendance Legend */}
                <div className="mt-6 grid w-full grid-cols-2 gap-3">

                    <button
                        type="button"
                        onClick={() => handleStatusClick("Present")}
                        className={`rounded-xl border p-3 text-left transition ${
                            selectedStatus === "Present"
                                ? "border-emerald-400 bg-emerald-100"
                                : "border-transparent bg-emerald-50 hover:bg-emerald-100"
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <UserCheck size={17} className="text-emerald-600" />
                            <span className="text-sm font-medium text-gray-600">
                                Present
                            </span>
                        </div>

                        <h3 className="mt-2 text-2xl font-bold text-emerald-600">
                            {presentEmployees.length}
                        </h3>

                        <p className="text-xs text-emerald-700">
                            {presentPercentage.toFixed(1)}%
                        </p>
                    </button>

                    <button
                        type="button"
                        onClick={() => handleStatusClick("Absent")}
                        className={`rounded-xl border p-3 text-left transition ${
                            selectedStatus === "Absent"
                                ? "border-red-400 bg-red-100"
                                : "border-transparent bg-red-50 hover:bg-red-100"
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <UserX size={17} className="text-red-500" />
                            <span className="text-sm font-medium text-gray-600">
                                Absent
                            </span>
                        </div>

                        <h3 className="mt-2 text-2xl font-bold text-red-500">
                            {absentEmployees.length}
                        </h3>

                        <p className="text-xs text-red-600">
                            {absentPercentage.toFixed(1)}%
                        </p>
                    </button>
                </div>
            </div>

            {/* Employee List */}
            {selectedStatus && (
                <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">

                    {/* List Header */}
                    <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 p-4">
                        <div>
                            <h3 className="font-bold text-gray-800">
                                {selectedStatus} Employees
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                                {filteredEmployees.length} employees found
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setSelectedStatus(null)}
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-200"
                            aria-label="Close employee list"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Employee Rows */}
                    <div className="divide-y divide-gray-100">
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((emp) => (
                                <div
                                    key={emp.id}
                                    className="flex items-center justify-between gap-3 p-4 transition hover:bg-gray-50"
                                >
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold ${
                                            emp.status === "Present"
                                                ? "bg-emerald-100 text-emerald-600"
                                                : "bg-red-100 text-red-500"
                                        }`}>
                                            {emp.name.charAt(0)}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-gray-800">
                                                {emp.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {emp.department}
                                            </p>
                                        </div>
                                    </div>

                                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                                        emp.status === "Present"
                                            ? "bg-emerald-50 text-emerald-600"
                                            : "bg-red-50 text-red-500"
                                    }`}>
                                        {emp.status}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="p-5 text-center text-sm text-gray-500">
                                No employees found.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PresentEmployee;
