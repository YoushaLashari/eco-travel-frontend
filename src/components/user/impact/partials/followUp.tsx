import axiosInstance from "@/api/config";
import { capitalizeWords, firstLastWord } from "@/assets/helpers";
import CarbonChart from "@/components/charts/carbonChart";
import { useUser } from "@/context/userContext";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

type AdemKey = "food" | "miscellaneous" | "housing" | "social_services" | "transportation";

interface Trip{
    destination: string,
    carbon_emission: number,
    total_carbon_emission: number,
    start_date: Date,
    end_date: Date,
}
interface Trips{
    id: number,
    name: string,
    destination: string,
    carbon_emission: number,
    start_date: Date,
    end_date: Date
}

interface Adems{
    id: number,
    name: AdemKey;
    total: number
}

interface EmissionData{
    user_id : number,
    user_name : string,
    total_emission : number,
    rank: number
}

export default function FollowUp(){
    const {user} = useUser();
    const [trip, setTrip] = useState<Trip | null>(null);
    const [trips, setTrips] = useState<Trips[]>([]);
    const [adems, setAdems] = useState<Adems[]>([]);
    const [emissions, setEmissions] = useState<EmissionData[]>([]);
    const [total, setTotal] = useState<number>(0);

    let carbonPercent = ((50 / trip?.total_carbon_emission) * 100).toFixed(2);
    const colorMap: Record<AdemKey, string> = {
        food: 'bg-green-500',
        miscellaneous: 'bg-violet-600',
        housing: 'bg-blue-500',
        social_services: 'bg-black',
        transportation: 'bg-amber-500',
    };

    const nameMap: Record<AdemKey, string> = {
        food: 'Alimentation',
        miscellaneous: 'Divers',
        housing: 'Logement',
        social_services: 'Services sociétaux',
        transportation: 'Transport',
    };
    
    useEffect(() => {
        if (!user?.id) return;

        const getLatestTrip = async () => {
            try {
                const response = await axiosInstance.post("trips/latest", {
                    user_id: user.id,
                });

                if (response.status === 200) {
                    setTrip(response.data.trip);
                }
            } catch (error) {
                console.error("Failed to fetch latest trip:", error);
            }
        };

        getLatestTrip();
    }, [user?.id]);

    useEffect(() => {
        const getTrips = async () =>{
            if (!user?.id) return;

            const response = await axiosInstance.get("trips/get", {
                params : {user_id : user.id}
            });
            
            if(response.status === 200){
                setTrips(response.data.trips);
            }
        }  
        
        getTrips();
    }, [user]);

    useEffect(() => {
        const getAdems = async () =>{
            const response = await axiosInstance.get("adems/all");
            
            if(response.status === 200){
                setAdems(response.data.adems);
            }
        }

        getAdems()
    }, []);

    useEffect(() => {
        const getRankings = async () =>{
            if (!user?.id) return;

            const response = await axiosInstance.get("trips/emission-summary");
            
            if(response.status === 200){
                setEmissions(response.data.emissions);
                setTotal(response.data.total_users);
            }
        }  
        
        getRankings();
    }, [user]);
    
    return (
        <div className='mx-10 my-5'>
            <div className="bg-green-custom p-4 rounded">
                <div className="flex items-center place-content-between">
                    <span><strong>Mon Bilan</strong></span>
                    <span className="text-sm text-gray-500"><FontAwesomeIcon icon={faCalendar} /> Dernier 12 mois</span>
                </div>
                <div className={`grid gap-4 my-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2`}>
                    <div className='bg-white rounded-lg p-5 flex items-start'>
                        <div className='ms-5'>
                            <div className="text-sm text-gray-500">Empreinte Totale</div>
                            <h2 className='mt-3'><strong>{trip?.total_carbon_emission.toFixed(2)}</strong> kg CO₂</h2>
                        </div>
                    </div>
                    <div className='bg-white rounded-lg p-5 flex items-start'>
                        <div className='ms-5'>
                            <div className="text-sm text-gray-500">Décarbonation</div>
                            <h2 className='mt-3'><strong>50</strong> kg CO₂</h2>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="flex items-center place-content-between">
                        <div>Émissions compensées</div>
                        <div>{carbonPercent}%</div>
                    </div>
                    <div className="progress-bar-follow-up-container w-full bg-gray-200 h-4 mt-2">
                        <div className="progress-bar-follow-up bg-green-500 h-4 transition-all duration-300" style={{ width: `${carbonPercent}%` }}></div>
                    </div>
                </div>
            </div>
            <div className="mt-3 border p-4 rounded bg-white">
                <div><strong>Évolution sur 12 mois</strong></div>
                <CarbonChart trips={trips}/>
            </div>
            <div className="mt-3 border p-4 rounded bg-white">
                <div><strong>Répartition de mon empreinte</strong></div>
                <div className={`grid gap-4 my-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2`}>
                    {adems.map((adem, index) => {
                        const bgColor = colorMap[adem.name] || 'bg-gray-400';
                        const names = nameMap[adem.name] || 'Alimentation';
                        const percent = (adem.total / 2000) * 100;
                        
                        return(
                            <>
                                <div key={index}>
                                    <div className="flex place-content-between items-start"> 
                                        <div className="flex">
                                            <div className={`${bgColor} pad circle`}></div>
                                            <div className="ml-2">{names}</div>
                                        </div>
                                        <span>{percent}%</span>
                                    </div>
                                    <div
                                        className="progress-bar-follow-up-container w-full bg-gray-200 h-4 mt-2"
                                    >
                                        <div
                                            className={`progress-bar-follow-up ${bgColor} h-4 transition-all duration-300`}
                                            style={{ width: `${percent}%` }}
                                        >
                                        </div>
                                    </div>
                                </div>
                            </>
                         );
                    })}
                </div>
            </div>
            <div className="mt-3 border p-4 rounded bg-white">
                <div className="flex items-center place-content-between">
                    <div><strong>Classement communauté</strong></div>
                    <div className="text-green-600 text-sm">Voir tout</div>
                </div>
                <div className="mt-3">
                    {emissions.map((user_t, index) => (
                        <div key={index}>
                            {user_t.user_id === user.id ?
                                <div className="flex place-content-between bg-green-custom p-4 rounded">
                                    <div className="flex items-center">
                                        <span className="py-1 px-3 bg-green-600 circle text-white">{user_t.rank}</span>
                                        <div className="ms-3">
                                            <div>Votre position</div>
                                            <div className="text-xs text-gray-400">Mieux que {((user_t.rank / total) * 100).toFixed(2)}% d'utilisateurs</div>
                                        </div>
                                    </div>
                                    <div className="text-green-600"><strong>- {((50 / user_t.total_emission) * 100).toFixed(2)}% CO₂</strong></div>
                                </div> :
                                <div className="flex place-content-between">
                                    <div className="flex items-center">
                                        <div className="bg-gray-100 pad circle">{user_t.rank}</div>
                                        <div className="ms-2">{capitalizeWords(firstLastWord(user_t.user_name))}</div>
                                    </div>
                                    <div className="text-green-600"><strong>- {((50 / user_t.total_emission) * 100).toFixed(2)}% CO₂</strong></div>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}