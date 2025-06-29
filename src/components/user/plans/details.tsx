import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import placeholder from "/images/placeholder.svg";
import restaurant from "/images/restaurant.jpg";
import tegallalang from "/images/tegallalang.webp";
import earth from "/images/earth.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCircleCheck, faClock, faHandPointRight, faLightbulb, faLocation } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useUser } from "@/context/userContext";
import axiosInstance from "@/api/config";
import { NavbarAdmin } from "@/components/navbar/navbarAdmin";
import { calculateDurationDays, capitalizeWords } from "@/assets/helpers";
import Map from "@/components/navbar/map";
import Suggestions from "./suggestions";
import Weather from "./weather";
import { ResponsiveNavbarAdmin } from "@/components/navbar/ResponsiveNavbarAdmin";

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

interface Schedule{
    morning: any;
    afternoon: any;
    evening: any;
}

interface Day{
    title: string;
    schedule: Schedule;
}

interface Program{
    id: number;
    days: number;
    accommodation: any;
    itinerary: {
        days: Day[];
    };
    trip_id: number;
}

interface Tip{
    id: number;
    ecofriendly_tips: [];
    local_transport_options: [];
    trip_id: number;
}

export default function Details(){
    const navigate = useNavigate();
    const { auth, loading, sidebarOpen, setSidebarOpen } = useUser(); 
    const {id} = useParams();
    const [trip, setTrip] = useState<Trip | null>(null);
    const [program, setProgram] = useState<Program | null>(null);
    const [tip, setTip] = useState<Tip | null>(null);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);

    useEffect(() => {
        if(!loading && !auth){
          navigate("/");
        }
    }, [auth, loading, navigate]);

    useEffect(() => {
        const getTrip = async () =>{
            if (!id) return;
            
            const response = await axiosInstance.post("trips/first", {id});
            
            if(response.status === 200){
                setTrip(response.data.trip);
            }
        }

        getTrip()
    }, [id]);

    useEffect(() => {
        const getProgram = async () =>{
            if (!id) return;
            console.log(axiosInstance);
            
            const response = await axiosInstance.post("/program/get", {id});
            console.log(response);
            
            if(response.status === 200){
                setProgram(response.data.program);
            }
        }

        getProgram()
    }, [id]);

    // useEffect(() => {
    //     const getTip = async () =>{
    //         if (!id) return;
            
    //         const response = await axiosInstance.post("tip/get", {id});
            
    //         if(response.status === 200){
    //             setTip(response.data.tip);
    //         }
    //     }

    //     getTip()
    // }, [id]);

    console.log(program);
    
    return(
        <div>
            <div className='flex mt-8 relative'>
                {trip && 
                    <>
                        {/* Desktop sidebar (visible on large screens) */}
                        <div className="bg-white w-100 p-5 drop-shadow-md rounded-l-lg h-auto hidden lg:block">
                            <NavbarAdmin />
                        </div>
                        {/* Mobile sidebar (visible when sidebarOpen is true) */}
                        <div className={`${sidebarOpen ? 'block' : 'hidden'} bg-white w-full p-5 drop-shadow-md h-full lg:hidden absolute top-0 z-50`}>
                            <ResponsiveNavbarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        </div>
                    </>
                }
                {trip && 
                    <div className='bg-main rounded-r-lg w-screen'>
                        <div className="mt-4 ml-10">
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
                        <h2 className="font-bold text-xl lg:text-2xl text-center align-center mt-8">
                            <span className="text-blue-950 mr-2">Itinéraire, Ecologique -</span> 
                            <span className="text-color">
                                {capitalizeWords(trip.name)} ({calculateDurationDays(trip.start_date, trip.end_date)})
                            </span>
                        </h2>
                        <div className="mt-5 text-center lg:w-1/3 w-3/4 mx-auto">
                            Découvrez la beauté naturelle de {capitalizeWords(trip.name)} à travers un voyage responsable et respectueux de l'environnement.
                        </div>
                        <div className="bg-white rounded-full py-3 flex items-center overflow-x-auto whitespace-nowrap mt-5 w-full max-w-md mx-auto"> 
                            {program?.itinerary.days.map((day, index) => (
                                <div 
                                    key={index}
                                    className={`inline-block text-blue-950 px-4 py-1 mx-1 rounded-full cursor-pointer ${index === selectedDayIndex ? 'bg-main text-black' : 'bg-gray-200'}`}
                                    style={{ minWidth: '70px', textAlign: 'center' }}
                                    onClick={() => setSelectedDayIndex(index)}
                                >
                                    {`Jour ${index + 1}`}
                                </div>
                            ))}
                        </div>
                        {program && program.itinerary.days[selectedDayIndex] && (
                            <div>
                                <h1 className="text-lg text-center capitalize font-bold text-blue-950 my-5">{program.itinerary.days[selectedDayIndex].title}</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5 mx-5">
                                    {['morning', 'afternoon', 'evening'].map((period) => {
                                    const activity = program.itinerary.days[selectedDayIndex].schedule[period];
                                        
                                    return(
                                        <div key={period} className="bg-white shadow-2xl rounded-lg">
                                            <div className="h-60 overflow-hidden rounded-t-lg">
                                                <img src={placeholder} alt="placeholder" className="w-full h-full object-cover"/>
                                            </div>
                                            <div className="mx-5 py-5">
                                                <div className="text-main font-bold capitalize my-4 text-blue-950">
                                                    <span><FontAwesomeIcon icon={faClock} /></span>
                                                    <span className="ml-2 capitalize font-bold"><strong>{period}</strong></span>
                                                </div>
                                                <div className="text-blue-950 text-sm mt-3">
                                                    <span><FontAwesomeIcon icon={faLocation} /></span>
                                                    <span className="ml-2"><strong>{activity.activity}</strong></span>
                                                </div>
                                                <div className="text-blue-950 text-sm mt-3">
                                                    <span><FontAwesomeIcon icon={faLightbulb} /></span>
                                                    <span className="ml-2"><strong>Informations et suggestions</strong></span>
                                                </div>
                                                <div className="mt-2 ml-4 text-blue-950 text-sm flex">
                                                    <span><FontAwesomeIcon icon={faCircleCheck} /></span>
                                                    <span className="ml-2">Durée: {activity.duration}</span>
                                                </div>
                                                {activity.cost != 0 && <div className="mt-2 ml-4 text-blue-950 text-sm flex">
                                                    <span><FontAwesomeIcon icon={faCircleCheck} /></span>
                                                    <span className="ml-2">Prix: {activity.cost} €</span>
                                                </div>}
                                                <div className="mt-2 ml-4 text-blue-950 text-sm flex">
                                                    <span><FontAwesomeIcon icon={faCircleCheck} /></span>
                                                    <span className="ml-2">Durée: {activity.sustainability_aspect}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                    })}
                                </div>
                            </div>
                        )}
                        <div className="mx-5">
                            {/* <div className="my-9 bg-white p-5 w-full mx-auto rounded-lg shadow-2xl">
                                <div className="flex items-center place-content-between">
                                    <h2 className="text-blue-950"><strong>Itinéraire du jour</strong></h2>
                                    <Weather/>
                                </div>
                                <Map/>
                            </div> */}
                            <div className="my-10 bg-white rounded-lg shadow-2xl w-full mx-auto h-table">
                                <h2 className="text-xl text-blue-950 text-center w-full pt-5">
                                    <strong><span><FontAwesomeIcon icon={faLightbulb} /></span> Astuces</strong>
                                </h2>
                                {/* <Suggestions tip={tip}/> */}
                            </div>
                            <div className="my-10">
                                <div className="flex place-content-between w-4/5 mx-auto">
                                    <div
                                        className={`text-color cursor-pointer ${selectedDayIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={() => {
                                            if(selectedDayIndex > 0){
                                                setSelectedDayIndex(prev => prev - 1);
                                            }
                                        }}
                                    >
                                        <span><FontAwesomeIcon icon={faArrowLeft} /></span>
                                        <strong className="ms-2">Jour précédent</strong>
                                    </div>
                                    <div
                                        className={`text-color cursor-pointer ${selectedDayIndex === (program?.itinerary?.days?.length ?? 1) - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={() => {
                                            if(selectedDayIndex < (program?.itinerary?.days?.length ?? 1) - 1){
                                                setSelectedDayIndex(prev => prev + 1);
                                            }
                                        }}
                                    >
                                        <strong className="mr-2">Jour Suivant</strong>
                                        <span><FontAwesomeIcon icon={faArrowRight} /></span>
                                    </div>
                                </div>
                            </div>
                            <div className="my-15">
                                <h2 className="font-bold text-xl lg:text-2xl flex place-content-center align-center">
                                    <div>
                                        <span className="text-blue-950 mr-2">Mesurez votre impact,</span> 
                                        <span className="text-color">Réduisez votre empreinte</span>
                                    </div>
                                    <img src={earth} alt="note" className="w-6 sm:w-10" />
                                </h2>
                                <div className="text-blue-950 text-center mt-3">
                                    <strong>Suivez votre progression et découvrez comment réduire votre impact</strong>
                                </div>
                                <Link to="/dashboard" className="mt-4 bg-color text-white text-center flex place-content-center md:w-1/5 w-full mx-auto py-3 rounded-lg">
                                    <span>Mon plan de compensation</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}