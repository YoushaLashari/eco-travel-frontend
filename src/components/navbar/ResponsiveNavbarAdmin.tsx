import { url } from "@/api/url";
import { api_post, capitalizeWords, firstWord } from "@/assets/helpers";
import { useUser } from "@/context/userContext";
import { faBarChart, faBars, faBullseye, faChartColumn, faGear, faHouse, faListUl, faPlane, faPuzzlePiece, faQuestionCircle, faRightFromBracket, faSackDollar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router";
import logo from "/images/logo-slogan.jpg";
import { cardIcon, destinationDotIcon, houseIcon, questionMarkIcon, userIcon } from "../ui/icons";

interface SideBar{
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    sidebarOpen: boolean;
    pathname: string;
}

export function ResponsiveNavbarAdmin({sidebarOpen, setSidebarOpen, pathname}: SideBar){
    const { setAuth, token, user, setUser } = useUser();

    const logOut = async ()=>{
        try{
            const response = await api_post('users/logout', token);
            
            if(response.status === 204){
                localStorage.removeItem("token");
                setUser([]);
                setAuth(false);
                window.location.href = "/"; 
            }
        }catch(error){
            console.error("Failed to log out:", error);
        }
    }

    return(
        <div>
            <div className="flex items-start justify-between py-4">
                <div className="pl-6 flex items-center">
                    <div className="border bg-blue-950 rounded-full py-2 px-2 text-white w-8 h-8 font-semibold flex items-center justify-center">
                        T
                    </div>
                    <div className={`text-blue-950 font-semibold text-lg ml-5`}>Trekr</div>
                </div>
                <button
                    className="lg:hidden text-blue-900 cursor-pointer"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <svg className="w-6 h-6 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>
            </div>
            <div className="flex ml-4 items-center my-5">
                <div className={`${user.picture == null ? "border bg-color rounded-full py-2 px-2 text-white text-xs" : ""} mr-3`}>
                    {user.picture !== null ? 
                        <img
                            src={`${url}/images/${user.picture}`}
                            alt="Profile"
                            className="object-cover w-12 h-12 rounded-full block"
                        />: 
                        <span>{firstWord(user && user.name)}</span>
                    }
                </div>
                <div>
                    <div className={`font-semibold text-gray-500`}>{capitalizeWords(user && user.name)}</div>
                    <div className={`text-gray-500 text-xs`}>{user.email}</div>
                </div>
            </div>
            <div className="p-5 text-center">
                <span className={`text-gray-500`}>Prêt pour votre prochaine aventure ?</span>
            </div>
            <div className="p-5">
                <h5 className={`text-gray-500 text-xs`}>Menu principal</h5>
                <Link to="/dashboard" className={`flex items-center text-sm mt-2 raduis pl-2 py-1.5 ${pathname === "/dashboard" ? "active-navbar" : "navbar-color nav-col"}`}>
                    <span>{houseIcon(15, 15)}</span> 
                    <span className={`ml-2`}>Dashboard</span>
                </Link>
                <Link to="/my-trips" className={`flex items-center text-sm mt-2 raduis pl-2 py-1.5 ${pathname.includes("trip") ? "active-navbar" : "navbar-color nav-col"}`}>
                    <span><FontAwesomeIcon icon={faListUl}/></span> 
                    <span className={`ml-5.5`}>Mes voyages</span>
                </Link>
                <Link to="/impacts" className={`flex items-center text-sm mt-2 raduis pl-2 py-1.5 ${pathname === "/impacts" ? "active-navbar" : "navbar-color nav-col"}`}>
                    <span><FontAwesomeIcon icon={faBullseye}/></span> 
                    <span className={`ml-5.5`}>Mission Carbone</span>
                </Link>
                <Link to="/impacts" className={`flex items-center text-sm mt-2 raduis pl-2 py-1.5 ${pathname === "/impacts" ? "active-navbar" : "navbar-color nav-col"}`}>
                    <span><FontAwesomeIcon icon={faChartColumn}/></span> 
                    <span className={`ml-5.5`}>Suivre impact</span>
                </Link>
                <Link to="/impacts" className={`flex items-center text-sm mt-2 raduis pl-2 py-1.5 ${pathname === "/impacts" ? "active-navbar" : "navbar-color nav-col"}`}>
                    <span>{destinationDotIcon(15, 15)}</span> 
                    <span className={`ml-2`}>Destinations</span>
                </Link>
                <Link to="/profile" className={`flex items-center text-sm mt-2 raduis pl-2 py-1.5 ${pathname === "/profile" ? "active-navbar" : "navbar-color nav-col"}`}>
                    <span>{userIcon(15, 15)}</span> 
                    <span className={`ml-3`}>Mon profile</span>
                </Link>
            </div>
            <div className="p-5">
                <h5 className={`text-gray-500 text-xs`}>Paramètres</h5>
                <Link to="/impacts" className={`flex items-center text-sm mt-2 raduis pl-2 py-1.5 ${pathname === "/impacts" ? "active-navbar" : "navbar-color nav-col"}`}>
                    <span><FontAwesomeIcon icon={faGear}/></span> 
                    <span className={`ml-5.5`}>Paramètres</span>
                </Link>
                <Link to="/impacts" className={`flex items-center text-sm mt-2 raduis pl-2 py-1.5 ${pathname === "/impacts" ? "active-navbar" : "navbar-color nav-col"}`}>
                    <span>{cardIcon(15, 15)}</span> 
                    <span className={`ml-2`}>Tarifs</span>
                </Link>
                <Link to="/impacts" className={`flex items-center text-sm mt-2 raduis pl-2 py-1.5 ${pathname === "/impacts" ? "active-navbar" : "navbar-color nav-col"}`}>
                    <span>{questionMarkIcon(15, 15)}</span> 
                    <span className={`ml-2`}>FAQ</span>
                </Link>
                <div 
                    className="laptop-position py-2 cursor-pointer"
                    onClick={logOut}
                >
                    <div className={`flex items-center text-sm mt-2 text-red-700`}>
                        <span><FontAwesomeIcon icon={faRightFromBracket}/></span> 
                        <span className={`ml-2`}>Se déconnecter</span>
                    </div>
                </div>
            </div>
        </div>
    );
}