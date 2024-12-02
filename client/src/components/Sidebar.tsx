import { useNavigate } from "react-router-dom";
import DocumentIcon from "../icons/DocumentIcon";
import LinkIcon from "../icons/LinkIcon";
import { Logo } from "../icons/Logo";
import TagIcon from "../icons/TagIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SidebarItem";


export function Sidebar() {
    const navigate = useNavigate();

    function logout () {
        localStorage.removeItem("authorization")
        alert("You are logged out successfully!");

        navigate("/");
    }

    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 ">
        
        <div className="flex text-2xl px-2 pt-4 gap-2 items-center font-bold">
            <div className="text-purple-500 pl-2">
                <Logo />
            </div>
           ThoughtDock
        </div>
        <div className="pt-5 pl-8">
            <SideBarItem text="Tweets" icon={<TwitterIcon size="lg"/>}/>
            <SideBarItem text="Videos" icon={<YouTubeIcon size="lg"/>}/>
            <SideBarItem text="Documents" icon={<DocumentIcon size="lg"/>}/>
            <SideBarItem text="Links" icon={<LinkIcon size="lg"/>}/>
            <SideBarItem text="Tags" icon={<TagIcon size="lg"/>}/>
        </div>

        <div className="mt-auto p-4">
                <button className="w-full text-left px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600" onClick={logout}>
                    LogOut
                </button>
            </div>
       
    </div>
}