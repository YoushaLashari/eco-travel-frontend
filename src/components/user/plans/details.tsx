import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import placeholder from "/images/placeholder.svg";
import heart from "/images/heart.svg";
import restaurant from "/images/restaurant.jpg";
import photo from "/images/photo.jpg";
import photo2 from "/images/photo-2.jpg";
import tegallalang from "/images/tegallalang.webp";
import earth from "/images/earth.svg";
import flower from "/images/flower.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faArrowUpRightFromSquare, faAward, faBuilding, faBullseye, faCalendar, faCamera, faCircleCheck, faClock, faCloudSun, faHandPointRight, faLeaf, faLightbulb, faLocation, faMap, faMoon, faPen, faStar, faSun, faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useUser } from "@/context/userContext";
import axiosInstance from "@/api/config";
import { NavbarAdmin } from "@/components/navbar/navbarAdmin";
import { calculateDurationDays, capitalizeWords, formatDateRange, getDate } from "@/assets/helpers";
import Map from "@/components/navbar/map";
import Suggestions from "./suggestions";
import Weather from "./weather";
import { ResponsiveNavbarAdmin } from "@/components/navbar/ResponsiveNavbarAdmin";
import { log } from "console";
import { url } from "@/api/url";
import axios from "axios";
import Slider from "./slider";
import Button from "./button";

interface Trip{
    id: number,
    name: string,
    type: string,
    country: string,
    destination: string,
    budget: string,
    start_date: Date,
    end_date: Date,
    adult: number,
    transportation: string,
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
    const { id } = useParams();
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
    
    const slides = [
        { image: photo, text_1: "Vieux Lyon", text_2: "Découverte des traboules historiques" },
        { image: photo2, text_1: "Balade à Vélo", text_2: "Le long du Rhône au coucher du soleil" }
    ];

    useEffect(() => {
        const getProgram = async () =>{
            if (!id) return;
            
            const response = await axiosInstance.post('program/get', {id});
            
            if(response.status === 200){
                setProgram(response.data.program);
            }
        }

        getProgram()
    }, [id]);

    useEffect(() => {
        const getTip = async () =>{
            if (!id) return;
            
            const response = await axiosInstance.post("tip/get", {id});
            
            if(response.status === 200){
                setTip(response.data.tip);
            }
        }

        getTip()
    }, [id]);
    
    return(
        <div>
            <div className='flex relative'>
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
                    <div className='bg-main rounded-r-lg w-screen lg:px-20 px-5'>
                        <div className="mt-4 ml-2">
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
                        <h2 className="text-2xl sm:text-2xl lg:text-4xl text-center mt-3 font-semibold">
                            <span className="text-blue-950">
                                {capitalizeWords(trip.name)}
                            </span>
                        </h2>
                        <h2 className="text-base sm:text-lg lg:text-xl text-center mt-3 font-semibold">
                            <div className="text-gray-500 flex place-content-center items-center">
                                <div>{capitalizeWords(trip.destination)}</div>
                                <div className="w-1 h-1 bg-gray-500 rounded-full mx-2 font-bold mt-1"></div>
                                <div>{formatDateRange(trip.start_date, trip.end_date)}</div>
                            </div>
                        </h2>
                        <div className="my-5 border border-gray-300 bg-white raduis p-4">
                            <div className="flex items-center justify-around">
                                <div className="text-center">
                                    <div className="text-blue-950 font-bold text-lg lg:text-2xl">{calculateDurationDays(trip.start_date, trip.end_date)}</div>
                                    <div className="text-gray-500 text-sm mt-1">Jours</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-green-600 font-bold text-lg lg:text-2xl">245 kg</div>
                                    <div className="text-gray-500 text-sm mt-1">CO₂ économisé</div>
                                </div>
                                {/* <div className="text-center">
                                    <div className="text-orange-600 font-bold text-lg lg:text-2xl">1250</div>
                                    <div className="text-gray-500 text-sm mt-1">Green Points</div>
                                </div> */}
                                <div className="text-center">
                                    <div className="text-blue-950 font-bold text-lg lg:text-2xl">200 €</div>
                                    <div className="text-gray-500 text-sm mt-1">Budget total</div>
                                </div>
                            </div>
                            {/* <div className="mt-6">
                                <div className="flex items-center place-content-between">
                                    <div className="text-blue-950 font-semibold text-sm">Impact écologique</div>
                                    <div className="text-green-600">Excellent</div>
                                </div>
                                <div className="progress-bar-follow-up-container w-full bg-gray-200 h-4 mt-2">
                                    <div className="progress-bar-follow-up bg-blue-950 h-4 transition-all duration-300" style={{ width: `90%` }}></div>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center">
                                <div className="bg-trip text-trip-color text-xs font-semibold rounded-xl py-1 px-3">
                                    <FontAwesomeIcon icon={faLeaf} /> Voyage Eco-friendly
                                </div>
                                <div className="bg-explore text-explore-color text-xs font-semibold rounded-xl py-1 px-3 mx-2">
                                    <FontAwesomeIcon icon={faAward} /> Explorateur Vert
                                </div>
                                <div className="bg-adem text-adem-color text-xs font-semibold rounded-xl py-1 px-3">
                                    <FontAwesomeIcon icon={faBullseye} /> Challenge ADEME
                                </div>
                            </div> */}
                        </div>
                        <div className="my-5 grid gap-4 grid-cols-4 md:grid-cols-6">
                            {program?.itinerary.days.map((day, index) => (
                                <div 
                                    className={`py-2 border rounded-2xl font-semibold text-sm link-hover cursor-pointer w-20 lg:w-28 text-center mr-2 ${index === selectedDayIndex ? 'bg-blue-950 text-white' : 'text-blue-950'}`}
                                    key={index}
                                    onClick={() => setSelectedDayIndex(index)}
                                >
                                    <FontAwesomeIcon icon={faCalendar}/> <span className="ms-2">{`Jour ${index + 1}`}</span>
                                </div>
                            ))}
                        </div>
                        {/* <div className="max-w-5xl mx-auto my-5"> */}
                        <div className="mx-auto my-5">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                <div className="col-span-1 md:col-span-7">
                                    <div className="border border-gray-300 bg-white raduis p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-blue-950 font-semibold">{getDate(trip.start_date, selectedDayIndex)}</div>
                                            <div className="text-blue-950 font-semibold"><FontAwesomeIcon icon={faCloudSun} className="text-2xl" /> 15</div>
                                        </div>
                                    </div>
                                    <div className="border border-gray-300 bg-white raduis p-4 mt-5">
                                        <div className="text-blue-950 font-semibold">
                                            <FontAwesomeIcon icon={faTrainSubway} /> 
                                            <span className="ms-2">Transport</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <span className="text-blue-950 font-semibold">{trip.transportation === "car" ? "Voiture" : trip.transportation === "train" ? "Train" : "Avion"}</span>
                                                <span className="ms-2 text-blue-950 font-semibold">{capitalizeWords(trip.destination)}</span>
                                                <div className="text-gray-500 text-sm">6h</div>
                                            </div>
                                            <div>
                                                <div className="text-blue-950 font-semibold text-trip-color">-85 kg</div>
                                                <div className="text-blue-950 text-right">89€</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-gray-300 bg-white raduis p-4 mt-5">
                                        <div className="text-blue-950 font-semibold">
                                            <FontAwesomeIcon icon={faBuilding} /> 
                                            <span className="ms-2">Hébergement</span>
                                        </div>
                                        <span className="text-blue-950 font-semibold">{program && program.accommodation.name}</span>
                                        <span className="ms-2 text-blue-950 font-semibold">{capitalizeWords(trip.destination)}</span>
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <div className="text-gray-500 text-sm">Vieux Lyon</div>
                                                <div className="text-sm flex items-center mt-1">
                                                    <FontAwesomeIcon icon={faStar} color={"#FFCD4F"} />
                                                    <span className="ms-1 text-blue-950">{program && program.accommodation.rating}</span>
                                                    <div className="bg-trip text-trip-color text-xs font-semibold rounded-xl py-1 px-3 ms-4">
                                                        <FontAwesomeIcon icon={faLeaf} /> Eco
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <div className="text-blue-950 text-center font-semibold">{program && program.accommodation.price_per_night}€/nuit</div>
                                                <div className={`py-2 border rounded-2xl font-semibold text-sm link-hover cursor-pointer w-28 text-center me-2 text-blue-950 mt-1`}>
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare}/> <span className="ms-2">Réserver</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h2 className="text-blue-950 text-lg font-bold my-5">Activités du jour</h2>
                                    {program && program.itinerary.days[selectedDayIndex] &&
                                        ['morning', 'afternoon', 'evening'].map((period) => {
                                            const activity = program.itinerary.days[selectedDayIndex].schedule[period];
                                            return (
                                                <div key={period} className="border border-gray-300 bg-white raduis p-4 mt-5">
                                                    <div className="text-gray-500 w-24 mb-3 ml-3">
                                                        <FontAwesomeIcon icon={faClock} />
                                                        <span className="ml-1">{period.charAt(0).toUpperCase() + period.slice(1)}</span>
                                                    </div>
                                                    <div className="flex mb-4 text-sm">
                                                        <div className="ml-3 flex-1 w-100">
                                                            <div className="flex items-start justify-between w-full">
                                                                <div className="flex items-start mb-2">
                                                                    <FontAwesomeIcon icon={faCamera} className="text-blue-950 me-2 text-sm mt-1" />
                                                                    <h2 className="text-blue-950 font-bold">{activity.activity}</h2>
                                                                </div>
                                                                <div className="flex items-start text-blue-950 text-sm">
                                                                    <div className="cursor-pointer py-1 px-3 rounded-full link-hover">
                                                                        <FontAwesomeIcon icon={faPen}/>
                                                                    </div>
                                                                    <div className="ms-3 cursor-pointer link-hover py-1 px-3 rounded-full">
                                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare}/> 
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-sm text-gray-500">{activity?.description || "Découverte des traboules"}</div>
                                                            <div className="flex items-center mt-2">
                                                                <div className="text-xs text-blue-950">{activity?.duration || "3h"}</div>
                                                                <div className="text-xs text-green-600 mx-5">{activity?.weight || "0 kg"}</div>
                                                                <div className="text-xs text-green-950 font-semibold">{activity.cost != 0 ? activity.cost + "€" : "Gratuit" }</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                    <div className="border border-gray-300 bg-white raduis p-4 mt-5">
                                        <div className="flex items-center mb-4">
                                            <FontAwesomeIcon icon={faMap} className="text-green-600"/>
                                            <span className="ms-2 font-semibold text-blue-950">Points d'Intérêt</span>
                                        </div>
                                        <div>
                                            <Map/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 md:col-span-5">
                                    <div className="border border-gray-300 bg-white raduis p-4">
                                        <div className="flex items-center mb-4">
                                            <img src={heart} alt="heart" />
                                            <div className="text-blue-950 font-semibold ms-2">Inspirations Voyage</div>
                                        </div>
                                        <Slider slides={slides} />
                                    </div>
                                    <div className="border border-gray-300 bg-white raduis p-4 mt-5">
                                        <div className="flex items-center mb-4">
                                            <FontAwesomeIcon icon={faLightbulb} className="text-yellow-300"/>
                                            <div className="text-blue-950 font-semibold ms-2">Astuces Locales</div>
                                        </div>
                                        <Suggestions tip={tip}/>
                                    </div>
                                    <div className="border border-gray-300 bg-white raduis p-4 mt-5">
                                        <div className="mb-4">
                                            <div className="text-blue-950 font-semibold ms-2">Actions</div>
                                        </div>
                                        <div className={`py-2 border rounded-2xl font-semibold text-sm link-hover cursor-pointer w-full text-center me-2 text-blue-950 mt-2`}>
                                            <FontAwesomeIcon icon={faPen}/> <span className="ms-2">Modifier le voyage</span>
                                        </div>
                                        <div className={`py-2 border rounded-2xl font-semibold text-sm link-hover cursor-pointer w-full text-center me-2 text-blue-950 mt-2`}>
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare}/> <span className="ms-2">Partager l'itinéraire</span>
                                        </div>
                                        <div className={`py-2 border rounded-2xl font-semibold text-sm cursor-pointer w-full text-center me-2 text-white bg-blue-950 mt-2 hover:opacity-80`}>
                                            <FontAwesomeIcon icon={faStar} color={"#fff"}/> <span className="ms-2">Partager l'itinéraire</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-5">
                            {/* <div className="my-9 bg-white p-5 w-full mx-auto rounded-lg shadow-2xl">
                                <div className="flex items-center place-content-between">
                                    <h2 className="text-blue-950"><strong>Itinéraire du jour</strong></h2>
                                    <Weather/>
                                </div>
                                <Map/>
                            </div> */}
                        </div>
                        <Button trip={trip.destination}/>
                    </div>
                }
            </div>
        </div>
    )
}