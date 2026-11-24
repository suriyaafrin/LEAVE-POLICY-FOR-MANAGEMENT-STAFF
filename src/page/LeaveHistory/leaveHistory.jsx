import React from "react";
import EmployeeLeaveHistory from "./employeeLeaveHistory.jsx";
import HrLeaveHistory from "./hrLeaveHistory.jsx";

const LeaveHistory = ({ role }) => {
    return (
        <div>
            {role === "hr" ? (
                <HrLeaveHistory/>
            ) : (
                <EmployeeLeaveHistory/>
            )}
        </div>
    );
};

export default LeaveHistory;