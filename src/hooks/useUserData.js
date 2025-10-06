// hooks/useUserData.js
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";

export const useUserData = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const {
        data: currentUser,
        isLoading,
        error,
        refetch: refetchCurrentUser,
    } = useQuery({
        queryKey: ["currentUser", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/currentUser`, {
                params: { email: user?.email },
            });
            return res.data;
        },
        enabled: !!user?.email,
    });

    const userRole = currentUser?.role || "user";

    return {
        currentUser,
        userRole,
        isLoading,
        error,
        refetchCurrentUser,
    };
};

export default useUserData;
