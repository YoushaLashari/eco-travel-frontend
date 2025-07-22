import { Input } from "@/components/ui/input";
import budget from "/images/budget.svg";
import React from "react";

interface Trip {
    budget: string;
}

interface Error {
    budget?: string;
}

interface TripBudgetProps {
    handleData: (field: string, value: string) => void;
    trip: Trip;
    error?: Error;
}

export function TripBudget({handleData, trip, error}: TripBudgetProps){
    return(
        <div>
            <h2 className="font-bold text-xl lg:text-2xl flex place-content-center align-center">
                <div>
                    <span className="text-blue-950 mr-2">Choisissez votre</span> 
                    <span className="text-color">Budget</span>
                </div>
                <img src={budget} alt="budget" className="w-6 sm:w-10" />
            </h2>
            <div className="mx-auto w-full mt-10">
                <Input
                    onChange={(event) => handleData("budget", event.target.value)}
                    className="border rounded-full border-amber-700 text-blue-950 text-center h-12 w-full"
                    placeholder="Montant"
                    value={trip.budget}
                    type="number"
                    min="0"
                />
            </div>
            <div className="mb-4 text-red-500 text-sm text-center">{error && error.budget}</div>
        </div>
    );
}