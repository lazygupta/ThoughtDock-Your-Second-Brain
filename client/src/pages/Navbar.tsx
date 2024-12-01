import { Link } from "react-router-dom";
import { Logo } from "../icons/Logo";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center px-6 py-4 bg-gray-100">
            {/* Left Section: Logo and Site Title */}
            <div className="flex justify-start items-center text-2xl gap-2 font-bold">
                <Link to="/" className="text-purple-500 flex items-center">
                    <Logo />
                    <span className="px-2">ThoughtDock</span>
                </Link>
                
            </div>

            {/* Right Section: Links */}
            <div className="flex gap-4 text-lg font-medium">
                <Link to="/signup" className="text-purple-600 hover:underline">
                    SignUp
                </Link>
                <Link to="/signin" className="text-purple-600 hover:underline">
                    SignIn
                </Link>
            </div>
        </div>
    );
}
