
import React from "react";

import HRProfile from "./profile.jsx";
import HRLeaveCalendar from "./calender.jsx";
import HRMyLeaveBalance from "./myLeave.jsx";
import HRJoiningDate from "./joinDate.jsx";
import HRLeaveBalanceList from "./leaveBalance.jsx";
import PresentEmployee from "./presentEmployee.jsx";

const HrDash = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">

            <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">

                {/* LEFT SIDE */}
                <div className="min-w-0 space-y-5">

                    {/* HR PROFILE */}
                    <div className="min-w-0">
                        <HRProfile />
                    </div>

                    {/* HR LEAVE CALENDAR */}
                    <div className="min-w-0">
                        <HRLeaveCalendar />
                    </div>

                    {/* HR JOINING DATE */}
                    <div className="">
                        {/*<HRJoiningDate />*/}
                        <HRLeaveBalanceList />
                    </div>

                    {/* HR LEAVE BALANCE LIST */}
                    <div className="min-w-0">
                        {/*<HRLeaveBalanceList />*/}
                        <HRJoiningDate />
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="min-w-0 space-y-5">

                    {/* HR MY LEAVE BALANCE */}
                    <HRMyLeaveBalance />
                    <PresentEmployee/>

                </div>

            </div>

        </div>
    );
};

export default HrDash;
