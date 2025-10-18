import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserData from "../../hooks/useUserData";
import Loading from "../../common/loading/Loading";

const UserMedicine = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useUserData();

    const {
        data: medicines = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["medicines", currentUser?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/selectedMedicine?email=${currentUser?.email}`
            );
            return res.data;
        },
    });

    // Helper function to get medicine icon
    const getMedicineIcon = (type) => {
        if (type?.includes("ইনজেকশন") || type?.includes("injection")) {
            return "💉";
        } else if (type?.includes("ট্যাবলেট") || type?.includes("tablet")) {
            return "💊";
        } else if (type?.includes("সিরাপ") || type?.includes("syrup")) {
            return "🍶";
        } else if (type?.includes("ক্যাপসুল") || type?.includes("capsule")) {
            return "🔴";
        } else {
            return "💊";
        }
    };

    // Helper function to get status badge
    const getStatusBadge = (status) => {
        switch (status) {
            case "taken":
                return "bg-green-50 text-green-700 border border-green-200";
            case "pending":
                return "bg-yellow-50 text-yellow-700 border border-yellow-200";
            case "missed":
                return "bg-red-50 text-red-700 border border-red-200";
            default:
                return "bg-gray-50 text-gray-700 border border-gray-200";
        }
    };

    // Helper function to get status text
    const getStatusText = (status) => {
        switch (status) {
            case "taken":
                return "Taken";
            case "pending":
                return "Pending";
            case "missed":
                return "Missed";
            default:
                return "Unknown";
        }
    };

    // Calculate remaining days
    const calculateRemainingDays = (startDate, totalDays) => {
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + totalDays);
        const today = new Date();
        const diffTime = end - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    // Get remaining days color
    const getRemainingDaysColor = (days) => {
        if (days <= 7) return "text-red-600 bg-red-50 border border-red-200";
        if (days <= 14)
            return "text-yellow-600 bg-yellow-50 border border-yellow-200";
        return "text-green-600 bg-green-50 border border-green-200";
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center text-red-600 bg-white rounded-lg shadow-sm p-8 max-w-md mx-4 border">
                    <div className="text-3xl mb-4">⚠️</div>
                    <p className="text-xl font-medium mb-2">
                        Error Loading Data
                    </p>
                    <p className="text-gray-600">{error.message}</p>
                </div>
            </div>
        );
    }

    const userMedicine = medicines[0];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">💊</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Medication Schedule
                            </h1>
                            <p className="text-gray-600">
                                Patient:{" "}
                                {userMedicine?.userName ||
                                    currentUser?.displayName ||
                                    "User"}
                            </p>
                        </div>
                    </div>
                </div>

                {userMedicine ? (
                    <>
                        {/* User Medical Information */}
                        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Patient Information
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">
                                                Name
                                            </label>
                                            <p className="text-gray-900 mt-1">
                                                {userMedicine.userName}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">
                                                Age
                                            </label>
                                            <p className="text-gray-900 mt-1">
                                                {userMedicine.age} years
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">
                                                Email
                                            </label>
                                            <p className="text-gray-900 mt-1">
                                                {userMedicine.userEmail}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">
                                                Record Date
                                            </label>
                                            <p className="text-gray-900 mt-1">
                                                {new Date(
                                                    userMedicine.date
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-l pl-6">
                                    <label className="text-sm font-medium text-gray-500 mb-3 block">
                                        Medical Conditions
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {userMedicine.medicalCondition?.map(
                                            (condition, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm border border-blue-200"
                                                >
                                                    {condition}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Medicine List */}
                        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Current Medications
                                </h2>
                                <p className="text-gray-600 text-sm mt-1">
                                    Prescribed medication schedule
                                </p>
                            </div>

                            <div className="divide-y divide-gray-200">
                                {userMedicine.medicines?.map((medicine) => {
                                    const remainingDays =
                                        calculateRemainingDays(
                                            medicine.duration?.startDate,
                                            medicine.duration?.totalDays
                                        );

                                    return (
                                        <div
                                            key={medicine.id}
                                            className="p-6 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* Medicine Icon */}
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xl">
                                                        {getMedicineIcon(
                                                            medicine.type
                                                        )}
                                                    </span>
                                                </div>

                                                {/* Medicine Details */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                                        <h3 className="text-lg font-medium text-gray-900">
                                                            {medicine.name}
                                                        </h3>
                                                        <span
                                                            className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(
                                                                medicine.status
                                                            )}`}
                                                        >
                                                            {getStatusText(
                                                                medicine.status
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                                                        <div>
                                                            <label className="text-xs font-medium text-gray-500">
                                                                Type
                                                            </label>
                                                            <p className="text-sm text-gray-900 mt-1">
                                                                {medicine.type}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <label className="text-xs font-medium text-gray-500">
                                                                Time
                                                            </label>
                                                            <p className="text-sm text-gray-900 mt-1">
                                                                {medicine.time}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <label className="text-xs font-medium text-gray-500">
                                                                Dosage
                                                            </label>
                                                            <p className="text-sm text-gray-900 mt-1">
                                                                {medicine.dose}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <label className="text-xs font-medium text-gray-500">
                                                                Remaining
                                                            </label>
                                                            <p
                                                                className={`text-sm font-medium mt-1 px-2 py-1 rounded ${getRemainingDaysColor(
                                                                    remainingDays
                                                                )}`}
                                                            >
                                                                {remainingDays}{" "}
                                                                days
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {medicine.notes && (
                                                        <div className="mt-3">
                                                            <label className="text-xs font-medium text-gray-500">
                                                                Instructions
                                                            </label>
                                                            <p className="text-sm text-gray-700 mt-1 bg-gray-50 px-3 py-2 rounded border">
                                                                {medicine.notes}
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Duration Information */}
                                                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
                                                        <div>
                                                            <span className="font-medium">
                                                                Start Date:{" "}
                                                            </span>
                                                            {new Date(
                                                                medicine.duration?.startDate
                                                            ).toLocaleDateString()}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">
                                                                Duration:{" "}
                                                            </span>
                                                            {
                                                                medicine
                                                                    .duration
                                                                    ?.totalDays
                                                            }{" "}
                                                            days
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Empty Medicine State */}
                            {(!userMedicine.medicines ||
                                userMedicine.medicines.length === 0) && (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">💊</span>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        No Medications Found
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        No medications have been prescribed yet.
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    /* Empty State */
                    <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">💊</span>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-3">
                            No Medical Records
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            No medication records found for this patient.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserMedicine;
