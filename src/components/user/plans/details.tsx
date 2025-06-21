import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import monkey from "/images/monkey.jpg";
import restaurant from "/images/restaurant.jpg";
import tegallalang from "/images/tegallalang.webp";
import earth from "/images/earth.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCircleCheck, faClock, faHandPointRight, faLightbulb, faLocation } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useUser } from "@/context/userContext";
import axiosInstance from "@/api/config";
import { NavbarAdmin } from "@/components/navbar/navbarAdmin";
import { calculateDaysNumbers, calculateDurationDays, capitalizeWords } from "@/assets/helpers";
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

export default function Details(){
    const navigate = useNavigate();
    const { auth, loading, sidebarOpen, setSidebarOpen } = useUser(); 
    const {id} = useParams();
    const [trip, setTrip] = useState<Trip | null>(null);

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
                            {trip && Array.from({ length: Number(calculateDaysNumbers(trip.start_date, trip.end_date)) }, (_, i) => (
                                <div 
                                    key={i} className={`inline-block text-blue-950 px-4 py-1 mx-1 rounded-full ${i === 0 ? 'bg-main' : ''}`}
                                    style={{ minWidth: '70px', textAlign: 'center' }}
                                >
                                    {`Jour ${i + 1}`}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5 mx-5">
                            <div className="bg-white shadow-2xl rounded-lg">
                                <div className="max-h-1/2">
                                    <img src={monkey} alt="monkey" className="w-full rounded-t-lg h-60"/>
                                </div>
                                <div className="mx-5 py-5">
                                    <h2 className="text-blue-950"><strong>Forêt des singes</strong></h2>
                                    <div className="text-blue-950 text-sm mt-3">
                                        <span><FontAwesomeIcon icon={faClock} /></span>
                                        <span className="ml-2"><strong>08h30 - 17h30</strong></span>
                                    </div>
                                    <div className="text-blue-950 text-sm mt-3">
                                        <span><FontAwesomeIcon icon={faLocation} /></span>
                                        <span className="ml-2"><strong>Centre d’Ubud, Bali</strong></span>
                                    </div>
                                    <div className="mt-3 text-gray-500 text-sm ml-4 h-20">
                                        La forêt des singes est un espace tropical peuplé par plusieurs groupes de singes. Elle abrite également plus de 186 espèces végétales dont certaines sont rares.
                                    </div>
                                    <div className="text-blue-950 text-sm mt-3">
                                        <span><FontAwesomeIcon icon={faLightbulb} /></span>
                                        <span className="ml-2"><strong>Informations et suggestions</strong></span>
                                    </div>
                                    <div className="mt-2 ml-4 text-blue-950 text-sm">
                                        <span><FontAwesomeIcon icon={faCircleCheck} /></span>
                                        <span className="ml-2">Prix de billet:</span>
                                    </div>
                                    <div className="mt-2 ml-9 text-blue-950 text-sm">
                                        <span><FontAwesomeIcon icon={faHandPointRight} /></span>
                                        <span className="ml-2">Enfants de 3 ans à 12 ans: <strong>3 Euros (Weekend 5 Euros)</strong></span>
                                    </div>
                                    <div className="mt-2 ml-9 text-blue-950 text-sm">
                                        <span><FontAwesomeIcon icon={faHandPointRight} /></span>
                                        <span className="ml-2">Adulte: <strong>5 Euros (Weekend 6 Euros)</strong></span>
                                    </div>
                                    <div className="mt-2 ml-4 text-blue-950 text-sm">
                                        <span><FontAwesomeIcon icon={faCircleCheck} /></span>
                                        <span className="ml-2">heure de visite <strong>14h - 16h</strong></span>
                                    </div>
                                    <div className="mt-2 ml-4 text-blue-950 text-sm">
                                        <span><FontAwesomeIcon icon={faCircleCheck} /></span>
                                        <span className="ml-2">Durée de visite de <strong>1h à 3h</strong></span>
                                    </div>
                                    <div className="mt-2 ml-4 text-blue-950 text-sm">
                                        <span><FontAwesomeIcon icon={faCircleCheck} /></span>
                                        <span className="ml-2">Achat de billet depuis le  <a href="https://monkeyforestubud.com/" target="_blank"><strong>site officiel</strong></a></span>
                                    </div>
                                    <div className="mt-2 ml-4 text-blue-950 text-sm">
                                        <span><FontAwesomeIcon icon={faCircleCheck} /></span>
                                        <span className="ml-2">Se rendre au site <strong>à pied</strong></span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white shadow-2xl rounded-lg">
                                <div className="max-h-1/2">
                                    <img src={restaurant} alt="restaurant" className="w-full rounded-t-lg h-60"/>
                                </div>
                                <div className="mx-5 py-5">
                                    <h2 className="text-blue-950"><strong>Warung Rama</strong></h2>
                                    <div className="text-blue-950 text-sm mt-3">
                                        <span><FontAwesomeIcon icon={faClock} /></span>
                                        <span className="ml-2"><strong>09h00 - 22h00</strong></span>
                                    </div>
                                    <div className="text-blue-950 text-sm mt-3">
                                        <span><FontAwesomeIcon icon={faLocation} /></span>
                                        <span className="ml-2"><strong>Centre d’Ubud, Bali</strong></span>
                                    </div>
                                    <div className="mt-3 text-gray-500 text-sm ml-4 h-20">
                                        De la cuisine balinaise authentique faite maison. Si vous souhaitez goûter à ce que les locaux mangent chez eux.
                                    </div>
                                    <div className="text-blue-950 text-sm mt-3">
                                        <span><FontAwesomeIcon icon={faLightbulb} /></span>
                                        <span className="ml-2"><strong>Informations et suggestions</strong></span>
                                    </div>
                                    <div className="mt-2 ml-4 text-blue-950 text-sm">
                                        <span><FontAwesomeIcon icon={faCircleCheck} /></span>
                                        <span className="ml-2">Prix: <strong>Dépend du menu</strong></span>
                                    </div>
                                    <div className="mt-2 ml-4 text-blue-950 text-sm">
                                        <span><FontAwesomeIcon icon={faCircleCheck} /></span>
                                        <span className="ml-2">heure de visite <strong>15h - 17h</strong></span>
                                    </div>
                                    <div className="mt-2 ml-4 text-blue-950 text-sm">
                                        <span><FontAwesomeIcon icon={faCircleCheck} /></span>
                                        <span className="ml-2">Menu  <a href="https://drive.google.com/file/d/1XxHYJYgjhKaUDKyy6D7QnwC1vB4W3D0e/view" target="_blank"><strong>page officielle</strong></a></span>
                                    </div>
                                    <div className="mt-2 ml-4 text-blue-950 text-sm">
                                        <span><FontAwesomeIcon icon={faCircleCheck} /></span>
                                        <span className="ml-2">Se rendre au site <strong>à pied</strong></span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white shadow-2xl rounded-lg">
                                <div className="max-h-1/2">
                                    <img src={tegallalang} alt="tegallalang" className="w-full rounded-t-lg h-60"/>
                                </div>
                                <div className="mx-5 py-5">
                                    <h2 className="text-blue-950"><strong>Les rizières de Tegalalang</strong></h2>
                                    <div className="text-blue-950 text-sm mt-3">
                                        <span><FontAwesomeIcon icon={faClock} /></span>
                                        <span className="ml-2"><strong>08h30 - 18h00</strong></span>
                                    </div>
                                    <div className="text-blue-950 text-sm mt-3">
                                        <span><FontAwesomeIcon icon={faLocation} /></span>
                                        <span className="ml-2"><strong>Village Pakudui, Bali</strong></span>
                                    </div>
                                    <div className="mt-3 text-gray-500 text-sm ml-4 h-20">
                                        Les rizières en terrasse de la région de Bali sont inscrites à la liste du patrimoine culturel immatériel de l’UNESCO pour leur système d'irrigation traditionnel Subak.
                                    </div>
                                    <div className="text-blue-950 text-sm mt-3">
                                        <span><FontAwesomeIcon icon={faLightbulb} /></span>
                                        <span className="ml-2"><strong>Informations et suggestions</strong></span>
                                    </div>
                                    <div className="mt-2 ml-4 text-blue-950 text-sm">
                                        <span><FontAwesomeIcon icon={faCircleCheck} /></span>
                                        <span className="ml-2">Prix: <strong>A partir de 7 Euros</strong></span>
                                    </div>
                                    <div className="mt-2 ml-4 text-blue-950 text-sm">
                                        <span><FontAwesomeIcon icon={faCircleCheck} /></span>
                                        <span className="ml-2">heure de visite <strong>le matin</strong></span>
                                    </div>
                                    <div className="mt-2 ml-4 text-blue-950 text-sm">
                                        <span><FontAwesomeIcon icon={faCircleCheck} /></span>
                                        <span className="ml-2">Durée de visite de <strong>1h à 2h</strong></span>
                                    </div>
                                    <div className="mt-2 ml-4 text-blue-950 text-sm">
                                        <span><FontAwesomeIcon icon={faCircleCheck} /></span>
                                        <span className="ml-2">Se rendre au site <strong>par taxi ou scooter</strong></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-5">
                            <div className="my-9 bg-white p-5 w-full mx-auto rounded-lg shadow-2xl">
                                <div className="flex items-center place-content-between">
                                    <h2 className="text-blue-950"><strong>Itinéraire du jour</strong></h2>
                                    <Weather/>
                                </div>
                                <Map/>
                            </div>
                            <div className="my-10 bg-white rounded-lg shadow-2xl w-full mx-auto h-table">
                                <h2 className="text-xl text-blue-950 text-center w-full pt-5">
                                    <strong><span><FontAwesomeIcon icon={faLightbulb} /></span> Astuces</strong>
                                </h2>
                                <Suggestions/>
                            </div>
                            <div className="my-10">
                                <div className="flex place-content-between w-4/5 mx-auto">
                                    <div className="text-color cursor-pointer">
                                        <span><FontAwesomeIcon icon={faArrowLeft} /></span>
                                        <strong className="ms-2">Jour précedent</strong>
                                    </div>
                                    <div className="text-color cursor-pointer">
                                        <strong className="mr-2">Jour Suivant</strong>
                                        <span><FontAwesomeIcon icon={faArrowRight} /></span>
                                    </div>
                                </div>
                            </div>
                            <div className="my-15">
                                <h2 className="font-bold text-2xl flex place-content-center align-center">
                                    <span className="text-blue-950 mr-2">Mesurez votre impact,</span> 
                                    <span className="text-color">Réduisez votre empreinte</span>
                                    <img src={earth} alt="budget" className="w-10" />
                                </h2>
                                <div className="text-blue-950 text-center mt-3">
                                    <strong>Suivez votre progression et découvrez comment réduire votre impact</strong>
                                </div>
                                <Link to="/dashboard" className="mt-4 bg-color text-white text-center flex place-content-center w-1/5 mx-auto py-3 rounded-lg">
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