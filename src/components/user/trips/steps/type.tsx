import earth from "/images/earth.svg";
import beach from "/images/beach.svg";
import culture from "/images/cultur.svg";
import adventure from "/images/adventure.svg";
import health from "/images/health.svg";
import React from "react";
import { Input } from "@/components/ui/input";

interface Trip {
    type: string;
}

interface TripNameProps {
    handleData: (field: string, value: string) => void;
    trip: Trip;
}

export function TripType({handleData, trip}: TripNameProps){
    return(
        <div className="px-4 mt-5">
            <h2 className="font-bold text-xl lg:text-2xl text-center">
                <span className="text-blue-950">Quel type de voyage souhaitez-vous ?</span> 
            </h2>
            <h2 className="text-center mt-3">
                <span className="text-gray-500">Sélectionnez le style qui vous correspond</span> 
            </h2>
            <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full text-center">
                {[
                    { id: "hobbit", value: "Voyages de loisirs", img: "🏖️" },
                    { id: "culture", value: "Voyages culturels", img: "🏛️" },
                    { id: "adventure", value: "Voyages d'aventures", img: "🏔️" },
                    { id: "health", value: "Voyages bien-être", img: "🧘" }
                ].map(({ id, value, img }) => (
                    <div
                        key={id}
                            className={`bg-white rounded-2xl drop-shadow-md p-5 flex flex-col justify-between trip-select rebound-zoom-btn ${
                            trip.type === value ? "border-type bg-type-active" : "border-input"
                        }`}
                    >
                        <label htmlFor={id} className="flex flex-col flex-grow cursor-pointer">
                            <div className="text-4xl">{img}</div>
                            <div className="text-blue-950 font-bold mt-4">{value}</div>
                            <Input
                                id={id}
                                name="options"
                                value={value}
                                checked={trip.type === value}
                                type="radio"
                                onChange={(event) => handleData("type", event.target.value)}
                                className="hidden"
                            />
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}