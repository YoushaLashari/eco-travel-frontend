import { api_post, capitalizeWords, firstWord } from "@/assets/helpers";
import { useUser } from "@/context/userContext";
import { faBars, faGear, faHouse, faPlane, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router";

interface SideBar{
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    sidebarOpen: boolean;
}

export function ResponsiveNavbarAdmin({sidebarOpen, setSidebarOpen}: SideBar){
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
            <div className="flex items-start justify-between">
                <div className="flex ml-4 items-center mb-5">
                    <div className="mr-3 border rounded-full py-2 px-2 bg-color text-white text-xs">
                        <span>{firstWord(user && user.name)}</span>
                    </div>
                    <span className="font-semibold text-blue-900">{capitalizeWords(user && user.name)}</span>
                </div>
                <button
                    className="lg:hidden text-blue-900"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <svg className="w-6 h-6 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>
            </div>
            <hr />
            <div className="mt-5">
                <h5 className="text-blue-800">Menu principal</h5>
                <div className="flex ml-5 mt-4 text-blue-800">
                    <span><FontAwesomeIcon icon={faHouse}/></span> 
                    <span className="ml-2">Accueil</span>
                </div>
                <div className="flex ml-5 mt-4 text-blue-800">
                    <span><FontAwesomeIcon icon={faUser}/></span> 
                    <span className="ml-2">Mon profile</span>
                </div>
                <div className="flex ml-5 mt-4 text-blue-800"
                    onClick={() => setSidebarOpen(false)}
                >
                    <Link to="/dashboard">
                        <span><FontAwesomeIcon icon={faBars}/></span> 
                        <span className="ml-2">Dashboard Compensation</span>
                    </Link>
                </div>
                <div className="flex ml-5 mt-4 text-blue-800"
                    onClick={() => setSidebarOpen(false)}
                >
                    <span><FontAwesomeIcon icon={faPlane}/></span> 
                    <Link to="/plans" className="ml-2">Mes Planners</Link>
                </div>
            </div>
            <div className="mt-5">
                <h5 className="text-blue-800">Paramètres</h5>
                <div className="flex ml-5 mt-4 text-blue-800">
                    <span><FontAwesomeIcon icon={faGear}/></span> 
                    <span className="ml-2">Paramètres</span>
                </div>
                <div 
                    className="flex ml-5 mt-4 text-blue-800 cursor-pointer"
                    onClick={logOut}
                >
                    <span><FontAwesomeIcon icon={faRightFromBracket}/></span> 
                    <span className="ml-2">Se déconnecter</span>
                </div>
            </div>
        </div>
    );
}