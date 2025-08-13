import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Root from "./routes/Root";
import Home from "./pages/home/Home";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Root />}>
                <Route path="/" element={<Home />} />
                {/* <Route path="/login" element={<Login />} /> */}
            </Route>
        </Routes>
    </BrowserRouter>
);
