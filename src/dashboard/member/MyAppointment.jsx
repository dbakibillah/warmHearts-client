import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserData from "../../hooks/useUserData";
import Loading from "../../common/loading/Loading";

const MyAppointment = () => {
    const { currentUser } = useUserData();
    const axiosSecure = useAxiosSecure();

    const {
        data: myAppointment,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["appointments", currentUser?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/appointment?email=${currentUser?.email}`
            );
            return res.data.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-red-500 text-lg">
                    Error loading appointment: {error.message}
                </div>
            </div>
        );
    }

    // Check if appointment data exists and is in the expected format
    if (
        !myAppointment ||
        (Array.isArray(myAppointment) && myAppointment.length === 0)
    ) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-lg text-gray-500">
                    No appointment found. Please book an appointment first.
                </div>
            </div>
        );
    }

    // Handle different response formats
    const appointment = Array.isArray(myAppointment)
        ? myAppointment[0]
        : myAppointment;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                My Appointment Details
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                        Personal Information
                    </h2>

                    <div className="space-y-3">
                        <InfoRow
                            label="Elderly Name"
                            value={appointment.elderlyName}
                        />
                        <InfoRow label="Age" value={appointment.age} />
                        <InfoRow label="Gender" value={appointment.gender} />
                        <InfoRow
                            label="Guardian Name"
                            value={appointment.guardianName}
                        />
                        <InfoRow
                            label="Contact Number"
                            value={appointment.contactNumber}
                        />
                        <InfoRow label="Address" value={appointment.address} />
                    </div>
                </div>

                {/* Health & Appointment Details */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                        Health & Appointment Details
                    </h2>

                    <div className="space-y-3">
                        <InfoRow
                            label="Health Issues"
                            value={appointment.healthIssues}
                        />
                        <InfoRow
                            label="Medications"
                            value={appointment.medications}
                        />
                        <InfoRow
                            label="Food Preference"
                            value={appointment.foodPreference}
                        />
                        <InfoRow
                            label="Preferred Date"
                            value={formatDate(appointment.preferredDate)}
                        />
                        <InfoRow
                            label="Preferred Time"
                            value={appointment.preferredTime}
                        />
                        <InfoRow
                            label="Selected Plan"
                            value={appointment.selectedPlan}
                        />
                        <InfoRow label="Price" value={appointment.price} />
                        <InfoRow
                            label="Registered Email"
                            value={appointment.userEmail}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component for consistent info display
const InfoRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100">
        <span className="font-medium text-gray-600 sm:w-1/3">{label}:</span>
        <span className="text-gray-800 sm:w-2/3 mt-1 sm:mt-0">
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
        });
    } catch (error) {
        return dateString;
    }
};

export default MyAppointment;
