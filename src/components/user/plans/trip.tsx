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
        <div className="mt-8">
            <h2 className="font-bold text-2xl flex place-content-center align-center">
                <span className="text-blue-950 mr-2">Votre voyage, Pensé</span> 
                <span className="text-color">pour la planète</span>
                <img src={earth} alt="budget" className="w-10" />
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="bg-white p-5 rounded-xl drop-shadow-md">
                    <div className="mx-auto w-30">
                        <img src={map} alt="map" />
                    </div>
                    <h3 className="text-blue-950 text-center mt-9"><strong>Votre Destination et voyage</strong></h3>
                    <div>{capitalizeWords(trip.destination)}</div>
                    <div>{capitalizeWords(trip.type)}</div>
                    <div>{calculateDurationDays(trip.start_date, trip.end_date)}</div>
                </div>
                <div className="bg-white p-5 rounded-xl drop-shadow-md">
                    <div className="mx-auto w-30">
                        <img src={visa} alt="visa" />
                    </div>
                    <h3 className="text-blue-950 text-center mt-9"><strong>Status Visa & Passeport</strong></h3>
                    <div>Visa exigé: Oui</div>
                    <div>Visa à l'arrivé : Non</div>
                    <div>Durée max: 1 semaine</div>
                    <div>Coût: 190 Euro</div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="mt-8 bg-white p-5 rounded-xl drop-shadow-md text-center static h-50">
                    <h3 className="text-blue-950 text-xl">Total Emissions CO2 de votre voyage</h3>
                    <h3 className="text-color text-2xl mt-9"><strong>557 kg CO2</strong></h3>
                    <div className="bg-blue-950 text-white text-center rounded-full py-2 w-1/2 absolute bottom-0 right-0 mr-3 -mb-4">
                        Télécharger Mon Bilan Complet
                    </div>
                </div>
                <div className="mt-9">
                    <h1 className="text-blue-950 text-xl">Votre impact Environnemental</h1>
                    <div className="mt-3">
                        <span>
                            Nous avons calculé vos émissions de CO2 pour chaque étape de votre itinéraire. <br />
                            Cliquez sur <strong>"Voir mon itinéraire"</strong> Pour découvrir des solutions simples et efficaces pour réduire votre impact Environnemental.
                        </span>
                    </div>
                    <div className="mt-5 w-1/2">
                        <Link to={`/trip/${trip.id}`} className="bg-color rounded-full py-2 px-4 text-white text-center" target="_blank">
                            Voir mon itinéraire
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}