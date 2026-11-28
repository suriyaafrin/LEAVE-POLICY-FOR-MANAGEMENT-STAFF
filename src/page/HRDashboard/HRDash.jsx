
import React from "react";

import HRProfile from "./profile.jsx";
import HRLeaveCalendar from "./calender.jsx";
import HRMyLeaveBalance from "./myLeave.jsx";
import HRJoiningDate from "./joinDate.jsx";
import HRLeaveBalanceList from "./leaveBalance.jsx";
import PresentEmployee from "./presentEmployee.jsx";
import LeaveDetails from "./leaveDetails.jsx";
import DailyAttendence from "./dailyAttendence.jsx";
import BestPerformer from "./bestPerformer.jsx";

const HrDash = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">

            <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">

                {/* LEFT SIDE */}
                <div className="min-w-0 space-y-5">

                    {/* HR Profile */}
                    <div className="min-w-0">
                        <HRProfile />
                    </div>

                    {/* HR Leave Calendar */}
                    <div className="min-w-0">
                        <HRLeaveCalendar />
                    </div>

                    {/* Leave Balance List */}
                    <div className="min-w-0">
                        <HRLeaveBalanceList />
                    </div>

                    {/* Joining Date */}
                    <div className="min-w-0">
                        <HRJoiningDate />
                    </div>

                    {/* Daily Attendance */}
                    <div className="min-w-0">
                        <DailyAttendence />
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="min-w-0 space-y-5">

                    {/* My Leave Balance */}
                    <HRMyLeaveBalance />

                    {/* Present Employee */}
                    <PresentEmployee />

                    {/* Today's Leave Details */}
                    <LeaveDetails />

                    {/* Best Performer */}
                    <BestPerformer />

                </div>

            </div>

        </div>
    );
};

export default HrDash;
