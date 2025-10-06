import { useState, useEffect } from "react";
import {
    FaUtensils,
    FaCheck,
    FaTimes,
    FaCalendarAlt,
    FaFire,
} from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// Mock data - in real app, this would come from API
const foodMenuData = [
    {
        day: "Sunday",
        meals: {
            breakfast: [
                {
                    id: 1,
                    name: "রুটি ও ডিম ভাজি",
                    calories: 320,
                    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 2,
                    name: "চিড়া দই কলা",
                    calories: 280,
                    image: "https://images.unsplash.com/photo-1568901343683-35d4f5f84c07?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 3,
                    name: "পরোটা ও আলুর দম",
                    calories: 400,
                    image: "https://images.unsplash.com/photo-1630918655889-2485835f6daa?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
            ],
            lunch: [
                {
                    id: 4,
                    name: "ভাত, ডাল ও মাছের ঝোল",
                    calories: 520,
                    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 5,
                    name: "সবজি খিচুড়ি",
                    calories: 480,
                    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 6,
                    name: "ভাত, মুরগির ঝোল ও সালাদ",
                    calories: 560,
                    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
            ],
            snacks: [
                {
                    id: 7,
                    name: "সিঙ্গারা ও চা",
                    calories: 200,
                    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 8,
                    name: "চপ ও বিস্কুট",
                    calories: 220,
                    image: "https://images.unsplash.com/photo-1558961367-f5ef86ddb9bf?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 9,
                    name: "ফল ও দই",
                    calories: 180,
                    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
            ],
            dinner: [
                {
                    id: 10,
                    name: "রুটি ও ডাল",
                    calories: 300,
                    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 11,
                    name: "সবজি ভাজি ও ডিম সেদ্ধ",
                    calories: 330,
                    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 12,
                    name: "সবজি খিচুড়ি",
                    calories: 420,
                    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
            ],
        },
    },
    {
        day: "Monday",
        meals: {
            breakfast: [
                {
                    id: 13,
                    name: "লুচি ও আলুর তরকারি",
                    calories: 420,
                    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 14,
                    name: "সুজি হালুয়া",
                    calories: 300,
                    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 15,
                    name: "চা ও বিস্কুট",
                    calories: 150,
                    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
            ],
            lunch: [
                {
                    id: 16,
                    name: "ভাত, গরুর মাংস ও সালাদ",
                    calories: 640,
                    image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 17,
                    name: "সবজি পোলাও",
                    calories: 480,
                    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 18,
                    name: "ভাত, ডিমের কারি ও সবজি",
                    calories: 520,
                    image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
            ],
            snacks: [
                {
                    id: 19,
                    name: "সমুচা ও চা",
                    calories: 210,
                    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 20,
                    name: "মুড়ি ও চানাচুর",
                    calories: 180,
                    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 21,
                    name: "ফল",
                    calories: 120,
                    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
            ],
            dinner: [
                {
                    id: 22,
                    name: "রুটি ও সবজি",
                    calories: 340,
                    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 23,
                    name: "খিচুড়ি ও চাটনি",
                    calories: 430,
                    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 24,
                    name: "সবজি স্যুপ",
                    calories: 200,
                    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
            ],
        },
    },
    {
        day: "Tuesday",
        meals: {
            breakfast: [
                {
                    id: 25,
                    name: "রুটি ও সবজি",
                    calories: 330,
                    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 26,
                    name: "চা ও কলা",
                    calories: 150,
                    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 27,
                    name: "চিড়া দই আপেল",
                    calories: 290,
                    image: "https://images.unsplash.com/photo-1568901343683-35d4f5f84c07?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
            ],
            lunch: [
                {
                    id: 28,
                    name: "ভাত, মাছ ভাজা ও ডাল",
                    calories: 540,
                    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 29,
                    name: "মুরগি বিরিয়ানি",
                    calories: 580,
                    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 30,
                    name: "ভাত, সবজি তরকারি",
                    calories: 460,
                    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
            ],
            snacks: [
                {
                    id: 31,
                    name: "পাকোড়া ও চা",
                    calories: 230,
                    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 32,
                    name: "জুস ও কেক",
                    calories: 190,
                    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 33,
                    name: "বাদাম ও ফল",
                    calories: 170,
                    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
            ],
            dinner: [
                {
                    id: 34,
                    name: "পরোটা ও ডাল",
                    calories: 380,
                    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 35,
                    name: "নুডলস",
                    calories: 420,
                    image: "https://images.unsplash.com/photo-1585032221-972c2a087151?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
                {
                    id: 36,
                    name: "সবজি ও রুটি",
                    calories: 320,
                    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
                    isAvailable: true,
                },
            ],
        },
    },
];

const UserFoodMenu = () => {
    const [selectedDay, setSelectedDay] = useState("Sunday");
    const [selectedMeals, setSelectedMeals] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const axiosPublic = useAxiosPublic();

    // Initialize selected meals
    useEffect(() => {
        const initialSelections = {};
        foodMenuData.forEach((dayData) => {
            initialSelections[dayData.day] = {
                breakfast: null,
                lunch: null,
                snacks: null,
                dinner: null,
            };
        });
        setSelectedMeals(initialSelections);
    }, []);

    const handleMealSelect = (mealType, foodItem) => {
        setSelectedMeals((prev) => ({
            ...prev,
            [selectedDay]: {
                ...prev[selectedDay],
                [mealType]: foodItem,
            },
        }));
    };

    const handleMealDeselect = (mealType) => {
        setSelectedMeals((prev) => ({
            ...prev,
            [selectedDay]: {
                ...prev[selectedDay],
                [mealType]: null,
            },
        }));
    };

    const calculateTotalCalories = (day) => {
        const daySelections = selectedMeals[day];
        if (!daySelections) return 0;

        return Object.values(daySelections).reduce((total, meal) => {
            return total + (meal?.calories || 0);
        }, 0);
    };

    const getMealTypeName = (mealType) => {
        const mealNames = {
            breakfast: "Breakfast",
            lunch: "Lunch",
            snacks: "Snacks",
            dinner: "Dinner",
        };
        return mealNames[mealType];
    };

    const handleSubmitSelections = () => {
        // In real app, send selectedMeals to backend
        console.log("Selected meals:", selectedMeals);
        setShowConfirmation(true);

        // Hide confirmation after 3 seconds
        setTimeout(() => setShowConfirmation(false), 3000);
    };

    const currentDayData = foodMenuData.find((day) => day.day === selectedDay);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="bg-teal-500 p-3 rounded-xl">
                            <FaUtensils className="text-white text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                Weekly Food Menu
                            </h1>
                            <p className="text-gray-600">
                                Select your preferred meals for each day
                            </p>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                            <FaCalendarAlt className="text-teal-500" />
                            <span className="font-semibold text-gray-700">
                                {selectedDay}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Day Selector */}
                <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
                    {foodMenuData.map((dayData) => (
                        <button
                            key={dayData.day}
                            onClick={() => setSelectedDay(dayData.day)}
                            className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                selectedDay === dayData.day
                                    ? "bg-teal-500 text-white shadow-lg transform scale-105"
                                    : "bg-white text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                            }`}
                        >
                            {dayData.day}
                            <div className="text-sm font-normal mt-1 opacity-80">
                                {calculateTotalCalories(dayData.day)} cal
                            </div>
                        </button>
                    ))}
                </div>

                {/* Food Selection Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Available Meals */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                            <FaUtensils className="mr-2 text-teal-500" />
                            Available Meals for {selectedDay}
                        </h2>

                        {currentDayData &&
                            Object.entries(currentDayData.meals).map(
                                ([mealType, foods]) => (
                                    <div
                                        key={mealType}
                                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                                            {getMealTypeName(mealType)}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {foods.map((food) => (
                                                <div
                                                    key={food.id}
                                                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                                                        selectedMeals[
                                                            selectedDay
                                                        ]?.[mealType]?.id ===
                                                        food.id
                                                            ? "border-teal-500 bg-teal-50 transform scale-105"
                                                            : "border-gray-200 hover:border-teal-300 hover:bg-gray-50"
                                                    } ${
                                                        !food.isAvailable
                                                            ? "opacity-50 cursor-not-allowed"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        food.isAvailable &&
                                                        handleMealSelect(
                                                            mealType,
                                                            food
                                                        )
                                                    }
                                                >
                                                    <div className="flex space-x-4">
                                                        <img
                                                            src={food.image}
                                                            alt={food.name}
                                                            className="w-16 h-16 rounded-lg object-cover"
                                                        />
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-gray-800">
                                                                {food.name}
                                                            </h4>
                                                            <div className="flex items-center space-x-2 mt-1">
                                                                <FaFire className="text-orange-500 text-sm" />
                                                                <span className="text-sm text-gray-600">
                                                                    {
                                                                        food.calories
                                                                    }{" "}
                                                                    calories
                                                                </span>
                                                            </div>
                                                            {!food.isAvailable && (
                                                                <span className="text-xs text-red-500 mt-1">
                                                                    Not
                                                                    Available
                                                                </span>
                                                            )}
                                                        </div>
                                                        {selectedMeals[
                                                            selectedDay
                                                        ]?.[mealType]?.id ===
                                                            food.id && (
                                                            <div className="text-teal-500">
                                                                <FaCheck className="text-xl" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            )}
                    </div>

                    {/* Selected Meals Summary */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            Your Selections
                        </h2>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {selectedDay}'s Meals
                                </h3>
                                <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-semibold">
                                    Total: {calculateTotalCalories(selectedDay)}{" "}
                                    cal
                                </div>
                            </div>

                            <div className="space-y-4">
                                {Object.entries(
                                    selectedMeals[selectedDay] || {}
                                ).map(([mealType, selectedFood]) => (
                                    <div
                                        key={mealType}
                                        className="border border-gray-200 rounded-lg p-4"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-gray-700 capitalize">
                                                {getMealTypeName(mealType)}
                                            </h4>
                                            {selectedFood && (
                                                <button
                                                    onClick={() =>
                                                        handleMealDeselect(
                                                            mealType
                                                        )
                                                    }
                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                >
                                                    <FaTimes />
                                                </button>
                                            )}
                                        </div>

                                        {selectedFood ? (
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={selectedFood.image}
                                                    alt={selectedFood.name}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-800">
                                                        {selectedFood.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600 flex items-center">
                                                        <FaFire className="text-orange-500 mr-1" />
                                                        {selectedFood.calories}{" "}
                                                        cal
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 text-sm italic">
                                                No selection made
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleSubmitSelections}
                                disabled={
                                    calculateTotalCalories(selectedDay) === 0
                                }
                                className="w-full mt-6 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                            >
                                Confirm Selections for {selectedDay}
                            </button>
                        </div>

                        {/* Weekly Summary */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Weekly Summary
                            </h3>
                            <div className="space-y-3">
                                {foodMenuData.map((dayData) => (
                                    <div
                                        key={dayData.day}
                                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                                    >
                                        <span
                                            className={`font-medium ${
                                                selectedDay === dayData.day
                                                    ? "text-teal-600"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {dayData.day}
                                        </span>
                                        <span className="text-gray-600">
                                            {calculateTotalCalories(
                                                dayData.day
                                            )}{" "}
                                            cal
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Toast */}
            {showConfirmation && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300">
                    <div className="flex items-center space-x-2">
                        <FaCheck />
                        <span>Meal selections saved successfully!</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserFoodMenu;
