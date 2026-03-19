import axiosInstance from "@/api/config";
import { capitalizeWords, firstLastWord } from "@/assets/helpers";
import CarbonChart from "@/components/charts/carbonChart";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/context/userContext";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Leaf } from "lucide-react";
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
    const [totalCO2Saved, setTotalCO2Saved] = useState<number>(0);
    const [totalGreenPoints, setTotalGreenPoints] = useState<number>(0);

    useEffect(() => {
        // Read completed Mission Carbone actions from localStorage
        const savedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    
        let co2Total = 0;
        let pointsTotal = 0;

        savedTrips.forEach((t: any) => {
            if (t.status === 'decarborise' || t.status === 'En cours') {
                (t.actions || []).forEach((action: any) => {
                    if (action.completed) {
                        co2Total += action.co2Saved || 0;
                        pointsTotal += action.points || 0;
                    }
                });
            }
        });

        setTotalCO2Saved(co2Total);
        setTotalGreenPoints(pointsTotal);
    }, []);

    let carbonPercent = trip?.total_carbon_emission 
    ? Math.min(((totalCO2Saved / trip.total_carbon_emission) * 100), 100).toFixed(2)
    : "0";
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
            <Card className="bg-white">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-green-600" />
                        <span className="text-blue-950 text-2xl font-semibold">Mon Bilan</span>
                        <Badge variant="outline" className="ml-auto">
                            📅 Dernier 12 mois
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <h3 className="text-sm text-muted-foreground">Empreinte Totale</h3>
                            <p className="text-2xl font-bold text-blue-950">
                                {trip?.total_carbon_emission.toFixed(2)} kg CO<sub>2</sub>
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm text-muted-foreground">Décarbonation</h3>
                            <p className="text-2xl font-bold text-green-600">
                                {totalCO2Saved} kg CO<sub>2</sub>
                            </p>
                        </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2 text-blue-950">
                            <span className="text-blue-950">Émissions compensées</span>
                            <span>{carbonPercent}%</span>
                        </div>
                        <Progress value={Number(carbonPercent)} className="h-2 bg-progress [&>div]:bg-blue-950" />
                    </div>
                </CardContent>
            </Card>
            <div className="mt-3 border p-4 bg-white rounded-2xl">
                <div className="text-blue-950 text-2xl font-semibold">Évolution sur 12 mois</div>
                <h3 className="text-sm text-muted-foreground">Émissions de carbone par mois</h3>
                <CarbonChart trips={trips}/>
            </div>
            <div className="mt-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-blue-950 text-2xl font-semibold">Répartition de mon empreinte</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 text-blue-950">
                            {adems.map((adem, index) => {
                                const bgColor = colorMap[adem.name] || 'bg-gray-400';
                                const names = nameMap[adem.name] || 'Alimentation';
                                const percent = (adem.total / 2000) * 100;
                                return(
                                    <>
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div 
                                                    className={`w-4 h-4 rounded-full ${bgColor}`} 
                                                />
                                                <span className="font-medium">{names}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-semibold">{percent}%</span>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}