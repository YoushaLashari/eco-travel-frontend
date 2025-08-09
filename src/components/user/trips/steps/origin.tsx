import React from "react";
import tripImage from "/images/trip.svg";
import { Input } from "@/components/ui/input";

interface Trip {
    origin: string;
    location: string;
}

interface Error {
    origin?: string;
    location?: string;
}

interface TripNameProps {
    handleData: (field: string, value: string) => void;
    trip: Trip;
    error?: Error;
}

export function TripOrigin({handleData, trip, error}: TripNameProps){ 
    return(
        <div>
            <h2 className="font-bold text-xl lg:text-2xl text-center">
                <span className="text-blue-950">Où voulez-vous aller ?</span> 
            </h2>
            <h2 className="text-center mt-3">
                <span className="text-gray-500">Définissez votre point de départ et d'arrivée</span> 
            </h2>
            <div className="mx-auto w-full mt-5">
                <div className="mb-4">
                    <label htmlFor="origin" className="float-left text-blue-950 font-semibold text-sm mb-2">Départ</label>
                    <Input
                        onChange={(event) => handleData("origin", event.target.value)}
                        className="border rounded-xl border-input text-blue-950 text-left h-14 w-full bg-input"
                        placeholder="Ville de départ"
                        value={trip.origin}
                    />
                </div>
                <div className="mb-4 text-red-500 text-sm text-center">{error && error.origin}</div>
                <div className="mb-2">
                    <label htmlFor="origin" className="float-left text-blue-950 font-semibold text-sm mb-2">Destination</label>
                    <Input
                        onChange={(event) => handleData("location", event.target.value)}
                        className="border rounded-xl border-input text-blue-950 text-left h-14 w-full bg-input"
                        placeholder="Votre Destination"
                        value={trip.location}
                    />
                </div>
            </div>
            <div className="mb-4 text-red-500 text-sm text-center">{error && error.location}</div>
        </div>
    );
}