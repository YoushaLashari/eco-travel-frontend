import budget from "/images/budget.svg";
import React from "react";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";

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
            <h2 className="font-bold text-xl lg:text-2xl text-center">
                <span className="text-blue-950">Quel est votre budget ?</span> 
            </h2>
            <h2 className="text-center mt-3">
                <span className="text-gray-500">Définissez votre fourchette de prix</span> 
            </h2>
            <div className="mx-auto w-full mt-5">
                <Select
                    onValueChange={(value) => handleData("budget", value)}
                >
                    <SelectTrigger className="h-12 py-6 w-full border-input rounded-xl text-blue-950 space-around items-center flex bg-input">
                        <SelectValue placeholder={trip.budget.length > 0 ? trip.budget : "Sélectionnez votre budget"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="500">500€</SelectItem>
                        <SelectItem value="1000€">1000€</SelectItem>
                        <SelectItem value="2000€">2000€</SelectItem>
                        <SelectItem value="3000€">3000€</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-4 text-red-500 text-sm text-center">{error && error.budget}</div>
        </div>
    );
}