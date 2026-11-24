
import React, { useMemo, useState } from "react";
import {
    Search,
    Users,
    UserCheck,
    UserX,
    Filter,
    Mail,
    Phone,
    CalendarDays,
    ChevronDown,
} from "lucide-react";

const employees = [
    {
        id: "EMP-001",
        name: "Rahim Uddin",
        gender: "Male",
        designation: "Frontend Developer",
        department: "Software Development",
        email: "rahim@example.com",
        phone: "+880 1712-345678",
        joiningDate: "2024-01-15",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=12",
    },
    {
        id: "EMP-002",
        name: "Nusrat Jahan",
        gender: "Female",
        designation: "UI Designer",
        department: "Design",
        email: "nusrat@example.com",
        phone: "+880 1712-345679",
        joiningDate: "2023-08-10",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=47",
    },
    {
        id: "EMP-003",
        name: "Tanvir Ahmed",
        gender: "Male",
        designation: "Backend Developer",
        department: "Software Development",
        email: "tanvir@example.com",
        phone: "+880 1712-345680",
        joiningDate: "2023-11-20",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=13",
    },
    {
        id: "EMP-004",
        name: "Sadia Islam",
        gender: "Female",
        designation: "QA Engineer",
        department: "Quality Assurance",
        email: "sadia@example.com",
        phone: "+880 1712-345681",
        joiningDate: "2024-02-05",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=44",
    },
    {
        id: "EMP-005",
        name: "Imran Hossain",
        gender: "Male",
        designation: "Product Manager",
        department: "Management",
        email: "imran@example.com",
        phone: "+880 1712-345682",
        joiningDate: "2022-06-12",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=14",
    },
    {
        id: "EMP-006",
        name: "Farhana Akter",
        gender: "Female",
        designation: "HR Executive",
        department: "Human Resources",
        email: "farhana@example.com",
        phone: "+880 1712-345683",
        joiningDate: "2023-04-18",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=45",
    },
    {
        id: "EMP-007",
        name: "Mehedi Hasan",
        gender: "Male",
        designation: "DevOps Engineer",
        department: "IT Operations",
        email: "mehedi@example.com",
        phone: "+880 1712-345684",
        joiningDate: "2024-03-01",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=15",
    },
    {
        id: "EMP-008",
        name: "Tasnim Rahman",
        gender: "Female",
        designation: "Content Writer",
        department: "Marketing",
        email: "tasnim@example.com",
        phone: "+880 1712-345685",
        joiningDate: "2023-09-25",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=46",
    },
    {
        id: "EMP-009",
        name: "Sabbir Ahmed",
        gender: "Male",
        designation: "Graphic Designer",
        department: "Design",
        email: "sabbir@example.com",
        phone: "+880 1712-345686",
        joiningDate: "2022-12-10",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=11",
    },
    {
        id: "EMP-010",
        name: "Maliha Chowdhury",
        gender: "Female",
        designation: "Business Analyst",
        department: "Management",
        email: "maliha@example.com",
        phone: "+880 1712-345687",
        joiningDate: "2024-05-15",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=49",
    },
    {
        id: "EMP-011",
        name: "Arif Hossain",
        gender: "Male",
        designation: "Database Administrator",
        department: "IT Operations",
        email: "arif@example.com",
        phone: "+880 1712-345688",
        joiningDate: "2023-02-20",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=16",
    },
    {
        id: "EMP-012",
        name: "Jannatul Ferdous",
        gender: "Female",
        designation: "Accountant",
        department: "Finance",
        email: "jannatul@example.com",
        phone: "+880 1712-345689",
        joiningDate: "2022-10-05",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=48",
    },
    {
        id: "EMP-013",
        name: "Rakib Hasan",
        gender: "Male",
        designation: "Mobile App Developer",
        department: "Software Development",
        email: "rakib@example.com",
        phone: "+880 1712-345690",
        joiningDate: "2024-06-10",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=17",
    },
    {
        id: "EMP-014",
        name: "Sumaiya Akter",
        gender: "Female",
        designation: "Recruitment Officer",
        department: "Human Resources",
        email: "sumaiya@example.com",
        phone: "+880 1712-345691",
        joiningDate: "2023-07-12",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=50",
    },
    {
        id: "EMP-015",
        name: "Shakib Rahman",
        gender: "Male",
        designation: "Marketing Executive",
        department: "Marketing",
        email: "shakib@example.com",
        phone: "+880 1712-345692",
        joiningDate: "2022-08-22",
        status: "Inactive",
        image: "https://i.pravatar.cc/150?img=18",
    },
    {
        id: "EMP-016",
        name: "Nabila Islam",
        gender: "Female",
        designation: "Software Engineer",
        department: "Software Development",
        email: "nabila@example.com",
        phone: "+880 1712-345693",
        joiningDate: "2024-04-08",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=51",
    },
    {
        id: "EMP-017",
        name: "Fahim Ahmed",
        gender: "Male",
        designation: "Support Engineer",
        department: "IT Operations",
        email: "fahim@example.com",
        phone: "+880 1712-345694",
        joiningDate: "2023-05-16",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=19",
    },
    {
        id: "EMP-018",
        name: "Raisa Rahman",
        gender: "Female",
        designation: "Project Coordinator",
        department: "Management",
        email: "raisa@example.com",
        phone: "+880 1712-345695",
        joiningDate: "2022-11-14",
        status: "Inactive",
        image: "https://i.pravatar.cc/150?img=52",
    },
    {
        id: "EMP-019",
        name: "Sajid Karim",
        gender: "Male",
        designation: "QA Analyst",
        department: "Quality Assurance",
        email: "sajid@example.com",
        phone: "+880 1712-345696",
        joiningDate: "2024-07-01",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=20",
    },
    {
        id: "EMP-020",
        name: "Mim Akter",
        gender: "Female",
        designation: "Finance Executive",
        department: "Finance",
        email: "mim@example.com",
        phone: "+880 1712-345697",
        joiningDate: "2023-10-09",
        status: "Active",
        image: "https://i.pravatar.cc/150?img=53",
    },
];

const Employee = () => {
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("All Departments");
    const [gender, setGender] = useState("All Genders");
    const [status, setStatus] = useState("All Status");

    // Summary calculation
    const totalEmployees = employees.length;

    const activeEmployees = employees.filter(
        (employee) => employee.status === "Active"
    ).length;

    const inactiveEmployees = employees.filter(
        (employee) => employee.status === "Inactive"
    ).length;

    const femaleEmployees = employees.filter(
        (employee) => employee.gender === "Female"
    ).length;

    // Search and filter
    const filteredEmployees = useMemo(() => {
        return employees.filter((employee) => {
            const searchMatch =
                employee.name.toLowerCase().includes(search.toLowerCase()) ||
                employee.id.toLowerCase().includes(search.toLowerCase()) ||
                employee.email.toLowerCase().includes(search.toLowerCase()) ||
                employee.designation.toLowerCase().includes(search.toLowerCase());

            const departmentMatch =
                department === "All Departments" ||
                employee.department === department;

            const genderMatch =
                gender === "All Genders" ||
                employee.gender === gender;

            const statusMatch =
                status === "All Status" ||
                employee.status === status;

            return searchMatch && departmentMatch && genderMatch && statusMatch;
        });
    }, [search, department, gender, status]);

    const departments = [
        "All Departments",
        ...new Set(employees.map((employee) => employee.department)),
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6">
            <div className="mx-auto max-w-[1700px]">

                {/* Page Header */}
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Employee Directory
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Manage and view all company employees
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2.5">
                        <Users size={18} className="text-indigo-600" />
                        <span className="text-sm font-semibold text-indigo-700">
                            {totalEmployees} Employees
                        </span>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-slate-500">
                                    Total Employees
                                </p>
                                <h2 className="mt-2 text-2xl font-bold text-indigo-700">
                                    {totalEmployees}
                                </h2>
                            </div>
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                <Users size={21} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-slate-500">
                                    Active Employees
                                </p>
                                <h2 className="mt-2 text-2xl font-bold text-emerald-700">
                                    {activeEmployees}
                                </h2>
                            </div>
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                                <UserCheck size={21} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-white to-rose-50 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-slate-500">
                                    Inactive Employees
                                </p>
                                <h2 className="mt-2 text-2xl font-bold text-rose-700">
                                    {inactiveEmployees}
                                </h2>
                            </div>
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                                <UserX size={21} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-pink-100 bg-gradient-to-br from-white to-pink-50 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-slate-500">
                                    Female Employees
                                </p>
                                <h2 className="mt-2 text-2xl font-bold text-pink-700">
                                    {femaleEmployees}
                                </h2>
                            </div>
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                                <Users size={21} />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Employee Table Card */}
                <div className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-md shadow-indigo-100/40">

                    {/* Table Header */}
                    <div className="border-b border-indigo-100 bg-gradient-to-r from-white to-indigo-50/70 p-4 md:p-5">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                <Users size={17} />
                            </div>

                            <h2 className="text-base font-bold text-slate-800">
                                All Employees
                            </h2>

                            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
                                {filteredEmployees.length}
                            </span>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex flex-col gap-3 xl:flex-row">

                            {/* Search */}
                            <div className="relative flex-1">
                                <Search
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Search by name, ID, email or designation..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-xl border border-indigo-100 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            {/* Department Filter */}
                            <div className="relative">
                                <select
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className="w-full appearance-none rounded-xl border border-indigo-100 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:min-w-[190px]"
                                >
                                    {departments.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown
                                    size={15}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400"
                                />
                            </div>

                            {/* Gender Filter */}
                            <div className="relative">
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full appearance-none rounded-xl border border-indigo-100 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:min-w-[140px]"
                                >
                                    <option>All Genders</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>

                                <ChevronDown
                                    size={15}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="relative">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full appearance-none rounded-xl border border-indigo-100 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:min-w-[140px]"
                                >
                                    <option>All Status</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>

                                <ChevronDown
                                    size={15}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Employee Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1250px] border-collapse text-left">

                            <thead>
                            <tr className="bg-blue-900 text-[11px] uppercase tracking-wider text-white">
                                <th className="px-5 py-4 font-semibold">
                                    Employee
                                </th>
                                <th className="px-4 py-4 font-semibold">
                                    Gender
                                </th>
                                <th className="px-4 py-4 font-semibold">
                                    Designation
                                </th>
                                <th className="px-4 py-4 font-semibold">
                                    Department
                                </th>
                                <th className="px-4 py-4 font-semibold">
                                    Contact Information
                                </th>
                                <th className="px-4 py-4 font-semibold">
                                    Joining Date
                                </th>
                                <th className="px-4 py-4 font-semibold">
                                    Status
                                </th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-indigo-50">

                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((employee, index) => (
                                    <tr
                                        key={employee.id}
                                        className={`transition duration-200 ${
                                            index % 2 === 0
                                                ? "bg-white"
                                                : "bg-indigo-50/40"
                                        } hover:bg-orange-50`}
                                    >

                                        {/* Employee Name */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-full bg-gradient-to-br from-indigo-200 to-orange-100 p-0.5">
                                                    <img
                                                        src={employee.image}
                                                        alt={employee.name}
                                                        className="h-10 w-10 rounded-full border-2 border-white object-cover"
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">
                                                        {employee.name}
                                                    </p>
                                                    <p className="mt-0.5 text-[11px] font-medium text-indigo-500">
                                                        {employee.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Gender */}
                                        <td className="px-4 py-4">
                                                <span
                                                    className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold ${
                                                        employee.gender === "Male"
                                                            ? "border-sky-200 bg-sky-100 text-sky-700"
                                                            : "border-pink-200 bg-pink-100 text-pink-700"
                                                    }`}
                                                >
                                                    {employee.gender}
                                                </span>
                                        </td>

                                        {/* Designation */}
                                        <td className="px-4 py-4">
                                            <p className="text-xs font-semibold text-slate-700">
                                                {employee.designation}
                                            </p>
                                        </td>

                                        {/* Department */}
                                        <td className="px-4 py-4">
                                                <span className="inline-flex rounded-lg border border-orange-200 bg-orange-50 px-2.5 py-1.5 text-[11px] font-medium text-orange-700">
                                                    {employee.department}
                                                </span>
                                        </td>

                                        {/* Contact */}
                                        <td className="px-4 py-4">
                                            <div className="space-y-1.5">
                                                <p className="flex items-center gap-1.5 text-[11px] text-slate-600">
                                                    <Mail size={12} className="shrink-0 text-indigo-400" />
                                                    {employee.email}
                                                </p>

                                                <p className="flex items-center gap-1.5 text-[11px] text-slate-600">
                                                    <Phone size={12} className="shrink-0 text-orange-500" />
                                                    {employee.phone}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Joining Date */}
                                        <td className="px-4 py-4">
                                            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                                                <CalendarDays size={13} className="shrink-0 text-indigo-400" />

                                                {new Date(`${employee.joiningDate}T00:00:00`).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold ${
                                                        employee.status === "Active"
                                                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                            : "border-rose-200 bg-rose-50 text-rose-700"
                                                    }`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${
                                                            employee.status === "Active"
                                                                ? "bg-emerald-500"
                                                                : "bg-rose-500"
                                                        }`}
                                                    />

                                                    {employee.status}
                                                </span>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-5 py-12 text-center"
                                    >
                                        <div className="flex flex-col items-center">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-300">
                                                <Filter size={26} />
                                            </div>

                                            <p className="mt-3 text-sm font-bold text-slate-700">
                                                No employees found
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                Try changing your search or filters
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="flex flex-col justify-between gap-2 border-t border-indigo-100 bg-gradient-to-r from-indigo-50/70 to-orange-50/50 px-5 py-3 sm:flex-row sm:items-center">
                        <p className="text-xs text-slate-500">
                            Showing{" "}
                            <span className="font-bold text-indigo-700">
                                {filteredEmployees.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-bold text-slate-700">
                                {totalEmployees}
                            </span>{" "}
                            employees
                        </p>

                        <p className="text-[11px] font-medium text-slate-400">
                            Employee Directory
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Employee;
