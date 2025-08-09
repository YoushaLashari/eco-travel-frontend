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
    let transport = trip.transport === "plane" ? "✈️ Avion" : trip.transport === "train" ? "🚆 Train" : trip.transport === "train" ? "🚗 Voiture" : "🚌 Bus";

    return(
        <div>
            <h2 className="font-bold text-xl lg:text-2xl text-center">
                <span className="text-blue-950">Comment souhaitez-vous voyager ?</span> 
            </h2>
            <h2 className="text-center mt-3">
                <span className="text-gray-500">Choisissez votre moyen de transport</span> 
            </h2>
            <div className="mx-auto w-full mt-5">
                <Select
                    onValueChange={(value) => handleData("transport", value)}
                >
                    <SelectTrigger className="h-12 py-6 w-full border-input rounded-xl text-blue-950 space-around items-center flex bg-input">
                        <SelectValue placeholder={trip.transport.length > 0 ? transport : "Sélectionnez votre moyen de transport"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="plane">✈️ Avion</SelectItem>
                        <SelectItem value="train">🚆 Train</SelectItem>
                        <SelectItem value="car">🚗 Voiture</SelectItem>
                        <SelectItem value="bus">🚌 Bus</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-4 text-red-500 text-sm text-center">{error && error.transport}</div>
        </div>
    );
}