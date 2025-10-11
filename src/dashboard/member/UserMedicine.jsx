import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaEdit,
  FaExclamationTriangle,
  FaHistory,
  FaNotesMedical,
  FaPills,
  FaPlus,
  FaStethoscope,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Loading from "../../common/loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserData from "../../hooks/useUserData";

// Constants and configuration
const MEDICINE_CONFIG = {
    STATUS: {
        TAKEN: { value: "taken", label: "Taken", color: "green" },
        PENDING: { value: "pending", label: "Pending", color: "yellow" },
        SKIPPED: { value: "skipped", label: "Skipped", color: "red" },
    },
    TYPES: [
        { value: "ট্যাবলেট", label: "ট্যাবলেট (Tablet)" },
        {
            value: "ইনসুলিন ইনজেকশন",
            label: "ইনসুলিন ইনজেকশন (Insulin Injection)",
        },
        { value: "ক্যাপসুল", label: "ক্যাপসুল (Capsule)" },
        { value: "সিরাপ", label: "সিরাপ (Syrup)" },
        { value: "ইনজেকশন", label: "ইনজেকশন (Injection)" },
    ],
    DEFAULT_DURATION: 30,
    LOW_SUPPLY_THRESHOLD: 7,
};

// Utility functions
const calculateRemainingDays = (startDate, totalDays) => {
    try {
        const start = new Date(startDate);
        const today = new Date();
        const endDate = new Date(start);
        endDate.setDate(start.getDate() + totalDays);

        const timeDiff = endDate.getTime() - today.getTime();
        const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

        return Math.max(0, daysRemaining);
    } catch (error) {
        console.error("Error calculating remaining days:", error);
        return totalDays;
    }
};

const generateWeekDays = () => {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const today = new Date();

    return Array.from({ length: 7 }, (_, i) => {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        const dayName = days[nextDay.getDay()];
        const dateString = nextDay.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
        return {
            day: dayName,
            date: dateString,
            fullDate: nextDay.toISOString().split("T")[0],
        };
    });
};

const validateMedicineData = (medicine) => {
    const errors = [];

    if (!medicine.name?.trim()) errors.push("Medicine name is required");
    if (!medicine.dose?.trim()) errors.push("Dose is required");
    if (!medicine.time?.trim()) errors.push("Time is required");
    if (!medicine.duration?.startDate) errors.push("Start date is required");
    if (!medicine.duration?.totalDays || medicine.duration.totalDays <= 0) {
        errors.push("Total days must be a positive number");
    }

    return errors;
};

// Custom hooks
const useMedicineOperations = (userMedicalData, userMedicines) => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const updateMedicineMutation = useMutation({
        mutationFn: async (updatedMedicines) => {
            if (!userMedicalData._id) {
                throw new Error("No medical record found for user");
            }

            const response = await axiosSecure.patch(
                `/selectedMedicine/${userMedicalData._id}`,
                { medicines: updatedMedicines }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["medicines"] });
        },
    });

    const createMedicineMutation = useMutation({
        mutationFn: async (newMedicineData) => {
            const response = await axiosSecure.post(
                "/selectedMedicine",
                newMedicineData
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["medicines"] });
        },
    });

    const updateStatus = useCallback(
        async (medicineId, newStatus) => {
            try {
                const updatedMedicines = userMedicines.map((med) =>
                    med.id === medicineId ? { ...med, status: newStatus } : med
                );

                await updateMedicineMutation.mutateAsync(updatedMedicines);
                toast.success(
                    `Medicine marked as ${
                        MEDICINE_CONFIG.STATUS[newStatus.toUpperCase()]
                            ?.label || newStatus
                    }`
                );
            } catch (error) {
                console.error("Status update error:", error);
                throw new Error("Failed to update medicine status");
            }
        },
        [userMedicines, updateMedicineMutation]
    );

    const removeMedicine = useCallback(
        async (medicineId) => {
            try {
                const updatedMedicines = userMedicines.filter(
                    (med) => med.id !== medicineId
                );
                await updateMedicineMutation.mutateAsync(updatedMedicines);
                toast.success("Medicine removed successfully");
            } catch (error) {
                console.error("Remove medicine error:", error);
                throw new Error("Failed to remove medicine");
            }
        },
        [userMedicines, updateMedicineMutation]
    );

    const addMedicine = useCallback(
        async (newMedicine, currentUser) => {
            try {
                const validationErrors = validateMedicineData(newMedicine);
                if (validationErrors.length > 0) {
                    throw new Error(validationErrors.join(", "));
                }

                const medicineWithId = {
                    ...newMedicine,
                    id:
                        userMedicines.length > 0
                            ? Math.max(...userMedicines.map((m) => m.id)) + 1
                            : 1,
                    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop",
                    status: MEDICINE_CONFIG.STATUS.PENDING.value,
                };

                const updatedMedicines = [...userMedicines, medicineWithId];

                if (userMedicalData._id) {
                    await updateMedicineMutation.mutateAsync(updatedMedicines);
                } else {
                    await createMedicineMutation.mutateAsync({
                        userName: currentUser?.displayName || "User",
                        age: currentUser?.age || 0,
                        userEmail: currentUser?.email,
                        medicalCondition: [],
                        date: new Date().toISOString().split("T")[0],
                        medicines: updatedMedicines,
                    });
                }

                toast.success(`Added ${newMedicine.name} to your medicines`);
            } catch (error) {
                console.error("Add medicine error:", error);
                throw error;
            }
        },
        [
            userMedicines,
            userMedicalData,
            updateMedicineMutation,
            createMedicineMutation,
        ]
    );

    const editMedicine = useCallback(
        async (updatedMedicine) => {
            try {
                const validationErrors = validateMedicineData(updatedMedicine);
                if (validationErrors.length > 0) {
                    throw new Error(validationErrors.join(", "));
                }

                const updatedMedicines = userMedicines.map((med) =>
                    med.id === updatedMedicine.id
                        ? {
                              ...med,
                              ...updatedMedicine,
                              duration: {
                                  ...med.duration,
                                  ...updatedMedicine.duration,
                              },
                          }
                        : med
                );

                await updateMedicineMutation.mutateAsync(updatedMedicines);
                toast.success(`Updated ${updatedMedicine.name}`);
            } catch (error) {
                console.error("Edit medicine error:", error);
                throw error;
            }
        },
        [userMedicines, updateMedicineMutation]
    );

    return {
        updateStatus,
        removeMedicine,
        addMedicine,
        editMedicine,
        isLoading:
            updateMedicineMutation.isPending ||
            createMedicineMutation.isPending,
    };
};

// Main Component
const UserMedicine = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useUserData();
    const [selectedDay, setSelectedDay] = useState("");
    const [weekDays, setWeekDays] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMedicine, setEditMedicine] = useState(null);

    // Initialize week days
    useEffect(() => {
        const week = generateWeekDays();
        setWeekDays(week);
        if (week.length > 0) setSelectedDay(week[0].day);
    }, []);

    // Fetch medicines with enhanced error handling
    const {
        data: medicineData = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["medicines", currentUser?.email],
        queryFn: async () => {
            if (!currentUser?.email) {
                throw new Error("User authentication required");
            }

            const response = await axiosSecure.get(
                `/selectedMedicine?email=${encodeURIComponent(
                    currentUser.email
                )}`
            );

            if (!response.data) {
                throw new Error("No data received from server");
            }

            return response.data;
        },
        retry: 2,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Process medical data
    const userMedicalData = medicineData[0] || {};
    const userMedicines = userMedicalData.medicines || [];

    // Enhanced medicines with calculated fields
    const enhancedMedicines = useMemo(
        () =>
            userMedicines.map((medicine) => ({
                ...medicine,
                duration: {
                    ...medicine.duration,
                    remainingDays: calculateRemainingDays(
                        medicine.duration.startDate,
                        medicine.duration.totalDays
                    ),
                    endDate: new Date(
                        new Date(medicine.duration.startDate).getTime() +
                            medicine.duration.totalDays * 24 * 60 * 60 * 1000
                    )
                        .toISOString()
                        .split("T")[0],
                    isLowSupply:
                        calculateRemainingDays(
                            medicine.duration.startDate,
                            medicine.duration.totalDays
                        ) <= MEDICINE_CONFIG.LOW_SUPPLY_THRESHOLD,
                },
            })),
        [userMedicines]
    );

    // Medicine operations
    const medicineOperations = useMedicineOperations(
        userMedicalData,
        userMedicines
    );

    // Filter medicines for selected day (enhanced logic)
    const medicinesForSelectedDay = useMemo(() => {
        // Add time-based filtering logic here if needed
        return enhancedMedicines;
    }, [enhancedMedicines]);

    // Event handlers with error handling
    const handleUpdateStatus = async (medicineId, newStatus) => {
        try {
            await medicineOperations.updateStatus(medicineId, newStatus);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleRemoveMedicine = async (medicineId) => {
        const medicine = userMedicines.find((med) => med.id === medicineId);
        if (
            !window.confirm(
                `Are you sure you want to remove "${medicine?.name}"?`
            )
        ) {
            return;
        }

        try {
            await medicineOperations.removeMedicine(medicineId);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleAddMedicine = async (newMedicine) => {
        try {
            await medicineOperations.addMedicine(newMedicine, currentUser);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleEditMedicine = async (updatedMedicine) => {
        try {
            await medicineOperations.editMedicine(updatedMedicine);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Stats calculation
    const medicineStats = useMemo(() => {
        const taken = enhancedMedicines.filter(
            (m) => m.status === MEDICINE_CONFIG.STATUS.TAKEN.value
        ).length;
        const pending = enhancedMedicines.filter(
            (m) => m.status === MEDICINE_CONFIG.STATUS.PENDING.value
        ).length;
        const lowSupply = enhancedMedicines.filter(
            (m) => m.duration?.isLowSupply
        ).length;

        return { taken, pending, lowSupply, total: enhancedMedicines.length };
    }, [enhancedMedicines]);

    // Loading and error states
    if (isLoading) return <Loading />;

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                    <FaExclamationTriangle className="text-red-500 text-6xl mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Unable to Load Medicines
                    </h2>
                    <p className="text-gray-600 mb-4">
                        {error.message ||
                            "There was an error loading your medication data."}
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors font-medium"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <HeaderSection
                    userMedicalData={userMedicalData}
                    medicineStats={medicineStats}
                    onAddMedicine={() => setShowModal(true)}
                    isLoading={medicineOperations.isLoading}
                />

                {/* Day Selector */}
                <DaySelector
                    weekDays={weekDays}
                    selectedDay={selectedDay}
                    onSelectDay={setSelectedDay}
                />

                {/* Medicine Grid */}
                <MedicineGrid
                    medicines={medicinesForSelectedDay}
                    selectedDay={selectedDay}
                    onEditMedicine={setEditMedicine}
                    onUpdateStatus={handleUpdateStatus}
                    onRemoveMedicine={handleRemoveMedicine}
                    onAddMedicine={() => setShowModal(true)}
                />

                {/* Medicine Modal */}
                {showModal && (
                    <MedicineModal
                        onClose={() => {
                            setShowModal(false);
                            setEditMedicine(null);
                        }}
                        onSave={(medicine) => {
                            editMedicine
                                ? handleEditMedicine(medicine)
                                : handleAddMedicine(medicine);
                            setShowModal(false);
                            setEditMedicine(null);
                        }}
                        editMedicine={editMedicine}
                        isLoading={medicineOperations.isLoading}
                    />
                )}
            </div>
        </div>
    );
};

// Sub-components
const HeaderSection = ({
    userMedicalData,
    medicineStats,
    onAddMedicine,
    isLoading,
}) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 bg-gradient-to-r from-teal-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
                    Medication Management
                </h1>

                {userMedicalData.userName && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-700">
                            <FaUser className="text-teal-500 flex-shrink-0" />
                            <span className="font-semibold">Patient:</span>
                            <span>{userMedicalData.userName}</span>
                            {userMedicalData.age && (
                                <span className="text-gray-500">
                                    , {userMedicalData.age} years
                                </span>
                            )}
                        </div>

                        {userMedicalData.medicalCondition?.length > 0 && (
                            <div className="flex items-start gap-2 text-gray-700">
                                <FaNotesMedical className="text-red-500 mt-1 flex-shrink-0" />
                                <div>
                                    <span className="font-semibold">
                                        Conditions:
                                    </span>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {userMedicalData.medicalCondition.map(
                                            (condition, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                                                >
                                                    {condition}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Stats */}
                {medicineStats.total > 0 && (
                    <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
                        <StatItem
                            icon={FaCheckCircle}
                            value={medicineStats.taken}
                            label="Taken"
                            color="green"
                        />
                        <StatItem
                            icon={FaHistory}
                            value={medicineStats.pending}
                            label="Pending"
                            color="yellow"
                        />
                        {medicineStats.lowSupply > 0 && (
                            <StatItem
                                icon={FaExclamationTriangle}
                                value={medicineStats.lowSupply}
                                label="Low Supply"
                                color="red"
                            />
                        )}
                    </div>
                )}
            </div>

            <button
                onClick={onAddMedicine}
                disabled={isLoading}
                className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
                <FaPlus className="text-sm" />
                {isLoading ? "Adding..." : "Add Medicine"}
            </button>
        </div>
    </div>
);

const StatItem = ({ icon: Icon, value, label, color }) => (
    <div className="flex items-center gap-2">
        <Icon className={`text-${color}-500 text-lg`} />
        <span className="font-bold text-gray-900">{value}</span>
        <span className="text-gray-500 text-sm">{label}</span>
    </div>
);

const DaySelector = ({ weekDays, selectedDay, onSelectDay }) => (
    <div className="flex space-x-2 sm:space-x-3 overflow-x-auto mb-8 pb-2 scrollbar-hide">
        {weekDays.map((day) => (
            <button
                key={day.day}
                onClick={() => onSelectDay(day.day)}
                className={`px-4 sm:px-6 py-3 rounded-2xl font-semibold transition-all flex-shrink-0 whitespace-nowrap text-sm sm:text-base ${
                    selectedDay === day.day
                        ? "bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-100"
                }`}
            >
                {day.day.substring(0, 3)} • {day.date}
            </button>
        ))}
    </div>
);

const MedicineGrid = ({
    medicines,
    selectedDay,
    onEditMedicine,
    onUpdateStatus,
    onRemoveMedicine,
    onAddMedicine,
}) => (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {medicines.map((medicine) => (
                <MedicineCard
                    key={medicine.id}
                    medicine={medicine}
                    onEdit={onEditMedicine}
                    onUpdateStatus={onUpdateStatus}
                    onRemove={onRemoveMedicine}
                />
            ))}
        </div>

        {medicines.length === 0 && (
            <EmptyState
                selectedDay={selectedDay}
                onAddMedicine={onAddMedicine}
            />
        )}
    </>
);

const MedicineCard = ({ medicine, onEdit, onUpdateStatus, onRemove }) => {
    const statusConfig =
        MEDICINE_CONFIG.STATUS[medicine.status.toUpperCase()] ||
        MEDICINE_CONFIG.STATUS.PENDING;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-teal-500">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                        className={`p-2 rounded-lg flex-shrink-0 ${
                            medicine.type.includes("ইনজেকশন")
                                ? "bg-red-100 text-red-600"
                                : "bg-teal-100 text-teal-600"
                        }`}
                    >
                        <FaPills className="text-lg" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3
                            className="font-bold text-gray-900 text-lg truncate"
                            title={medicine.name}
                        >
                            {medicine.name}
                        </h3>
                        <p className="text-gray-500 text-sm">{medicine.type}</p>
                    </div>
                </div>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                        statusConfig.color === "green"
                            ? "bg-green-100 text-green-800"
                            : statusConfig.color === "red"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                    {statusConfig.label}
                </span>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-4">
                <DetailRow icon={FaClock} label="Time" value={medicine.time} />
                <DetailRow icon={FaPills} label="Dose" value={medicine.dose} />
                {medicine.notes && (
                    <DetailRow
                        icon={FaStethoscope}
                        label="Notes"
                        value={medicine.notes}
                        isNote
                    />
                )}
                {medicine.duration && (
                    <DetailRow
                        icon={FaCalendarAlt}
                        label="Duration"
                        value={
                            <div className="text-sm">
                                <span
                                    className={`font-semibold ${
                                        medicine.duration.isLowSupply
                                            ? "text-red-600"
                                            : "text-gray-700"
                                    }`}
                                >
                                    {medicine.duration.remainingDays} days left
                                </span>
                                <span className="text-gray-400 text-xs block">
                                    Started:{" "}
                                    {new Date(
                                        medicine.duration.startDate
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        }
                    />
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                    <button
                        onClick={() =>
                            onUpdateStatus(
                                medicine.id,
                                MEDICINE_CONFIG.STATUS.TAKEN.value
                            )
                        }
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            medicine.status ===
                            MEDICINE_CONFIG.STATUS.TAKEN.value
                                ? "bg-green-500 text-white"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                    >
                        Taken
                    </button>
                    <button
                        onClick={() =>
                            onUpdateStatus(
                                medicine.id,
                                MEDICINE_CONFIG.STATUS.SKIPPED.value
                            )
                        }
                        className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                    >
                        Skip
                    </button>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(medicine)}
                        className="bg-blue-100 text-blue-700 p-2 rounded-lg hover:bg-blue-200 transition-colors"
                        title="Edit medicine"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => onRemove(medicine.id)}
                        className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors"
                        title="Remove medicine"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
        </div>
    );
};

const DetailRow = ({ icon: Icon, label, value, isNote = false }) => (
    <div className="flex items-start gap-2 text-gray-600">
        <Icon
            className={`${isNote ? "mt-1" : "mt-0.5"} flex-shrink-0 ${
                label === "Time"
                    ? "text-teal-500"
                    : label === "Dose"
                    ? "text-blue-500"
                    : label === "Notes"
                    ? "text-orange-500"
                    : "text-purple-500"
            }`}
        />
        <div className="flex-1 min-w-0">
            <span className="font-medium">{label}:</span>
            {isNote ? (
                <p className="text-sm text-gray-500 mt-1">{value}</p>
            ) : (
                <span className="ml-1">{value}</span>
            )}
        </div>
    </div>
);

const EmptyState = ({ selectedDay, onAddMedicine }) => (
    <div className="text-center py-12 sm:py-16">
        <FaPills className="text-6xl text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-500 mb-3">
            No medications scheduled for {selectedDay}
        </h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm sm:text-base">
            Start managing your medication schedule by adding your first
            medicine. You can set dosages, timings, and track your progress.
        </p>
        <button
            onClick={onAddMedicine}
            className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
        >
            Add Your First Medicine
        </button>
    </div>
);

// Medicine Modal Component
const MedicineModal = ({ onClose, onSave, editMedicine, isLoading }) => {
    const [formData, setFormData] = useState({
        name: editMedicine?.name || "",
        dose: editMedicine?.dose || "",
        time: editMedicine?.time || "",
        notes: editMedicine?.notes || "",
        type: editMedicine?.type || MEDICINE_CONFIG.TYPES[0].value,
        duration: {
            totalDays:
                editMedicine?.duration?.totalDays ||
                MEDICINE_CONFIG.DEFAULT_DURATION,
            startDate:
                editMedicine?.duration?.startDate ||
                new Date().toISOString().split("T")[0],
        },
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors((prev) => ({ ...prev, [name]: undefined }));

        if (name.startsWith("duration.")) {
            const durationField = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                duration: { ...prev.duration, [durationField]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateMedicineData(formData);
        if (validationErrors.length > 0) {
            const errorObj = {};
            validationErrors.forEach((error) => {
                if (error.includes("name")) errorObj.name = error;
                else if (error.includes("dose")) errorObj.dose = error;
                else if (error.includes("time")) errorObj.time = error;
                else if (error.includes("date"))
                    errorObj["duration.startDate"] = error;
                else if (error.includes("days"))
                    errorObj["duration.totalDays"] = error;
            });
            setErrors(errorObj);
            toast.error("Please fix the validation errors");
            return;
        }

        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                        {editMedicine
                            ? "Edit Medication"
                            : "Add New Medication"}
                    </h3>

                    <FormField
                        label="Medicine Name *"
                        name="name"
                        type="text"
                        placeholder="e.g., Metformin 500mg"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                    />

                    <FormField
                        label="Dose *"
                        name="dose"
                        type="text"
                        placeholder="e.g., ১ ট্যাবলেট, ৮ ইউনিট"
                        value={formData.dose}
                        onChange={handleChange}
                        error={errors.dose}
                        required
                    />

                    <FormField
                        label="Time *"
                        name="time"
                        type="text"
                        placeholder="e.g., সকাল ৮:০০, দুপুর ১:০০"
                        value={formData.time}
                        onChange={handleChange}
                        error={errors.time}
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Medicine Type
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                {MEDICINE_CONFIG.TYPES.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <FormField
                            label="Total Days *"
                            name="duration.totalDays"
                            type="number"
                            placeholder="30"
                            value={formData.duration.totalDays}
                            onChange={handleChange}
                            error={errors["duration.totalDays"]}
                            min="1"
                        />
                    </div>

                    <FormField
                        label="Start Date *"
                        name="duration.startDate"
                        type="date"
                        value={formData.duration.startDate}
                        onChange={handleChange}
                        error={errors["duration.startDate"]}
                    />

                    <FormField
                        label="Notes"
                        name="notes"
                        type="text"
                        placeholder="e.g., নাশতার পর, লাঞ্চের আগে"
                        value={formData.notes}
                        onChange={handleChange}
                    />

                    <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-300 transition font-medium disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition-transform font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading
                                ? "Saving..."
                                : editMedicine
                                ? "Update"
                                : "Add"}{" "}
                            Medicine
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const FormField = ({
    label,
    name,
    type,
    placeholder,
    value,
    onChange,
    error,
    required = false,
    min,
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            min={min}
            className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                error ? "border-red-300" : "border-gray-300"
            }`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

export default UserMedicine;
