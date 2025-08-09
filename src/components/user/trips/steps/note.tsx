import React from "react";
import note from "/images/note.svg";
import { Textarea } from "@/components/ui/textarea";

interface Trip {
    notes: string;
}

interface Error {
    notes?: string;
}

interface TripNameProps {
    handleData: (field: string, value: string) => void;
    trip: Trip;
    error?: Error;
}

export function TripNote({handleData, trip, error}: TripNameProps){
    return(
        <div>
            <h2 className="font-bold text-xl lg:text-2xl text-center">
                <span className="text-blue-950">Vous avez une remarque à faire ?</span> 
            </h2>
            <h2 className="text-center mt-3">
                <span className="text-gray-500">Ecrivez votre remarque</span> 
            </h2>
            <div className="mx-auto w-full mt-5">
                <Textarea
                    onChange={(event) => handleData("notes", event.target.value)}
                    className="border rounded-xl border-input text-blue-950 text-left h-14 w-full bg-input"
                    placeholder="Indiquez toute information supplémentaires ou vos préférences spécifiquues pour personaliser votre voyage"
                    value={trip.notes}
                />
            </div>
            <span className="mb-4 text-red-500 text-sm">{error && error.notes}</span>
        </div>
    );
}