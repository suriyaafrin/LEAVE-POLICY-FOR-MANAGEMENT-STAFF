
import React, { useState } from "react";
import {
    Plus,
    CheckCircle2,
    Clock,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    X,
} from "lucide-react";

const initialData = [
    {
        id: 1,
        employeeId: "EMP-101",
        name: "Rahim Uddin",
        department: "Engineering",
        salary: 30000,
        unusedLeave: 5,
        unpaidLeave: 2,
        status: "Pending",
    },
    {
        id: 2,
        employeeId: "EMP-102",
        name: "Nusrat Jahan",
        department: "HR",
        salary: 35000,
        unusedLeave: 8,
        unpaidLeave: 0,
        status: "Pending",
    },
    {
        id: 3,
        employeeId: "EMP-103",
        name: "Sabbir Ahmed",
        department: "Design",
        salary: 28000,
        unusedLeave: 2,
        unpaidLeave: 3,
        status: "Pending",
    },
    {
        id: 4,
        employeeId: "EMP-104",
        name: "Mehedi Hasan",
        department: "Marketing",
        salary: 25000,
        unusedLeave: 0,
        unpaidLeave: 1,
        status: "Approved",
    },
];

const money = (amount) =>
    new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);

const HRLeaveBalanceList = () => {
    const [employees, setEmployees] = useState(initialData);
    const [showForm, setShowForm] = useState(false);

    const [newEmployee, setNewEmployee] = useState({
        employeeId: "",
        name: "",
        department: "",
        salary: "",
        unusedLeave: "",
        unpaidLeave: "",
    });

    // Calculate total encashment
    const totalEncashment = employees.reduce(
        (sum, emp) => sum + (emp.salary / 30) * emp.unusedLeave,
        0
    );

    // Calculate total deduction
    const totalDeduction = employees.reduce(
        (sum, emp) => sum + (emp.salary / 30) * emp.unpaidLeave,
        0
    );

    // Count pending and approved employees
    const pendingCount = employees.filter(
        (emp) => emp.status === "Pending"
    ).length;

    const approvedCount = employees.filter(
        (emp) => emp.status === "Approved"
    ).length;

    // Add new employee calculation
    const handleAddEmployee = (e) => {
        e.preventDefault();

        if (
            !newEmployee.employeeId.trim() ||
            !newEmployee.name.trim() ||
            !newEmployee.salary
        ) {
            return;
        }

        setEmployees((prev) => [
            ...prev,
            {
                id: Date.now(),
                employeeId: newEmployee.employeeId,
                name: newEmployee.name,
                department: newEmployee.department || "N/A",
                salary: Number(newEmployee.salary),
                unusedLeave: Number(newEmployee.unusedLeave || 0),
                unpaidLeave: Number(newEmployee.unpaidLeave || 0),
                status: "Pending",
            },
        ]);

        setNewEmployee({
            employeeId: "",
            name: "",
            department: "",
            salary: "",
            unusedLeave: "",
            unpaidLeave: "",
        });

        setShowForm(false);
    };

    // Approve employee salary adjustment
    const handleApproval = (id) => {
        setEmployees((prev) =>
            prev.map((emp) =>
                emp.id === id
                    ? { ...emp, status: "Approved" }
                    : emp
            )
        );
    };

    return (
        <div className="w-full min-w-0 space-y-5">

            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                        <Wallet size={21} className="text-indigo-600" />
                    </div>

                    <div className="min-w-0">
                        <h2 className="text-lg font-bold text-gray-800">
                            Leave Balance & Salary Adjustment
                        </h2>
                        <p className="text-xs text-gray-500">
                            Employee leave encashment and salary deduction
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setShowForm(!showForm)}
                    className="flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                    {showForm ? <X size={17} /> : <Plus size={17} />}
                    {showForm ? "Close Form" : "Add Calculation"}
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">

                {/* Total Encashment */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500">
                                Total Encashment
                            </p>
                            <h3 className="mt-2 text-xl font-bold text-emerald-600">
                                {money(totalEncashment)}
                            </h3>
                            <p className="mt-1 text-xs text-gray-400">
                                Unused leave payment
                            </p>
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                            <Wallet size={21} className="text-emerald-600" />
                        </div>
                    </div>
                </div>

                {/* Total Deduction */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500">
                                Total Deduction
                            </p>
                            <h3 className="mt-2 text-xl font-bold text-red-500">
                                {money(totalDeduction)}
                            </h3>
                            <p className="mt-1 text-xs text-gray-400">
                                Unpaid leave deduction
                            </p>
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                            <ArrowDownRight size={21} className="text-red-500" />
                        </div>
                    </div>
                </div>

                {/* Approval Status */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500">
                                Approval Status
                            </p>

                            <div className="mt-2 flex items-center gap-5">
                                <div>
                                    <h3 className="text-xl font-bold text-amber-500">
                                        {pendingCount}
                                    </h3>
                                    <p className="text-xs text-gray-400">Pending</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-emerald-600">
                                        {approvedCount}
                                    </h3>
                                    <p className="text-xs text-gray-400">Approved</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                            <Clock size={21} className="text-amber-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Employee Form */}
            {showForm && (
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h3 className="mb-4 text-base font-bold text-gray-800">
                        Add Leave Calculation
                    </h3>

                    <form
                        onSubmit={handleAddEmployee}
                        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
                    >
                        <input
                            required
                            placeholder="Employee ID"
                            value={newEmployee.employeeId}
                            onChange={(e) =>
                                setNewEmployee({
                                    ...newEmployee,
                                    employeeId: e.target.value,
                                })
                            }
                            className="min-w-0 rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-indigo-500"
                        />

                        <input
                            required
                            placeholder="Employee Name"
                            value={newEmployee.name}
                            onChange={(e) =>
                                setNewEmployee({
                                    ...newEmployee,
                                    name: e.target.value,
                                })
                            }
                            className="min-w-0 rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-indigo-500"
                        />

                        <input
                            placeholder="Department"
                            value={newEmployee.department}
                            onChange={(e) =>
                                setNewEmployee({
                                    ...newEmployee,
                                    department: e.target.value,
                                })
                            }
                            className="min-w-0 rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-indigo-500"
                        />

                        <input
                            required
                            type="number"
                            min="0"
                            placeholder="Monthly Salary (৳)"
                            value={newEmployee.salary}
                            onChange={(e) =>
                                setNewEmployee({
                                    ...newEmployee,
                                    salary: e.target.value,
                                })
                            }
                            className="min-w-0 rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-indigo-500"
                        />

                        <input
                            type="number"
                            min="0"
                            placeholder="Unused Leave Days"
                            value={newEmployee.unusedLeave}
                            onChange={(e) =>
                                setNewEmployee({
                                    ...newEmployee,
                                    unusedLeave: e.target.value,
                                })
                            }
                            className="min-w-0 rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-indigo-500"
                        />

                        <input
                            type="number"
                            min="0"
                            placeholder="Unpaid Leave Days"
                            value={newEmployee.unpaidLeave}
                            onChange={(e) =>
                                setNewEmployee({
                                    ...newEmployee,
                                    unpaidLeave: e.target.value,
                                })
                            }
                            className="min-w-0 rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-indigo-500"
                        />

                        <div className="flex flex-wrap gap-3 sm:col-span-2 xl:col-span-3">
                            <button
                                type="submit"
                                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                            >
                                Add Calculation
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Employee Salary Adjustment Table */}
            <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                <div className="border-b border-gray-100 px-4 py-4">
                    <h3 className="font-bold text-gray-800">
                        Employee Salary Adjustment
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                        Review employee leave balance and approve adjustments
                    </p>
                </div>

                {/* No horizontal scroll */}
                <div className="w-full min-w-0">
                    <table className="w-full table-fixed text-xs">

                        <colgroup>
                            <col className="w-[18%]" />
                            <col className="w-[11%]" />
                            <col className="w-[11%]" />
                            <col className="w-[14%]" />
                            <col className="w-[10%]" />
                            <col className="w-[14%]" />
                            <col className="w-[12%]" />
                            <col className="w-[10%]" />
                        </colgroup>

                        <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="break-words px-1.5 py-3 text-left font-semibold sm:px-2">
                                Employee
                            </th>
                            <th className="break-words px-1 py-3 text-right font-semibold">
                                Salary
                            </th>
                            <th className="break-words px-1 py-3 text-center font-semibold">
                                Unused Days
                            </th>
                            <th className="break-words px-1 py-3 text-right font-semibold">
                                Encashment (+)
                            </th>
                            <th className="break-words px-1 py-3 text-center font-semibold">
                                Unpaid Days
                            </th>
                            <th className="break-words px-1 py-3 text-right font-semibold">
                                Deduction (-)
                            </th>
                            <th className="break-words px-1 py-3 text-right font-semibold">
                                Net Adjustment
                            </th>
                            <th className="break-words px-1 py-3 text-center font-semibold">
                                HR Approval
                            </th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                        {employees.map((emp) => {
                            const dailySalary = emp.salary / 30;
                            const encashment = dailySalary * emp.unusedLeave;
                            const deduction = dailySalary * emp.unpaidLeave;
                            const net = encashment - deduction;

                            return (
                                <tr
                                    key={emp.id}
                                    className="transition hover:bg-gray-50"
                                >
                                    <td className="break-words px-1.5 py-4 sm:px-2">
                                        <p className="font-semibold text-gray-800">
                                            {emp.name}
                                        </p>
                                        <p className="mt-1 break-words text-[10px] text-gray-400">
                                            {emp.employeeId} · {emp.department}
                                        </p>
                                    </td>

                                    <td className="px-1 py-4 text-right text-gray-700">
                                            <span className="break-words">
                                                {money(emp.salary)}
                                            </span>
                                    </td>

                                    <td className="px-1 py-4 text-center">
                                            <span className="inline-block rounded-md bg-emerald-50 px-1 py-1 font-medium text-emerald-700">
                                                {emp.unusedLeave} days
                                            </span>
                                    </td>

                                    <td className="break-words px-1 py-4 text-right font-semibold text-emerald-600">
                                        + {money(encashment)}
                                    </td>

                                    <td className="px-1 py-4 text-center">
                                            <span className="inline-block rounded-md bg-red-50 px-1 py-1 font-medium text-red-600">
                                                {emp.unpaidLeave} days
                                            </span>
                                    </td>

                                    <td className="break-words px-1 py-4 text-right font-semibold text-red-500">
                                        - {money(deduction)}
                                    </td>

                                    <td className="px-1 py-4 text-right">
                                            <span
                                                className={`inline-flex flex-wrap items-center justify-end gap-0.5 font-bold ${
                                                    net >= 0
                                                        ? "text-emerald-600"
                                                        : "text-red-500"
                                                }`}
                                            >
                                                {net >= 0 ? (
                                                    <ArrowUpRight size={13} />
                                                ) : (
                                                    <ArrowDownRight size={13} />
                                                )}
                                                {money(net)}
                                            </span>
                                    </td>

                                    <td className="px-1 py-4 text-center">
                                        {emp.status === "Approved" ? (
                                            <span className="inline-flex flex-wrap items-center justify-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-1 text-[10px] font-semibold text-emerald-600">
                                                    <CheckCircle2 size={12} />
                                                    Approved
                                                </span>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleApproval(emp.id)}
                                                className="rounded-md bg-indigo-600 px-2 py-1.5 text-[10px] font-semibold text-white transition hover:bg-indigo-700"
                                            >
                                                Approve
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Formula */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-500">
                <p>
                    <strong>Calculation:</strong> Daily salary = Monthly salary ÷ 30
                </p>
                <p className="mt-2">
                    Encashment = Daily salary × Unused leave days
                </p>
                <p className="mt-2">
                    Deduction = Daily salary × Unpaid leave days
                </p>
            </div>
        </div>
    );
};

export default HRLeaveBalanceList;
