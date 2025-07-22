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
            <h2 className="font-bold text-xl lg:text-2xl flex place-content-center align-center">
                <div>
                    <span className="text-blue-950 mr-2">Choisissez votre</span> 
                    <span className="text-color">langue préférée</span>
                </div>
                <img src={tripImage} alt="trip" className="w-6 sm:w-10" />
            </h2>
            <div className="mx-auto w-full mt-10">
                <Select
                    onValueChange={(value) => handleData("language", value)}
                >
                    <SelectTrigger className="h-12 py-6 w-full border border-amber-700 rounded-full text-blue-950 space-around items-center flex">
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