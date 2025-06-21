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
            <h2 className="font-bold text-xl lg:text-2xl flex place-content-center align-center">
                <div>
                    <span className="text-blue-950 mr-2">Ecrivez</span> 
                    <span className="text-color">Vos remarques (optionnel)</span>
                </div>
                <img src={note} alt="note" className="w-6 sm:w-10" />
            </h2>
            <div className="mx-auto w-full mt-10">
                <Textarea
                    onChange={(event) => handleData("notes", event.target.value)}
                    className="border rounded border-amber-700 text-blue-950 p-2 w-full"
                    placeholder="Indiquez toute information supplémentaires ou vos préférences spécifiquues pour personaliser votre voyage"
                    value={trip.notes}
                />
            </div>
            <span className="mb-4 text-red-500 text-sm">{error && error.notes}</span>
        </div>
    );
}