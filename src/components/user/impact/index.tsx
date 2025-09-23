import { useUser } from "@/context/userContext";
import React, { useState } from "react";
import earth from "/images/earth.svg";
import FollowUp from "./partials/followUp";
import Actions from "./partials/actions";
import Badge from "./partials/badges";
import { Calendar, Target, Trophy } from "lucide-react";

export default function Impact(){
    const {user} = useUser();
    const [page, setPage] = useState<string | null>(null);
    
    const toggleSelected = (key: string) => {
        setPage(page === key ? null : key);
    };
    
    return(
        <div>
            <div className='flex relative'>
                <div className='bg-main rounded-r-lg w-full'>
                    {user && (
                        <>
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-blue-950 mb-2 mt-4">
                                    Mon Impact <span className="text-orange-600">Carbone</span> 🌍
                                </h1>
                                <p className="text-muted-foreground">
                                    Suivez et réduisez votre empreinte environnementale
                                </p>
                            </div>
                            <div className="flex place-content-around mt-5 bg-gray-200 rounded-full mx-8 px-1 h-10">
                                <div className={`w-full cursor-pointer flex items-center justify-center text-blue-950 h-8 mt-1 ${page === "follow-up" || page === null ? 'bg-white rounded-full' : ""}`}
                                    onClick={() => toggleSelected("follow-up")}
                                >
                                    <Calendar className={`h-4 w-4 ${page === "follow-up" || page === null ? 'text-blue-950' : "text-gray-500"}`} /> 
                                    <span className={`text-sm ml-2 ${page === "follow-up" || page === null ? 'text-blue-950 font-semibold' : "text-gray-500"}`}>Suivi 12 mois</span>
                                </div>
                                <div className={`w-full cursor-pointer flex items-center justify-center text-blue-950 h-8 mt-1 ${page === "actions" ? 'bg-white rounded-full' : ""}`}
                                    onClick={() => toggleSelected("actions")}
                                >
                                    <Target className={`h-4 w-4 ${page === "actions" ? 'text-blue-950' : "text-gray-500"}`} /> 
                                    <span className={`text-sm ml-2 ${page === "actions" ? 'text-blue-950 font-semibold' : "text-gray-500"}`}>Mes actions</span>
                                </div>
                                <div className={`w-full cursor-pointer flex items-center justify-center text-blue-950 h-8 mt-1 ${page === "badges" ? 'bg-white rounded-full' : ""}`}
                                    onClick={() => toggleSelected("badges")}
                                >
                                    <Trophy className={`h-4 w-4 ${page === "badges" ? 'text-blue-950' : "text-gray-500"}`} /> 
                                    <span className={`text-sm ml-2 ${page === "badges" ? 'text-blue-950 font-semibold' : "text-gray-500"}`}>Badges</span>
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