import React from "react";
import { motion } from "framer-motion";
import { FaUserAlt, FaUserShield, FaCalendarAlt, FaEnvelope } from "react-icons/fa";

const users = [
  {
    _id: "68e3fbdb52de47e5f6eabbbd",
    name: "Asif Ahmed",
    email: "asiif32ahamed@gmail.com",
    photo:
      "https://lh3.googleusercontent.com/a/ACg8ocKxGWZrFR5iorc7IAkckF_MX6soLfxJp317yRjDdWNm6WgKhjT3=s96-c",
    role: "user",
    active: true,
    createdAt: "2024-11-12",
  },
  {
    _id: "68e4000590b2b53c2243720e",
    name: "Baki Billah",
    email: "bakibillah3937@gmail.com",
    photo:
      "https://lh3.googleusercontent.com/a/ACg8ocIqc63mt-eeb8V4usVMSvB9ve8yZqCIBaW68VRHMy9tMQHZ9DpM0g=s96-c",
    role: "user",
    active: true,
    createdAt: "2025-04-02",
  },
];

const RoleBadge = ({ role }) => {
  const color =
    role === "admin"
      ? "bg-rose-100 text-rose-700"
      : role === "moderator"
      ? "bg-amber-100 text-amber-800"
      : "bg-green-100 text-green-700";
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
};

const UserCard = ({ user }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
  >
    <div className="flex items-center gap-5">
      <img
        src={user.photo}
        alt={user.name}
        className="w-16 h-16 rounded-full border-2 border-gray-100 object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
          <RoleBadge role={user.role} />
        </div>
        <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
          <FaEnvelope className="text-gray-400" /> {user.email}
        </p>
      </div>
    </div>

    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
        <p className="text-gray-500 text-xs">User ID</p>
        <p className="text-gray-700 font-medium break-all">{user._id}</p>
      </div>
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
        <p className="text-gray-500 text-xs">Account Created</p>
        <p className="text-gray-700 font-medium flex items-center gap-2">
          <FaCalendarAlt className="text-gray-400" /> {user.createdAt}
        </p>
      </div>
    </div>

    <div className="mt-3">
      <p
        className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
          user.active
            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
            : "bg-gray-100 text-gray-600 border border-gray-200"
        }`}
      >
        {user.active ? "Active Account" : "Inactive"}
      </p>
    </div>
  </motion.div>
);

const UserManagement = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-orange-600">
            User Management Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Overview of all registered users and their current activity status.
          </p>
        </motion.header>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <FaUserAlt className="mx-auto text-orange-500 text-2xl mb-2" />
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-2xl font-bold text-gray-800">{users.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <FaUserShield className="mx-auto text-orange-500 text-2xl mb-2" />
            <p className="text-gray-500 text-sm">Active Users</p>
            <p className="text-2xl font-bold text-gray-800">
              {users.filter((u) => u.active).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <FaUserShield className="mx-auto text-orange-500 text-2xl mb-2" />
            <p className="text-gray-500 text-sm">Admin Accounts</p>
            <p className="text-2xl font-bold text-gray-800">
              {users.filter((u) => u.role === "admin").length}
            </p>
          </div>
        </motion.div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-500 text-sm mt-10"
        >
          This view is for administrative insights only. For access control and
          permissions, visit the <span className="font-medium text-orange-600">Access Control Panel</span>.
        </motion.div>
      </div>
    </div>
  );
};

export default UserManagement;
