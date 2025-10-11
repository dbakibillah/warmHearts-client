import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
    FaBolt,
    FaCalendarAlt,
    FaCheck,
    FaFire,
    FaSave,
    FaTimes,
    FaUser,
    FaUtensils,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Loading from "../../common/loading/Loading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserData from "../../hooks/useUserData";

const UserFoodMenu = () => {
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedMeals, setSelectedMeals] = useState({});
    const [weekDays, setWeekDays] = useState([]);
    const [activeMealType, setActiveMealType] = useState("all");
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useUserData();
    const queryClient = useQueryClient();

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
        const week = [];

        for (let i = 0; i < 7; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);
            const dayName = days[nextDay.getDay()];
            const dateString = nextDay.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });

            week.push({
                day: dayName,
                date: dateString,
                fullDate: nextDay.toISOString().split("T")[0],
            });
        }

        return week;
    };

    useEffect(() => {
        const generatedWeek = generateWeekDays();
        setWeekDays(generatedWeek);
        if (generatedWeek.length > 0) {
            setSelectedDay(generatedWeek[0].day);
        }
    }, []);

    const {
        data: foodMenuData = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["foodMenu"],
        queryFn: async () => {
            const res = await axiosPublic.get("/foodmenu");
            return res.data;
        },
    });

    const { data: existingSelections = [] } = useQuery({
        queryKey: ["userSelections", currentUser?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/selectedFoodMenu?email=${currentUser?.email}`
            );
            return res.data;
        },
        enabled: !!currentUser?.email,
    });

    // Mutation for saving selections
    const saveSelectionsMutation = useMutation({
        mutationFn: async (submissionData) => {
            if (existingSelections.length > 0) {
                return await axiosSecure.patch(
                    `/selectedFoodMenu/${existingSelections[0]._id}`,
                    submissionData
                );
            } else {
                return await axiosSecure.post(
                    "/selectedFoodMenu",
                    submissionData
                );
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["userSelections"]);
            toast.success("✅ Meal selections saved successfully! 🎉");
        },
        onError: (error) => {
            console.error("Save error:", error);
            toast.error("❌ Failed to save selections. Please try again.");
        },
    });

    // Initialize selected meals with existing selections
    useEffect(() => {
        if (weekDays.length > 0 && existingSelections.length > 0) {
            const initialSelections = {};

            weekDays.forEach((dayInfo) => {
                const existingDaySelection =
                    existingSelections[0]?.selections?.[dayInfo.day];

                if (existingDaySelection) {
                    // Use existing selections for this day
                    initialSelections[dayInfo.day] = {
                        breakfast: existingDaySelection.meals.breakfast,
                        lunch: existingDaySelection.meals.lunch,
                        snacks: existingDaySelection.meals.snacks,
                        dinner: existingDaySelection.meals.dinner,
                        date: dayInfo.fullDate,
                        displayDate: dayInfo.date,
                    };
                } else {
                    // Initialize empty for this day
                    initialSelections[dayInfo.day] = {
                        breakfast: null,
                        lunch: null,
                        snacks: null,
                        dinner: null,
                        date: dayInfo.fullDate,
                        displayDate: dayInfo.date,
                    };
                }
            });

            setSelectedMeals(initialSelections);
        } else if (weekDays.length > 0) {
            // Initialize empty selections if no existing data
            const initialSelections = {};
            weekDays.forEach((dayInfo) => {
                initialSelections[dayInfo.day] = {
                    breakfast: null,
                    lunch: null,
                    snacks: null,
                    dinner: null,
                    date: dayInfo.fullDate,
                    displayDate: dayInfo.date,
                };
            });
            setSelectedMeals(initialSelections);
        }
    }, [weekDays, existingSelections]);

    // Check if a food is already selected in any day
    const isFoodAlreadySelected = (foodId) => {
        if (!existingSelections.length) return false;

        const selections = existingSelections[0]?.selections;
        if (!selections) return false;

        // Check all days and all meal types for this food ID
        for (const day of Object.values(selections)) {
            for (const meal of Object.values(day.meals)) {
                if (meal && meal.id === foodId) {
                    return true;
                }
            }
        }
        return false;
    };

    // Check if a food is selected for the current day in current session
    const isFoodSelectedForCurrentDay = (foodId, mealType) => {
        const currentSelection = selectedMeals[selectedDay];
        return currentSelection?.[mealType]?.id === foodId;
    };

    const handleMealSelect = (mealType, foodItem) => {
        if (!foodItem.isAvailable) {
            toast.warning(`${foodItem.name} is currently unavailable`);
            return;
        }

        // Check if food is already selected in existing data (not current session)
        const existingSelection = isFoodAlreadySelected(foodItem.id);
        const currentSelection = isFoodSelectedForCurrentDay(
            foodItem.id,
            mealType
        );

        if (existingSelection && !currentSelection) {
            toast.warning(
                `${foodItem.name} is already selected for another day`
            );
            return;
        }

        const currentDayInfo = weekDays.find((day) => day.day === selectedDay);

        setSelectedMeals((prev) => ({
            ...prev,
            [selectedDay]: {
                ...prev[selectedDay],
                [mealType]: {
                    ...foodItem,
                    selectedDate: currentDayInfo?.fullDate,
                    selectedDisplayDate: currentDayInfo?.date,
                },
            },
        }));

        toast.success(
            `🍽️ Added ${foodItem.name} to ${getMealTypeName(mealType)}`
        );
    };

    const handleMealDeselect = (mealType) => {
        const mealName = selectedMeals[selectedDay]?.[mealType]?.name;
        setSelectedMeals((prev) => ({
            ...prev,
            [selectedDay]: {
                ...prev[selectedDay],
                [mealType]: null,
            },
        }));

        if (mealName) {
            toast.info(
                `🗑️ Removed ${mealName} from ${getMealTypeName(mealType)}`
            );
        }
    };

    const calculateTotalCalories = (day) => {
        const daySelections = selectedMeals[day];
        if (!daySelections) return 0;

        return Object.values(daySelections).reduce((total, meal) => {
            if (meal && typeof meal === "object" && "calories" in meal) {
                return total + (meal?.calories || 0);
            }
            return total;
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

    const getMealTypeIcon = (mealType) => {
        const icons = {
            breakfast: "🌅",
            lunch: "🍽️",
            snacks: "🍎",
            dinner: "🌙",
        };
        return icons[mealType];
    };

    const getMealTypeColor = (mealType) => {
        const colors = {
            all: "from-teal-500 to-emerald-600",
            breakfast: "from-amber-500 to-orange-500",
            lunch: "from-emerald-500 to-teal-500",
            snacks: "from-purple-500 to-pink-500",
            dinner: "from-blue-500 to-indigo-500",
        };
        return colors[mealType];
    };

    const handleSubmitSelections = () => {
        const submissionData = {
            userName: currentUser?.name || "Guest User",
            userEmail: currentUser?.email || "guest@example.com",
            selections: {},
        };

        Object.entries(selectedMeals).forEach(([day, daySelections]) => {
            const dayInfo = weekDays.find((d) => d.day === day);
            submissionData.selections[day] = {
                date: dayInfo?.fullDate,
                displayDate: dayInfo?.date,
                meals: {
                    breakfast: daySelections.breakfast,
                    lunch: daySelections.lunch,
                    snacks: daySelections.snacks,
                    dinner: daySelections.dinner,
                },
                totalCalories: calculateTotalCalories(day),
            };
        });

        // Show loading state
        toast.promise(saveSelectionsMutation.mutateAsync(submissionData), {
            pending: "🚀 Saving your meal selections...",
            success: "✅ Meal selections saved successfully! 🎉",
            error: "❌ Failed to save selections. Please try again.",
        });
    };

    const currentDayData = foodMenuData.find((day) => day.day === selectedDay);
    const currentDayInfo = weekDays.find((day) => day.day === selectedDay);

    const totalWeeklyCalories = weekDays.reduce(
        (total, day) => total + calculateTotalCalories(day.day),
        0
    );

    // Check if there are any changes to save
    const hasChanges = () => {
        if (!existingSelections.length) return true;

        const existing = existingSelections[0];
        return (
            JSON.stringify(existing.selections) !==
            JSON.stringify(
                Object.entries(selectedMeals).reduce(
                    (acc, [day, daySelections]) => {
                        const dayInfo = weekDays.find((d) => d.day === day);
                        acc[day] = {
                            date: dayInfo?.fullDate,
                            displayDate: dayInfo?.date,
                            meals: {
                                breakfast: daySelections.breakfast,
                                lunch: daySelections.lunch,
                                snacks: daySelections.snacks,
                                dinner: daySelections.dinner,
                            },
                            totalCalories: calculateTotalCalories(day),
                        };
                        return acc;
                    },
                    {}
                )
            )
        );
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4">
                <div className="text-center bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-md border border-white/20">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <FaTimes className="text-red-500 text-3xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        Oops! Something went wrong
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        We couldn't load the food menu. Please check your
                        connection and try again.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        🔄 Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-4 sm:p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto relative">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8">
                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-3xl blur-md opacity-75"></div>
                            <div className="relative bg-gradient-to-br from-teal-500 to-emerald-600 p-5 rounded-3xl shadow-2xl">
                                <FaUtensils className="text-white text-3xl" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-4xl font-black text-gray-900 bg-gradient-to-r from-teal-600 via-emerald-600 to-blue-600 bg-clip-text leading-tight">
                                Weekly Food Menu
                            </h1>
                            <p className="text-gray-600 mt-2 font-medium">
                                Craft your perfect meal plan with our
                                chef-curated selections
                            </p>
                            <div className="flex items-center space-x-4 mt-3">
                                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                                    <FaUser className="text-teal-600 text-sm" />
                                    <span className="text-sm font-semibold text-gray-700">
                                        {currentUser?.name || "Guest"}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                                    <FaBolt className="text-amber-500 text-sm" />
                                    <span className="text-sm font-semibold text-gray-700">
                                        {totalWeeklyCalories} weekly calories
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-lg px-6 py-4 rounded-2xl shadow-xl border border-white/30">
                            <div className="bg-gradient-to-br from-teal-400 to-emerald-500 p-3 rounded-xl shadow-lg">
                                <FaCalendarAlt className="text-white text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">
                                    Selected Day
                                </p>
                                <p className="font-bold text-gray-800 text-lg">
                                    {selectedDay}
                                    {currentDayInfo && (
                                        <span className="text-teal-600 ml-2">
                                            • {currentDayInfo.date}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Day Selector */}
                <div className="flex space-x-4 justify-center mb-12 overflow-x-auto py-4 px-2">
                    {weekDays.map((dayInfo, index) => {
                        const totalCalories = calculateTotalCalories(
                            dayInfo.day
                        );
                        const isSelected = selectedDay === dayInfo.day;
                        const isToday = index === 0;

                        return (
                            <button
                                key={dayInfo.day}
                                onClick={() => setSelectedDay(dayInfo.day)}
                                className={`flex-shrink-0 min-w-[140px] px-6 py-5 rounded-2xl font-bold transition-all duration-500 border-2 relative overflow-hidden group ${
                                    isSelected
                                        ? "bg-gradient-to-br from-teal-500 to-emerald-600 text-white transform scale-105 border-teal-500"
                                        : "bg-white/70 text-gray-700 hover:bg-white border-white/50 hover:border-teal-200"
                                }`}
                            >
                                {isToday && (
                                    <div className="absolute top-1 right-1 bg-amber-500 text-white text-xs px-2 py-1 rounded-full z-1">
                                        TODAY
                                    </div>
                                )}
                                <div className="relative z-10">
                                    <div className="text-lg font-black mb-1">
                                        {dayInfo.day.substring(0, 3)}
                                    </div>
                                    <div className="text-sm font-semibold opacity-90 mb-2">
                                        {dayInfo.date}
                                    </div>
                                    <div
                                        className={`text-sm font-bold px-3 py-1.5 rounded-full transition-all duration-300 ${
                                            isSelected
                                                ? "bg-white/20 backdrop-blur-sm"
                                                : totalCalories > 0
                                                ? "bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-700 shadow-inner"
                                                : "bg-gray-200 text-gray-600"
                                        }`}
                                    >
                                        {totalCalories || 0} cal
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Meal Type Filter */}
                <div className="flex space-x-3 overflow-x-auto p-2">
                    {["all", "breakfast", "lunch", "snacks", "dinner"].map(
                        (type) => (
                            <button
                                key={type}
                                onClick={() => setActiveMealType(type)}
                                className={`flex-shrink-0 px-6 py-3 rounded-xl font-bold transition-all duration-300 backdrop-blur-sm ${
                                    activeMealType === type
                                        ? `bg-gradient-to-r ${getMealTypeColor(
                                              type
                                          )} text-white shadow-lg transform scale-105 border-transparent`
                                        : "bg-white/70 text-gray-600 hover:bg-white hover:shadow-md border-white/50"
                                }`}
                            >
                                {type === "all"
                                    ? "🍱 All Meals"
                                    : `${getMealTypeIcon(
                                          type
                                      )} ${getMealTypeName(type)}`}
                            </button>
                        )
                    )}
                </div>

                {/* Food Selection Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Available Meals */}
                    <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 flex items-center mb-2">
                                    <FaUtensils className="mr-4 text-teal-500" />
                                    Available Meals
                                </h2>
                                <p className="text-gray-600 text-lg font-medium">
                                    For {selectedDay}
                                    {currentDayInfo && (
                                        <span className="text-teal-600 font-semibold">
                                            {" "}
                                            • {currentDayInfo.date}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        {currentDayData ? (
                            <div className="space-y-8">
                                {Object.entries(currentDayData.meals)
                                    .filter(
                                        ([mealType]) =>
                                            activeMealType === "all" ||
                                            activeMealType === mealType
                                    )
                                    .map(([mealType, foods]) => (
                                        <div
                                            key={mealType}
                                            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-6"
                                        >
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-xl font-black text-gray-800 capitalize flex items-center">
                                                    <span className="text-2xl mr-3">
                                                        {getMealTypeIcon(
                                                            mealType
                                                        )}
                                                    </span>
                                                    {getMealTypeName(mealType)}
                                                    <span className="ml-3 bg-gradient-to-r from-teal-600 to-emerald-700 text-white text-sm px-3 py-1 rounded-full">
                                                        {
                                                            foods.filter(
                                                                (f) =>
                                                                    f.isAvailable
                                                            ).length
                                                        }{" "}
                                                        options
                                                    </span>
                                                </h3>
                                            </div>
                                            <div className="grid grid-cols-1 gap-4">
                                                {foods.map((food) => {
                                                    const isAlreadySelected =
                                                        isFoodAlreadySelected(
                                                            food.id
                                                        );
                                                    const isSelectedForCurrentDay =
                                                        isFoodSelectedForCurrentDay(
                                                            food.id,
                                                            mealType
                                                        );
                                                    const isDisabled =
                                                        !food.isAvailable ||
                                                        (isAlreadySelected &&
                                                            !isSelectedForCurrentDay);

                                                    return (
                                                        <div
                                                            key={food.id}
                                                            className={`group border-2 rounded-2xl p-5 cursor-pointer transition-all duration-500 backdrop-blur-sm ${
                                                                isSelectedForCurrentDay
                                                                    ? `border-teal-500 bg-gradient-to-r from-teal-50 to-emerald-50 shadow-xl transform scale-105`
                                                                    : isDisabled
                                                                    ? "border-gray-200/50 opacity-60 cursor-not-allowed grayscale"
                                                                    : "border-gray-200/50 hover:border-teal-300 hover:bg-white/90 hover:shadow-xl"
                                                            }`}
                                                            onClick={() =>
                                                                !isDisabled &&
                                                                handleMealSelect(
                                                                    mealType,
                                                                    food
                                                                )
                                                            }
                                                        >
                                                            <div className="flex space-x-5">
                                                                <div className="relative flex-shrink-0">
                                                                    <div
                                                                        className={`absolute -inset-2 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-2xl blur-md opacity-0 ${
                                                                            !isDisabled &&
                                                                            "group-hover:opacity-50"
                                                                        } transition-opacity duration-300`}
                                                                    ></div>
                                                                    <img
                                                                        src={
                                                                            food.image
                                                                        }
                                                                        alt={
                                                                            food.name
                                                                        }
                                                                        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shadow-lg z-10"
                                                                    />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-start justify-between mb-3">
                                                                        <h4
                                                                            className={`font-black text-lg line-clamp-2 leading-tight ${
                                                                                isSelectedForCurrentDay
                                                                                    ? "text-teal-700"
                                                                                    : isDisabled
                                                                                    ? "text-gray-500"
                                                                                    : "text-gray-900 group-hover:text-teal-700"
                                                                            } transition-colors`}
                                                                        >
                                                                            {
                                                                                food.name
                                                                            }
                                                                        </h4>
                                                                    </div>
                                                                    <div className="flex items-center space-x-3 mb-3">
                                                                        <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-amber-100 px-3 py-1.5 rounded-full border border-orange-200">
                                                                            <FaFire className="text-orange-500" />
                                                                            <span className="text-sm font-black text-orange-700">
                                                                                {
                                                                                    food.calories
                                                                                }{" "}
                                                                                calories
                                                                            </span>
                                                                        </div>
                                                                        {isAlreadySelected &&
                                                                            !isSelectedForCurrentDay && (
                                                                                <div className="flex items-center space-x-2 bg-red-100 border border-red-200 px-3 py-1.5 rounded-full">
                                                                                    <span className="text-xs font-black text-red-700 flex items-center">
                                                                                        🔴
                                                                                        Already
                                                                                        Selected
                                                                                    </span>
                                                                                </div>
                                                                            )}
                                                                    </div>
                                                                    {!food.isAvailable && (
                                                                        <div className="flex items-center space-x-2 mt-3">
                                                                            <div className="bg-red-100 border border-red-200 px-3 py-1.5 rounded-full">
                                                                                <span className="text-xs font-black text-red-700 flex items-center">
                                                                                    🔴
                                                                                    Currently
                                                                                    Unavailable
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {isSelectedForCurrentDay && (
                                                                    <div className="flex-shrink-0">
                                                                        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-3 rounded-full shadow-lg">
                                                                            <FaCheck className="text-lg" />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                    <FaUtensils className="text-gray-400 text-3xl" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-600 mb-3">
                                    No meals available
                                </h3>
                                <p className="text-gray-500 text-lg">
                                    Our chefs are preparing something special.
                                    Check back soon!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Selected Meals Summary */}
                    <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 mb-2">
                                    Your Selections
                                </h2>
                                <p className="text-gray-600 text-lg font-medium">
                                    {selectedDay}
                                    {currentDayInfo && (
                                        <span className="text-teal-600 font-semibold">
                                            {" "}
                                            • {currentDayInfo.date}
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white px-6 py-3 rounded-full text-lg font-black shadow-2xl flex items-center gap-1">
                                <FaFire className="text-orange-600 text-xl" />
                                {calculateTotalCalories(selectedDay)} Total
                                Calories
                            </div>
                        </div>

                        <div className="space-y-6 mb-8">
                            {Object.entries(selectedMeals[selectedDay] || {})
                                .filter(
                                    ([mealType]) =>
                                        !["date", "displayDate"].includes(
                                            mealType
                                        )
                                )
                                .map(([mealType, selectedFood]) => (
                                    <div
                                        key={mealType}
                                        className={`border-2 rounded-2xl p-6 transition-all duration-500 backdrop-blur-sm ${
                                            selectedFood
                                                ? "border-teal-300 bg-gradient-to-r from-teal-50/80 to-emerald-50/80 shadow-lg"
                                                : "border-dashed border-gray-300/50 bg-gray-50/50"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="font-black text-gray-800 capitalize text-lg flex items-center">
                                                <span className="text-xl mr-3">
                                                    {getMealTypeIcon(mealType)}
                                                </span>
                                                {getMealTypeName(mealType)}
                                            </h4>
                                            {selectedFood && (
                                                <button
                                                    onClick={() =>
                                                        handleMealDeselect(
                                                            mealType
                                                        )
                                                    }
                                                    className="text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-300 p-2 rounded-xl transform hover:scale-110"
                                                    aria-label={`Remove ${selectedFood.name}`}
                                                >
                                                    <FaTimes className="text-lg" />
                                                </button>
                                            )}
                                        </div>

                                        {selectedFood ? (
                                            <div className="flex items-center space-x-5">
                                                <img
                                                    src={selectedFood.image}
                                                    alt={selectedFood.name}
                                                    className="w-16 h-16 rounded-xl object-cover shadow-lg flex-shrink-0"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-black text-gray-900 text-lg mb-2">
                                                        {selectedFood.name}
                                                    </p>
                                                    <div className="flex items-center space-x-4">
                                                        <p className="text-sm text-gray-700 flex items-center bg-orange-100 px-3 py-1.5 rounded-full border border-orange-200">
                                                            <FaFire className="text-orange-500 mr-2" />
                                                            {
                                                                selectedFood.calories
                                                            }{" "}
                                                            cal
                                                        </p>
                                                        <p className="text-sm text-teal-700 bg-teal-100 px-3 py-1.5 rounded-full border border-teal-200">
                                                            📅{" "}
                                                            {
                                                                selectedFood.selectedDisplayDate
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-6">
                                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                                                    <FaUtensils className="text-gray-400" />
                                                </div>
                                                <p className="text-gray-400 text-sm font-semibold italic">
                                                    No selection yet
                                                </p>
                                                <p className="text-gray-400 text-xs mt-1">
                                                    Click on a meal to add it to
                                                    your plan
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>

                        <button
                            onClick={handleSubmitSelections}
                            disabled={
                                calculateTotalCalories(selectedDay) === 0 ||
                                saveSelectionsMutation.isLoading ||
                                !hasChanges()
                            }
                            className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-black text-lg py-5 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 disabled:hover:scale-100 shadow-2xl hover:shadow-3xl disabled:shadow-none relative overflow-hidden cursor-pointer group"
                        >
                            <span className="relative z-10 flex items-center justify-center space-x-3">
                                {saveSelectionsMutation.isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaSave className="text-xl" />
                                        <span>
                                            {existingSelections.length > 0
                                                ? "Update"
                                                : "Save"}{" "}
                                            Selections for {selectedDay}
                                        </span>
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserFoodMenu;
