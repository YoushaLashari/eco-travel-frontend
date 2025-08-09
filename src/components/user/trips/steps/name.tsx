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
        <div className="p-5">
            <h2 className="font-bold text-xl lg:text-2xl text-center">
                <span className="text-blue-950">Donnez un nom à votre itinéraire</span> 
            </h2>
            <h2 className="text-center mt-3">
                <span className="text-gray-500">Choisissez un nom qui vous inspire</span> 
            </h2>
            <div className="mx-auto mt-5 w-full">
                <Input
                    onChange={(event) => handleData("name", event.target.value)}
                    className="border rounded-xl border-input text-blue-950 text-left h-14 w-full bg-input"
                    placeholder="Mon voyage de rêve..."
                    value={trip.name}
                />
            </div>
            <div className="mb-4 text-red-500 text-sm text-center">{error && error.name}</div>
        </div>
    );
}