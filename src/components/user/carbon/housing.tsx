import { Input } from "@/components/ui/input";
import { faCheckCircle, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Compensation{
    name: string,
}

interface CompensationProps{
    handleData: (field: string, value: string, action: "add" | "remove") => void;
    choosen: Record<string, string[]>;
}

export default function Housing({handleData, choosen}: CompensationProps){
    const toggleCheckbox = (field: string, value: string) => {
        if(choosen[field]?.includes(value)){
            handleData(field, value, "remove");
        }else{
            handleData(field, value, "add");
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center mt-3 mb-5">
            {/* Réduire le chauffage */}
            {/* <div
                className={`rounded-lg drop-shadow-md p-4 border-housing flex flex-col justify-between h-full ${choosen.name?.includes("Réduire le chauffage") ? "bg-green-800" : "bg-white"}`}
            >
                <label htmlFor="heating" className="flex flex-col flex-grow cursor-pointer">
                    <div className="h-40">
                        <div className={`py-2 flex place-content-between ${choosen.name?.includes("Réduire le chauffage") ? "text-white" : ""}`}>
                            <div>Réduire le chauffage</div>
                            <div>
                                {choosen.name?.includes("Réduire le chauffage") ?
                                    <FontAwesomeIcon icon={faCircleXmark} className="text-white text-2xl"/> : 
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-700"/>
                                }
                            </div>
                        </div>
                        <div className={`mt-3 text-gray-500 text-sm text-left ${choosen.name?.includes("Réduire le chauffage") ? "text-white" : ""}`}>Baisser de 1°C la température du logement</div>
                        <div className="mt-5 bg-blue-950 p-2 text-center flex place-content-between items-center rounded-lg">
                            <span className="text-white">-500Kg</span>
                            <span className="bg-white p-1">5%</span>
                        </div>
                    </div>
                    <Input
                        id="heating"
                        name="name"
                        value="Réduire le chauffage"
                        checked={choosen.name?.includes("Réduire le chauffage")}
                        type="checkbox"
                        onChange={() => toggleCheckbox("name", "Réduire le chauffage")}
                        className="border rounded-full border-amber-700 text-blue-950 text-center h-12 hidden"
                    />
                </label>
            </div>

            <div
                className={`rounded-lg drop-shadow-md p-4 border-housing flex flex-col justify-between h-full ${choosen.name?.includes("Ampoules basse consommation") ? "bg-green-800" : "bg-white"}`}
            >
                <label htmlFor="bulb" className="flex flex-col flex-grow cursor-pointer">
                    <div className="h-40">
                        <div className={`py-2 flex place-content-between ${choosen.name?.includes("Ampoules basse consommation") ? "text-white" : ""}`}>
                            <div>Ampoules basse consommation</div>
                            <div>
                                {choosen.name?.includes("Ampoules basse consommation") ?
                                    <FontAwesomeIcon icon={faCircleXmark} className="text-white text-2xl"/> : 
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-700"/>
                                }
                            </div>
                        </div>
                        <div className={`mt-3 text-gray-500 text-sm text-left ${choosen.name?.includes("Ampoules basse consommation") ? "text-white" : ""}`}>Remplacer toutes les ampoules classiques par des LED</div>
                        <div className="mt-5 bg-blue-950 p-2 text-center flex place-content-between items-center rounded-lg">
                            <span className="text-white">-500Kg</span>
                            <span className="bg-white p-1">5%</span>
                        </div>
                    </div>
                    <Input
                        id="bulb"
                        name="name"
                        value="Ampoules basse consommation"
                        checked={choosen.name?.includes("Ampoules basse consommation")}
                        type="checkbox"
                        onChange={() => toggleCheckbox("name", "Ampoules basse consommation")}
                        className="border rounded-full border-amber-700 text-blue-950 text-center h-12 hidden"
                    />
                </label>
            </div>

            <div
                className={`rounded-lg drop-shadow-md p-4 border-housing flex flex-col justify-between h-full ${choosen.name?.includes("Isolation des fenêtres") ? "bg-green-800" : "bg-white"}`}
            >
                <label htmlFor="window" className="flex flex-col flex-grow cursor-pointer">
                    <div className="h-40">
                        <div className={`py-2 flex place-content-between ${choosen.name?.includes("Isolation des fenêtres") ? "text-white" : ""}`}>
                            <div>Isolation des fenêtres</div>
                            <div>
                                {choosen.name?.includes("Isolation des fenêtres") ?
                                    <FontAwesomeIcon icon={faCircleXmark} className="text-white text-2xl"/> : 
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-700"/>
                                }
                            </div>
                        </div>
                        <div className={`mt-3 text-gray-500 text-sm text-left ${choosen.name?.includes("Isolation des fenêtres") ? "text-white" : ""}`}>Privilégier les fruits et légumes locaux de saison</div>
                        <div className="mt-5 bg-blue-950 p-2 text-center flex place-content-between items-center rounded-lg">
                            <span className="text-white">-500Kg</span>
                            <span className="bg-white p-1">5%</span>
                        </div>
                    </div>
                    <Input
                        id="window"
                        name="name"
                        value="Isolation des fenêtres"
                        checked={choosen.name?.includes("Isolation des fenêtres")}
                        type="checkbox"
                        onChange={() => toggleCheckbox("name", "Isolation des fenêtres")}
                        className="border rounded-full border-amber-700 text-blue-950 text-center h-12 hidden"
                    />
                </label>
            </div> */}
        </div>
    );
}