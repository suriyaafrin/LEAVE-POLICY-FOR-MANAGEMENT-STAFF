
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
    ChevronRight,
    ArrowLeft,
    Plus,
    X,
    Save,
    FileText,
} from "lucide-react";

const colorOptions = [
    "blue", "orange", "rose", "pink", "teal",
    "purple", "slate", "amber", "emerald",
];

const emptyForm = {
    name: "",
    shortName: "",
    days: "",
    category: "Paid Leave",
    color: "blue",
    description: "",
    eligibility: [""],
    entitlement: [""],
    approval: "",
    documents: "",
    rules: [""],
    status: "Available",
};

const AddLeavePolicy = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState(() => {
        if (!isEditing) return emptyForm;

        try {
            const saved = JSON.parse(
                localStorage.getItem("selopiaLeavePolicies") || "null"
            );

            const policy = saved?.find((item) => String(item.id) === id);

            if (policy) {
                return {
                    ...policy,
                    eligibility: policy.eligibility || [""],
                    entitlement: policy.entitlement || [""],
                    rules: policy.rules || [""],
                };
            }
        } catch (error) {
            console.error(error);
        }

        return emptyForm;
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleListChange = (field, index, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].map((item, i) =>
                i === index ? value : item
            ),
        }));
    };

    const addListItem = (field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], ""],
        }));
    };

    const removeListItem = (field, index) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const cleanedData = {
            ...formData,
            eligibility: formData.eligibility.filter((item) => item.trim()),
            entitlement: formData.entitlement.filter((item) => item.trim()),
            rules: formData.rules.filter((item) => item.trim()),
        };

        if (
            !cleanedData.name.trim() ||
            !cleanedData.shortName.trim() ||
            !cleanedData.days.trim() ||
            !cleanedData.description.trim()
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        let savedPolicies = [];

        try {
            savedPolicies = JSON.parse(
                localStorage.getItem("selopiaLeavePolicies") || "[]"
            );
        } catch {
            savedPolicies = [];
        }

        if (isEditing) {
            const updatedPolicies = savedPolicies.map((policy) =>
                String(policy.id) === id
                    ? { ...cleanedData, id: policy.id }
                    : policy
            );

            localStorage.setItem(
                "selopiaLeavePolicies",
                JSON.stringify(updatedPolicies)
            );
        } else {
            const newPolicy = {
                ...cleanedData,
                id: Date.now(),
            };

            savedPolicies.push(newPolicy);

            localStorage.setItem(
                "selopiaLeavePolicies",
                JSON.stringify(savedPolicies)
            );
        }

        navigate("/hr/explore-leave");
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                        <span>Dashboard</span>
                        <ChevronRight size={15} />
                        <button
                            type="button"
                            onClick={() => navigate("/hr/explore-leave")}
                            className="hover:text-blue-600"
                        >
                            Explore Leave
                        </button>
                        <ChevronRight size={15} />
                        <span className="text-blue-600 font-medium">
                            {isEditing ? "Edit Policy" : "Add Leave"}
                        </span>
                    </div>

                    <button
                        onClick={() => navigate("/hr/explore-leave")}
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700 mb-4"
                    >
                        <ArrowLeft size={17} />
                        Back to Explore Leave
                    </button>

                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                        {isEditing ? "Edit Leave Policy" : "Add New Leave Policy"}
                    </h1>

                    <p className="text-sm text-slate-500 mt-2">
                        {isEditing
                            ? "Update the information of this leave policy."
                            : "Create a new leave policy for your employees."}
                    </p>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 md:p-8 space-y-7"
                >
                    {/* BASIC INFORMATION */}
                    <section>
                        <h2 className="text-lg font-bold text-slate-800 mb-4">
                            Basic Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {[
                                { label: "Leave Name *", name: "name", placeholder: "e.g. Annual Leave" },
                                { label: "Short Name *", name: "shortName", placeholder: "e.g. AL" },
                                { label: "Leave Days / Entitlement *", name: "days", placeholder: "e.g. 3 Days" },
                                { label: "Approval Authority", name: "approval", placeholder: "e.g. HR Department" },
                            ].map((field) => (
                                <div key={field.name}>
                                    <label className="block text-xs font-semibold text-slate-600 mb-2">
                                        {field.label}
                                    </label>
                                    <input
                                        type="text"
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleInputChange}
                                        placeholder={field.placeholder}
                                        required={field.name !== "approval"}
                                        className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-2">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm bg-white outline-none"
                                >
                                    <option>Paid Leave</option>
                                    <option>Unpaid Leave</option>
                                    <option>Special Leave</option>
                                    <option>Financial Benefit</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-2">
                                    Card Color
                                </label>
                                <select
                                    name="color"
                                    value={formData.color}
                                    onChange={handleInputChange}
                                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm bg-white outline-none"
                                >
                                    {colorOptions.map((color) => (
                                        <option key={color} value={color}>
                                            {color.charAt(0).toUpperCase() + color.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* DESCRIPTION */}
                    <section>
                        <label className="block text-sm font-bold text-slate-800 mb-3">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            required
                            placeholder="Write a short description about this leave..."
                            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 resize-none"
                        />
                    </section>

                    {/* DYNAMIC LIST SECTIONS */}
                    {[
                        {
                            field: "eligibility",
                            title: "Eligibility Criteria",
                            placeholder: "Enter eligibility criteria...",
                        },
                        {
                            field: "entitlement",
                            title: "Entitlement Details",
                            placeholder: "Enter entitlement details...",
                        },
                        {
                            field: "rules",
                            title: "Important Rules",
                            placeholder: "Enter an important rule...",
                        },
                    ].map((section) => (
                        <section key={section.field}>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-sm font-bold text-slate-800">
                                    {section.title}
                                </h2>

                                <button
                                    type="button"
                                    onClick={() => addListItem(section.field)}
                                    className="flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900"
                                >
                                    <Plus size={15} />
                                    Add More
                                </button>
                            </div>

                            <div className="space-y-2">
                                {formData[section.field].map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) =>
                                                handleListChange(
                                                    section.field,
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            placeholder={section.placeholder}
                                            className="flex-1 min-w-0 border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-400"
                                        />

                                        {formData[section.field].length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeListItem(section.field, index)
                                                }
                                                className="p-3 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                                            >
                                                <X size={17} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* DOCUMENTS */}
                    <section>
                        <label className="block text-sm font-bold text-slate-800 mb-3">
                            Required Documents
                        </label>
                        <textarea
                            name="documents"
                            value={formData.documents}
                            onChange={handleInputChange}
                            rows="3"
                            placeholder="Enter required documents..."
                            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-400 resize-none"
                        />
                    </section>

                    {/* STATUS */}
                    <section>
                        <label className="block text-sm font-bold text-slate-800 mb-3">
                            Policy Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm bg-white outline-none"
                        >
                            <option>Available</option>
                            <option>Service Required</option>
                            <option>Special Eligibility</option>
                            <option>Management Approval</option>
                            <option>Conditional</option>
                        </select>
                    </section>

                    {/* ACTIONS */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-slate-100 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/hr/explore-leave")}
                            className="px-6 py-3 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#193B70] text-white text-sm font-semibold hover:bg-[#244D87]"
                        >
                            <Save size={17} />
                            {isEditing ? "Save Changes" : "Add Leave Policy"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLeavePolicy;
