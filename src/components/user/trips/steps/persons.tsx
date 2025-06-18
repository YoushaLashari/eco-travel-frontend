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
            <h2 className="font-bold text-2xl flex place-content-center align-center">
                <span className="text-blue-950 mr-2">Choisissez</span> 
                <span className="text-color">Nombre de personnes</span>
                <img src={people} alt="people" className="w-10" />
            </h2>
            <div className="mx-auto w-100 mt-9">
                <div className="flex items-end place-content-center">
                    <div 
                        onClick={(event) => handleAdults(event.currentTarget.id)}
                        id="minus_adults"
                        className="bg-white drop-shadow-lg rounded py-1 px-3 mr-3 cursor-pointer border border-amber-700"
                    >
                        <span className="text-2xl">-</span>
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
                        className="bg-white drop-shadow-lg rounded py-1 px-3 ml-3 cursor-pointer border border-amber-700"
                    >
                        <span className="text-2xl">+</span>
                    </div>
                </div>
                <div className="flex items-end place-content-center mt-5">
                    <div 
                        onClick={(event) => handleChildrens(event.currentTarget.id)}
                        id="minus_childrens"
                        className="bg-white drop-shadow-lg rounded py-1 px-3 mr-3 cursor-pointer border border-amber-700"
                    >
                        <span className="text-2xl">-</span>
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
                        className="bg-white drop-shadow-lg rounded py-1 px-3 ml-3 cursor-pointer border border-amber-700"
                    >
                        <span className="text-2xl">+</span>
                    </div>
                </div>
            </div>
        </div>
    );
}