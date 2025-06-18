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

export default function Shopping({handleData, choosen}: CompensationProps){
    const toggleCheckbox = (field: string, value: string) => {
        if(choosen[field]?.includes(value)){
            handleData(field, value, "remove");
        }else{
            handleData(field, value, "add");
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center mt-3">
            {/* Vêtements d'occasion */}
            <div
                className={`rounded-lg drop-shadow-md p-4 border-shopping flex flex-col justify-between h-full ${choosen.name?.includes("Vêtements d'occasion") ? "bg-green-800" : "bg-white"}`}
            >
                <label htmlFor="clothes" className="flex flex-col flex-grow cursor-pointer">
                    <div className="h-40">
                        <div className={`py-2 flex place-content-between ${choosen.name?.includes("Vêtements d'occasion") ? "text-white" : ""}`}>
                            <div>Privilégier la seconde main</div>
                            <div>
                                {choosen.name?.includes("Vêtements d'occasion") ?
                                    <FontAwesomeIcon icon={faCircleXmark} className="text-white text-2xl"/> : 
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-700"/>
                                }
                            </div>
                        </div>
                        <div className={`mt-3 text-gray-500 text-sm text-left ${choosen.name?.includes("Vêtements d'occasion") ? "text-white" : ""}`}>Acheter des vêtements et objets d'occasion</div>
                        <div className="mt-5 bg-blue-950 p-2 text-center flex place-content-between items-center rounded-lg">
                            <span className="text-white">-500Kg</span>
                            <span className="bg-white p-1">5%</span>
                        </div>
                    </div>
                    <Input
                        id="clothes"
                        name="name"
                        value="Vêtements d'occasion"
                        checked={choosen.name?.includes("Vêtements d'occasion")}
                        type="checkbox"
                        onChange={() => toggleCheckbox("name", "Vêtements d'occasion")}
                        className="border rounded-full border-amber-700 text-blue-950 text-center h-12 hidden"
                    />
                </label>
            </div>

            {/* Réduire les emballages */}
            <div
                className={`rounded-lg drop-shadow-md p-4 border-shopping flex flex-col justify-between h-full ${choosen.name?.includes("Réduire les emballages") ? "bg-green-800" : "bg-white"}`}
            >
                <label htmlFor="trash" className="flex flex-col flex-grow cursor-pointer">
                    <div className="h-40">
                        <div className={`py-2 flex place-content-between ${choosen.name?.includes("Réduire les emballages") ? "text-white" : ""}`}>
                            <div>Réduire les emballages</div>
                            <div>
                                {choosen.name?.includes("Réduire les emballages") ?
                                    <FontAwesomeIcon icon={faCircleXmark} className="text-white text-2xl"/> : 
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-700"/>
                                }
                            </div>
                        </div>
                        <div className={`mt-3 text-gray-500 text-sm text-left ${choosen.name?.includes("Réduire les emballages") ? "text-white" : ""}`}>Acheter en vrac et éviter les produits suremballés</div>
                        <div className="mt-5 bg-blue-950 p-2 text-center flex place-content-between items-center rounded-lg">
                            <span className="text-white">-500Kg</span>
                            <span className="bg-white p-1">5%</span>
                        </div>
                    </div>
                    <Input
                        id="trash"
                        name="name"
                        value="Réduire les emballages"
                        checked={choosen.name?.includes("Réduire les emballages")}
                        type="checkbox"
                        onChange={() => toggleCheckbox("name", "Réduire les emballages")}
                        className="border rounded-full border-amber-700 text-blue-950 text-center h-12 hidden"
                    />
                </label>
            </div>
            {/* Électronique durable */}
            <div
                className={`rounded-lg drop-shadow-md p-4 border-shopping flex flex-col justify-between h-full ${choosen.name?.includes("Électronique durable") ? "bg-green-800" : "bg-white"}`}
            >
                <label htmlFor="electric" className="flex flex-col flex-grow cursor-pointer">
                    <div className="h-40">
                        <div className={`py-2 flex place-content-between ${choosen.name?.includes("Électronique durable") ? "text-white" : ""}`}>
                            <div>Électronique durable</div>
                            <div>
                                {choosen.name?.includes("Électronique durable") ?
                                    <FontAwesomeIcon icon={faCircleXmark} className="text-white text-2xl"/> : 
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-700"/>
                                }
                            </div>
                        </div>
                        <div className={`mt-3 text-gray-500 text-sm text-left ${choosen.name?.includes("Électronique durable") ? "text-white" : ""}`}>Conserver ses appareils plus longtemps et réparer plutôt que remplacer</div>
                        <div className="mt-5 bg-blue-950 p-2 text-center flex place-content-between items-center rounded-lg">
                            <span className="text-white">-500Kg</span>
                            <span className="bg-white p-1">5%</span>
                        </div>
                    </div>
                    <Input
                        id="electric"
                        name="name"
                        value="Électronique durable"
                        checked={choosen.name?.includes("Électronique durable")}
                        type="checkbox"
                        onChange={() => toggleCheckbox("name", "Électronique durable")}
                        className="border rounded-full border-amber-700 text-blue-950 text-center h-12 hidden"
                    />
                </label>
            </div>
        </div>
    );
}