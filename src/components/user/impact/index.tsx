import { NavbarAdmin } from "@/components/navbar/navbarAdmin";
import { ResponsiveNavbarAdmin } from "@/components/navbar/ResponsiveNavbarAdmin";
import { useUser } from "@/context/userContext";
import React, { useState } from "react";
import earth from "/images/earth.svg";
import FollowUp from "./partials/followUp";
import Actions from "./partials/actions";
import Badge from "./partials/badges";

export default function Impact(){
    const {user, sidebarOpen, setSidebarOpen} = useUser();
    const [page, setPage] = useState<string | null>(null);
    
    const toggleSelected = (key: string) => {
        setPage(page === key ? null : key);
    };
    
    return(
        <div>
            <div className='flex relative'>
                {user && (
                    <>
                        {/* Desktop sidebar (visible on large screens) */}
                        <div className={`bg-white w-100 p-5 drop-shadow-md rounded-l-lg h-auto hidden lg:block`}>
                          <NavbarAdmin />
                        </div>
                        {/* Mobile sidebar (visible when sidebarOpen is true) */}
                        <div className={`${sidebarOpen ? 'block' : 'hidden'} bg-white w-full p-5 drop-shadow-md h-full lg:hidden absolute top-0 z-50`}>
                          <ResponsiveNavbarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        </div>
                    </>
                )}
                <div className='bg-main rounded-r-lg w-screen'>
                    {user && (
                        <>
                            <div className='ml-10 mt-5'>
                                <div>
                                    <button
                                        className="lg:hidden text-blue-900"
                                        onClick={() => setSidebarOpen(!sidebarOpen)}
                                    >
                                        <svg className="w-6 h-6 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                        </svg>
                                    </button>
                                </div>
                                <h2 className="font-bold text-xl lg:text-2xl flex place-content-center align-center">
                                    <div>
                                        <span className="text-blue-950 mr-2">Mon Impact</span>
                                        <span className="text-color">Carbone</span>
                                    </div>
                                    <img src={earth} alt="earth" className="w-6 sm:w-10" />
                                </h2>
                            </div>
                            <div className="header-border flex place-content-around mt-5">
                                <div className={`w-full text-center cursor-pointer py-3 ${page === "follow-up" || page === null ? 'border-bottom active_color' : ""}`}
                                    onClick={() => toggleSelected("follow-up")}
                                >
                                    Suivi 12 mois
                                </div>
                                <div className={`w-full text-center cursor-pointer py-3 ${page === "actions" ? 'border-bottom active_color' : ""}`}
                                    onClick={() => toggleSelected("actions")}
                                >
                                    Mes actions
                                </div>
                                <div className={`w-full text-center cursor-pointer py-3 ${page === "badges" ? 'border-bottom active_color' : ""}`}
                                    onClick={() => toggleSelected("badges")}
                                >
                                    Badges
                                </div>
                            </div>
                            <div className="mt-5">
                                {page === "follow-up" || page === null ?
                                    <FollowUp/> : 
                                    page === "actions" ? <Actions/> : 
                                    page === "badges" ? <Badge/> : <FollowUp/>
                                }
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}