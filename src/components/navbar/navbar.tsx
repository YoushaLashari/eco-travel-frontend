import { Outlet, useLocation } from "react-router";
// import "../../assets/css/main.css";
import { useState } from "react";
import React from "react";
import { useUser } from "@/context/userContext";
import { NavbarAdmin } from "./navbarAdmin";
import { ResponsiveNavbarAdmin } from "./ResponsiveNavbarAdmin";
import Header from "./header";

export function Navbar() {
    const [collapsed, setCollapsed] = useState(false);
    const { user, sidebarOpen, setSidebarOpen } = useUser();
    const location = useLocation();
    const responsive = window.innerWidth < 1024;

    // normalize path (remove trailing slash)
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const noMarginPaths = ["/", "/how-it-works", '/contact', '/legals', '/b2b', '/prices'];
    const shouldHaveNoMargin = responsive || noMarginPaths.includes(path);
    
    return (
        <div>
            <div className="flex" style={{ minHeight: "100vh" }}>
                {user &&
                    location.pathname !== "/" &&
                    location.pathname !== "/how-it-works" &&
                    location.pathname !== "/contact" &&
                    location.pathname !== "/contact" &&
                    location.pathname !== "/legals" &&
                    location.pathname !== "/b2b" &&
                    location.pathname !== "/prices" &&
                     (
                        <>
                            {/* Desktop sidebar (visible on large screens) */}
                            <div className="rounded-l-lg h-auto hidden lg:block">
                                <NavbarAdmin
                                    pathname={location.pathname}
                                    collapsed={collapsed}
                                    setCollapsed={setCollapsed}
                                />
                            </div>

                            {/* Mobile sidebar (visible when sidebarOpen is true) */}
                            <div
                                className={`${sidebarOpen ? "block" : "hidden"
                                    } bg-white w-full p-5 drop-shadow-md h-full lg:hidden absolute top-0 z-50`}
                            >
                                <ResponsiveNavbarAdmin
                                    sidebarOpen={sidebarOpen}
                                    setSidebarOpen={setSidebarOpen}
                                    pathname={location.pathname}
                                />
                            </div>
                        </>
                    )}

                <div
                    className="flex-grow-1 d-flex flex-column"
                    style={{
                        marginLeft: shouldHaveNoMargin ? 0 : collapsed ? "85px" : "265px",
                    }}
                >
                    {location.pathname !== "/how-it-works" && location.pathname !== "/contact" && location.pathname !== "/legals" && location.pathname !== "/b2b" && location.pathname !== "/prices" && (
                        <Header
                            pathname={location.pathname}
                            collapsed={collapsed}
                            responsive={responsive}
                            setCollapsed={setCollapsed}
                        />
                    )}

                    <div className="flex-grow-1 overflow-auto">
                        <Outlet context={{ collapsed }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
