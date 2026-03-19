import React, { useState, useRef, useEffect } from "react";
import tripImage from "/images/trip.svg";
import { Input } from "@/components/ui/input";

interface Trip {
    origin: string;
    location: string;
}

interface Error {
    origin?: string;
    location?: string;
}

interface TripNameProps {
    handleData: (field: string, value: string) => void;
    trip: Trip;
    error?: Error;
}

// French cities list for autocomplete
const FRENCH_CITIES = [
    "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg",
    "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims", "Le Havre", "Cergy",
    "Saint-Étienne", "Toulon", "Grenoble", "Dijon", "Angers", "Nîmes",
    "Villeurbanne", "Aix-en-Provence", "Clermont-Ferrand", "Le Mans", "Brest",
    "Tours", "Amiens", "Limoges", "Perpignan", "Besançon", "Metz", "Caen",
    "Orléans", "Rouen", "Mulhouse", "Boulogne-Billancourt", "Argenteuil",
    "Montreuil", "Roubaix", "Tourcoing", "Avignon", "Nanterre", "Créteil",
    "Poitiers", "Nancy", "Fort-de-France", "Versailles", "Pau", "Courbevoie",
    "Vitry-sur-Seine", "Colombes", "Asnières-sur-Seine", "Aulnay-sous-Bois",
    "Rueil-Malmaison", "La Rochelle", "Cannes", "Antibes", "Saint-Denis",
    "Calais", "Dunkerque", "Troyes", "Annecy", "Ajaccio", "Bayonne",
    "Chambéry", "Béziers", "Lorient", "Quimper", "La Seyne-sur-Mer",
    "Villeneuve-d'Ascq", "Hyères", "Saint-Nazaire", "Valence", "Narbonne",
    "Bourges", "Colmar", "Mérignac", "Cherbourg-en-Cotentin", "Rome",
];

interface AutocompleteInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    label: string;
    id: string;
}

function AutocompleteInput({ value, onChange, placeholder, label, id }: AutocompleteInputProps) {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        onChange(val);

        if (val.length >= 1) {
            const filtered = FRENCH_CITIES.filter(city =>
                city.toLowerCase().includes(val.toLowerCase())
            ).slice(0, 6);
            setSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSelect = (city: string) => {
        onChange(city);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <div ref={wrapperRef} className="relative mb-4">
            <label htmlFor={id} className="float-left text-blue-950 font-semibold text-sm mb-2">{label}</label>
            <Input
                id={id}
                onChange={handleChange}
                className="border rounded-xl border-input text-blue-950 text-left h-14 w-full bg-input"
                placeholder={placeholder}
                value={value}
                autoComplete="off"
            />
            {showSuggestions && (
                <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-1 overflow-hidden">
                    {suggestions.map((city, index) => (
                        <li
                            key={index}
                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-blue-950 text-sm flex items-center gap-2"
                            onMouseDown={() => handleSelect(city)}
                        >
                            <span>📍</span> {city}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export function TripOrigin({handleData, trip, error}: TripNameProps){ 
    return(
        <div>
            <h2 className="font-bold text-xl lg:text-2xl text-center">
                <span className="text-blue-950">Où voulez-vous aller ?</span> 
            </h2>
            <h2 className="text-center mt-3">
                <span className="text-gray-500">Définissez votre point de départ et d'arrivée</span> 
            </h2>
            <div className="mx-auto w-full mt-5">
                <AutocompleteInput
                    id="origin"
                    label="Départ"
                    placeholder="Ville de départ"
                    value={trip.origin}
                    onChange={(val) => handleData("origin", val)}
                />
                <div className="mb-2 text-red-500 text-sm text-center">{error && error.origin}</div>

                <AutocompleteInput
                    id="location"
                    label="Destination"
                    placeholder="Votre Destination"
                    value={trip.location}
                    onChange={(val) => handleData("location", val)}
                />
                <div className="mb-4 text-red-500 text-sm text-center">{error && error.location}</div>
            </div>
        </div>
    );
}