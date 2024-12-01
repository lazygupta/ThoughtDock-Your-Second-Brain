import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer"; // Import Footer as a separate component

export default function Layout() {
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <Outlet />
            </div>
        </>

    );
}
