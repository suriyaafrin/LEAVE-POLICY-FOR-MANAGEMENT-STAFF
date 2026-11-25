
import { Routes, Route, Navigate } from "react-router";

import MainLayout from "./layout/layout";
import Home from "./page/Home/home.jsx";
import LoginPage from "./page/LogIn/logIn.jsx";
import HRDash from "./page/HRDashboard/HRDash.jsx";
import EmployeeDash from "./page/employeeDashboard/employeeDash.jsx";
import LeaveApplication from "./page/leaveForm/leaveForm.jsx";
import Employee from "./page/Employees/employee.jsx";
import ExoloreLeave from "./page/ExploreLeave/exoloreLeave.jsx";
import LeaveHistory from "./page/LeaveHistory/leaveHistory.jsx";
import AddLeavePolicy from "./page/ExploreLeave/addLeave.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Landing page */}
            <Route path="/" element={<Home />} />

            {/* Login pages */}
            <Route path="/hr-login" element={<LoginPage role="hr" />} />
            <Route path="/employee-login" element={<LoginPage role="employee" />} />

            {/* Pages with sidebar + header */}
            <Route element={<MainLayout />}>

                {/* HR pages */}
                <Route path="/hr/dashboard" element={<HRDash />} />
                <Route
                    path="/hr/leave-history"
                    element={<LeaveHistory role="hr" />}
                />
                <Route path="/hr/explore-leave" element={<ExoloreLeave role="hr" />} />
                <Route
                    path="/hr/add-leave-policy"
                    element={<AddLeavePolicy />}
                />

                <Route
                    path="/hr/edit-leave-policy/:id"
                    element={<AddLeavePolicy />}
                />

                {/* Employee pages */}
                <Route path="/employee/dashboard" element={<EmployeeDash />} />
                <Route path="/employee/employees" element={<Employee />} />
                <Route
                    path="/employee/leave-history"
                    element={<LeaveHistory role="employee" />}
                />
                <Route path="/employee/explore-leave" element={<ExoloreLeave role="employee" />} />

            </Route>

            {/* Full-page form (no sidebar) */}
            <Route
                path="/leave-application"
                element={<LeaveApplication />}
            />

            {/* Dashboard redirect */}
            <Route
                path="/dashboard"
                element={<Navigate to="/employee/dashboard" replace />}
            />

            {/* Unknown URL -> landing page */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}


