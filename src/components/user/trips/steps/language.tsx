import React from "react";
import tripImage from "/images/trip.svg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface Trip {
    language: string;
}

interface Error {
    language?: string;
}

interface TripNameProps {
    handleData: (field: string, value: string) => void;
    trip: Trip;
    error?: Error;
}

export default function TripLanguage({handleData, trip, error}: TripNameProps){
    let language = trip.language === "English" ? "Anglais" : trip.language === "French" ? "Français" : trip.language === "Spanish" ? "Espagnol" : "Allemand";

    return(
        <div>
            <h2 className="font-bold text-xl lg:text-2xl text-center">
                <span className="text-blue-950">C'est quoi votre langue préférée ?</span> 
            </h2>
            <h2 className="text-center mt-3">
                <span className="text-gray-500">Indiquez votre langue</span> 
            </h2>
            <div className="mx-auto w-full mt-5">
                <Select
                    onValueChange={(value) => handleData("language", value)}
                >
                    <SelectTrigger className="h-12 py-6 w-full border-input rounded-xl text-blue-950 space-around items-center flex bg-input">
                        <SelectValue placeholder={trip.language.length > 0 ? language : "-- Veuillez choisir votre langue préférée --"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="English">Anglais</SelectItem>
                        <SelectItem value="French">Français</SelectItem>
                        <SelectItem value="Spanish">Espagnol</SelectItem>
                        <SelectItem value="German">Allemand</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-4 text-red-500 text-sm text-center">{error && error.language}</div>
        </div>
    );
}