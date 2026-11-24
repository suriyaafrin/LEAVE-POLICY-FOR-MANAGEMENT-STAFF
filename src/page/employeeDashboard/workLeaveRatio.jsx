import React from "react";

const WorkLeaveRatio = () => {
    const totalYearDays = 365;
    const totalAnnualLeave = 24;
    const leaveTaken = 10;
    const leaveRemaining = totalAnnualLeave - leaveTaken;

    const usedPercentage = (leaveTaken / totalAnnualLeave) * 100;
    const remainingPercentage = (leaveRemaining / totalAnnualLeave) * 100;

    return (
        <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            {/* Header */}
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-800">
                    Annual Leave Ratio
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                    Yearly leave balance overview
                </p>
            </div>

            {/* Chart and Statistics */}
            <div className="flex flex-col items-center gap-6 sm:flex-row">

                {/* Circular Chart */}
                <div className="relative h-36 w-36 shrink-0">
                    <div
                        className="h-full w-full rounded-full"
                        style={{
                            background: `conic-gradient(
                                #4f46e5 0% ${usedPercentage}%,
                                #e5e7eb ${usedPercentage}% 100%
                            )`,
                        }}
                    />

                    {/* Inner Circle */}
                    <div className="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-white">
                        <span className="text-2xl font-bold text-gray-800">
                            {Math.round(usedPercentage)}%
                        </span>

                        <span className="text-xs text-gray-500">
                            Used
                        </span>
                    </div>
                </div>

                {/* Statistics */}
                <div className="w-full space-y-5">

                    {/* Leave Used */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-indigo-600" />

                                <span className="text-sm text-gray-600">
                                    Leave Used
                                </span>
                            </div>

                            <span className="font-semibold text-gray-800">
                                {leaveTaken} Days
                            </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                            <div
                                className="h-full rounded-full bg-indigo-600"
                                style={{ width: `${usedPercentage}%` }}
                            />
                        </div>
                    </div>

                    {/* Remaining Leave */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-gray-300" />
                                <span className="text-sm text-gray-600">
                            Remaining Leave
                        </span>
                            </div>

                            <span className="font-semibold text-gray-800">
                        {leaveRemaining} Days
                    </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                            <div
                                className="h-full rounded-full bg-gray-300"
                                style={{ width: `${remainingPercentage}%` }}
                            />
                        </div>
                    </div>

                    {/* Total Annual Leave */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                        <span className="text-xs text-gray-500">
                            Yearly Annual Leave
                        </span>

                        <span className="text-sm font-semibold text-gray-700">
                            {totalAnnualLeave} Days
                        </span>
                    </div>

                    {/* Year */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                            Year Duration
                        </span>

                        <span className="text-sm font-semibold text-gray-700">
                            {totalYearDays} Days
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default WorkLeaveRatio;