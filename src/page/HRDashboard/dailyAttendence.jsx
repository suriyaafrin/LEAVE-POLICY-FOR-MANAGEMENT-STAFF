
import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import {
    Users,
    UserCheck,
    UserX,
    Clock,
    CalendarDays,
    CalendarCheck,
} from "lucide-react";

const DailyAttendence = () => {

    // Weekly attendance data
    const attendanceData = [
        { day: "Sat", present: 175, absent: 15 },
        { day: "Sun", present: 185, absent: 5 },
        { day: "Mon", present: 170, absent: 20 },
        { day: "Tue", present: 180, absent: 10 },
        { day: "Wed", present: 190, absent: 5 },
        { day: "Thu", present: 178, absent: 12 },
        { day: "Fri", present: 160, absent: 30 },
    ];

    // Attendance summary
    const summary = [
        {
            title: "Present",
            count: 185,
            icon: UserCheck,
            color: "text-green-600",
            bg: "bg-green-50",
        },
        {
            title: "Absent",
            count: 10,
            icon: UserX,
            color: "text-red-500",
            bg: "bg-red-50",
        },
        {
            title: "Late",
            count: 8,
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-50",
        },
        {
            title: "On Leave",
            count: 7,
            icon: CalendarDays,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
    ];

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">

            {/* Header */}
            <div className="flex justify-between items-start mb-3">

                <div>
                    <div className="flex items-center gap-2">

                        <div className="bg-blue-50 p-2 rounded-lg">
                            <CalendarCheck
                                size={17}
                                className="text-blue-600"
                            />
                        </div>

                        <h2 className="text-base font-semibold text-slate-800">
                            Daily Attendance
                        </h2>

                    </div>

                    <p className="text-xs text-slate-500 mt-1">
                        Employee attendance overview
                    </p>
                </div>

                {/* Date */}
                <span className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-50 px-2 py-1.5 rounded-lg">
                    <CalendarDays size={12} />
                    Nov 26, 2026
                </span>

            </div>

            {/* Total Employees */}
            <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3 mb-3">

                <div className="flex items-center gap-2">

                    <div className="bg-blue-100 p-1.5 rounded-lg">
                        <Users size={16} className="text-blue-600" />
                    </div>

                    <div>
                        <p className="text-[10px] text-slate-500">
                            Total Employees
                        </p>

                        <h3 className="text-lg font-bold text-slate-800">
                            210
                        </h3>
                    </div>

                </div>

                <div className="text-right">
                    <p className="text-[10px] text-slate-500">
                        Attendance Rate
                    </p>

                    <h3 className="text-lg font-bold text-green-600">
                        88.1%
                    </h3>
                </div>

            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-2 mb-3">

                {summary.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="border border-slate-100 rounded-lg p-2 flex items-center gap-2"
                        >

                            <div className={`${item.bg} p-1.5 rounded-md`}>
                                <Icon size={15} className={item.color} />
                            </div>

                            <div>
                                <p className="text-[10px] text-slate-500">
                                    {item.title}
                                </p>

                                <h3 className="text-sm font-bold text-slate-800">
                                    {item.count}
                                </h3>
                            </div>

                        </div>
                    );
                })}

            </div>

            {/* Weekly Chart */}
            <div>

                <div className="flex justify-between items-center mb-2">

                    <h3 className="text-xs font-semibold text-slate-700">
                        Weekly Attendance
                    </h3>

                    <span className="text-[10px] text-slate-400">
                        This Week
                    </span>

                </div>

                <div className="h-[135px] w-full">

                    <ResponsiveContainer width="100%" height="100%">

                        <BarChart
                            data={attendanceData}
                            barSize={12}
                            margin={{
                                top: 5,
                                right: 0,
                                left: -25,
                                bottom: 0,
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#E2E8F0"
                            />

                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fontSize: 10,
                                    fill: "#64748B",
                                }}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fontSize: 10,
                                    fill: "#64748B",
                                }}
                            />

                            <Tooltip
                                contentStyle={{
                                    borderRadius: "8px",
                                    border: "1px solid #E2E8F0",
                                    fontSize: "11px",
                                }}
                            />

                            <Bar
                                dataKey="present"
                                name="Present"
                                fill="#16A34A"
                                radius={[4, 4, 0, 0]}
                            />

                            <Bar
                                dataKey="absent"
                                name="Absent"
                                fill="#F87171"
                                radius={[4, 4, 0, 0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    );
};

export default DailyAttendence;
