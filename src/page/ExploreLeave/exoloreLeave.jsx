
import React, { useState } from "react";
import {
    CalendarDays,
    Coffee,
    HeartPulse,
    Baby,
    ShieldCheck,
    GraduationCap,
    Accessibility,
    BriefcaseBusiness,
    Wallet,
    ChevronRight,
    ChevronLeft,
    Clock,
    CheckCircle2,
    AlertCircle,
    FileText,
    X,
    Info,
} from "lucide-react";

// All Leave Policy Data
const leavePolicies = [
    {
        id: 1,
        name: "Annual Leave",
        shortName: "AL",
        days: "3 Days",
        category: "Paid Leave",
        icon: CalendarDays,
        color: "blue",
        description: "Annual leave allows employees to take planned time off after completing the required service period.",
        eligibility: [
            "Employee must complete 12 months of continuous service.",
            "Leave must be planned in advance.",
            "Prior approval from competent authority is required."
        ],
        entitlement: [
            "3 days leave with full salary.",
            "Leave is calculated on a pro-rata basis for employees joining during a calendar year.",
            "Unused annual leave can be encashed at the end of each calendar year.",
            "Remaining annual leave can be encashed during separation."
        ],
        approval: "Competent Authority",
        documents: "Leave application with prior approval.",
        rules: [
            "Annual leave should be planned before applying.",
            "Only available annual leave balance can be used.",
            "Encashment follows company leave encashment policy."
        ],
        status: "Service Required",
    },
    {
        id: 2,
        name: "Casual Leave",
        shortName: "CL",
        days: "3 Days",
        category: "Paid Leave",
        icon: Coffee,
        color: "orange",
        description: "Casual leave is provided to handle personal obligations or urgent situations.",
        eligibility: [
            "All employees are entitled to casual leave.",
            "Employees can use this leave for personal or urgent matters."
        ],
        entitlement: [
            "3 days with full pay per year.",
            "Maximum 3 days casual leave at a time.",
            "If leave exceeds 3 days, the entire absence is adjusted against annual leave if available.",
            "If annual leave is unavailable, the excess absence becomes leave without pay."
        ],
        approval: "Department Head / Supervisor",
        documents: "Prior permission is encouraged.",
        status: "Available",
        rules: [
            "Inform your supervisor before taking emergency leave.",
            "Emergency notification can be made through phone, email or SMS.",
            "Written approval can be obtained after returning from emergency leave."
        ],
    },
    {
        id: 3,
        name: "Sick Leave",
        shortName: "SL",
        days: "3 Days",
        category: "Paid Leave",
        icon: HeartPulse,
        color: "rose",
        description: "Sick leave is provided when an employee is unable to work due to personal illness or injury.",
        eligibility: [
            "All employees are entitled to sick leave.",
            "Leave is applicable for personal illness or injury."
        ],
        entitlement: [
            "3 days with full salary per year.",
            "Leave exceeding 3 days can be adjusted against annual leave if available.",
            "Otherwise, excess leave will be treated as leave without pay."
        ],
        approval: "Supervisor",
        documents: "Medical certificate required for more than 3 days.",
        status: "Available",
        rules: [
            "Medical certificate from a registered physician is required after more than 3 days.",
            "Fitness certificate is required for prolonged sick leave exceeding 7 days.",
            "Supervisor approval must be obtained after returning to work."
        ],
    },
    {
        id: 4,
        name: "Maternity Leave",
        shortName: "ML",
        days: "3 Days",
        category: "Paid Leave",
        icon: Baby,
        color: "pink",
        description: "Maternity leave is provided to eligible employees under the company's maternity leave policy.",
        eligibility: [
            "Minimum 1 year of continuous service is required.",
            "Can be availed maximum twice in a lifetime."
        ],
        entitlement: [
            "3 days maternity leave with pay at a time after joining work.",
            "Application must be submitted 1.5 months before the expected delivery date."
        ],
        approval: "Competent Authority",
        documents: "Required supporting medical documents as applicable.",
        status: "Special Eligibility",
        rules: [
            "Must complete one year of continuous service.",
            "Maximum two times in a lifetime.",
            "Application should be submitted in advance."
        ],
    },
    {
        id: 5,
        name: "Quarantine Leave",
        shortName: "QL",
        days: "3 Days",
        category: "Paid Leave",
        icon: ShieldCheck,
        color: "teal",
        description: "Quarantine leave is provided when an employee must stay away from office due to infectious diseases.",
        eligibility: [
            "Applicable for infectious diseases affecting the employee or household.",
            "Management approval is mandatory.",
            "Medical certificate is required."
        ],
        entitlement: [
            "Maximum 3 days with pay.",
            "An additional maximum 3 days may be allowed in exceptional circumstances."
        ],
        approval: "Management Only",
        documents: "Medical certificate.",
        status: "Management Approval",
        rules: [
            "Applicable for diseases such as Jaundice, Typhoid, Small Pox and other contagious diseases.",
            "Temporary disability may also be considered under this policy.",
            "Approval depends on management decision."
        ],
    },
    {
        id: 6,
        name: "Study Leave",
        shortName: "STL",
        days: "3 Days",
        category: "Unpaid Leave",
        icon: GraduationCap,
        color: "purple",
        description: "Study or prolonged leave may be granted for educational or other approved purposes.",
        eligibility: [
            "Management approval is mandatory.",
            "Applicable for study leave or prolonged leave."
        ],
        entitlement: [
            "3 days study / prolonged leave without payment.",
            "If the employee cannot rejoin after one year, service will automatically be discontinued.",
            "No festival bonus or other benefits during this leave."
        ],
        approval: "Management Only",
        documents: "Supporting study documents if applicable.",
        status: "Management Approval",
        rules: [
            "Leave is unpaid.",
            "No festival bonus or other benefits during the leave.",
            "Failure to rejoin after one year results in discontinuation of service."
        ],
    },
    {
        id: 7,
        name: "Disability Leave",
        shortName: "DL",
        days: "As Approved",
        category: "Special Leave",
        icon: Accessibility,
        color: "slate",
        description: "Disability leave applies when an employee becomes incapable of working due to physical or mental infirmity.",
        eligibility: [
            "Employee must have a relevant medical condition.",
            "Management approval is required."
        ],
        entitlement: [
            "The competent authority may require a medical examination.",
            "The employee may be discharged on medical grounds if declared unfit by the medical board."
        ],
        approval: "Management Only",
        documents: "Medical examination / Medical Board assessment.",
        status: "Management Approval",
        rules: [
            "Medical assessment may be required.",
            "Final decision depends on competent authority.",
            "The policy does not specify a fixed number of paid days."
        ],
    },
    {
        id: 8,
        name: "Extra-ordinary Leave",
        shortName: "EL",
        days: "As Approved",
        category: "Special Leave",
        icon: BriefcaseBusiness,
        color: "amber",
        description: "Extra-ordinary leave may be granted for situations beyond an employee's control.",
        eligibility: [
            "Employee must have no other leave due.",
            "Reason must be beyond the employee's control.",
            "Competent authority must be satisfied with the reason."
        ],
        entitlement: [
            "Granted based on the situation.",
            "Duration depends on competent authority approval."
        ],
        approval: "Competent Authority",
        documents: "Supporting documents depending on the situation.",
        status: "Conditional",
        rules: [
            "Only granted when no other leave is due.",
            "Approval depends on the competent authority.",
            "No fixed entitlement is specified in the policy."
        ],
    },
    {
        id: 9,
        name: "Leave Encashment",
        shortName: "LE",
        days: "Maximum 3 Days",
        category: "Financial Benefit",
        icon: Wallet,
        color: "emerald",
        description: "Eligible employees can receive payment for their unused annual leave balance.",
        eligibility: [
            "Permanent Management and Staff employees.",
            "Minimum 1 year of service with the company.",
            "Subject to the company's encashment rules."
        ],
        entitlement: [
            "Maximum 3 days of unused leave can be encashed.",
            "Payment is equivalent to one month's last year's basic salary, subject to the policy calculation.",
            "Accumulated annual leave can be encashed during separation."
        ],
        approval: "HR Department",
        documents: "Prescribed leave encashment claim form.",
        status: "Service Required",
        rules: [
            "Only outstanding annual leave can be encashed after December 31.",
            "Employee must claim through HR Department.",
            "Final settlement includes eligible accumulated annual leave."
        ],
    },
];

// Tailwind Color Styles
const colorStyles = {
    blue: {
        bg: "bg-blue-50",
        icon: "text-blue-600",
        border: "border-blue-100",
        badge: "bg-blue-100 text-blue-700",
    },
    orange: {
        bg: "bg-orange-50",
        icon: "text-orange-600",
        border: "border-orange-100",
        badge: "bg-orange-100 text-orange-700",
    },
    rose: {
        bg: "bg-rose-50",
        icon: "text-rose-600",
        border: "border-rose-100",
        badge: "bg-rose-100 text-rose-700",
    },
    pink: {
        bg: "bg-pink-50",
        icon: "text-pink-600",
        border: "border-pink-100",
        badge: "bg-pink-100 text-pink-700",
    },
    teal: {
        bg: "bg-teal-50",
        icon: "text-teal-600",
        border: "border-teal-100",
        badge: "bg-teal-100 text-teal-700",
    },
    purple: {
        bg: "bg-purple-50",
        icon: "text-purple-600",
        border: "border-purple-100",
        badge: "bg-purple-100 text-purple-700",
    },
    slate: {
        bg: "bg-slate-100",
        icon: "text-slate-600",
        border: "border-slate-200",
        badge: "bg-slate-200 text-slate-700",
    },
    amber: {
        bg: "bg-amber-50",
        icon: "text-amber-600",
        border: "border-amber-100",
        badge: "bg-amber-100 text-amber-700",
    },
    emerald: {
        bg: "bg-emerald-50",
        icon: "text-emerald-600",
        border: "border-emerald-100",
        badge: "bg-emerald-100 text-emerald-700",
    },
};

const ExoloreLeave = () => {
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    // Employee information
    // Later connect this with logged-in employee data
    const employee = {
        name: "Rahim Uddin",
        gender: "Male",
        joiningDate: "2024-01-15",
        employmentType: "Permanent",
        isManagementOrStaff: true,
    };

    const completedMonths = Math.max(
        0,
        (new Date().getFullYear() - new Date(employee.joiningDate).getFullYear()) * 12 +
        new Date().getMonth() - new Date(employee.joiningDate).getMonth() -
        (new Date().getDate() < new Date(employee.joiningDate).getDate() ? 1 : 0)
    );

    // Employee eligibility calculation
    const getEligibility = (leave) => {
        // Annual Leave: minimum 12 months continuous service
        if (leave.id === 1) {
            return completedMonths >= 12
                ? "Eligible"
                : "Not Eligible Yet";
        }

        // Maternity Leave: gender and service eligibility
        if (leave.id === 4) {
            if (employee.gender !== "Female") {
                return "Not Applicable";
            }

            return completedMonths >= 12
                ? "Eligible"
                : "Not Eligible Yet";
        }

        // Leave Encashment: permanent Management/Staff after 1 year
        if (leave.id === 9) {
            return completedMonths >= 12 &&
            employee.employmentType === "Permanent" &&
            employee.isManagementOrStaff
                ? "Eligible"
                : "Not Eligible Yet";
        }

        // Management approval is required for these leave types
        if ([5, 6, 7].includes(leave.id)) {
            return "Approval Required";
        }

        if (leave.id === 8) {
            return "Conditional";
        }

        return "Eligible";
    };

    const filteredPolicies = leavePolicies.filter((leave) => {
        const matchesSearch = leave.name.toLowerCase().includes(search.toLowerCase());

        const status = getEligibility(leave);

        const matchesFilter =
            filter === "All" ||
            (filter === "Eligible" && status === "Eligible") ||
            (filter === "Approval Required" && status === "Approval Required") ||
            (filter === "Not Applicable" && status === "Not Applicable");

        return matchesSearch && matchesFilter;
    });

    const eligibleCount = leavePolicies.filter(
        (leave) => getEligibility(leave) === "Eligible"
    ).length;

    const getStatusStyle = (status) => {
        if (status === "Eligible") return "bg-emerald-50 text-emerald-700";
        if (status === "Approval Required") return "bg-amber-50 text-amber-700";
        if (status === "Conditional") return "bg-blue-50 text-blue-700";
        if (status === "Not Applicable") return "bg-slate-100 text-slate-500";
        return "bg-rose-50 text-rose-700";
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
                <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <span>Dashboard</span>
                        <ChevronRight size={15} />
                        <span className="text-blue-600 font-medium">Explore Leave</span>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                        Explore Leave Policies
                    </h1>

                    <p className="text-slate-500 mt-2 text-sm">
                        Understand your leave benefits, eligibility and company policies.
                    </p>
                </div>
            </div>

            {/* Eligibility Overview */}
            <div className="bg-blue-900 rounded-2xl p-5 md:p-7 text-white mb-7 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div>
                        <p className="text-blue-100 text-sm font-medium mb-2">
                            Your Leave Eligibility
                        </p>

                        <h2 className="text-3xl font-bold">
                            {eligibleCount} / 9
                        </h2>

                        <p className="text-blue-100 text-sm mt-2">
                            Leave types currently eligible based on your employment information.
                        </p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 min-w-[190px]">
                        <p className="text-blue-100 text-xs mb-2">
                            Your Service Duration
                        </p>

                        <h3 className="text-2xl font-bold">
                            {Math.floor(completedMonths / 12)} Years
                        </h3>

                        <p className="text-blue-100 text-xs mt-1">
                            {completedMonths % 12} Months completed
                        </p>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between shadow-sm">

                <div className="relative flex-1">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search leave type..."
                        className="w-full border border-slate-200 rounded-lg pl-4 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    {["All", "Eligible", "Approval Required", "Not Applicable"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
                                filter === item
                                    ? "bg-[#193B70] text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Leave Cards */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">
                        All Leave Types
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Click on a card to explore full policy details.
                    </p>
                </div>

                <span className="text-xs text-slate-500">
                    {filteredPolicies.length} Policies
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredPolicies.map((leave) => {
                    const Icon = leave.icon;
                    const style = colorStyles[leave.color];
                    const status = getEligibility(leave);

                    return (
                        <button
                            key={leave.id}
                            onClick={() => setSelectedLeave(leave)}
                            className="bg-white text-left rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="flex justify-between items-start mb-5">
                                <div className={`w-12 h-12 rounded-xl ${style.bg} ${style.icon} flex items-center justify-center`}>
                                    <Icon size={23} />
                                </div>

                                <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold ${style.badge}`}>
                                    {leave.category}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-blue-700 transition">
                                {leave.name}
                            </h3>

                            <p className="text-xs text-slate-500 leading-relaxed min-h-[40px]">
                                {leave.description}
                            </p>

                            <div className="flex items-center justify-between border-t border-slate-100 mt-4 pt-4">
                                <div>
                                    <p className="text-[10px] text-slate-400 mb-1">
                                        ENTITLEMENT
                                    </p>
                                    <p className="text-sm font-bold text-slate-800">
                                        {leave.days}
                                    </p>
                                </div>

                                <span className={`text-[10px] font-bold px-2.5 py-2 rounded-lg ${getStatusStyle(status)}`}>
                                    {status}
                                </span>
                            </div>

                            <div className="flex items-center justify-between mt-4 text-blue-700 text-xs font-semibold">
                                View Policy Details
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition" />
                            </div>
                        </button>
                    );
                })}
            </div>

            {filteredPolicies.length === 0 && (
                <div className="bg-white rounded-xl p-10 text-center">
                    <FileText className="mx-auto text-slate-300 mb-3" size={35} />
                    <h3 className="font-semibold text-slate-700">
                        No Leave Policy Found
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                        Try searching with another leave type.
                    </p>
                </div>
            )}

            {/* Policy Details Modal */}
            {selectedLeave && (() => {
                const leave = selectedLeave;
                const Icon = leave.icon;
                const style = colorStyles[leave.color];
                const status = getEligibility(leave);

                return (
                    <div
                        className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-3 md:p-6"
                        onClick={() => setSelectedLeave(null)}
                    >
                        <div
                            className="bg-white w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-white z-10 border-b border-slate-100 p-5 md:p-6">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${style.bg} ${style.icon}`}>
                                            <Icon size={25} />
                                        </div>

                                        <div>
                                            <h2 className="text-xl font-bold text-slate-800">
                                                {leave.name}
                                            </h2>
                                            <p className="text-xs text-slate-500 mt-1">
                                                Complete Leave Policy Details
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setSelectedLeave(null)}
                                        className="p-2 bg-slate-100 rounded-lg hover:bg-rose-50 hover:text-rose-600"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-5 md:p-6 space-y-6">

                                {/* Status and Entitlement */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <p className="text-xs text-slate-500 mb-2">
                                            Leave Entitlement
                                        </p>
                                        <h3 className="text-2xl font-bold text-slate-800">
                                            {leave.days}
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {leave.category}
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <p className="text-xs text-slate-500 mb-2">
                                            Your Eligibility
                                        </p>
                                        <span className={`inline-block text-sm font-bold px-3 py-2 rounded-lg ${getStatusStyle(status)}`}>
                                            {status}
                                        </span>
                                        <p className="text-xs text-slate-500 mt-2">
                                            Based on current employee information
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                        <Info size={18} className="text-blue-600" />
                                        Description
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-7">
                                        {leave.description}
                                    </p>
                                </div>

                                {/* Eligibility */}
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                        <CheckCircle2 size={18} className="text-emerald-600" />
                                        Eligibility Criteria
                                    </h3>

                                    <div className="space-y-2">
                                        {leave.eligibility.map((item, index) => (
                                            <div key={index} className="flex gap-3 text-sm text-slate-600">
                                                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                                <p>{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Entitlement */}
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                        <CalendarDays size={18} className="text-blue-600" />
                                        Entitlement
                                    </h3>

                                    <div className="space-y-2">
                                        {leave.entitlement.map((item, index) => (
                                            <div key={index} className="flex gap-3 text-sm text-slate-600">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                                <p>{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Approval and Documents */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="border border-slate-100 rounded-xl p-4">
                                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                                            <Clock size={17} />
                                            <span className="text-xs font-semibold">APPROVAL AUTHORITY</span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-800">
                                            {leave.approval}
                                        </p>
                                    </div>

                                    <div className="border border-slate-100 rounded-xl p-4">
                                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                                            <FileText size={17} />
                                            <span className="text-xs font-semibold">REQUIRED DOCUMENTS</span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-800">
                                            {leave.documents}
                                        </p>
                                    </div>
                                </div>

                                {/* Important Rules */}
                                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                                    <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                                        <AlertCircle size={18} />
                                        Important Rules
                                    </h3>

                                    <div className="space-y-2">
                                        {leave.rules.map((item, index) => (
                                            <div key={index} className="flex gap-2 text-sm text-amber-900">
                                                <span className="font-bold">{index + 1}.</span>
                                                <p>{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="flex justify-end pt-2">
                                    <button
                                        onClick={() => setSelectedLeave(null)}
                                        className="px-6 py-3 rounded-lg bg-[#193B70] text-white text-sm font-semibold hover:bg-[#244D87] transition"
                                    >
                                        Close Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}

        </div>
    );
};

export default ExoloreLeave;
