import earth from "/images/earth.svg";
import map from "/images/maps.svg";
import visa from "/images/visa.svg";
import { Link } from "react-router";
import React from "react";
import { calculateDurationDays, capitalizeWords } from "@/assets/helpers";

interface Trip{
    id:number,
    name:string,
    destination:string,
    type:string,
    start_date: Date,
    end_date: Date
}

export default function Trip({ trip } : {trip: Trip}){
    return(
        <div className="mt-8 px-4 sm:px-6 md:px-10 h-auto">
            {/* Heading */}
            <h2 className="font-bold text-xl sm:text-2xl flex flex-wrap items-center justify-center text-center">
                <span className="text-blue-950 mr-2">Votre voyage, Pensé</span>
                <span className="text-color mr-2">pour la planète</span>
                <img src={earth} alt="budget" className="w-6 sm:w-8 md:w-10" />
            </h2>

            {/* First Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                {/* Destination Card */}
                <div className="bg-white p-5 rounded-xl drop-shadow-md">
                    <div className="mx-auto w-24">
                        <img src={map} alt="map" className="mx-auto" />
                    </div>
                    <h3 className="text-blue-950 text-center mt-6 font-semibold">
                        Votre Destination et voyage
                    </h3>
                    <div className="mt-2">{capitalizeWords(trip.destination)}</div>
                    <div>{capitalizeWords(trip.type)}</div>
                    <div>{calculateDurationDays(trip.start_date, trip.end_date)}</div>
                </div>

                {/* Visa Card */}
                <div className="bg-white p-5 rounded-xl drop-shadow-md">
                    <div className="mx-auto w-24">
                        <img src={visa} alt="visa" className="mx-auto" />
                    </div>
                    <h3 className="text-blue-950 text-center mt-6 font-semibold">
                        Status Visa & Passeport
                    </h3>
                    <div className="mt-2">Visa exigé: Oui</div>
                    <div>Visa à l'arrivée : Non</div>
                    <div>Durée max: 1 semaine</div>
                    <div>Coût: 190 Euro</div>
                </div>
            </div>

            {/* Second Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                {/* CO2 Emission Card */}
                <div className="relative bg-white p-5 rounded-xl drop-shadow-md text-center">
                    <h3 className="text-blue-950 text-lg sm:text-xl">Total Émissions CO2 de votre voyage</h3>
                    <h3 className="text-color text-xl sm:text-2xl mt-6 font-bold">557 kg CO2</h3>
                    <div className="bg-blue-950 text-white text-center rounded-full py-2 px-4 w-[80%] mx-auto mt-6 sm:absolute sm:bottom-4 sm:right-4 sm:w-auto">
                        Télécharger Mon Bilan Complet
                    </div>
                </div>

                {/* Environmental Impact */}
                <div className="my-4 md:mt-9">
                    <h1 className="text-blue-950 text-lg sm:text-xl">Votre impact Environnemental</h1>
                    <div className="mt-3 text-sm sm:text-base">
                        <span>
                            Nous avons calculé vos émissions de CO2 pour chaque étape de votre itinéraire. <br />
                            Cliquez sur <strong>"Voir mon itinéraire"</strong> pour découvrir des solutions simples et efficaces pour réduire votre impact environnemental.
                        </span>
                    </div>
                    <div className="mt-5 w-full sm:w-1/2">
                        <Link
                            to={`/trip/${trip.id}`}
                            className="bg-color rounded-full py-2 px-4 text-white text-center inline-block"
                            target="_blank"
                        >
                            Voir mon itinéraire
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}