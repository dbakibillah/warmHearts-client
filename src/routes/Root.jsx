import { Outlet } from "react-router";
import Navbar from "../common/navbar/Navbar";

const Root = () => {
    return (
        <section>
            <Navbar />
            <Outlet />
        </section>
    );
};

export default Root;
