import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Root from "./routes/Root";
import Home from "./pages/home/Home";
import AuthProvider from "./providers/AuthProviders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Subscription from "./pages/services/components/Subscriptions";
import AppointmentForm from "./pages/services/components/AppointmentForm";
import Loading from "./common/loading/Loading";
import Login from "./pages/authentication/Login";
import Registration from "./pages/authentication/Registration";


const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/" element={<Root />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/subscription" element={<Subscription />} />
                        <Route path="/appointment" element={<AppointmentForm />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Registration />} />
                    </Route>
                </Routes>
            </QueryClientProvider>
        </AuthProvider>
    </BrowserRouter>
);
