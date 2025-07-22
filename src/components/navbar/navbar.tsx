import { Link, Outlet, useLocation } from "react-router";
import "../../assets/css/main.css";
import { useState } from "react";
import React from "react";
import { useUser } from "@/context/userContext";
import logo from "/images/logo.jpg";

export function Navbar(){
    const {auth} = useUser();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <div className="mt-8">
            <div className="relative flex items-center flex-wrap px-4">
                <div className="text-main-color text-xl font-bold z-10 lg:w-1/3"><img src={logo} alt="logo" className="w-20" /></div>
                {!auth && 
                    <>
                        <div className={`w-full lg:flex-1 lg:flex lg:justify-end ${menuOpen ? 'block' : 'hidden'}`}>
                            <div className="text-main-color flex flex-col lg:flex-row lg:items-center lg:space-x-6 mt-4 lg:mt-0 justify-center">
                                <a href="/" className="block py-2 lg:py-0"><strong>Fonctionnalités</strong></a>
                                <a href="/" className="block py-2 lg:py-0"><strong>Tarifs</strong></a>
                                <a href="/" className="block py-2 lg:py-0"><strong>FAQ</strong></a>
                            </div>
                        </div>
                        <div className={`lg:w-1/3 lg:flex lg:justify-end ${menuOpen ? 'block' : 'hidden'}`}>
                            {(location.pathname === "/" || location.pathname === "/register") && (
                                <div className="text-color mt-4 lg:mt-0 flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4">
                                    <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={() => setMenuOpen(false)}>Connexion</Link>
                                    <Link to="/register" className={location.pathname === "/register" ? "active" : ""} onClick={() => setMenuOpen(false)}>Inscription</Link>
                                </div>
                            )}
                        </div><button
                            className="block lg:hidden text-main-color absolute top-0 right-4"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <svg className="w-6 h-6 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </>
                }
            </div>
            <Outlet/>
        </div>
    )
}