import React, { useEffect, useMemo, useState } from "react";
import { Send, CheckCircle2, X } from "lucide-react";

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
    "Annual Leave (AL)",
    "Casual Leave (CL)",
    "Sick Leave (SL)",
    "Maternity Leave",
    "Quarantine Leave",
    "Study Leave",
    "Disability Leave",
    "Extra Ordinary Leave",
    "Untold Leave (UL)",
];

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15";

const errorInputClass = "border-red-400 focus:border-red-500 focus:ring-red-500/15";

// Inclusive calendar-day count between two yyyy-mm-dd strings
const countDays = (start, end) => {
    if (!start || !end) return "";
    const s = new Date(`${start}T00:00:00`);
    const e = new Date(`${end}T00:00:00`);
    const diff = Math.round((e - s) / 86400000) + 1;
    return diff > 0 ? String(diff) : "";
};

const Field = ({ label, required, hint, error, children }) => (
    <div>
        <label className="mb-2 block text-xs font-semibold text-slate-800">
            {label}
            {required ? " *" : " (optional)"}
        </label>
        {children}
        {hint && !error && <p className="mt-2 text-[11px] text-slate-500">{hint}</p>}
        {error && <p className="mt-2 text-[11px] font-medium text-red-600">{error}</p>}
    </div>
);


const LeaveApplication = ({
                              leaveType = "",
                              remainingDays = null,
                              isUntoldLeave = false,
                              employeeName = "",
                              employeeId = "",
                              gender = "",
                              department = "",
                              email = "",
                              onClose,
                              onSubmit,
                          }) => {
    const isMale = gender.toLowerCase() === "male";

    const leaveTypeOptions = useMemo(
        () => LEAVE_TYPES.filter((type) => !(isMale && type === "Maternity Leave")),
        [isMale]
    );

    const departmentOptions = useMemo(
        () =>
            department && !DEPARTMENTS.includes(department)
                ? [department, ...DEPARTMENTS]
                : DEPARTMENTS,
        [department]
    );

    const [form, setForm] = useState({
        employeeName,
        employeeId,
        department,
        email,
        leaveType,
        startDate: "",
        endDate: "",
        days: "",
        reason: "",
        attachment: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    // Close with Escape, lock page scroll while open
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose?.();
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [onClose]);

    const update = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    // Changing a date re-fills the number of days
    const updateDate = (name, value) => {
        setForm((prev) => {
            const next = { ...prev, [name]: value };
            next.days = countDays(next.startDate, next.endDate);
            return next;
        });
        setErrors((prev) => ({
            ...prev,
            [name]: undefined,
            endDate: undefined,
            days: undefined,
        }));
    };

    const validate = () => {
        const e = {};

        if (!form.employeeName.trim()) e.employeeName = "Enter your full name.";
        if (!form.employeeId.trim()) e.employeeId = "Enter your employee ID.";
        if (!form.department) e.department = "Select a department.";

        if (!form.email.trim()) {
            e.email = "Enter your contact email.";
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            e.email = "Enter a valid email address.";
        }

        if (!form.leaveType) e.leaveType = "Select a leave type.";
        if (!form.startDate) e.startDate = "Select a start date.";
        if (!form.endDate) {
            e.endDate = "Select an end date.";
        } else if (form.startDate && form.endDate < form.startDate) {
            e.endDate = "End date cannot be before the start date.";
        }

        const days = Number(form.days);
        if (!form.days || !Number.isFinite(days) || days <= 0) {
            e.days = "Enter the number of days.";
        } else if (
            !isUntoldLeave &&
            remainingDays !== null &&
            form.leaveType === leaveType &&
            days > remainingDays
        ) {
            e.days = `You only have ${remainingDays} day${
                remainingDays === 1 ? "" : "s"
            } left for this leave type.`;
        }

        if (!form.reason.trim()) {
            e.reason = isUntoldLeave
                ? "Explain your absence."
                : "Enter a reason for your request.";
        }

        if (form.attachment.trim() && !/^https?:\/\/\S+$/i.test(form.attachment.trim())) {
            e.attachment = "Enter a link that starts with http:// or https://.";
        }

        return e;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const found = validate();
        setErrors(found);
        if (Object.keys(found).length > 0) return;

        onSubmit?.({
            ...form,
            days: Number(form.days),
            attachment: form.attachment.trim() || null,
            isUntoldLeave,
        });
        setSubmitted(true);
    };

    const cls = (name) => `${inputClass} ${errors[name] ? errorInputClass : ""}`;

    return (
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

                {/* CARD */}
                <div className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 px-8 py-7">
                        <h2 className="text-lg font-bold text-slate-900">Leave request form</h2>
                        <p className="mt-1 text-sm text-slate-500">Fields marked * are required.</p>
                    </div>

                    {submitted ? (
                        <div className="flex flex-col items-center px-8 py-16 text-center">
                            <CheckCircle2 size={48} className="text-teal-700" />
                            <h3 className="mt-4 text-xl font-bold text-slate-900">
                                Request submitted
                            </h3>
                            <p className="mt-2 max-w-sm text-sm text-slate-500">
                                Your {form.leaveType} request for {form.days} day
                                {Number(form.days) === 1 ? "" : "s"} has been sent to the
                                people operations team for review.
                            </p>
                            <button
                                type="button"
                                onClick={onClose}
                                className="mt-8 rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
                            >
                                Back to dashboard
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className="px-8 py-7">
                            {/* EMPLOYEE DETAILS */}
                            <h3 className="mb-5 text-xs font-bold text-slate-900">
                                Employee details
                            </h3>

                            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                                <Field label="Employee name" required error={errors.employeeName}>
                                    <input
                                        type="text"
                                        value={form.employeeName}
                                        onChange={(e) => update("employeeName", e.target.value)}
                                        placeholder="Full name"
                                        className={cls("employeeName")}
                                    />
                                </Field>

                                <Field label="Employee ID" required error={errors.employeeId}>
                                    <input
                                        type="text"
                                        value={form.employeeId}
                                        onChange={(e) => update("employeeId", e.target.value)}
                                        placeholder="Your employee ID"
                                        className={cls("employeeId")}
                                    />
                                </Field>

                                <Field label="Department" required error={errors.department}>
                                    <select
                                        value={form.department}
                                        onChange={(e) => update("department", e.target.value)}
                                        className={cls("department")}
                                    >
                                        <option value="">Select department</option>
                                        {departmentOptions.map((dept) => (
                                            <option key={dept} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                </Field>

                                <Field label="Contact email" required error={errors.email}>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => update("email", e.target.value)}
                                        placeholder="name@company.com"
                                        className={cls("email")}
                                    />
                                </Field>
                            </div>

                            <hr className="my-7 border-slate-200" />

                            {/* LEAVE DETAILS */}
                            <h3 className="mb-5 text-xs font-bold text-slate-900">Leave details</h3>

                            <div className="space-y-5">
                                <Field
                                    label="Leave type"
                                    required
                                    error={errors.leaveType}
                                    hint={
                                        isUntoldLeave && form.leaveType === leaveType
                                            ? "Untold leave is unpaid. Explain your absence below."
                                            : remainingDays !== null && form.leaveType === leaveType
                                                ? `${remainingDays} day${
                                                    remainingDays === 1 ? "" : "s"
                                                } remaining for this leave type.`
                                                : undefined
                                    }
                                >
                                    <select
                                        value={form.leaveType}
                                        onChange={(e) => update("leaveType", e.target.value)}
                                        className={cls("leaveType")}
                                    >
                                        <option value="">Select leave type</option>
                                        {leaveTypeOptions.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </Field>

                                <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                                    <Field label="Start date" required error={errors.startDate}>
                                        <input
                                            type="date"
                                            value={form.startDate}
                                            onChange={(e) => updateDate("startDate", e.target.value)}
                                            className={cls("startDate")}
                                        />
                                    </Field>

                                    <Field label="End date" required error={errors.endDate}>
                                        <input
                                            type="date"
                                            value={form.endDate}
                                            min={form.startDate || undefined}
                                            onChange={(e) => updateDate("endDate", e.target.value)}
                                            className={cls("endDate")}
                                        />
                                    </Field>
                                </div>

                                <Field
                                    label="Number of days"
                                    required
                                    error={errors.days}
                                    hint="Calendar days are filled automatically when you select dates. Adjust if needed."
                                >
                                    <input
                                        type="number"
                                        min="1"
                                        step="0.5"
                                        value={form.days}
                                        onChange={(e) => update("days", e.target.value)}
                                        placeholder="Enter number of days"
                                        className={cls("days")}
                                    />
                                </Field>

                                <Field label="Reason" required error={errors.reason}>
                                    <textarea
                                        rows={4}
                                        value={form.reason}
                                        onChange={(e) => update("reason", e.target.value)}
                                        placeholder="Briefly describe your request; avoid sensitive details"
                                        className={`${cls("reason")} resize-y`}
                                    />
                                </Field>

                                <Field
                                    label="Attachment link"
                                    error={errors.attachment}
                                    hint="Paste a shareable link to a supporting document if needed. Files cannot be uploaded here."
                                >
                                    <input
                                        type="url"
                                        value={form.attachment}
                                        onChange={(e) => update("attachment", e.target.value)}
                                        placeholder="https://..."
                                        className={cls("attachment")}
                                    />
                                </Field>
                            </div>

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
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeaveApplication;