import { url } from "@/api/url";
import { api_post, capitalizeWords, firstWord } from "@/assets/helpers";
import { useUser } from "@/context/userContext";
import { faBullseye, faChartColumn, faGear, faListUl, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router";
import { cardIcon, destinationDotIcon, houseIcon, questionMarkIcon, userIcon } from "../ui/icons";

interface LaptopNavbarProps {
    pathname: string;
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NavbarAdmin({ pathname, collapsed, setCollapsed, }: LaptopNavbarProps){
    const { setAuth, token, user, setUser } = useUser();
    const sidebarWidth = collapsed ? "85px" : "265px";

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
        <div className={`flex border-r ${collapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}
            style={{
                width: sidebarWidth,
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                transition: "width 0.3s ease",
                overflowY: "auto",
                zIndex: 1000,
            }}
        >
            <div>
                <Link to="/" className="pt-4 pl-6 flex items-center">
                    <div className="border bg-blue-950 rounded-full py-2 px-2 text-white w-8 h-8 font-semibold flex items-center justify-center">
                        T
                    </div>
                    <div className={`text-blue-950 font-semibold text-lg ml-5 ${collapsed ? 'hidden' : 'block'}`}>Trekr</div>
                </Link>
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
                    <div className={`${collapsed ? 'hidden' : 'block'}`}>
                        <div className={`font-semibold text-gray-500`}>{capitalizeWords(user && user.name)}</div>
                        <div className={`text-gray-500 text-xs`}>{user.email}</div>
                    </div>
                </div>
                <div className="p-5 text-center">
                    <span className={`text-gray-500 ${collapsed ? 'hidden' : 'block'}`}>Prêt pour votre prochaine aventure ?</span>
                </div>
                <div className="p-5">
                    <h5 className={`text-gray-500 text-xs ${collapsed ? 'hidden' : 'block'}`}>Menu principal</h5>
                    <Link to="/dashboard" className={`flex items-center text-sm mt-2 rounded-full ${collapsed ? 'w-8 h-8 justify-center' : 'raduis pl-2 py-1.5'} ${pathname === "/dashboard" ? "active-navbar" : "navbar-color nav-col"}`}>
                        <span className={`${collapsed ? "w-4 h-4 flex items-center content-center" : ""}`}>{houseIcon(15, 15)}</span> 
                        <span className={`ml-2 ${collapsed ? 'hidden' : 'block'}`}>Dashboard</span>
                    </Link>
                    <Link to="/my-trips" className={`flex items-center text-sm mt-2 rounded-full ${collapsed ? 'w-8 h-8 justify-center' : 'raduis pl-2 py-1.5'} ${pathname.includes("trip") ? "active-navbar" : "navbar-color nav-col"}`}>
                        <span className={`${collapsed ? "w-4 h-4 flex items-center content-center justify-center" : ""}`}><FontAwesomeIcon icon={faListUl}/></span> 
                        <span className={`ml-5.5 ${collapsed ? 'hidden' : 'block'}`}>Mes voyages</span>
                    </Link>
                    <Link to="/mission-carbon" className={`flex items-center text-sm mt-2 rounded-full ${collapsed ? 'w-8 h-8 justify-center' : 'raduis pl-2 py-1.5'} ${pathname === "/mission-carbon" || pathname.includes('habits') ? "active-navbar" : "navbar-color nav-col"}`}>
                        <span className={`${collapsed ? "w-4 h-4 flex items-center content-center justify-center" : ""}`}><FontAwesomeIcon icon={faBullseye}/></span> 
                        <span className={`ml-5.5 ${collapsed ? 'hidden' : 'block'}`}>Mission Carbone</span>
                    </Link>
                    <Link to="/impacts" className={`flex items-center text-sm mt-2 rounded-full ${collapsed ? 'w-8 h-8 justify-center' : 'raduis pl-2 py-1.5'} ${pathname === "/impacts" ? "active-navbar" : "navbar-color nav-col"}`}>
                        <span className={`${collapsed ? "w-4 h-4 flex items-center content-center justify-center" : ""}`}><FontAwesomeIcon icon={faChartColumn}/></span> 
                        <span className={`ml-5.5 ${collapsed ? 'hidden' : 'block'}`}>Suivre impact</span>
                    </Link>
                    <Link to="/destinations" className={`flex items-center text-sm mt-2 rounded-full ${collapsed ? 'w-8 h-8 justify-center' : 'raduis pl-2 py-1.5'} ${pathname === "/destinations" ? "active-navbar" : "navbar-color nav-col"}`}>
                        <span className={`${collapsed ? "w-4 h-4 flex items-center content-center" : ""}`}>{destinationDotIcon(15, 15)}</span> 
                        <span className={`ml-2 ${collapsed ? 'hidden' : 'block'}`}>Destinations</span>
                    </Link>
                    <Link to="/profile" className={`flex items-center text-sm mt-2 rounded-full ${collapsed ? 'w-8 h-8 justify-center' : 'raduis pl-2 py-1.5'} ${pathname === "/profile" ? "active-navbar" : "navbar-color nav-col"}`}>
                        <span className={`${collapsed ? "flex items-center ml-1.5" : ""}`}>{userIcon(15, 15)}</span> 
                        <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>Mon profile</span>
                    </Link>
                </div>
                <div className="p-5">
                    <h5 className={`text-gray-500 text-xs ${collapsed ? 'hidden' : 'block'}`}>Paramètres</h5>
                    <Link to="/settings" className={`flex items-center text-sm mt-2 rounded-full ${collapsed ? 'w-8 h-8 justify-center' : 'raduis pl-2 py-1.5'} ${pathname === "/settings" ? "active-navbar" : "navbar-color nav-col"}`}>
                        <span className={`${collapsed ? "w-4 h-4 flex items-center content-center justify-center" : ""}`}><FontAwesomeIcon icon={faGear}/></span> 
                        <span className={`ml-5.5 ${collapsed ? 'hidden' : 'block'}`}>Paramètres</span>
                    </Link>
                    <Link to="/prices" className={`flex items-center text-sm mt-2 rounded-full ${collapsed ? 'w-8 h-8 justify-center' : 'raduis pl-2 py-1.5'} ${pathname === "/prices" ? "active-navbar" : "navbar-color nav-col"}`}>
                        <span className={`${collapsed ? "w-4 h-4 flex items-center content-center" : ""}`}>{cardIcon(15, 15)}</span> 
                        <span className={`ml-2 ${collapsed ? 'hidden' : 'block'}`}>Tarifs</span>
                    </Link>
                    <Link to="/faq" className={`flex items-center text-sm mt-2 rounded-full ${collapsed ? 'w-8 h-8 justify-center' : 'raduis pl-2 py-1.5'} ${pathname === "/faq" ? "active-navbar" : "navbar-color nav-col"}`}>
                        <span className={`${collapsed ? "w-4 h-4 flex items-center content-center" : ""}`}>{questionMarkIcon(15, 15)}</span> 
                        <span className={`ml-2 ${collapsed ? 'hidden' : 'block'}`}>FAQ</span>
                    </Link>
                    <div 
                        className="laptop-position py-2 cursor-pointer"
                        onClick={logOut}
                    >
                        <div className={`flex items-center text-sm mt-2 text-red-700 rounded-full ${collapsed ? 'w-8 h-8 justify-center' : 'raduis pl-2 py-1.5'}`}>
                            <span className={`${collapsed ? "w-4 h-4 flex items-center content-center" : ""}`}><FontAwesomeIcon icon={faRightFromBracket}/></span> 
                            <span className={`ml-2 ${collapsed ? 'hidden' : 'block'}`}>Se déconnecter</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}