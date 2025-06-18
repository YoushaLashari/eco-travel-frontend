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

export default function Transportation({handleData,choosen}: CompensationProps){
    const toggleCheckbox = (field: string, value: string) => {
        if(choosen[field]?.includes(value)){
            handleData(field, value, "remove");
        }else{
            handleData(field, value, "add");
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center mt-3">
            {/* Vélo pour trajets courts */}
            <div
                className={`rounded-lg drop-shadow-md p-4 border-transportation flex flex-col justify-between h-full ${choosen.name?.includes("Vélo pour trajets courts") ? "bg-green-800" : "bg-white"}`}
            >
                <label htmlFor="bike" className="flex flex-col flex-grow cursor-pointer">
                    <div className="h-40">
                        <div className={`py-2 flex place-content-between ${choosen.name?.includes("Vélo pour trajets courts") ? "text-white" : ""}`}>
                            <div>Vélo pour trajets courts</div>
                            <div>
                                {choosen.name?.includes("Vélo pour trajets courts") ?
                                    <FontAwesomeIcon icon={faCircleXmark} className="text-white text-2xl"/> : 
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-700"/>
                                }
                            </div>
                        </div>
                        <div className={`mt-3 text-gray-500 text-sm text-left ${choosen.name?.includes("Vélo pour trajets courts") ? "text-white" : ""}`}>Utiliser le vélo pour les trajets moins de 5km</div>
                        <div className="mt-5 bg-blue-950 p-2 text-center flex place-content-between items-center rounded-lg">
                            <span className="text-white">-500Kg</span>
                            <span className="bg-white p-1">5%</span>
                        </div>
                    </div>
                    <Input
                        id="bike"
                        name="name"
                        value="Vélo pour trajets courts"
                        checked={choosen.name?.includes("Vélo pour trajets courts")}
                        type="checkbox"
                        onChange={() => toggleCheckbox("name", "Vélo pour trajets courts")}
                        className="border rounded-full border-amber-700 text-blue-950 text-center h-12 hidden"
                    />
                </label>
            </div>

            {/* Privilégier les transports en commun */}
            <div
                className={`rounded-lg drop-shadow-md p-4 border-transportation flex flex-col justify-between h-full ${choosen.name?.includes("Privilégier les transports en commun") ? "bg-green-800" : "bg-white"}`}
            >
                <label htmlFor="public" className="flex flex-col flex-grow cursor-pointer">
                    <div className="h-40">
                        <div className={`py-2 flex place-content-between ${choosen.name?.includes("Privilégier les transports en commun") ? "text-white" : ""}`}>
                            <div>Transports en commun</div>
                            <div>
                                {choosen.name?.includes("Privilégier les transports en commun") ?
                                    <FontAwesomeIcon icon={faCircleXmark} className="text-white text-2xl"/> : 
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-700"/>
                                }
                            </div>
                        </div>
                        <div className={`mt-3 text-gray-500 text-sm text-left ${choosen.name?.includes("Privilégier les transports en commun") ? "text-white" : ""}`}>Remplacer la voiture par les transports en commun quand possible</div>
                        <div className="mt-5 bg-blue-950 p-2 text-center flex place-content-between items-center rounded-lg">
                            <span className="text-white">-500Kg</span>
                            <span className="bg-white p-1">5%</span>
                        </div>
                    </div>
                    <Input
                        id="public"
                        name="name"
                        value="Privilégier les transports en commun"
                        checked={choosen.name?.includes("Privilégier les transports en commun")}
                        type="checkbox"
                        onChange={() => toggleCheckbox("name", "Privilégier les transports en commun")}
                        className="border rounded-full border-amber-700 text-blue-950 text-center h-12 hidden"
                    />
                </label>
            </div>
            {/* Covoiturage régulier */}
            <div
                className={`rounded-lg drop-shadow-md p-4 border-transportation flex flex-col justify-between h-full ${choosen.name?.includes("Covoiturage régulier") ? "bg-green-800" : "bg-white"}`}
            >
                <label htmlFor="pickup" className="flex flex-col flex-grow cursor-pointer">
                    <div className="h-40">
                        <div className={`py-2 flex place-content-between ${choosen.name?.includes("Covoiturage régulier") ? "text-white" : ""}`}>
                            <div>Covoiturage régulier</div>
                            <div>
                                {choosen.name?.includes("Covoiturage régulier") ?
                                    <FontAwesomeIcon icon={faCircleXmark} className="text-white text-2xl"/> : 
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-700"/>
                                }
                            </div>
                        </div>
                        <div className={`mt-3 text-gray-500 text-sm text-left ${choosen.name?.includes("Covoiturage régulier") ? "text-white" : ""}`}>Privilégier les fruits et légumes locaux de saison</div>
                        <div className="mt-5 bg-blue-950 p-2 text-center flex place-content-between items-center rounded-lg">
                            <span className="text-white">-500Kg</span>
                            <span className="bg-white p-1">5%</span>
                        </div>
                    </div>
                    <Input
                        id="pickup"
                        name="name"
                        value="Covoiturage régulier"
                        checked={choosen.name?.includes("Covoiturage régulier")}
                        type="checkbox"
                        onChange={() => toggleCheckbox("name", "Covoiturage régulier")}
                        className="border rounded-full border-amber-700 text-blue-950 text-center h-12 hidden"
                    />
                </label>
            </div>
        </div>
    );
}