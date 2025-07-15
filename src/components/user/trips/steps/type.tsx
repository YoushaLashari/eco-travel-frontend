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
            <h2 className="font-bold text-xl lg:text-2xl flex flex-wrap justify-center items-center text-center">
                <span className="text-blue-950 mr-2">Choisissez votre type de</span>
                <span className="text-color mr-2">voyage</span>
                <img src={earth} alt="earth" className="w-6 sm:w-10" />
            </h2>
            <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full text-center">
                {[
                    { id: "hobbit", value: "Voyages de loisirs", img: beach },
                    { id: "culture", value: "Voyages culturels", img: culture },
                    { id: "adventure", value: "Voyages d'aventures", img: adventure },
                    { id: "health", value: "Voyages bien-être", img: health }
                ].map(({ id, value, img }) => (
                    <div
                        key={id}
                            className={`bg-white rounded-2xl drop-shadow-md p-4 flex flex-col justify-between trip-select min-h-[350px] ${
                            trip.type === value ? "border border-black" : ""
                        }`}
                    >
                        <label htmlFor={id} className="flex flex-col flex-grow cursor-pointer">
                            <div className="mx-auto w-16 md:w-24">
                                <img src={img} alt={id} className="w-full" />
                            </div>
                            <div className="mt-auto text-base md:text-xl bg-color rounded-full text-white py-2 px-4 mx-auto mb-8 max-w-[80%]">
                                {value}
                            </div>
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