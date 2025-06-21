import { Input } from "@/components/ui/input";
import React from "react";


interface Trip {
    name: string;
}

interface Error {
    name?: string;
}

interface TripNameProps {
    handleData: (field: string, value: string) => void;
    trip: Trip;
    error?: Error;
}

export function TripName({handleData, trip, error}: TripNameProps){
    return(
        <div>
            <h2 className="font-bold text-xl lg:text-2xl">
                <span className="text-blue-950 text-center">Créer votre itinéraire</span> 
                <span className="text-color"> Eco résponsable</span>
            </h2>
            <div className="mx-auto w-100 mt-10">
                <Input
                    onChange={(event) => handleData("name", event.target.value)}
                    className="border rounded-full border-amber-700 text-blue-950 text-center h-12"
                    placeholder="Donnez un nom à votre itinéraire"
                    value={trip.name}
                />
            </div>
            <div className="mb-4 text-red-500 text-sm text-center">{error && error.name}</div>
        </div>
    );
}