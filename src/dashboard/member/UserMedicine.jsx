import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import Loading from "../../common/loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserData from "../../hooks/useUserData";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const UserMedicine = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUserData();

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMedicines, setSelectedMedicines] = useState({});
  const [weekDays, setWeekDays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMedicine, setEditMedicine] = useState(null);

  // Generate next 7 days
  const generateWeekDays = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const week = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const dayName = days[nextDay.getDay()];
      const dateString = nextDay.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      week.push({ day: dayName, date: dateString, fullDate: nextDay.toISOString().split("T")[0] });
    }
    return week;
  };

  useEffect(() => {
    const week = generateWeekDays();
    setWeekDays(week);
    if (week.length > 0) setSelectedDay(week[0].day);
  }, []);

  // Fetch medicines by user email
  const { data: medicineData = [], isLoading, error } = useQuery({
    queryKey: ["medicines", currentUser?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/public/medicine.json"); // JSON path
      const allUsers = res.data;
      const userData = allUsers.find((user) => user.userEmail === currentUser?.email);
      return userData?.medicines || [];
    },
    enabled: !!currentUser?.email,
  });

  // Initialize selectedMedicines by day
  useEffect(() => {
    if (weekDays.length > 0 && medicineData.length > 0) {
      const initial = {};
      weekDays.forEach((day) => {
        // Assign all medicines to each day (or you can customize filtering by date if available)
        initial[day.day] = medicineData.map((med) => ({
          ...med,
          date: med.date || medicineData.date, // fallback
        }));
      });
      setSelectedMedicines(initial);
    }
  }, [weekDays, medicineData]);

  // Add medicine
  const handleAddMedicine = (medicine) => {
    const currentDayMeds = selectedMedicines[selectedDay] || [];
    setSelectedMedicines((prev) => ({
      ...prev,
      [selectedDay]: [...currentDayMeds, medicine],
    }));
    toast.success(`💊 Added ${medicine.name} for ${selectedDay}`);
  };

  // Edit medicine
  const handleEditMedicine = (updatedMedicine) => {
    const currentDayMeds = selectedMedicines[selectedDay] || [];
    const updatedList = currentDayMeds.map((med) =>
      med.id === updatedMedicine.id ? updatedMedicine : med
    );
    setSelectedMedicines((prev) => ({ ...prev, [selectedDay]: updatedList }));
    toast.success(`✏️ Updated ${updatedMedicine.name}`);
    setEditMedicine(null);
  };

  // Remove medicine
  const handleRemoveMedicine = (id) => {
    const currentDayMeds = selectedMedicines[selectedDay] || [];
    const updatedList = currentDayMeds.filter((med) => med.id !== id);
    setSelectedMedicines((prev) => ({ ...prev, [selectedDay]: updatedList }));
    toast.info(`🗑️ Removed medicine`);
  };

  // Save all medicines
  const handleSubmit = () => {
    axiosSecure.post("/userMedicines", {
      user: currentUser?.email || "guest@example.com",
      selections: selectedMedicines,
    });
    toast.success("✅ Medicines saved successfully!");
  };

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500 text-center mt-20">Failed to load medicines</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
          <h1 className="text-4xl font-black text-gray-900 bg-gradient-to-r from-teal-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
            My Medicines
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
          >
            <FaPlus /> Add Medicine
          </button>
        </div>

        {/* Day Selector */}
        <div className="flex space-x-3 overflow-x-auto mb-8">
          {weekDays.map((day) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                selectedDay === day.day
                  ? "bg-gradient-to-r from-teal-500 to-emerald-600 text-white"
                  : "bg-white/70 text-gray-700 hover:bg-white"
              }`}
            >
              {day.day.substring(0, 3)} • {day.date}
            </button>
          ))}
        </div>

        {/* Medicine List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(selectedMedicines[selectedDay] || []).map((med) => (
            <div
              key={med.id}
              className="bg-white rounded-2xl shadow-lg p-5 flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{med.name}</h3>
                <p className="text-gray-600 text-sm">
                  Dose: {med.dose} | Time: {med.time}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Status: {med.status || "Pending"}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setEditMedicine(med)}
                  className="bg-yellow-100 text-yellow-700 p-2 rounded-full hover:bg-yellow-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleRemoveMedicine(med.id)}
                  className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold px-10 py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            <FaCheck className="inline mr-2" /> Save All Changes
          </button>
        </div>
      </div>

      {/* Add/Edit Medicine Modal */}
      {showModal && (
        <MedicineModal
          onClose={() => {
            setShowModal(false);
            setEditMedicine(null);
          }}
          onSave={(med) => {
            editMedicine ? handleEditMedicine(med) : handleAddMedicine(med);
            setShowModal(false);
          }}
          editMedicine={editMedicine}
        />
      )}
    </div>
  );
};

// MedicineModal Component
const MedicineModal = ({ onClose, onSave, editMedicine }) => {
  const [name, setName] = useState(editMedicine?.name || "");
  const [dose, setDose] = useState(editMedicine?.dose || "");
  const [time, setTime] = useState(editMedicine?.time || "");
  const [status, setStatus] = useState(editMedicine?.status || "Pending");

  const handleSave = () => {
    if (!name || !dose || !time) {
      toast.error("Please fill all fields!");
      return;
    }
    onSave({
      id: editMedicine?.id || Date.now(),
      name,
      dose,
      time,
      status,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">
          {editMedicine ? "Edit Medicine" : "Add Medicine"}
        </h3>
        <input
          type="text"
          placeholder="Medicine Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-xl p-3"
        />
        <input
          type="text"
          placeholder="Dose (e.g., 1 tablet)"
          value={dose}
          onChange={(e) => setDose(e.target.value)}
          className="w-full border rounded-xl p-3"
        />
        <input
          type="text"
          placeholder="Time (e.g., 08:00 AM)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border rounded-xl p-3"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded-xl p-3"
        >
          <option value="Pending">Pending</option>
          <option value="Taken">Taken</option>
          <option value="Skipped">Skipped</option>
        </select>
        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition-transform"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMedicine;
