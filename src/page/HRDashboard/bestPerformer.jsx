
import React from "react";
import { Trophy, TrendingUp, ArrowUpRight } from "lucide-react";

const performers = [
    {
        id: 1,
        name: "Rahim Uddin",
        role: "Frontend Developer",
        department: "Development",
        score: 98,
        tasks: 42,
        avatar: "https://i.pravatar.cc/100?img=12",
    },
    {
        id: 2,
        name: "Nusrat Jahan",
        role: "UI Designer",
        department: "Design",
        score: 95,
        tasks: 38,
        avatar: "https://i.pravatar.cc/100?img=47",
    },
    {
        id: 3,
        name: "Tanvir Ahmed",
        role: "Backend Developer",
        department: "Development",
        score: 92,
        tasks: 35,
        avatar: "https://i.pravatar.cc/100?img=13",
    },
    {
        id: 4,
        name: "Sadia Islam",
        role: "QA Engineer",
        department: "Quality Assurance",
        score: 89,
        tasks: 31,
        avatar: "https://i.pravatar.cc/100?img=44",
    },
];

const BestPerformer = () => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <div className="flex items-center gap-1.5">
                        <Trophy size={15} className="text-amber-500" />
                        <h2 className="text-sm font-semibold text-slate-800">
                            Best Performers
                        </h2>
                    </div>

                    <p className="text-[10px] text-slate-500 mt-0.5">
                        Top 4 employees this month
                    </p>
                </div>


            </div>

            {/* Table */}
            <div className="w-full">
                <table className="w-full table-fixed text-left">

                    <thead>
                    <tr className="border-b border-slate-200 text-[9px] text-slate-400 uppercase">
                        <th className="pb-2 font-medium w-[44%]">Employee</th>
                        <th className="pb-2 font-medium w-[27%]">Dept.</th>
                        <th className="pb-2 font-medium w-[10%]">Task</th>
                        <th className="pb-2 font-medium w-[19%]">Score</th>
                    </tr>
                    </thead>

                    <tbody>
                    {performers.map((employee) => (
                        <tr
                            key={employee.id}
                            className="border-b border-slate-100 last:border-0"
                        >
                            {/* Employee */}
                            <td className="py-2 pr-1">
                                <div className="flex items-center gap-1.5 min-w-0">
                                        <span className={`text-[10px] font-semibold shrink-0 ${
                                            employee.id === 1
                                                ? "text-amber-500"
                                                : "text-slate-400"
                                        }`}>
                                            #{employee.id}
                                        </span>

                                    <img
                                        src={employee.avatar}
                                        alt={employee.name}
                                        className="w-7 h-7 rounded-full object-cover shrink-0"
                                    />

                                    <div className="min-w-0">
                                        <p className="text-[10px] font-semibold text-slate-800 truncate">
                                            {employee.name}
                                        </p>
                                        <p className="text-[9px] text-slate-400 truncate">
                                            {employee.role}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            {/* Department */}
                            <td className="py-2 pr-1">
                                    <span className="text-[10px] text-slate-600 block truncate">
                                        {employee.department}
                                    </span>
                            </td>

                            {/* Tasks */}
                            <td className="py-2">
                                    <span className="text-[10px] font-medium text-slate-700">
                                        {employee.tasks}
                                    </span>
                            </td>

                            {/* Performance */}
                            <td className="py-2">
                                <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-semibold text-slate-700">
                                            {employee.score}%
                                        </span>

                                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full"
                                            style={{ width: `${employee.score}%` }}
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>

            {/* Footer */}
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5">
                <TrendingUp size={12} className="text-emerald-500 shrink-0" />

                <p className="text-[9px] text-slate-500">
                    Performance ranking · November 2026
                </p>
            </div>

        </div>
    );
};

export default BestPerformer;
