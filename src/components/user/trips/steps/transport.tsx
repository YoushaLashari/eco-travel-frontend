import React from "react";
import tripImage from "/images/trip.svg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface Trip {
    transport: string;
}

interface Error {
    transport?: string;
}

interface TripNameProps {
    handleData: (field: string, value: string) => void;
    trip: Trip;
    error?: Error;
}

export default function TripTransport({handleData, trip, error}: TripNameProps){
    return(
        <div>
            <h2 className="font-bold text-xl lg:text-2xl flex place-content-center align-center">
                <div>
                    <span className="text-blue-950 mr-2">Choisissez votre</span> 
                    <span className="text-color">Mode de transport</span>
                </div>
                <img src={tripImage} alt="trip" className="w-6 sm:w-10" />
            </h2>
            <div className="mx-auto w-full mt-10">
                <Select
                    onValueChange={(value) => handleData("transport", value)}
                >
                    <SelectTrigger className="h-12 py-6 w-full border border-amber-700 rounded-full text-blue-950 space-around items-center flex">
                        <SelectValue placeholder="-- Veuillez choisir votre moyen de transport --" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="plane">Avion</SelectItem>
                        <SelectItem value="train">Train</SelectItem>
                        <SelectItem value="car">Voiture</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-4 text-red-500 text-sm text-center">{error && error.transport}</div>
        </div>
    );
}