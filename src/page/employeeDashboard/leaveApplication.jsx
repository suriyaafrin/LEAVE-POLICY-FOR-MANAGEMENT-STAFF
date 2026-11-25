
import React, { useEffect, useMemo, useState } from "react";
import { getHolidayForDate } from "../../Data/holidays.js";
import {
    Send,
    CheckCircle2,
    X,
    Info,
    AlertCircle,
    CalendarDays,
} from "lucide-react";

// ==========================================
// CONSTANTS
// ==========================================

const UNPAID_LEAVE_TYPE = "Unpaid Leave (Extended Leave)";

const ANNUAL_LEAVE = "Annual Leave (AL)";
const MATERNITY_LEAVE = "Maternity Leave";

const DEPARTMENTS = [
    "Software Development",
    "Human Resources",
    "Design",
    "Quality Assurance",
    "Product",
    "Operations",
    "Marketing",
    "Finance",
];

const LEAVE_TYPES = [
    ANNUAL_LEAVE,
    "Casual Leave (CL)",
    "Sick Leave (SL)",
    MATERNITY_LEAVE,
    "Quarantine Leave",
    "Study Leave",
    "Disability Leave",
    "Extra Ordinary Leave",
    "Untold Leave (UL)",
    UNPAID_LEAVE_TYPE,
];

const MANAGEMENT_APPROVAL_TYPES = [
    "Quarantine Leave",
    "Study Leave",
    "Disability Leave",
    "Extra Ordinary Leave",
];

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15";

const errorInputClass =
    "border-red-400 focus:border-red-500 focus:ring-red-500/15";

// ==========================================
// COUNT TOTAL DAYS
// ==========================================

const countDays = (start, end) => {
    if (!start || !end) return "";

    const s = new Date(`${start}T00:00:00`);
    const e = new Date(`${end}T00:00:00`);

    const diff = Math.round((e - s) / 86400000) + 1;

    return diff > 0 ? String(diff) : "";
};

// ==========================================
// CHECK PUBLIC HOLIDAYS IN SELECTED RANGE
// ==========================================

const getPublicHolidaysInRange = (start, end) => {
    if (!start || !end || end < start) return [];

    const holidaysFound = [];
    const current = new Date(`${start}T00:00:00`);
    const last = new Date(`${end}T00:00:00`);

    while (current <= last) {
        const holiday = getHolidayForDate(
            current.getFullYear(),
            current.getMonth(),
            current.getDate()
        );

        if (holiday) {
            const date = [
                current.getFullYear(),
                String(current.getMonth() + 1).padStart(2, "0"),
                String(current.getDate()).padStart(2, "0"),
            ].join("-");

            holidaysFound.push({
                date,
                name: holiday.name,
            });
        }

        current.setDate(current.getDate() + 1);
    }

    return holidaysFound;
};

// ==========================================
// CHECK ONE YEAR SERVICE
// ==========================================

const hasCompletedOneYear = (joiningDate, leaveStartDate) => {
    if (!joiningDate || !leaveStartDate) return false;

    const joining = new Date(`${joiningDate}T00:00:00`);
    const leaveStart = new Date(`${leaveStartDate}T00:00:00`);

    if (
        Number.isNaN(joining.getTime()) ||
        Number.isNaN(leaveStart.getTime()) ||
        leaveStart < joining
    ) {
        return false;
    }

    const completionDate = new Date(joining);
    completionDate.setFullYear(
        completionDate.getFullYear() + 1
    );

    return leaveStart >= completionDate;
};

// ==========================================
// FORMAT DATE
// ==========================================

const formatDate = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
};

// ==========================================
// FORM FIELD COMPONENT
// ==========================================

const Field = ({ label, required, hint, error, children }) => (
    <div>
        <label className="mb-2 block text-xs font-semibold text-slate-800">
            {label}
            {required ? " *" : " (optional)"}
        </label>

        {children}

        {hint && !error && (
            <p className="mt-2 text-[11px] text-slate-500">
                {hint}
            </p>
        )}

        {error && (
            <p className="mt-2 text-[11px] font-medium text-red-600">
                {error}
            </p>
        )}
    </div>
);

// ==========================================
// LEAVE APPLICATION
// ==========================================

const LeaveApplication = ({
                              leaveType = "",
                              remainingDays = null,
                              isUntoldLeave = false,
                              isExtendedUnpaidLeave = false,

                              employeeName = "",
                              employeeId = "",
                              gender = "",
                              department = "",
                              email = "",
                              joiningDate = "",

                              onClose,
                              onSubmit,
                          }) => {
    const isMale = gender.toLowerCase() === "male";

    // ==========================================
    // INITIAL LEAVE TYPE
    // ==========================================

    const initialLeaveType = isExtendedUnpaidLeave
        ? UNPAID_LEAVE_TYPE
        : leaveType;

    // ==========================================
    // LEAVE TYPE OPTIONS
    // ==========================================

    const leaveTypeOptions = useMemo(
        () =>
            LEAVE_TYPES.filter(
                (type) =>
                    !(isMale && type === MATERNITY_LEAVE)
            ),
        [isMale]
    );

    // ==========================================
    // DEPARTMENT OPTIONS
    // ==========================================

    const departmentOptions = useMemo(
        () =>
            department && !DEPARTMENTS.includes(department)
                ? [department, ...DEPARTMENTS]
                : DEPARTMENTS,
        [department]
    );

    // ==========================================
    // FORM STATE
    // ==========================================

    const [form, setForm] = useState({
        employeeName,
        employeeId,
        department,
        email,
        leaveType: initialLeaveType,
        startDate: "",
        endDate: "",
        days: "",
        reason: "",
        attachment: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    // ==========================================
    // CHECK LEAVE TYPE
    // ==========================================

    const isExtendedUnpaid =
        form.leaveType === UNPAID_LEAVE_TYPE;

    const isUntold =
        form.leaveType === "Untold Leave (UL)" ||
        (isUntoldLeave && form.leaveType === leaveType);

    const isManagementApprovalRequired =
        MANAGEMENT_APPROVAL_TYPES.includes(form.leaveType);

    // ==========================================
    // CHECK EMPLOYEE ELIGIBILITY
    // ==========================================

    const requiresOneYear = [
        ANNUAL_LEAVE,
        MATERNITY_LEAVE,
    ].includes(form.leaveType);

    const isEligibleForOneYearLeave =
        joiningDate &&
        form.startDate &&
        hasCompletedOneYear(joiningDate, form.startDate);

    const isNotEligibleForOneYearLeave =
        requiresOneYear &&
        form.startDate &&
        !isEligibleForOneYearLeave;

    // ==========================================
    // CLOSE WITH ESCAPE
    // ==========================================

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") {
                onClose?.();
            }
        };

        document.addEventListener("keydown", onKey);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [onClose]);

    // ==========================================
    // UPDATE FORM
    // ==========================================

    const update = (name, value) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: undefined,
        }));
    };

    // ==========================================
    // UPDATE DATE AND CALCULATE DAYS
    // ==========================================

    const updateDate = (name, value) => {
        setForm((prev) => {
            const next = {
                ...prev,
                [name]: value,
            };

            next.days = countDays(
                next.startDate,
                next.endDate
            );

            return next;
        });

        setErrors((prev) => ({
            ...prev,
            [name]: undefined,
            endDate: undefined,
            days: undefined,
            leaveType: undefined,
        }));
    };

    // ==========================================
    // FORM VALIDATION
    // ==========================================

    const validate = () => {
        const e = {};

        // Employee details
        if (!form.employeeName.trim()) {
            e.employeeName = "Enter your full name.";
        }

        if (!form.employeeId.trim()) {
            e.employeeId = "Enter your employee ID.";
        }

        if (!form.department) {
            e.department = "Select a department.";
        }

        if (!form.email.trim()) {
            e.email = "Enter your contact email.";
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            e.email = "Enter a valid email address.";
        }

        // Leave type
        if (!form.leaveType) {
            e.leaveType = "Select a leave type.";
        }

        // Male employee cannot select maternity leave
        if (isMale && form.leaveType === MATERNITY_LEAVE) {
            e.leaveType =
                "Maternity Leave is not available for male employees.";
        }

        // ==========================================
        // SERVICE ELIGIBILITY VALIDATION
        // ==========================================

        if (requiresOneYear) {
            if (!joiningDate) {
                e.leaveType =
                    "Employee joining date is missing. Please contact HR.";
            } else if (
                form.startDate &&
                !hasCompletedOneYear(joiningDate, form.startDate)
            ) {
                e.leaveType =
                    `${form.leaveType} requires at least 12 months of continuous service. You are not eligible yet.`;
            }
        }

        // Dates
        if (!form.startDate) {
            e.startDate = "Select a start date.";
        }

        if (!form.endDate) {
            e.endDate = "Select an end date.";
        } else if (
            form.startDate &&
            form.endDate < form.startDate
        ) {
            e.endDate =
                "End date cannot be before the start date.";
        }

        // Public holiday validation:
        // A leave request cannot include any public holiday.
        if (
            form.startDate &&
            form.endDate &&
            form.endDate >= form.startDate
        ) {
            const publicHolidays = getPublicHolidaysInRange(
                form.startDate,
                form.endDate
            );

            if (publicHolidays.length > 0) {
                const holidayNames = publicHolidays
                    .map((holiday) => `${formatDate(holiday.date)} - ${holiday.name}`)
                    .join(", ");

                const startDateIsHoliday = publicHolidays.some(
                    (holiday) => holiday.date === form.startDate
                );

                const message = `Public holidays cannot be included in a leave request: ${holidayNames}. Please choose different dates.`;

                if (startDateIsHoliday) {
                    e.startDate = message;
                } else {
                    e.endDate = message;
                }
            }
        }

        // Number of days
        const days = Number(form.days);

        if (
            !form.days ||
            !Number.isFinite(days) ||
            days <= 0 ||
            !Number.isInteger(days)
        ) {
            e.days = "Enter a valid whole number of days.";
        }

        // Paid leave balance validation
        // Extended Unpaid and Untold leave bypass this check.
        const isPaidLeave =
            !isExtendedUnpaid && !isUntold;

        if (
            isPaidLeave &&
            remainingDays !== null &&
            form.leaveType === leaveType &&
            days > remainingDays
        ) {
            e.days = `You only have ${remainingDays} day${
                remainingDays === 1 ? "" : "s"
            } left for this leave type.`;
        }

        // Reason
        if (!form.reason.trim()) {
            e.reason = isExtendedUnpaid
                ? "Explain why you need extended unpaid leave."
                : isUntold
                    ? "Explain your absence."
                    : "Enter a reason for your request.";
        }

        // Attachment URL validation
        if (
            form.attachment.trim() &&
            !/^https?:\/\/\S+$/i.test(form.attachment.trim())
        ) {
            e.attachment =
                "Enter a link that starts with http:// or https://.";
        }

        return e;
    };

    // ==========================================
    // SUBMIT FORM
    // ==========================================

    const handleSubmit = (event) => {
        event.preventDefault();

        const found = validate();

        setErrors(found);

        if (Object.keys(found).length > 0) {
            return;
        }

        const requestData = {
            ...form,
            days: Number(form.days),
            attachment: form.attachment.trim() || null,

            joiningDate,

            isUntoldLeave: isUntold,
            isUnpaidLeave: isExtendedUnpaid,
            isExtendedUnpaidLeave: isExtendedUnpaid,

            isManagementApprovalRequired,
            status: "pending",
        };

        // Save application in parent component
        onSubmit?.(requestData);

        // Show success popup
        setSubmitted(true);

        console.log("Leave request submitted:", requestData);
    };

    // ==========================================
    // INPUT CLASS
    // ==========================================

    const cls = (name) =>
        `${inputClass} ${errors[name] ? errorInputClass : ""}`;

    // ==========================================
    // RETURN
    // ==========================================

    return (
        <>
            {/* ================================== */}
            {/* LEAVE APPLICATION FORM */}
            {/* ================================== */}

            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-50">

                <div className="mx-auto w-full max-w-[776px] px-4 py-12">

                    {/* TOP BAR */}

                    <div className="flex items-start justify-between">

                        <div className="flex items-center gap-3">

                            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-900 text-lg font-bold text-white">
                                L
                            </div>

                            <div>
                                <p className="text-base font-bold leading-tight text-slate-900">
                                    Leave Desk
                                </p>

                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                    People Operations
                                </p>
                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close leave application"
                            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-800"
                        >
                            <X size={18} />
                        </button>

                    </div>

                    {/* HEADING */}

                    <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-900">
                        Leave Application
                    </p>

                    <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
                        Request time away
                    </h1>

                    <p className="mt-2 text-[15px] text-slate-500">
                        Complete the form below to submit your leave request.
                    </p>

                    {/* FORM CARD */}

                    <div className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-200 px-8 py-7">

                            <h2 className="text-lg font-bold text-slate-900">
                                Leave request form
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Fields marked * are required.
                            </p>

                        </div>

                        {/* APPLICATION FORM */}

                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="px-8 py-7"
                        >

                            {/* EMPLOYEE DETAILS */}

                            <h3 className="mb-5 text-xs font-bold text-slate-900">
                                Employee details
                            </h3>

                            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">

                                <Field
                                    label="Employee name"
                                    required
                                    error={errors.employeeName}
                                >
                                    <input
                                        type="text"
                                        value={form.employeeName}
                                        onChange={(e) =>
                                            update("employeeName", e.target.value)
                                        }
                                        placeholder="Full name"
                                        className={cls("employeeName")}
                                    />
                                </Field>

                                <Field
                                    label="Employee ID"
                                    required
                                    error={errors.employeeId}
                                >
                                    <input
                                        type="text"
                                        value={form.employeeId}
                                        onChange={(e) =>
                                            update("employeeId", e.target.value)
                                        }
                                        placeholder="Your employee ID"
                                        className={cls("employeeId")}
                                    />
                                </Field>

                                <Field
                                    label="Department"
                                    required
                                    error={errors.department}
                                >
                                    <select
                                        value={form.department}
                                        onChange={(e) =>
                                            update("department", e.target.value)
                                        }
                                        className={cls("department")}
                                    >
                                        <option value="">
                                            Select department
                                        </option>

                                        {departmentOptions.map((dept) => (
                                            <option key={dept} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                </Field>

                                <Field
                                    label="Contact email"
                                    required
                                    error={errors.email}
                                >
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) =>
                                            update("email", e.target.value)
                                        }
                                        placeholder="name@company.com"
                                        className={cls("email")}
                                    />
                                </Field>

                            </div>

                            <hr className="my-7 border-slate-200" />

                            {/* LEAVE DETAILS */}

                            <h3 className="mb-5 text-xs font-bold text-slate-900">
                                Leave details
                            </h3>

                            <div className="space-y-5">

                                {/* LEAVE TYPE */}

                                <Field
                                    label="Leave type"
                                    required
                                    error={errors.leaveType}
                                    hint={
                                        isExtendedUnpaid
                                            ? "Extended Unpaid Leave can be requested beyond your paid leave balance."
                                            : remainingDays !== null &&
                                            form.leaveType === leaveType
                                                ? `${remainingDays} day${
                                                    remainingDays === 1 ? "" : "s"
                                                } remaining for this leave type.`
                                                : undefined
                                    }
                                >
                                    <select
                                        value={form.leaveType}
                                        onChange={(e) =>
                                            update("leaveType", e.target.value)
                                        }
                                        className={cls("leaveType")}
                                    >
                                        <option value="">
                                            Select leave type
                                        </option>

                                        {leaveTypeOptions.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </Field>

                                {/* SERVICE ELIGIBILITY NOTICE */}

                                {requiresOneYear && (
                                    <div
                                        className={`rounded-xl border p-4 ${
                                            isNotEligibleForOneYearLeave ||
                                            !joiningDate
                                                ? "border-red-200 bg-red-50"
                                                : isEligibleForOneYearLeave
                                                    ? "border-emerald-200 bg-emerald-50"
                                                    : "border-blue-200 bg-blue-50"
                                        }`}
                                    >

                                        <div className="flex items-start gap-3">

                                            {isNotEligibleForOneYearLeave ||
                                            !joiningDate ? (
                                                <AlertCircle
                                                    size={20}
                                                    className="mt-0.5 shrink-0 text-red-600"
                                                />
                                            ) : (
                                                <CalendarDays
                                                    size={20}
                                                    className="mt-0.5 shrink-0 text-blue-700"
                                                />
                                            )}

                                            <div>
                                                <h4
                                                    className={`text-sm font-bold ${
                                                        isNotEligibleForOneYearLeave ||
                                                        !joiningDate
                                                            ? "text-red-800"
                                                            : "text-blue-800"
                                                    }`}
                                                >
                                                    {isNotEligibleForOneYearLeave ||
                                                    !joiningDate
                                                        ? "Service Eligibility"
                                                        : isEligibleForOneYearLeave
                                                            ? "Service Requirement Completed"
                                                            : "12 Months Service Required"}
                                                </h4>

                                                <p
                                                    className={`mt-2 text-xs leading-relaxed ${
                                                        isNotEligibleForOneYearLeave ||
                                                        !joiningDate
                                                            ? "text-red-700"
                                                            : "text-blue-700"
                                                    }`}
                                                >
                                                    {joiningDate ? (
                                                        <>
                                                            Your joining date is{" "}
                                                            <strong>
                                                                {formatDate(joiningDate)}
                                                            </strong>
                                                            .
                                                            {form.startDate ? (
                                                                isEligibleForOneYearLeave ? (
                                                                    " You have completed 12 months of continuous service by your requested leave start date."
                                                                ) : (
                                                                    " You have not completed 12 months of continuous service by your requested leave start date."
                                                                )
                                                            ) : (
                                                                " Select your leave start date to check your eligibility."
                                                            )}
                                                        </>
                                                    ) : (
                                                        "Your joining date is not available. Please contact HR."
                                                    )}
                                                </p>

                                                <p className="mt-2 text-xs leading-relaxed">
                                                    <strong>
                                                        Policy:
                                                    </strong>{" "}
                                                    Annual Leave and Maternity Leave require at least 12 months of continuous service.
                                                </p>
                                            </div>

                                        </div>

                                    </div>
                                )}

                                {/* MANAGEMENT APPROVAL NOTICE */}

                                {isManagementApprovalRequired && (
                                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">

                                        <div className="flex items-start gap-3">

                                            <Info
                                                size={20}
                                                className="mt-0.5 shrink-0 text-blue-700"
                                            />

                                            <div>
                                                <h4 className="text-sm font-bold text-blue-800">
                                                    Management Approval Required
                                                </h4>

                                                <p className="mt-1 text-xs leading-relaxed text-blue-700">
                                                    This leave type requires review and approval from Management according to company policy. Submission does not guarantee approval.
                                                </p>
                                            </div>

                                        </div>

                                    </div>
                                )}

                                {/* EXTENDED UNPAID NOTICE */}

                                {isExtendedUnpaid && (
                                    <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">

                                        <div className="flex items-start gap-3">

                                            <div className="rounded-lg bg-orange-100 p-2 text-orange-700">
                                                <Info size={19} />
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-bold text-orange-800">
                                                    Extended Unpaid Leave
                                                </h4>

                                                <p className="mt-2 text-xs leading-relaxed text-orange-700">
                                                    You can request long-term unpaid leave, including 30, 60 or 90 days. Your available paid leave balance will not restrict this application.
                                                </p>

                                                <p className="mt-2 text-xs leading-relaxed text-orange-700">
                                                    Your Team Lead, Manager and HR will review the request. HR will determine the final leave allocation according to company policy.
                                                </p>
                                            </div>

                                        </div>

                                    </div>
                                )}

                                {/* UNTOLD NOTICE */}

                                {isUntold && !isExtendedUnpaid && (
                                    <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                                        <p className="text-sm font-semibold text-red-800">
                                            Untold Leave
                                        </p>

                                        <p className="mt-1 text-xs leading-relaxed text-red-700">
                                            This is an unpaid absence. Please explain your absence so HR can review it.
                                        </p>

                                    </div>
                                )}

                                {/* DATE FIELDS */}

                                <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">

                                    <Field
                                        label="Start date"
                                        required
                                        error={errors.startDate}
                                    >
                                        <input
                                            type="date"
                                            value={form.startDate}
                                            onChange={(e) =>
                                                updateDate("startDate", e.target.value)
                                            }
                                            className={cls("startDate")}
                                        />
                                    </Field>

                                    <Field
                                        label="End date"
                                        required
                                        error={errors.endDate}
                                    >
                                        <input
                                            type="date"
                                            value={form.endDate}
                                            min={form.startDate || undefined}
                                            onChange={(e) =>
                                                updateDate("endDate", e.target.value)
                                            }
                                            className={cls("endDate")}
                                        />
                                    </Field>

                                </div>

                                {/* NUMBER OF DAYS */}

                                <Field
                                    label="Number of days"
                                    required
                                    error={errors.days}
                                    hint={
                                        isExtendedUnpaid
                                            ? "There is no 3-day balance limit for Extended Unpaid Leave. Select your full requested date range."
                                            : "Calendar days are filled automatically when you select dates. You can adjust if needed."
                                    }
                                >
                                    <input
                                        type="number"
                                        min="1"
                                        step="1"
                                        value={form.days}
                                        onChange={(e) =>
                                            update("days", e.target.value)
                                        }
                                        placeholder="Enter number of days"
                                        className={cls("days")}
                                    />
                                </Field>

                                {/* REASON */}

                                <Field
                                    label="Reason"
                                    required
                                    error={errors.reason}
                                >
                                    <textarea
                                        rows={4}
                                        value={form.reason}
                                        onChange={(e) =>
                                            update("reason", e.target.value)
                                        }
                                        placeholder={
                                            isExtendedUnpaid
                                                ? "Explain why you need extended unpaid leave..."
                                                : "Briefly describe your leave request..."
                                        }
                                        className={`${cls("reason")} resize-y`}
                                    />
                                </Field>

                                {/* SUPPORTING DOCUMENT */}

                                <Field
                                    label={
                                        isExtendedUnpaid
                                            ? "Medical certificate / Supporting document link"
                                            : "Attachment link"
                                    }
                                    error={errors.attachment}
                                    hint={
                                        isExtendedUnpaid
                                            ? "For long-term medical leave, provide a shareable link to your medical certificate or supporting document. This field is optional."
                                            : "Paste a shareable link to a supporting document if needed. Files cannot be uploaded here."
                                    }
                                >
                                    <input
                                        type="url"
                                        value={form.attachment}
                                        onChange={(e) =>
                                            update("attachment", e.target.value)
                                        }
                                        placeholder="https://..."
                                        className={cls("attachment")}
                                    />
                                </Field>

                            </div>

                            {/* SUBMIT BUTTON */}

                            <button
                                type="submit"
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
                            >
                                <Send size={16} />
                                Submit Leave Request
                            </button>

                            <p className="mt-4 text-center text-[11px] text-slate-500">
                                Your request will be sent to the people operations team for review.
                            </p>

                        </form>

                    </div>

                </div>

            </div>

            {/* ================================== */}
            {/* SUCCESS POPUP MODAL */}
            {/* ================================== */}

            {submitted && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">

                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="success-heading"
                        className="my-auto w-full max-w-md animate-in zoom-in-95 rounded-3xl bg-white p-8 text-center shadow-2xl"
                    >

                        {/* SUCCESS ICON */}

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                            <CheckCircle2
                                size={46}
                                strokeWidth={2.5}
                                className="text-emerald-600"
                            />
                        </div>

                        {/* SUCCESS HEADING */}

                        <h2
                            id="success-heading"
                            className="mt-5 text-2xl font-extrabold text-slate-900"
                        >
                            Successfully Submitted!
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            Your leave application has been submitted successfully. Your request is now waiting for approval.
                        </p>

                        {/* APPLICATION DETAILS */}

                        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">

                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm text-slate-500">
                                    Leave Type
                                </span>

                                <span className="text-right text-sm font-bold text-slate-800">
                                    {form.leaveType}
                                </span>
                            </div>

                            <div className="my-3 border-t border-slate-200" />

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">
                                    Duration
                                </span>

                                <span className="text-sm font-bold text-slate-800">
                                    {form.days} Days
                                </span>
                            </div>

                            <div className="my-3 border-t border-slate-200" />

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">
                                    Status
                                </span>

                                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                                    Pending
                                </span>
                            </div>

                            <div className="my-3 border-t border-slate-200" />

                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm text-slate-500">
                                    Start Date
                                </span>

                                <span className="text-sm font-semibold text-slate-800">
                                    {formatDate(form.startDate)}
                                </span>
                            </div>

                            <div className="mt-3 flex items-center justify-between gap-3">
                                <span className="text-sm text-slate-500">
                                    End Date
                                </span>

                                <span className="text-sm font-semibold text-slate-800">
                                    {formatDate(form.endDate)}
                                </span>
                            </div>

                        </div>

                        {/* EXTENDED UNPAID MESSAGE */}

                        {isExtendedUnpaid && (
                            <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 p-4 text-left">

                                <div className="flex items-start gap-3">

                                    <Info
                                        size={19}
                                        className="mt-0.5 shrink-0 text-orange-700"
                                    />

                                    <div>
                                        <p className="text-sm font-bold text-orange-800">
                                            Extended Unpaid Leave
                                        </p>

                                        <p className="mt-1 text-xs leading-relaxed text-orange-700">
                                            HR will review your extended leave request and determine the final paid and unpaid day allocation according to company policy.
                                        </p>
                                    </div>

                                </div>

                            </div>
                        )}

                        {/* MANAGEMENT APPROVAL MESSAGE */}

                        {isManagementApprovalRequired && (
                            <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-left">
                                <p className="text-xs leading-relaxed text-blue-800">
                                    This application requires Management approval. Submission does not guarantee approval.
                                </p>
                            </div>
                        )}

                        {/* DONE BUTTON */}

                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
                        >
                            <CheckCircle2 size={18} />
                            Done — Back to Dashboard
                        </button>

                    </div>

                </div>
            )}

        </>
    );
};

export default LeaveApplication;
