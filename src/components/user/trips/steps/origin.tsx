import React from "react";
import tripImage from "/images/trip.svg";
import { Input } from "@/components/ui/input";

interface Trip {
    origin: string;
}

interface Error {
    origin?: string;
}

interface TripNameProps {
    handleData: (field: string, value: string) => void;
    trip: Trip;
    error?: Error;
}

export function TripOrigin({handleData, trip, error}: TripNameProps){ 
    return(
        <div>
            <h2 className="font-bold text-xl lg:text-2xl flex place-content-center align-center">
                <span className="text-blue-950 mr-2">Choisissez votre</span> 
                <span className="text-color">Destination de départ</span>
                <img src={tripImage} alt="trip" className="w-6 sm:w-10" />
            </h2>
            <div className="mx-auto w-100 mt-10">
                <Input
                    onChange={(event) => handleData("origin", event.target.value)}
                    className="border rounded-full border-amber-700 text-blue-950 text-center h-12"
                    placeholder="Votre destination"
                    value={trip.origin}
                />
            </div>
            <div className="mb-4 text-red-500 text-sm text-center">{error && error.origin}</div>
        </div>
    );
}