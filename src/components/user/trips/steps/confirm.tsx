import { calculateDuration, capitalizeWords } from "@/assets/helpers";
import React from "react";

interface Trip {
    name: string;
    type: string;
    origin: string;
    location: string;
    transport: string;
    budget: string;
    notes: string;
}

interface TripConfirmProps {
    trip: Trip;
    startDate: Date;
    endDate: Date | null;
    adults: number;
    childrens: number;
}

export function TripConfirm({trip, startDate, endDate, adults, childrens}: TripConfirmProps){
    return(
        <div>
            <h2 className="font-bold text-2xl flex place-content-center align-center">
                <span className="text-blue-950 mr-2">Récapitulatif de votre</span> 
                <span className="text-color">voyage</span>
            </h2>
            <div className="mt-5">
                <div className="flex place-content-around">
                    <p className="text-left w-full">Nom de votre voyage: </p>
                    <p className="text-left w-full"><strong>{capitalizeWords(trip.name)}</strong></p>
                </div>
                <div className="flex place-content-around mt-2">
                    <p className="text-left w-full">Type de votre voyage:</p>
                    <p className="text-left w-full"><strong>{trip.type}</strong></p>
                </div>
                 <div className="flex place-content-around mt-2">
                    <p className="text-left w-full">Destination de départ de votre voyage:</p>
                    <p className="text-left w-full"><strong>{capitalizeWords(trip.origin)}</strong></p>
                </div>
                <div className="flex place-content-around mt-2">
                    <p className="text-left w-full">Destination d'arriver de votre voyage:</p>
                    <p className="text-left w-full"><strong>{capitalizeWords(trip.location)}</strong></p>
                </div>
                <div className="flex place-content-around mt-2">
                    <p className="text-left w-full">Type de transport de votre voyage:</p>
                    <p className="text-left w-full"><strong>
                        {capitalizeWords(trip.transport === "plane" ? "Avion" : trip.transport === "train" ? "Train" : "Voiture")}
                    </strong></p>
                </div>
                <div className="flex place-content-around mt-2">
                    <p className="text-left w-full">Budget de votre voyage:</p>
                    <p className="text-left w-full"><strong>{trip.budget}</strong></p>
                </div>
                <div className="flex place-content-around mt-2">
                    <p className="text-left w-full">Date de début:</p>
                    <p className="text-left w-full"><strong>{startDate.toLocaleDateString()}</strong></p>
                </div>
                <div className="flex place-content-around mt-2">
                    <p className="text-left w-full">Date de fin:</p>
                    <p className="text-left w-full"><strong>{endDate?.toLocaleDateString()}</strong></p>
                </div>
                <div className="flex place-content-around mt-2">
                    <p className="text-left w-full">Durée:</p>
                    <p className="text-left w-full"><strong>{endDate ? calculateDuration(startDate, endDate) : "N/A"}</strong></p>
                </div>
                <div className="flex place-content-around mt-2">
                    <p className="text-left w-full">Nombre d'adultes:</p>
                    <p className="text-left w-full"><strong>{adults}</strong></p>
                </div>
                <div className="flex place-content-around mt-2">
                    <p className="text-left w-full">Nombre d'enfants:</p>
                    <p className="text-left w-full"><strong>{childrens}</strong></p>
                </div>
                <div className="flex place-content-around mt-2">
                    <p className="text-left w-full">Remarques:</p>
                    <p className="text-left w-full"><strong>{trip.notes === "" ? "Pas de remarques" : capitalizeWords(trip.notes)}</strong></p>
                </div>
            </div>
        </div>
    );
}