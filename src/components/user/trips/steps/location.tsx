import { Input } from "@/components/ui/input";
import tripImage from "/images/trip.svg";
import React from "react";

interface Trip {
    location: string;
}

interface Error {
    location?: string;
}

interface TripNameProps {
    handleData: (field: string, value: string) => void;
    trip: Trip;
    error?: Error;
}

export function TripLocation({handleData, trip, error}: TripNameProps){
    return(
        <div>
            <h2 className="font-bold text-xl lg:text-2xl flex place-content-center align-center">
                <span className="text-blue-950 mr-2">Choisissez votre</span> 
                <span className="text-color">Destination d'arrivé</span>
                <img src={tripImage} alt="trip" className="w-6 sm:w-10" />
            </h2>
            <div className="mx-auto w-100 mt-10">
                <Input
                    onChange={(event) => handleData("location", event.target.value)}
                    className="border rounded-full border-amber-700 text-blue-950 text-center h-12"
                    placeholder="Votre destination"
                    value={trip.location}
                />
            </div>
            <div className="mb-4 text-red-500 text-sm text-center">{error && error.location}</div>
        </div>
    );
}