
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import {
    ArrowLeft,
    CalendarDays,
    CloudUpload,
    FileText,
} from "lucide-react";

const leaveTypes = [
    "Annual Leave (AL)",
    "Casual Leave (CL)",
    "Sick Leave (SL)",
    "Maternity Leave",
    "Quarantine Leave",
    "Study Leave",
    "Disability Leave",
    "Extra Ordinary Leave",
];

export default function LeaveApplication() {
    const navigate = useNavigate();
    const location = useLocation();

    const selectedType = location.state?.leaveType || "";

    const [formData, setFormData] = useState({
        leaveType: selectedType,
        startDate: "",
        endDate: "",
        reason: "",
        document: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    // Automatically calculate total days
    const totalDays =
        formData.startDate && formData.endDate
            ? Math.max(
                0,
                Math.round(
                    (new Date(formData.endDate + "T00:00:00") -
                        new Date(formData.startDate + "T00:00:00")) /
                    (1000 * 60 * 60 * 24)
                ) + 1
            )
            : 0;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (totalDays <= 0) {
            alert("Please select a valid date range.");
            return;
        }

        const requestData = {
            employeeName: "Rahim Uddin",
            department: "Engineering",
            ...formData,
            totalDays,
        };

        console.log("Leave Request:", requestData);

        alert("Leave request submitted successfully!");
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-5"
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </button>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-8">

                    <div className="mb-7">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Leave Application
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Fill in the details to submit your leave request.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">

                        {/* Employee Information */}
                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Employee Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Employee Name
                                    </label>
                                    <input
                                        value="Rahim Uddin"
                                        readOnly
                                        className="w-full border rounded-lg px-4 py-3 bg-gray-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Department
                                    </label>
                                    <input
                                        value="Engineering"
                                        readOnly
                                        className="w-full border rounded-lg px-4 py-3 bg-gray-50"
                                    />
                                </div>
                            </div>
                        </section>

                        <hr />

                        {/* Leave Details */}
                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Leave Details
                            </h2>

                            <div className="space-y-5">

                                {/* Leave Type */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Leave Type *
                                    </label>

                                    <select
                                        name="leaveType"
                                        value={formData.leaveType}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg px-4 py-3 bg-white"
                                    >
                                        <option value="">Select Leave Type</option>

                                        {leaveTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Dates */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Leave Start Date *
                                        </label>

                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            required
                                            className="w-full border rounded-lg px-4 py-3"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Leave End Date *
                                        </label>

                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            min={formData.startDate || undefined}
                                            required
                                            className="w-full border rounded-lg px-4 py-3"
                                        />
                                    </div>
                                </div>

                                {/* Total Days */}
                                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                                    <p className="text-sm text-blue-600 font-medium">
                                        Total Leave Days
                                    </p>

                                    <div className="flex items-center gap-3 mt-2">
                                        <CalendarDays className="text-blue-600" size={24} />

                                        <span className="text-2xl font-bold text-blue-700">
                      {totalDays}
                    </span>

                                        <span className="text-sm text-gray-500">
                      Days (Auto Calculated)
                    </span>
                                    </div>
                                </div>

                                {/* Reason */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Reason for Leave *
                                    </label>

                                    <textarea
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        placeholder="Write your reason for taking leave..."
                                        className="w-full border rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-blue-100 outline-none"
                                    />
                                </div>

                                {/* Supporting Document */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Supporting Document
                                    </label>

                                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-7 cursor-pointer hover:bg-gray-50 transition">
                                        <CloudUpload size={32} className="text-gray-400" />

                                        <span className="font-medium text-gray-700 mt-2">
                      Upload Supporting Document
                    </span>

                                        <span className="text-xs text-gray-400 mt-1">
                      PDF, JPG, PNG
                    </span>

                                        <input
                                            type="file"
                                            name="document"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                    </label>

                                    {formData.document && (
                                        <div className="flex items-center gap-2 mt-3 text-sm text-green-600">
                                            <FileText size={18} />
                                            {formData.document.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Submit */}
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-5 py-3 border rounded-lg text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                            >
                                Submit Leave Request
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
