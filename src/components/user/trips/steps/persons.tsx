import { Input } from "@/components/ui/input";
import people from "/images/people.svg";
import React from "react";

interface TripPersonsProps {
    handleAdults: (id: string) => void;
    handleChildrens: (id: string) => void;
    adults : number,
    childrens : number
}

export function TripPerson({handleAdults, handleChildrens, adults, childrens}: TripPersonsProps){
    return(
        <div>
            <h2 className="font-bold text-xl lg:text-2xl text-center">
                <span className="text-blue-950">Combien de voyageurs ?</span> 
            </h2>
            <h2 className="text-center mt-3">
                <span className="text-gray-500">Indiquez le nombre de personnes</span> 
            </h2>
            <div className="mx-auto w-full mt-5">
                <div className="mb-4">
                    <div className="bg-people p-5 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div className="text-blue-950 font-semibold">Adultes</div>
                            <div className="flex items-center">
                                <div 
                                    className="w-10 h-10 border-2 border-amber-600 rounded-full p-2 flex items-center justify-center cursor-pointer link-hover"
                                    onClick={(event) => handleAdults(event.currentTarget.id)}
                                    id="minus_adults"
                                >
                                    -
                                </div>
                                <Input
                                    className="text-blue-950 text-center w-20 border-none font-bold"
                                    value={adults}
                                    readOnly
                                />
                                <div 
                                    className="w-10 h-10 border-2 border-amber-600 rounded-full p-2 flex items-center justify-center cursor-pointer link-hover"
                                    onClick={(event) => handleAdults(event.currentTarget.id)}
                                    id="plus_adults"
                                >
                                    +
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="bg-people p-5 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div className="text-blue-950 font-semibold">Enfants</div>
                            <div className="flex items-center">
                                <div 
                                    className="w-10 h-10 border-2 border-amber-600 rounded-full p-2 flex items-center justify-center cursor-pointer link-hover"
                                    onClick={(event) => handleChildrens(event.currentTarget.id)}
                                    id="minus_childrens"
                                >
                                    -
                                </div>
                                <Input
                                    className="text-blue-950 text-center w-20 border-none font-bold"
                                    value={childrens}
                                    readOnly
                                />
                                <div 
                                    className="w-10 h-10 border-2 border-amber-600 rounded-full p-2 flex items-center justify-center cursor-pointer link-hover"
                                    onClick={(event) => handleChildrens(event.currentTarget.id)}
                                    id="plus_childrens"
                                >
                                    +
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}