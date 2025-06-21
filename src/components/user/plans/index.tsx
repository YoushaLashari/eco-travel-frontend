import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import React from "react";
import { useUser } from "@/context/userContext";
import axiosInstance from "@/api/config";
import { NavbarAdmin } from "@/components/navbar/navbarAdmin";
import { capitalizeWords } from "@/assets/helpers";
import Trip from "./trip";
import { ResponsiveNavbarAdmin } from "@/components/navbar/ResponsiveNavbarAdmin";

interface Trips{
    id: number,
    name: string,
    type: string,
    destination: string,
    budget: string,
    start_date: Date,
    end_date: Date,
    adult: number,
    children: number
}

interface Trip{
    id: number,
    name: string,
    type: string,
    destination: string,
    budget: string,
    start_date: Date,
    end_date: Date,
    adult: number,
    children: number
}

export default function Plans(){
    const navigate = useNavigate(); 
    const { user, auth, loading, sidebarOpen, setSidebarOpen } = useUser(); 
    const [trips, setTrips] = useState<Trips[]>([]);
    const [trip, setTrip] = useState<Trip | null>(null);
    
    useEffect(() => {
        if(!loading && !auth){
          navigate("/");
        }
    }, [auth, loading, navigate]);

    useEffect(() => {
        const getTrips = async () =>{
            if (!user?.id) return;

            const response = await axiosInstance.get("trips/get", {
                params : {user_id : user.id}
            });
            
            if(response.status === 200){
                setTrips(response.data.trips)
            }
        }
        
        getTrips();
    }, [user]);
    
    useEffect(() => {
        const getLatestTrip = async () =>{
            if (!user?.id || trips.length === 0) return;
            
            const user_id = user.id;
            const response = await axiosInstance.post("trips/latest", {user_id});
            
            if(response.status === 200){
                setTrip(response.data.trip);
            }
        }

        getLatestTrip()
    }, [user, trips]);
    
    const displayTrip = async (id: number) =>{
        const response = await axiosInstance.post("trips/first", {id});
        
        if(response.status === 200){
            setTrip(response.data.trip);
        }
    }

    return (
        <div>
            <div className='flex mt-8'>
                {user && (
                    <>
                        {/* Desktop sidebar (visible on large screens) */}
                        <div className="bg-white w-100 p-5 drop-shadow-md rounded-l-lg h-custom hidden lg:block">
                          <NavbarAdmin />
                        </div>
                        {/* Mobile sidebar (visible when sidebarOpen is true) */}
                        <div className={`${sidebarOpen ? 'block' : 'hidden'} bg-white w-full p-5 drop-shadow-md h-full lg:hidden absolute top-0 z-50`}>
                          <ResponsiveNavbarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        </div>
                    </>
                )}
                <div className='bg-main rounded-r-lg w-screen'>
                    <div>
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
                    <div className='mx-10 mt-5'>
                        <div className='grid grid-cols-4 gap-4'>
                            {trips.length > 0 && trips.map((trip, index) => (
                                <div key={index} onClick={()=> displayTrip (trip.id)} className='bg-blue-950 rounded-full py-2 px-10 text-white text-center cursor-pointer drop-shadow-md'>
                                    <span className='ml-2'>{capitalizeWords(trip.name)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {trip ? 
                        <div className="mt-9 mx-10">
                            <Trip trip={trip}/>
                        </div> : 
                        <div className="flex justify-center items-center h-64">
                            <div className="text-center text-6xl">Pas de voyage trouvé</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}