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
            <h2 className="font-bold text-xl lg:text-2xl flex place-content-center align-center">
                <div>
                    <span className="text-blue-950 mr-2">Choisissez</span> 
                    <span className="text-color">Nombre de personnes</span>
                </div>
                <img src={people} alt="people" className="w-6 sm:w-10" />
            </h2>
            <div className="mx-auto w-full mt-9">
                <div className="flex items-end place-content-center">
                    <div 
                        onClick={(event) => handleAdults(event.currentTarget.id)}
                        id="minus_adults"
                        className="bg-white drop-shadow-lg rounded pb-2 pt-1 px-3 mr-3 cursor-pointer border border-amber-700"
                    >
                        <div className="text-xl flex items-end place-content-center">
                            <span>-</span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="" className="text-right">Adultes</label>
                        <Input
                            className="border rounded-full border-amber-700 text-blue-950 text-center h-10"
                            value={adults}
                        />
                    </div>
                    <div 
                        onClick={(event) => handleAdults(event.currentTarget.id)}
                        id="plus_adults"
                        className="bg-white drop-shadow-lg rounded pb-2 pt-1 px-3 ml-3 cursor-pointer border border-amber-700"
                    >
                        <div className="text-xl flex items-end place-content-center">
                            <span>+</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-end place-content-center mt-5">
                    <div 
                        onClick={(event) => handleChildrens(event.currentTarget.id)}
                        id="minus_childrens"
                        className="bg-white drop-shadow-lg rounded pb-2 pt-1 px-3 mr-3 cursor-pointer border border-amber-700"
                    >
                        <div className="text-xl flex items-end place-content-center">
                            <span>-</span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="" className="text-right">Enfants</label>
                        <Input
                            className="border rounded-full border-amber-700 text-blue-950 text-center h-10"
                            value={childrens}
                        />
                    </div>
                    <div 
                        onClick={(event) => handleChildrens(event.currentTarget.id)}
                        id="plus_childrens"
                        className="bg-white drop-shadow-lg rounded pb-2 pt-1 px-3 ml-3 cursor-pointer border border-amber-700"
                    >
                        <div className="text-xl flex items-end place-content-center">
                            <span>+</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}