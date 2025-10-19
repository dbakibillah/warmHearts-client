import { useState } from "react";
import {
    FaBox,
    FaCalendarAlt,
    FaChartBar,
    FaChevronLeft,
    FaChevronRight,
    FaCog,
    FaDashcube,
    FaHeart,
    FaHome,
    FaPills,
    FaUserMd,
    FaUsers,
    FaUserShield,
    FaUtensils
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import useUserData from "../../hooks/useUserData";

const DashboardLeft = () => {
    const { currentUser, userRole } = useUserData();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    // Common menu items for all roles
    const commonMenuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaDashcube className="text-xl" />,
            roles: ["user", "admin", "staff", "doctor"],
        },
        {
            name: "Profile",
            path: "/dashboard/profile",
            icon: <FaUserShield className="text-xl" />,
            roles: ["user", "admin", "staff", "doctor"],
        },
    ];

    // Role-specific menu items
    const userMenuItems = [
        {
            name: "Food Menu",
            path: "/dashboard/food-menu",
            icon: <FaUtensils className="text-xl" />,
            roles: ["user"],
        },
        {
            name: "Medicines",
            path: "/dashboard/medicines",
            icon: <FaPills className="text-xl" />,
            roles: ["user"],
        },
        {
            name: "My Appointments",
            path: "/dashboard/my-appointments",
            icon: <FaCalendarAlt className="text-xl" />,
            roles: ["user"],
        }
    ];

    const adminMenuItems = [
        {
            name: "User Management",
            path: "/dashboard/user-management",
            icon: <FaUsers className="text-xl" />,
            roles: ["admin"],
        },
        {
            name: "Inventory",
            path: "/dashboard/inventory",
            icon: <FaBox className="text-xl" />,
            roles: ["admin", "staff"],
        },
        {
            name: "Appointments",
            path: "/dashboard/appointments",
            icon: <FaCalendarAlt className="text-xl" />,
            roles: ["admin"],
        },
        {
            name: "Reports",
            path: "/dashboard/reports",
            icon: <FaChartBar className="text-xl" />,
            roles: ["admin"],
        },
        {
            name: "System Settings",
            path: "/dashboard/system-settings",
            icon: <FaCog className="text-xl" />,
            roles: ["admin"],
        },
    ];

    const staffMenuItems = [
        {
            name: "Food Management",
            path: "/dashboard/food-management",
            icon: <FaUtensils className="text-xl" />,
            roles: ["staff"],
        },
        {
            name: "Medicine Management",
            path: "/dashboard/medicine-management",
            icon: <FaPills className="text-xl" />,
            roles: ["staff"],
        },
        {
            name: "Appointment Management",
            path: "/dashboard/appointment-management",
            icon: <FaCalendarAlt className="text-xl" />,
            roles: ["staff"],
        },
    ];

    const doctorMenuItems = [
        {
            name: "My Appointments",
            path: "/dashboard/my-appointments",
            icon: <FaCalendarAlt className="text-xl" />,
            roles: ["doctor"],
        },
        {
            name: "Patient Records",
            path: "/dashboard/patient-records",
            icon: <FaUserMd className="text-xl" />,
            roles: ["doctor"],
        },
        {
            name: "Prescriptions",
            path: "/dashboard/prescriptions",
            icon: <FaPills className="text-xl" />,
            roles: ["doctor"],
        },
    ];

    // Combine all menu items and filter based on user role
    const allMenuItems = [
        ...commonMenuItems,
        ...userMenuItems,
        ...adminMenuItems,
        ...staffMenuItems,
        ...doctorMenuItems,
    ];

    const menuItems = allMenuItems.filter((item) =>
        item.roles.includes(userRole?.toLowerCase())
    );

    // Helper function to check if item is active - SIMPLIFIED
    const isActiveItem = (item) => {
        // Exact match
        if (location.pathname === item.path) {
            return true;
        }

        // For nested routes, only activate if it's a direct child
        // This prevents multiple items from being active
        if (location.pathname.startsWith(item.path + "/")) {
            // Special case for dashboard root - only activate dashboard for exact match or direct children
            if (
                item.path === "/dashboard" &&
                location.pathname !== "/dashboard"
            ) {
                return false;
            }
            return true;
        }

        return false;
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div
            className={`relative h-full bg-gradient-to-b from-teal-800 to-teal-900 text-white transition-all duration-300 ${
                isCollapsed ? "w-24" : "w-72"
            }`}
        >
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-6 bg-teal-700 hover:bg-teal-600 text-white p-2 rounded-full border-2 border-white shadow-lg transition-all duration-300 z-10"
            >
                {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>

            {/* Header */}
            <div className="p-6 border-b border-teal-700">
                <div className="flex items-center space-x-3">
                    <div className="bg-teal-500 p-2 rounded-lg">
                        <FaHeart className="text-white text-2xl" />
                    </div>
                    {!isCollapsed && (
                        <div>
                            <h2 className="text-xl font-bold">WarmHearts</h2>
                            <p className="text-teal-200 text-sm">Shelter</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-6">
                <ul className="space-y-2 px-4">
                    {menuItems.map((item) => {
                        const isActive = isActiveItem(item);
                        return (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:bg-teal-700 hover:transform hover:scale-105 ${
                                        isActive
                                            ? "bg-white text-teal-700 shadow-lg font-semibold"
                                            : "text-teal-100"
                                    }`}
                                >
                                    <span
                                        className={`${
                                            isActive
                                                ? "text-teal-700"
                                                : "text-white"
                                        }`}
                                    >
                                        {item.icon}
                                    </span>
                                    {!isCollapsed && (
                                        <span className="text-sm">
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Info Section */}
            <div className="absolute bottom-0 w-full p-4 border-t border-teal-700">
                <div className="flex items-center space-x-3 mb-4 p-3 rounded-lg hover:bg-teal-700 transition-colors duration-200">
                    <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                        <img
                            src={currentUser?.photo}
                            className="w-8 h-8 rounded-full"
                            alt=""
                        />
                    </div>
                    {!isCollapsed && (
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">
                                {currentUser?.name || "User"}
                            </p>
                            <p className="text-xs text-teal-200 truncate">
                                {userRole || "User"}
                            </p>
                        </div>
                    )}
                </div>

                <Link
                    to="/"
                    className="flex items-center space-x-3 p-3 rounded-lg text-teal-100 hover:bg-teal-700 transition-colors duration-200"
                >
                    <FaHome className="text-white" />
                    {!isCollapsed && (
                        <span className="text-sm">Go to Home</span>
                    )}
                </Link>
            </div>

            {/* Decorative Elements */}
            {!isCollapsed && (
                <>
                    <div className="absolute top-1/4 -left-2 w-4 h-4 bg-teal-500 rounded-full opacity-50"></div>
                    <div className="absolute bottom-1/3 -left-1 w-3 h-3 bg-teal-400 rounded-full opacity-30"></div>
                    <div className="absolute top-2/3 left-4 w-2 h-2 bg-teal-300 rounded-full opacity-40"></div>
                </>
            )}
        </div>
    );
};

export default DashboardLeft;
