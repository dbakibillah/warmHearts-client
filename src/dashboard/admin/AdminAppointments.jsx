import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const AdminAppointments = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        data: appointments,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["admin-appointments"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/appointments`);
            return res.data.data || res.data;
        },
    });

    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <div className="text-lg text-gray-600">
                        Loading appointments...
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="text-center">
                    <div className="text-red-500 text-xl mb-2">⚠️</div>
                    <div className="text-red-600 text-lg font-medium mb-2">
                        Failed to load appointments
                    </div>
                    <div className="text-gray-600">
                        Please try refreshing the page
                    </div>
                </div>
            </div>
        );
    }

    if (!appointments || appointments.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="text-center">
                    <div className="text-gray-400 text-6xl mb-4">📅</div>
                    <div className="text-xl font-semibold text-gray-600 mb-2">
                        No Appointments Found
                    </div>
                    <div className="text-gray-500">
                        There are no appointments scheduled at the moment.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Appointments Management
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Overview of all scheduled appointments (
                        {appointments.length} total)
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="rounded-lg bg-blue-100 p-3">
                                <span className="text-2xl">📋</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Total Appointments
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {appointments.length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="rounded-lg bg-green-100 p-3">
                                <span className="text-2xl">👥</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Unique Patients
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {
                                        new Set(
                                            appointments.map(
                                                (apt) => apt.elderlyName
                                            )
                                        ).size
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="rounded-lg bg-purple-100 p-3">
                                <span className="text-2xl">💰</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Total Revenue
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {appointments
                                        .reduce((total, apt) => {
                                            const price = parseInt(
                                                apt.price?.replace(
                                                    /[^0-9]/g,
                                                    ""
                                                ) || "0"
                                            );
                                            return total + price;
                                        }, 0)
                                        .toLocaleString()}{" "}
                                    Taka
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appointments Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Scheduled Appointments
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Patient Details
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Contact Information
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Appointment
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Health Profile
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {appointments.map((appointment) => (
                                    <AppointmentRow
                                        key={appointment._id}
                                        appointment={appointment}
                                        onViewDetails={handleViewDetails}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            {isModalOpen && selectedAppointment && (
                <AppointmentModal
                    appointment={selectedAppointment}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

// Individual Appointment Row Component
const AppointmentRow = ({ appointment, onViewDetails }) => {
    return (
        <tr className="hover:bg-gray-50 transition-colors duration-150">
            {/* Patient Details */}
            <td className="px-6 py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                            {appointment.elderlyName?.charAt(0) || "P"}
                        </span>
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-gray-900">
                            {appointment.elderlyName}
                        </div>
                        <div className="text-sm text-gray-500">
                            {appointment.age} years • {appointment.gender}
                        </div>
                    </div>
                </div>
            </td>

            {/* Contact Information */}
            <td className="px-6 py-4">
                <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-900">
                        {appointment.guardianName}
                    </div>
                    <div className="text-sm text-gray-600">
                        {appointment.contactNumber}
                    </div>
                    <div className="text-sm text-blue-600 truncate max-w-xs">
                        {appointment.userEmail}
                    </div>
                </div>
            </td>

            {/* Appointment Details */}
            <td className="px-6 py-4">
                <div className="space-y-2">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {appointment.selectedPlan}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                        {formatDate(appointment.preferredDate)}
                    </div>
                    <div className="text-sm text-gray-600">
                        {appointment.preferredTime}
                    </div>
                    <div className="text-sm font-semibold text-green-700">
                        {appointment.price}
                    </div>
                </div>
            </td>

            {/* Health Profile */}
            <td className="px-6 py-4">
                <div className="space-y-1">
                    <div className="text-sm">
                        <span className="font-medium text-gray-700">
                            Health:
                        </span>
                        <span className="text-gray-600 ml-1">
                            {truncateText(appointment.healthIssues, 25)}
                        </span>
                    </div>
                    <div className="text-sm">
                        <span className="font-medium text-gray-700">
                            Medications:
                        </span>
                        <span className="text-gray-600 ml-1">
                            {truncateText(appointment.medications, 25)}
                        </span>
                    </div>
                    <div className="text-sm">
                        <span className="font-medium text-gray-700">Diet:</span>
                        <span className="text-gray-600 ml-1">
                            {appointment.foodPreference}
                        </span>
                    </div>
                </div>
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
                <button
                    onClick={() => onViewDetails(appointment)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                >
                    <span className="mr-2">👁️</span>
                    View Details
                </button>
            </td>
        </tr>
    );
};

// Appointment Detail Modal
const AppointmentModal = ({ appointment, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Appointment Details
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                        >
                            <span className="text-2xl">×</span>
                        </button>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                    {/* Patient Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                Patient Information
                            </h4>
                            <div className="space-y-3">
                                <DetailItem
                                    label="Full Name"
                                    value={appointment.elderlyName}
                                />
                                <DetailItem
                                    label="Age"
                                    value={appointment.age}
                                />
                                <DetailItem
                                    label="Gender"
                                    value={appointment.gender}
                                />
                                <DetailItem
                                    label="Guardian"
                                    value={appointment.guardianName}
                                />
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                Contact Information
                            </h4>
                            <div className="space-y-3">
                                <DetailItem
                                    label="Phone"
                                    value={appointment.contactNumber}
                                />
                                <DetailItem
                                    label="Email"
                                    value={appointment.userEmail}
                                />
                                <DetailItem
                                    label="Address"
                                    value={appointment.address}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Health Information */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                            Health Information
                        </h4>
                        <div className="space-y-3">
                            <DetailItem
                                label="Health Issues"
                                value={appointment.healthIssues}
                            />
                            <DetailItem
                                label="Medications"
                                value={appointment.medications}
                            />
                            <DetailItem
                                label="Food Preference"
                                value={appointment.foodPreference}
                            />
                        </div>
                    </div>

                    {/* Appointment Details */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                            Appointment Details
                        </h4>
                        <div className="space-y-3">
                            <DetailItem
                                label="Selected Plan"
                                value={appointment.selectedPlan}
                            />
                            <DetailItem
                                label="Preferred Date"
                                value={formatDate(appointment.preferredDate)}
                            />
                            <DetailItem
                                label="Preferred Time"
                                value={appointment.preferredTime}
                            />
                            <DetailItem
                                label="Price"
                                value={appointment.price}
                            />
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Detail Item Component for Modal
const DetailItem = ({ label, value }) => (
    <div className="flex justify-between items-start py-2 border-b border-gray-100">
        <span className="font-medium text-gray-700 text-sm">{label}:</span>
        <span className="text-gray-900 text-sm text-right max-w-xs">
            {value || "Not specified"}
        </span>
    </div>
);

// Helper function to format date
const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
        });
    } catch (error) {
        return dateString;
    }
};

// Helper function to truncate long text
const truncateText = (text, maxLength) => {
    if (!text) return "Not specified";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
};

export default AdminAppointments;
