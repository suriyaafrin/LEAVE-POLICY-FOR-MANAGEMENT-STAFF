
import React, { useMemo, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    CalendarDays,
    Wallet,
    BriefcaseBusiness,
    TrendingUp,
    TrendingDown,
    Mail,
    Phone,
    Building2,
    IdCard,
    X,
    CheckCircle2,
    Clock,
    XCircle,
    UserCheck,
    FileText,
} from "lucide-react";

import WorkLeaveRatio from "./workLeaveRatio.jsx";
import LeaveApplication from "./leaveApplication.jsx";
import { getHolidayForDate } from "../../Data/holidays.js";

// ==========================================
// EMPLOYEE DATA
// ==========================================

const employees = [
    {
        id: 1,
        name: "Rahim Uddin",
        role: "Frontend Developer",
        image: "https://i.pravatar.cc/100?img=12",
    },
    {
        id: 2,
        name: "Nusrat Jahan",
        role: "UI Designer",
        image: "https://i.pravatar.cc/100?img=47",
    },
    {
        id: 3,
        name: "Tanvir Ahmed",
        role: "Backend Developer",
        image: "https://i.pravatar.cc/100?img=13",
    },
    {
        id: 4,
        name: "Sadia Islam",
        role: "QA Engineer",
        image: "https://i.pravatar.cc/100?img=44",
    },
    {
        id: 5,
        name: "Imran Hossain",
        role: "Product Manager",
        image: "https://i.pravatar.cc/100?img=14",
    },
    {
        id: 6,
        name: "Farhana Akter",
        role: "HR Executive",
        image: "https://i.pravatar.cc/100?img=45",
    },
    {
        id: 7,
        name: "Mehedi Hasan",
        role: "DevOps Engineer",
        image: "https://i.pravatar.cc/100?img=15",
    },
    {
        id: 8,
        name: "Tasnim Rahman",
        role: "Content Writer",
        image: "https://i.pravatar.cc/100?img=46",
    },
];

// ==========================================
// EMPLOYEE PROFILE
// ==========================================

const employeeProfile = {
    name: "Rahim Uddin",
    employeeId: "EMP-001",
    gender: "Male",
    age: 35,
    designation: "Frontend Developer",
    department: "Software Development",
    email: "rahim@example.com",
    phone: "+880 1712-345678",
    image: "https://i.pravatar.cc/150?img=12",
    status: "Active",

    // Important: Joining date must be inside employeeProfile
    joiningDate: "2025-01-15",
};

// ==========================================
// INITIAL LEAVE DATA
// ==========================================

const initialLeaves = [
    {
        id: 1,
        employeeId: 1,
        start: "2026-11-03",
        end: "2026-11-05",
        type: "Sick",
        status: "approved",
    },
    {
        id: 2,
        employeeId: 1,
        start: "2026-11-24",
        end: "2026-11-26",
        type: "Casual",
        status: "pending",
    },
    {
        id: 3,
        employeeId: 2,
        start: "2026-11-10",
        end: "2026-11-14",
        type: "Annual",
        status: "approved",
    },
    {
        id: 4,
        employeeId: 3,
        start: "2026-11-18",
        end: "2026-11-19",
        type: "Casual",
        status: "rejected",
        rejectedAtStage: "Manager",
        rejectedBy: "Abdul Karim",
        rejectionReason:
            "Insufficient leave balance and project deadline conflict.",
        rejectedDate: "2026-11-17",
    },
    {
        id: 5,
        employeeId: 3,
        start: "2026-11-29",
        end: "2026-12-02",
        type: "Annual",
        status: "pending",
    },
    {
        id: 6,
        employeeId: 4,
        start: "2026-11-06",
        end: "2026-11-06",
        type: "Sick",
        status: "approved",
    },
    {
        id: 7,
        employeeId: 4,
        start: "2026-11-23",
        end: "2026-11-25",
        type: "Sick",
        status: "approved",
    },
    {
        id: 8,
        employeeId: 5,
        start: "2026-11-16",
        end: "2026-11-20",
        type: "Annual",
        status: "pending",
    },
    {
        id: 9,
        employeeId: 6,
        start: "2026-11-09",
        end: "2026-11-11",
        type: "Casual",
        status: "approved",
    },
    {
        id: 10,
        employeeId: 7,
        start: "2026-11-12",
        end: "2026-11-13",
        type: "Casual",
        status: "rejected",
        rejectedAtStage: "Team Lead",
        rejectedBy: "Mahmud Hasan",
        rejectionReason:
            "The employee's presence is required for the scheduled deployment.",
        rejectedDate: "2026-11-10",
    },
    {
        id: 11,
        employeeId: 7,
        start: "2026-11-27",
        end: "2026-11-30",
        type: "Annual",
        status: "approved",
    },
    {
        id: 12,
        employeeId: 8,
        start: "2026-11-02",
        end: "2026-11-04",
        type: "Sick",
        status: "pending",
    },
];

// ==========================================
// INITIAL LEAVE BALANCES
// ==========================================

const initialLeaveBalances = [
    {
        name: "Annual Leave (AL)",
        shortName: "Annual",
        total: 3,
        used: 1,
    },
    {
        name: "Casual Leave (CL)",
        shortName: "Casual",
        total: 3,
        used: 2,
    },
    {
        name: "Sick Leave (SL)",
        shortName: "Sick",
        total: 3,
        used: 1,
    },
    {
        name: "Maternity Leave",
        shortName: "Maternity",
        total: 3,
        used: 0,
    },
    {
        name: "Quarantine Leave",
        shortName: "Quarantine",
        total: 3,
        used: 1,
    },
    {
        name: "Study Leave",
        shortName: "Study",
        total: 3,
        used: 1,
    },
    {
        name: "Disability Leave",
        shortName: "Disability",
        total: 3,
        used: 1,
    },
    {
        name: "Extra Ordinary Leave",
        shortName: "Extra Ordinary",
        total: 3,
        used: 1,
    },
    {
        name: "Untold Leave (UL)",
        shortName: "Untold",
        total: 0,
        used: 2,
    },
];

// ==========================================
// STATUS STYLES
// ==========================================

const statusStyles = {
    approved: "bg-green-100 text-green-700 border-green-300",
    pending: "bg-amber-100 text-amber-700 border-amber-300",
    rejected: "bg-red-100 text-red-700 border-red-300",
};

// ==========================================
// APPROVAL TRACKING
// ==========================================

const getApprovalSteps = (leave) => {
    const steps = [
        {
            role: "Team Lead",
            name: "Mahmud Hasan",
            status: "waiting",
        },
        {
            role: "Manager",
            name: "Abdul Karim",
            status: "waiting",
        },
        {
            role: "HR",
            name: "Farhana Akter",
            status: "waiting",
        },
    ];

    if (leave.status === "approved") {
        return steps.map((step) => ({
            ...step,
            status: "approved",
        }));
    }

    if (leave.status === "rejected") {
        const rejectedIndex = {
            "Team Lead": 0,
            Manager: 1,
            HR: 2,
        }[leave.rejectedAtStage] ?? 1;

        return steps.map((step, index) => ({
            ...step,

            name:
                index === rejectedIndex
                    ? leave.rejectedBy || step.name
                    : step.name,

            status:
                index < rejectedIndex
                    ? "approved"
                    : index === rejectedIndex
                        ? "rejected"
                        : "waiting",
        }));
    }

    return steps.map((step, index) => ({
        ...step,
        status: index === 0 ? "pending" : "waiting",
    }));
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const EmployeeDash = () => {
    const [leaves, setLeaves] = useState(initialLeaves);

    const [selectedLeave, setSelectedLeave] = useState(null);
    const [selectedTracking, setSelectedTracking] = useState(null);

    const [currentDate, setCurrentDate] = useState(
        new Date(2026, 10, 1)
    );

    const [leaveBalances] = useState(initialLeaveBalances);

    // ==========================================
    // JOINING DATE FIX
    // ==========================================

    // Get joining date directly from employeeProfile
    const joiningDate = employeeProfile.joiningDate;

    const monthlySalary = 30000;

    const employeeGender = employeeProfile.gender;
    const isMale = employeeGender.toLowerCase() === "male";

    // Validate joining date before calculating service duration
    const isValidJoiningDate =
        Boolean(joiningDate) &&
        !Number.isNaN(new Date(`${joiningDate}T00:00:00`).getTime());

    const joining = isValidJoiningDate
        ? new Date(`${joiningDate}T00:00:00`)
        : null;

    const today = new Date();

    let yearsOfService = 0;
    let monthsOfService = 0;

    if (joining) {
        yearsOfService =
            today.getFullYear() - joining.getFullYear();

        monthsOfService =
            today.getMonth() - joining.getMonth();

        if (today.getDate() < joining.getDate()) {
            monthsOfService--;
        }

        if (monthsOfService < 0) {
            yearsOfService--;
            monthsOfService += 12;
        }
    }

    // ==========================================
    // LEAVE BALANCE CALCULATIONS
    // ==========================================

    const untoldLeave = leaveBalances.find(
        (leave) => leave.shortName === "Untold"
    );

    const unpaidLeaveDays = untoldLeave
        ? untoldLeave.used
        : 0;

    const totalLeaveDays = leaveBalances.reduce(
        (total, leave) => total + leave.total,
        0
    );

    const totalUsedDays = leaveBalances.reduce(
        (total, leave) => total + leave.used,
        0
    );

    const totalRemainingDays = leaveBalances.reduce(
        (total, leave) => {
            if (leave.shortName === "Untold") {
                return total;
            }

            if (leave.shortName === "Maternity" && isMale) {
                return total;
            }

            return (
                total +
                Math.max(0, leave.total - leave.used)
            );
        },
        0
    );

    const annualLeave = leaveBalances.find(
        (leave) => leave.shortName === "Annual"
    );

    const unusedAnnualLeave = annualLeave
        ? Math.max(0, annualLeave.total - annualLeave.used)
        : 0;

    // ==========================================
    // SALARY CALCULATION
    // ==========================================

    const dailySalary = monthlySalary / 30;

    const annualLeaveAmount =
        unusedAnnualLeave * dailySalary;

    const unpaidDeduction =
        unpaidLeaveDays * dailySalary;

    const netAdjustment =
        annualLeaveAmount - unpaidDeduction;

    const formatMoney = (amount) => {
        return `৳${amount.toLocaleString("en-BD", {
            maximumFractionDigits: 2,
        })}`;
    };

    // ==========================================
    // CALENDAR DATA
    // ==========================================

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthName = currentDate.toLocaleString("en-US", {
        month: "long",
    });

    const daysInMonth = new Date(
        year,
        month + 1,
        0
    ).getDate();

    const days = Array.from(
        { length: daysInMonth },
        (_, index) => index + 1
    );

    const weekDays = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ];

    const changeMonth = (direction) => {
        setCurrentDate(
            new Date(year, month + direction, 1)
        );
    };

    const getDate = (dateString) => {
        const [y, m, d] = dateString.split("-").map(Number);

        return new Date(y, m - 1, d);
    };

    const isToday = (day) => {
        return (
            today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year
        );
    };

    const monthlyLeaves = useMemo(() => {
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);

        return leaves.filter((leave) => {
            const start = getDate(leave.start);
            const end = getDate(leave.end);

            return start <= monthEnd && end >= monthStart;
        });
    }, [year, month, leaves]);

    const stats = [
        {
            label: "Approved",
            count: monthlyLeaves.filter(
                (leave) => leave.status === "approved"
            ).length,
            color: "bg-green-500",
        },
        {
            label: "Pending",
            count: monthlyLeaves.filter(
                (leave) => leave.status === "pending"
            ).length,
            color: "bg-amber-500",
        },
        {
            label: "Rejected",
            count: monthlyLeaves.filter(
                (leave) => leave.status === "rejected"
            ).length,
            color: "bg-red-500",
        },
    ];

    const getLeavePosition = (leave) => {
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);

        const startDate = getDate(leave.start);
        const endDate = getDate(leave.end);

        if (endDate < monthStart || startDate > monthEnd) {
            return null;
        }

        const startDay =
            startDate < monthStart ? 1 : startDate.getDate();

        const endDay =
            endDate > monthEnd ? daysInMonth : endDate.getDate();

        return {
            start: startDay,
            span: endDay - startDay + 1,
        };
    };

    // ==========================================
    // LEAVE APPLICATION HANDLERS
    // ==========================================

    const handleLeaveClick = (leave) => {
        const isUntold = leave.shortName === "Untold";

        setSelectedLeave({
            leaveType: leave.name,
            shortName: leave.shortName,

            remainingDays: isUntold
                ? 0
                : Math.max(0, leave.total - leave.used),

            isUntoldLeave: isUntold,
            isExtendedUnpaidLeave: false,
        });
    };

    const handleExtendedUnpaidClick = () => {
        setSelectedLeave({
            leaveType: "Unpaid Leave (Extended Leave)",
            shortName: "Unpaid Extended",
            remainingDays: null,
            isUntoldLeave: false,
            isExtendedUnpaidLeave: true,
        });
    };

    const handleLeaveSubmit = (data) => {
        const isExtendedUnpaid =
            selectedLeave?.isExtendedUnpaidLeave || false;

        const isUntold =
            selectedLeave?.isUntoldLeave || false;

        const newLeave = {
            id: Date.now(),

            employeeId: 1,

            employeeName: employeeProfile.name,
            employeeIdText: employeeProfile.employeeId,

            start: data.startDate,
            end: data.endDate,
            days: Number(data.days) || 0,

            type: isExtendedUnpaid
                ? "Unpaid Extended"
                : isUntold
                    ? "Untold"
                    : selectedLeave?.shortName || "Casual",

            leaveType: data.leaveType || selectedLeave?.leaveType,

            reason: data.reason || "",
            attachment: data.attachment || null,

            isUnpaid: isExtendedUnpaid || isUntold,
            isExtendedUnpaidLeave: isExtendedUnpaid,

            status: "pending",

            rejectedAtStage: null,
            rejectedBy: null,
            rejectionReason: null,
            rejectedDate: null,
        };

        setLeaves((prev) => [
            ...prev,
            newLeave,
        ]);

        console.log("Leave request submitted:", newLeave);
    };

    // ==========================================
    // APPROVAL TRACKING HANDLER
    // ==========================================

    const handleTrackingClick = (leave) => {
        setSelectedTracking(leave);
    };

    const trackingSteps = selectedTracking
        ? getApprovalSteps(selectedTracking)
        : [];

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">

            <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">

                <div className="min-w-0">

                    {/* EMPLOYEE PROFILE CARD */}

                    <div className="mb-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                            <div className="shrink-0">
                                <img
                                    src={employeeProfile.image}
                                    alt={employeeProfile.name}
                                    className="h-20 w-20 rounded-full border-4 border-indigo-50 object-cover"
                                />
                            </div>

                            <div className="min-w-0 flex-1">

                                <div className="flex flex-wrap items-center gap-2">

                                    <h2 className="text-xl font-bold text-gray-800">
                                        {employeeProfile.name}
                                    </h2>

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                        {employeeProfile.status}
                                    </span>

                                </div>

                                <p className="mt-1 text-sm text-gray-500">
                                    {employeeProfile.designation}
                                </p>

                                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                                    <div className="flex items-start gap-2">
                                        <IdCard size={17} className="mt-0.5 shrink-0 text-indigo-500" />
                                        <div>
                                            <p className="text-xs text-gray-400">Employee ID</p>
                                            <p className="mt-1 text-sm font-semibold text-gray-700">
                                                {employeeProfile.employeeId}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <IdCard size={17} className="mt-0.5 shrink-0 text-indigo-500" />
                                        <div>
                                            <p className="text-xs text-gray-400">Gender</p>
                                            <p className="mt-1 text-sm font-semibold text-gray-700">
                                                {employeeProfile.gender}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <IdCard size={17} className="mt-0.5 shrink-0 text-indigo-500" />
                                        <div>
                                            <p className="text-xs text-gray-400">Age</p>
                                            <p className="mt-1 text-sm font-semibold text-gray-700">
                                                {employeeProfile.age} Years
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <Building2 size={17} className="mt-0.5 shrink-0 text-indigo-500" />
                                        <div>
                                            <p className="text-xs text-gray-400">Department</p>
                                            <p className="mt-1 text-sm font-semibold text-gray-700">
                                                {employeeProfile.department}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <Mail size={17} className="mt-0.5 shrink-0 text-indigo-500" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-400">Email Address</p>
                                            <p className="mt-1 break-all text-sm font-semibold text-gray-700">
                                                {employeeProfile.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <Phone size={17} className="mt-0.5 shrink-0 text-indigo-500" />
                                        <div>
                                            <p className="text-xs text-gray-400">Phone Number</p>
                                            <p className="mt-1 text-sm font-semibold text-gray-700">
                                                {employeeProfile.phone}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <BriefcaseBusiness size={17} className="mt-0.5 shrink-0 text-indigo-500" />
                                        <div>
                                            <p className="text-xs text-gray-400">Joining Date</p>
                                            <p className="mt-1 text-sm font-semibold text-gray-700">
                                                {joining
                                                    ? joining.toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })
                                                    : "Not available"}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CALENDAR HEADER */}

                    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">

                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Employee Leave Calendar
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Team availability and leave requests
                            </p>
                        </div>

                        <div className="flex items-center gap-3">

                            <button
                                onClick={() => changeMonth(-1)}
                                className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:border-indigo-400 hover:text-indigo-600"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <h3 className="min-w-[150px] text-center font-semibold text-gray-800">
                                {monthName} {year}
                            </h3>

                            <button
                                onClick={() => changeMonth(1)}
                                className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:border-indigo-400 hover:text-indigo-600"
                            >
                                <ChevronRight size={20} />
                            </button>

                        </div>
                    </div>

                    {/* LEAVE STATISTICS */}

                    <div className="mb-4 flex flex-wrap gap-3">

                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3"
                            >
                                <span className={`h-2.5 w-2.5 rounded-full ${stat.color}`} />

                                <span className="text-xl font-bold text-gray-800">
                                    {stat.count}
                                </span>

                                <span className="text-sm text-gray-500">
                                    {stat.label}
                                </span>
                            </div>
                        ))}

                    </div>

                    {/* CALENDAR CARD */}

                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                        <div className="overflow-x-auto">

                            <div className="min-w-max">

                                {/* DATE HEADER */}

                                <div
                                    className="grid border-b border-gray-200 bg-gray-50"
                                    style={{
                                        gridTemplateColumns: `220px repeat(${daysInMonth}, 44px)`,
                                    }}
                                >

                                    <div className="sticky left-0 z-40 flex items-center border-r border-gray-200 bg-gray-50 px-4 py-4">
                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Employee
                                        </span>
                                    </div>

                                    {days.map((day) => {

                                        const date = new Date(year, month, day);
                                        const dayName = weekDays[date.getDay()];

                                        const weekend =
                                            date.getDay() === 5 ||
                                            date.getDay() === 6;

                                        const holiday = getHolidayForDate(year, month, day);

                                        return (
                                            <div
                                                key={day}
                                                title={holiday?.name || (weekend ? "Weekend" : "")}
                                                className={`flex flex-col items-center justify-center gap-1 border-l border-gray-200 py-2 ${
                                                    holiday
                                                        ? "bg-red-50"
                                                        : weekend
                                                            ? "bg-gray-100"
                                                            : ""
                                                }`}
                                            >

                                                <span className="text-[10px] text-gray-500">
                                                    {dayName}
                                                </span>

                                                <span
                                                    className={`grid h-7 w-7 place-items-center rounded-full text-sm font-semibold ${
                                                        isToday(day)
                                                            ? "bg-indigo-600 text-white"
                                                            : "text-gray-700"
                                                    }`}
                                                >
                                                    {day}
                                                </span>

                                                {holiday && (
                                                    <span className="max-w-[42px] truncate text-[8px] font-semibold text-red-600">
                                                        Holiday
                                                    </span>
                                                )}

                                            </div>
                                        );
                                    })}

                                </div>

                                {/* EMPLOYEE ROWS */}

                                {employees.map((employee) => {

                                    const employeeLeaves = monthlyLeaves.filter(
                                        (leave) => leave.employeeId === employee.id
                                    );

                                    return (
                                        <div
                                            key={employee.id}
                                            className="grid border-b border-gray-100 last:border-b-0"
                                            style={{
                                                gridTemplateColumns: `220px repeat(${daysInMonth}, 44px)`,
                                            }}
                                        >

                                            <div className="sticky left-0 z-30 flex items-center gap-3 border-r border-gray-200 bg-white px-4 py-3">

                                                <img
                                                    src={employee.image}
                                                    alt={employee.name}
                                                    className="h-9 w-9 shrink-0 rounded-full object-cover"
                                                />

                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-gray-800">
                                                        {employee.name}
                                                    </p>

                                                    <p className="truncate text-xs text-gray-500">
                                                        {employee.role}
                                                    </p>
                                                </div>
                                            </div>

                                            <div
                                                className="relative grid min-h-[60px] grid-rows-1"
                                                style={{
                                                    gridTemplateColumns: `repeat(${daysInMonth}, 44px)`,
                                                }}
                                            >

                                                {days.map((day) => {

                                                    const date = new Date(year, month, day);

                                                    const weekend =
                                                        date.getDay() === 5 ||
                                                        date.getDay() === 6;

                                                    const holiday = getHolidayForDate(year, month, day);

                                                    return (
                                                        <div
                                                            key={day}
                                                            title={holiday?.name || (weekend ? "Weekend" : "")}
                                                            className={`row-start-1 border-l border-gray-100 ${
                                                                holiday
                                                                    ? "bg-red-50"
                                                                    : weekend
                                                                        ? "bg-gray-50"
                                                                        : ""
                                                            }`}
                                                            style={{
                                                                gridColumn: day,
                                                            }}
                                                        />
                                                    );
                                                })}

                                                {employeeLeaves.map((leave) => {

                                                    const position = getLeavePosition(leave);

                                                    if (!position) return null;

                                                    return (
                                                        <button
                                                            key={leave.id}
                                                            type="button"
                                                            onClick={() => handleTrackingClick(leave)}
                                                            title={`${employee.name} | ${leave.type} Leave | ${leave.status} | Click to view approval details`}
                                                            className={`relative z-10 mx-[3px] my-auto flex h-8 cursor-pointer items-center overflow-hidden rounded-lg border px-2 text-xs font-semibold capitalize transition hover:brightness-95 hover:shadow-sm ${statusStyles[leave.status]}`}
                                                            style={{
                                                                gridColumn: `${position.start} / span ${position.span}`,
                                                                gridRow: 1,
                                                            }}
                                                        >
                                                            <span className="truncate">
                                                                {leave.type} · {leave.status}
                                                            </span>
                                                        </button>
                                                    );
                                                })}

                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                    </div>

                    {/* CALENDAR LEGEND */}

                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">

                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded bg-green-500" />
                            <span className="text-xs text-gray-500">Approved</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded bg-amber-500" />
                            <span className="text-xs text-gray-500">Pending</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded bg-red-500" />
                            <span className="text-xs text-gray-500">Rejected</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded border border-red-200 bg-red-100" />
                            <span className="text-xs text-gray-500">Public Holiday</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded border border-gray-300 bg-gray-100" />
                            <span className="text-xs text-gray-500">
                                Weekend (Friday, Saturday)
                            </span>
                        </div>

                    </div>

                    {/* JOINING DATE CARD */}

                    <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                        <div className="mb-4 flex items-center gap-3">

                            <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
                                <BriefcaseBusiness size={21} />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Joining Date
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Your employment information
                                </p>
                            </div>

                        </div>

                        <p className="text-xs text-gray-500">
                            Date of Joining
                        </p>

                        <p className="mt-1 text-xl font-bold text-gray-800">
                            {joining
                                ? joining.toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })
                                : "Not available"}
                        </p>

                        <div className="mt-4 rounded-lg bg-blue-50 p-3">

                            <p className="text-xs text-blue-600">
                                Total Service
                            </p>

                            <p className="mt-1 text-lg font-bold text-blue-700">
                                {joining
                                    ? `${yearsOfService} Years ${monthsOfService} Months`
                                    : "Not available"}
                            </p>

                        </div>
                    </div>

                    {/* WORK LEAVE RATIO */}

                    <WorkLeaveRatio
                        joiningDate={joiningDate}
                        leaves={leaves}
                        employeeId={1}
                    />

                </div>

                <div className="min-w-0 space-y-5">

                    {/* MY LEAVE CARD */}

                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                        <div className="mb-5 flex items-center gap-3">

                            <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                                <CalendarDays size={21} />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    My Leave
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Your available leave balance
                                </p>
                            </div>

                        </div>

                        <div className="mb-5 grid grid-cols-3 gap-2">

                            <div className="rounded-lg bg-indigo-50 p-3">
                                <p className="text-xl font-bold text-indigo-600">
                                    {totalLeaveDays}
                                </p>
                                <p className="text-[10px] text-gray-500">
                                    Total Days
                                </p>
                            </div>

                            <div className="rounded-lg bg-amber-50 p-3">
                                <p className="text-xl font-bold text-amber-600">
                                    {totalUsedDays}
                                </p>
                                <p className="text-[10px] text-gray-500">
                                    Used Days
                                </p>
                            </div>

                            <div className="rounded-lg bg-green-50 p-3">
                                <p className="text-xl font-bold text-green-600">
                                    {totalRemainingDays}
                                </p>
                                <p className="text-[10px] text-gray-500">
                                    Remaining
                                </p>
                            </div>

                        </div>

                        <div className="mb-3">
                            <h3 className="text-sm font-semibold text-gray-800">
                                Remaining Leave
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                                Click a leave type to apply
                            </p>
                        </div>

                        <div className="space-y-4">

                            {leaveBalances.map((leave) => {

                                const isUntold = leave.shortName === "Untold";
                                const isMaternity = leave.shortName === "Maternity";
                                const isStudy = leave.shortName === "Study";

                                const isGenderRestricted =
                                    isMaternity && isMale;

                                const isAgeRestricted =
                                    isStudy && employeeProfile.age >= 40;

                                const remaining =
                                    leave.total - leave.used;

                                const isDisabled =
                                    isGenderRestricted ||
                                    isAgeRestricted ||
                                    (!isUntold && remaining <= 0);

                                const percentage =
                                    isUntold || leave.total === 0
                                        ? 0
                                        : (
                                        Math.max(0, remaining) /
                                        leave.total
                                    ) * 100;

                                return (
                                    <button
                                        key={leave.name}
                                        type="button"
                                        onClick={() => handleLeaveClick(leave)}
                                        disabled={isDisabled}
                                        className={`w-full rounded-lg border p-3 text-left transition ${
                                            isUntold
                                                ? "border-red-100 bg-red-50 hover:border-red-300 hover:bg-red-100"
                                                : isGenderRestricted || isAgeRestricted
                                                    ? "cursor-not-allowed border-gray-200 bg-gray-100 opacity-50"
                                                    : "border-gray-100 hover:border-indigo-300 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        }`}
                                    >

                                        <div className="mb-2 flex items-center justify-between gap-2">

                                            <span className="text-xs font-semibold text-gray-700">
                                                {leave.name}
                                            </span>

                                            <span
                                                className={`whitespace-nowrap text-xs font-bold ${
                                                    isUntold
                                                        ? "text-red-600"
                                                        : isGenderRestricted || isAgeRestricted
                                                            ? "text-gray-400"
                                                            : "text-indigo-600"
                                                }`}
                                            >
                                                {isUntold
                                                    ? `${leave.used} Unpaid Days`
                                                    : isGenderRestricted
                                                        ? "Not Applicable"
                                                        : isAgeRestricted
                                                            ? "Age Restricted"
                                                            : `${Math.max(0, remaining)} Days Left`}
                                            </span>

                                        </div>

                                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                            <div
                                                className={`h-full rounded-full transition-all ${
                                                    isUntold
                                                        ? "bg-red-500"
                                                        : isGenderRestricted || isAgeRestricted
                                                            ? "bg-gray-300"
                                                            : "bg-indigo-500"
                                                }`}
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            />
                                        </div>

                                        <p
                                            className={`mt-1 text-right text-[10px] ${
                                                isUntold
                                                    ? "text-red-500"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            {isUntold
                                                ? "Click to explain your absence"
                                                : isGenderRestricted
                                                    ? "Maternity Leave is not available for male employees"
                                                    : isAgeRestricted
                                                        ? "Study Leave is not available at age 40 or above"
                                                        : remaining > 0
                                                            ? "Click to apply"
                                                            : "No balance available"}
                                        </p>

                                    </button>
                                );
                            })}

                            <button
                                type="button"
                                onClick={handleExtendedUnpaidClick}
                                className="w-full rounded-lg border border-orange-200 bg-orange-50 p-3 text-left transition hover:border-orange-400 hover:bg-orange-100"
                            >

                                <div className="mb-2 flex items-center justify-between gap-2">
                                    <span className="text-xs font-semibold text-orange-800">
                                        Unpaid Leave (Extended)
                                    </span>

                                    <span className="whitespace-nowrap rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700">
                                        No Balance Limit
                                    </span>
                                </div>

                                <div className="h-2 w-full overflow-hidden rounded-full bg-orange-100">
                                    <div className="h-full w-full rounded-full bg-orange-400" />
                                </div>

                                <p className="mt-2 text-[10px] leading-relaxed text-orange-700">
                                    Apply for long-term unpaid leave, such as
                                    1 month, 3 months or more.
                                </p>

                                <p className="mt-2 text-right text-xs font-semibold text-orange-700">
                                    Click to apply →
                                </p>

                            </button>

                        </div>
                    </div>

                    {/* SALARY ADJUSTMENT CARD */}

                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                        <div className="mb-4 flex items-center gap-3">

                            <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                                <Wallet size={21} />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Salary Adjustment
                                </h2>
                                <p className="text-xs text-gray-500">
                                    Leave balance and salary calculation
                                </p>
                            </div>

                        </div>

                        <div className="mb-4 rounded-lg bg-gray-50 p-3">
                            <p className="text-xs text-gray-500">
                                Monthly Salary
                            </p>

                            <p className="mt-1 text-xl font-bold text-gray-800">
                                {formatMoney(monthlySalary)}
                            </p>

                            <p className="mt-1 text-[10px] text-gray-400">
                                Daily Salary: {formatMoney(dailySalary)}
                            </p>
                        </div>

                        {/* ANNUAL LEAVE BENEFIT */}

                        <div className="rounded-lg border border-green-100 bg-green-50 p-3">

                            <div className="flex items-center justify-between gap-2">

                                <div className="flex items-center gap-2">
                                    <TrendingUp size={17} className="text-green-600" />
                                    <p className="text-sm font-semibold text-green-800">
                                        Annual Leave Balance
                                    </p>
                                </div>

                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                                    +{unusedAnnualLeave} Days
                                </span>

                            </div>

                            <p className="mt-3 text-xs text-green-700">
                                Unused annual leave amount
                            </p>

                            <p className="mt-1 text-xl font-bold text-green-700">
                                +{formatMoney(annualLeaveAmount)}
                            </p>

                            <p className="mt-1 text-[10px] text-green-600">
                                {unusedAnnualLeave} unused days × daily salary
                            </p>

                        </div>

                        {/* UNPAID LEAVE DEDUCTION */}

                        <div className="mt-3 rounded-lg border border-red-100 bg-red-50 p-3">

                            <div className="flex items-center justify-between gap-2">

                                <div className="flex items-center gap-2">
                                    <TrendingDown size={17} className="text-red-600" />
                                    <p className="text-sm font-semibold text-red-800">
                                        Unpaid Leave
                                    </p>
                                </div>

                                <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                                    -{unpaidLeaveDays} Days
                                </span>

                            </div>

                            <p className="mt-3 text-xs text-red-700">
                                Salary deduction
                            </p>

                            <p className="mt-1 text-xl font-bold text-red-700">
                                -{formatMoney(unpaidDeduction)}
                            </p>

                            <p className="mt-1 text-[10px] text-red-600">
                                {unpaidLeaveDays} unpaid days × daily salary
                            </p>

                        </div>

                        {/* SALARY SUMMARY */}

                        <div className="mt-4 border-t border-gray-100 pt-4">

                            <p className="mb-3 text-sm font-semibold text-gray-800">
                                Salary Summary
                            </p>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">
                                    Annual Leave Benefit
                                </span>

                                <span className="font-semibold text-green-600">
                                    +{formatMoney(annualLeaveAmount)}
                                </span>
                            </div>

                            <div className="mt-2 flex justify-between text-sm">
                                <span className="text-gray-500">
                                    Unpaid Leave Deduction
                                </span>

                                <span className="font-semibold text-red-600">
                                    -{formatMoney(unpaidDeduction)}
                                </span>
                            </div>

                            <div className="mt-3 flex justify-between border-t border-gray-100 pt-3">
                                <span className="text-sm font-bold text-gray-800">
                                    Net Adjustment
                                </span>

                                <span className="text-sm font-bold text-indigo-600">
                                    {formatMoney(netAdjustment)}
                                </span>
                            </div>

                        </div>

                        <p className="mt-3 text-[10px] leading-relaxed text-gray-400">
                            Calculation is based on monthly salary divided by
                            30 days. Actual salary adjustment depends on
                            company policy.
                        </p>

                    </div>

                </div>
            </div>

            {/* ==========================================
                LEAVE APPLICATION MODAL
            ========================================== */}

            {selectedLeave && (
                <LeaveApplication
                    leaveType={selectedLeave.leaveType}
                    remainingDays={selectedLeave.remainingDays}
                    isUntoldLeave={selectedLeave.isUntoldLeave}
                    isExtendedUnpaidLeave={selectedLeave.isExtendedUnpaidLeave}
                    employeeName={employeeProfile.name}
                    employeeId={employeeProfile.employeeId}
                    gender={employeeProfile.gender}
                    department={employeeProfile.department}
                    email={employeeProfile.email}

                    // Fixed: pass the actual joining date
                    joiningDate={joiningDate}

                    onSubmit={handleLeaveSubmit}
                    onClose={() => setSelectedLeave(null)}
                />
            )}

            {/* ==========================================
                LEAVE APPROVAL TRACKING MODAL
            ========================================== */}

            {selectedTracking && (

                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
                    onClick={() => setSelectedTracking(null)}
                >

                    <div
                        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* MODAL HEADER */}

                        <div className="flex items-center justify-between border-b border-gray-100 p-5">

                            <div className="flex items-center gap-3">

                                <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                                    <FileText size={21} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-gray-800">
                                        Leave Approval Tracking
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Track your application progress
                                    </p>
                                </div>

                            </div>

                            <button
                                onClick={() => setSelectedTracking(null)}
                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                            >
                                <X size={20} />
                            </button>

                        </div>

                        <div className="space-y-5 p-5">

                            {/* LEAVE INFORMATION */}

                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">

                                <div className="flex items-center justify-between gap-3">

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Leave Type
                                        </p>

                                        <h3 className="mt-1 text-base font-bold text-gray-800">
                                            {selectedTracking.type} Leave
                                        </h3>
                                    </div>

                                    <span
                                        className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                                            statusStyles[selectedTracking.status]
                                        }`}
                                    >
                                        {selectedTracking.status}
                                    </span>

                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-4">

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Start Date
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-gray-700">
                                            {selectedTracking.start}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            End Date
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-gray-700">
                                            {selectedTracking.end}
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-4 border-t border-gray-200 pt-3">

                                    <p className="text-xs text-gray-400">
                                        Employee
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-700">
                                        {employees.find(
                                            (emp) => emp.id === selectedTracking.employeeId
                                        )?.name || employeeProfile.name}
                                    </p>

                                </div>

                            </div>

                            {/* APPROVAL PROGRESS */}

                            <div>

                                <div className="mb-5 flex items-center justify-between">

                                    <h3 className="text-sm font-bold text-gray-800">
                                        Approval Progress
                                    </h3>

                                    <span className="text-xs text-gray-400">
                                        3 Approval Stages
                                    </span>

                                </div>

                                <div className="space-y-0">

                                    {trackingSteps.map((step, index) => {

                                        const isApproved =
                                            step.status === "approved";

                                        const isRejected =
                                            step.status === "rejected";

                                        const isPending =
                                            step.status === "pending";

                                        return (
                                            <div
                                                key={step.role}
                                                className="relative flex gap-4"
                                            >

                                                <div className="flex flex-col items-center">

                                                    <div
                                                        className={`z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                                                            isApproved
                                                                ? "bg-green-100 text-green-600"
                                                                : isRejected
                                                                    ? "bg-red-100 text-red-600"
                                                                    : isPending
                                                                        ? "bg-amber-100 text-amber-600"
                                                                        : "bg-gray-100 text-gray-400"
                                                        }`}
                                                    >

                                                        {isApproved && (
                                                            <CheckCircle2 size={21} />
                                                        )}

                                                        {isRejected && (
                                                            <XCircle size={21} />
                                                        )}

                                                        {isPending && (
                                                            <Clock size={21} />
                                                        )}

                                                        {step.status === "waiting" && (
                                                            <span className="text-sm font-bold">
                                                                {index + 1}
                                                            </span>
                                                        )}

                                                    </div>

                                                    {index !== trackingSteps.length - 1 && (
                                                        <div
                                                            className={`h-20 w-0.5 ${
                                                                isApproved
                                                                    ? "bg-green-300"
                                                                    : "bg-gray-200"
                                                            }`}
                                                        />
                                                    )}

                                                </div>

                                                <div className="min-w-0 flex-1 pb-6">

                                                    <div className="flex flex-wrap items-center justify-between gap-2">

                                                        <h4 className="text-sm font-bold text-gray-800">
                                                            {step.role} Approval
                                                        </h4>

                                                        <span
                                                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${
                                                                isApproved
                                                                    ? "bg-green-100 text-green-700"
                                                                    : isRejected
                                                                        ? "bg-red-100 text-red-700"
                                                                        : isPending
                                                                            ? "bg-amber-100 text-amber-700"
                                                                            : "bg-gray-100 text-gray-500"
                                                            }`}
                                                        >
                                                            {step.status === "waiting"
                                                                ? "Waiting"
                                                                : step.status}
                                                        </span>

                                                    </div>

                                                    <div className="mt-2 flex items-center gap-2">

                                                        <UserCheck size={14} className="text-gray-400" />

                                                        <p className="text-xs text-gray-500">
                                                            {step.name}
                                                        </p>

                                                    </div>

                                                    {isApproved && (
                                                        <p className="mt-2 text-xs text-green-600">
                                                            Approved successfully
                                                        </p>
                                                    )}

                                                    {isPending && (
                                                        <p className="mt-2 text-xs text-amber-600">
                                                            Your request is waiting for approval
                                                        </p>
                                                    )}

                                                    {step.status === "waiting" && (
                                                        <p className="mt-2 text-xs text-gray-400">
                                                            Waiting for previous approval
                                                        </p>
                                                    )}

                                                    {isRejected && (
                                                        <p className="mt-2 text-xs font-semibold text-red-600">
                                                            This stage rejected your application
                                                        </p>
                                                    )}

                                                </div>

                                            </div>
                                        );
                                    })}

                                </div>

                            </div>

                            {/* REJECTION INFORMATION */}

                            {selectedTracking.status === "rejected" && (

                                <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                                    <div className="flex items-center gap-2">

                                        <div className="rounded-lg bg-red-100 p-2 text-red-600">
                                            <XCircle size={19} />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-red-700">
                                                Rejection Information
                                            </h3>

                                            <p className="text-[10px] text-red-500">
                                                Details about your rejected application
                                            </p>
                                        </div>

                                    </div>

                                    <div className="mt-4 space-y-4">

                                        <div>
                                            <p className="text-xs text-red-500">
                                                Rejected At
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-red-800">
                                                {selectedTracking.rejectedAtStage || "Not provided"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-red-500">
                                                Rejected By
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-red-800">
                                                {selectedTracking.rejectedBy || "Not provided"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-red-500">
                                                Rejection Date
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-red-800">
                                                {selectedTracking.rejectedDate || "Not provided"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-red-500">
                                                Reason for Rejection
                                            </p>

                                            <p className="mt-2 rounded-lg border border-red-100 bg-white p-3 text-sm leading-relaxed text-gray-700">
                                                {selectedTracking.rejectionReason ||
                                                    "No rejection reason provided."}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            )}

                            {/* APPROVED MESSAGE */}

                            {selectedTracking.status === "approved" && (

                                <div className="rounded-xl border border-green-200 bg-green-50 p-4">

                                    <div className="flex items-center gap-2">

                                        <CheckCircle2
                                            size={21}
                                            className="text-green-600"
                                        />

                                        <p className="text-sm font-bold text-green-700">
                                            Leave Application Approved!
                                        </p>

                                    </div>

                                    <p className="mt-2 text-xs leading-relaxed text-green-600">
                                        Your leave request has successfully
                                        passed Team Lead, Manager and HR
                                        approval stages.
                                    </p>

                                </div>

                            )}

                            {/* PENDING MESSAGE */}

                            {selectedTracking.status === "pending" && (

                                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">

                                    <div className="flex items-center gap-2">

                                        <Clock
                                            size={21}
                                            className="text-amber-600"
                                        />

                                        <p className="text-sm font-bold text-amber-700">
                                            Application Under Review
                                        </p>

                                    </div>

                                    <p className="mt-2 text-xs leading-relaxed text-amber-600">
                                        Your leave application is currently
                                        waiting for approval from the Team Lead.
                                        After approval, it will move to the
                                        Manager and then HR.
                                    </p>

                                </div>

                            )}

                        </div>

                        {/* MODAL FOOTER */}

                        <div className="border-t border-gray-100 p-4">

                            <button
                                onClick={() => setSelectedTracking(null)}
                                className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default EmployeeDash;
