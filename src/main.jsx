import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import Login from "./pages/authentication/Login";
import Registration from "./pages/authentication/Registration";
import TermsAndConditions from "./pages/services/components/TermsAndCondition";
import Home from "./pages/home/Home";
import AppointmentForm from "./pages/services/components/AppointmentForm";
import Subscription from "./pages/services/components/Subscriptions";
import AuthProvider from "./providers/AuthProviders";
import Root from "./routes/Root";
import Dashboard from "./dashboard/Dashboard";
import DashboardHome from "./dashboard/member/dashboardHome/DashboardHome";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/" element={<Root />}>
                        <Route index element={<Home />} />
                        <Route path="/subscription" element={<Subscription />} />
                        <Route path="/appointment" element={<AppointmentForm />} />
                        <Route path="/terms" element={<TermsAndConditions />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Registration />} />
                    </Route>

                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="/dashboard" element={<DashboardHome />} />
                        
                    </Route>
                </Routes>
            </QueryClientProvider>
        </AuthProvider>
    </BrowserRouter>
);
