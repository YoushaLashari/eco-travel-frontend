import React from "react";
import { Navbar } from "./navbar";
import { NavbarAdmin } from "./navbarAdmin"; // Sidebar
import { ResponsiveNavbarAdmin } from "./ResponsiveNavbarAdmin"; // Mobile navbar
import { useUser } from "@/context/userContext";

export default function LayoutWrapper({ isAuthenticated, children }) {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
    const { sidebarOpen, setSidebarOpen } = useUser();

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const renderNavbar = () => {
        if (!isAuthenticated) {
            return <Navbar />;
        } else {
            return isMobile ? (
                <ResponsiveNavbarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            ) : (
                <NavbarAdmin />
            );
        }
    };

    return (
        <div className="app-layout">
            {renderNavbar()}

            {/* Layout adjustment if sidebar is visible */}
            <div className={isAuthenticated && !isMobile ? "main-content with-sidebar" : "main-content"}>
                {children}
            </div>
        </div>
    );
}