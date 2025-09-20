import { useState } from "react";
import {
    FaCalendarAlt,
    FaChartBar,
    FaChevronLeft,
    FaChevronRight,
    FaCog,
    FaCreditCard,
    FaHeart,
    FaHome,
    FaPills,
    FaSignOutAlt,
    FaUtensils,
} from "react-icons/fa";

const DashboardLeft = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState("Home");

    const menuItems = [
        { name: "Home", icon: <FaHome className="text-xl" /> },
        { name: "Food Menu", icon: <FaUtensils className="text-xl" /> },
        { name: "Medicines", icon: <FaPills className="text-xl" /> },
        { name: "Appointments", icon: <FaCalendarAlt className="text-xl" /> },
        { name: "Subscriptions", icon: <FaCreditCard className="text-xl" /> },
        { name: "Reports", icon: <FaChartBar className="text-xl" /> },
        { name: "Settings", icon: <FaCog className="text-xl" /> },
    ];

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div
            className={`relative h-full bg-gradient-to-b from-purple-900 to-indigo-900 text-white transition-all duration-300 ${
                isCollapsed ? "w-20" : "w-64"
            }`}
        >
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-6 bg-indigo-700 hover:bg-indigo-600 text-white p-2 rounded-full border-2 border-white shadow-lg transition-all duration-300 z-10"
            >
                {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>

            {/* Header */}
            <div className="p-6 border-b border-indigo-700">
                <div className="flex items-center space-x-3">
                    <div className="bg-pink-500 p-2 rounded-lg">
                        <FaHeart className="text-white text-2xl" />
                    </div>
                    {!isCollapsed && (
                        <div>
                            <h2 className="text-xl font-bold">WarmHearts</h2>
                            <p className="text-indigo-200 text-sm">Shelter</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-6">
                <ul className="space-y-2 px-4">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <button
                                onClick={() => setActiveItem(item.name)}
                                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:bg-indigo-700 hover:transform hover:scale-105 ${
                                    activeItem === item.name
                                        ? "bg-white text-indigo-700 shadow-lg font-semibold"
                                        : "text-indigo-100"
                                }`}
                            >
                                <span
                                    className={`${
                                        activeItem === item.name
                                            ? "text-indigo-600"
                                            : "text-white"
                                    }`}
                                >
                                    {item.icon}
                                </span>
                                {!isCollapsed && (
                                    <span className="text-sm">{item.name}</span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User Profile & Logout */}
            <div className="absolute bottom-0 w-full p-4 border-t border-indigo-700">
                <div className="flex items-center space-x-3 mb-4 p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                    <div className="w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center">
                        <span className="font-bold text-white">U</span>
                    </div>
                    {!isCollapsed && (
                        <div>
                            <p className="text-sm font-medium">User Name</p>
                            <p className="text-xs text-indigo-200">Admin</p>
                        </div>
                    )}
                </div>

                <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-indigo-100 hover:bg-indigo-700 transition-colors duration-200">
                    <FaSignOutAlt />
                    {!isCollapsed && <span className="text-sm">Logout</span>}
                </button>
            </div>

            {/* Decorative Elements */}
            {!isCollapsed && (
                <>
                    <div className="absolute top-1/4 -left-2 w-4 h-4 bg-pink-400 rounded-full opacity-50"></div>
                    <div className="absolute bottom-1/3 -left-1 w-3 h-3 bg-purple-400 rounded-full opacity-30"></div>
                    <div className="absolute top-2/3 left-4 w-2 h-2 bg-blue-300 rounded-full opacity-40"></div>
                </>
            )}
        </div>
    );
};

export default DashboardLeft;
