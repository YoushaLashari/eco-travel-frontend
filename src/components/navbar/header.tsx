import React from "react";
import { menuIcon } from "../ui/icons";
import { useUser } from "@/context/userContext";

interface LaptopNavbarProps {
    pathname: string;
    collapsed: boolean;
    responsive: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ setCollapsed, responsive }: LaptopNavbarProps) {
    const { sidebarOpen, setSidebarOpen } = useUser();
    return (
        <div className="py-4 pl-3 border-b">
            <div className="flex items-center">
                <div className="mx-2 link-hover p-2 rounded-full cursor-pointer"
                    onClick={responsive ? () => setSidebarOpen(!sidebarOpen) : () => setCollapsed((prev) => !prev)}
                >
                    {menuIcon(15, 15)}
                </div>
                <div className="ml-4">
                    <span className="font-bold text-main-color text-lg">Votre voyage, Pensé</span>
                    <span className="text-orange-500 font-bold text-lg"> pour la planète 🌍</span>
                </div>
            </div>
        </div>
    );
}