import { faCheck, faCircleInfo, faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import meat from "/images/meat.svg";
import apple from "/images/apple.svg";
import recycle from "/images/recycle.svg";
import { useState } from "react";
import React from "react";
import { Switch } from "@/components/ui/switch";

interface CompensationProps{
    handleData: (field: string, value: string, action: "add" | "remove") => void;
    choosen: Record<string, string[]>;
}

export default function Food({handleData, choosen}: CompensationProps){
    const [openCard, setOpenCard] = useState<string | null>(null);

    const toggleCheckbox = (field: string, value: string) => {
        if(choosen[field]?.includes(value)){
            handleData(field, value, "remove");
        }else{
            handleData(field, value, "add");
        }
    };

    return(
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 text-center mt-3">
            {/* Réduire la viande rouge */}
            <div
                className={`rounded-lg drop-shadow-md p-4 flex flex-col justify-between h-full ${choosen.name?.includes("Réduire la viande rouge") ? "bg-active border-active" : "bg-white border-food"}`}
            >
                <div className="flex flex-col flex-grow">
                    <div className="flex place-content-between items-start">
                        <div className="flex items-center">
                            <div
                                style={{
                                    background: choosen.name?.includes("Réduire la viande rouge")
                                    ? "#BBF7D0"
                                    : "#F3F4F6",
                                    borderRadius: "50%",
                                }}
                                className="p-2"
                            >                                
                                <img src={meat} alt="meat" className="w-6 sm:w-10" />
                            </div>
                            <div>
                                <div className="font-bold ml-3">Réduire la viande rouge</div>
                                    <div className="text-xs text-left ml-3 text-gray-500">
                                        Économie <span className="font-bold card-color">30kg CO<sub>2</sub></span>
                                        <span>/ 3mois</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 relative cursor-pointer">
                                <Switch
                                    className="w-switch h-switch size-switch cursor-pointer mt-1"
                                    id="meat"
                                    checked={choosen.name?.includes("Réduire la viande rouge")}
                                    onCheckedChange={() => toggleCheckbox("name", "Réduire la viande rouge")}
                                />
                                <div className="absolute top-2 left-11.5 hidden sm:block">
                                    {choosen.name?.includes("Réduire la viande rouge") && <FontAwesomeIcon icon={faCheck} color={"#22C55E"} />}
                                </div>
                            </div>
                        </div>
                    <div className="mt-3 text-sm text-left">
                        Passer de 3 à 2 portions de viande rouge par semaine
                    </div>
                </div>
                <div
                    className="text-left text-sm mt-2 text-blue-500 mb-3"
                    onClick={() => setOpenCard(openCard === "meat" ? null : "meat")}
                >
                    <div className="flex place-content-between items-start">
                        <div className="cursor-pointer p-2">
                            <FontAwesomeIcon icon={faCircleInfo} />
                            <span className="ml-2 font-bold">Plus d'infos</span>
                        </div>
                        {choosen.name?.includes("Réduire la viande rouge") && 
                        <div className="rounded-full bg-text-active p-2">
                            <span className="text-active font-bold">
                                En cours: 2 jours
                                <FontAwesomeIcon icon={faFire} color={"orange"} className="ml-2" />
                            </span>
                        </div>}
                    </div>
                </div>
                {openCard === "meat" &&
                    <div className="bg-card-append p-2 rounded-md">
                        <div className="text-left text-sm text-blue-900 flex">
                            <FontAwesomeIcon icon={faCircleInfo} className="mt-1" />
                            <div>
                                <p className="ml-2 font-bold">Le saviez-vous?</p>
                                <p className="ml-2">Une portion de bœuf = 7kg de CO2 et 15 000L d'eau</p>
                            </div>
                        </div>
                        <div className="bg-white mt-3 p-3 flex place-content-between">
                            <div>1 Steak = </div>
                            <div>40km en voiture</div>
                        </div>
                    </div>
                }
            </div>

            {/* Manger local et de saison */}
            <div
                className={`
                    rounded-lg drop-shadow-md p-4 flex flex-col justify-between h-full 
                    ${choosen.name?.includes("Manger local et de saison") ? "bg-active border-active" : "bg-white border-food"}`
                }
            >
                <div className="flex flex-col flex-grow">
                    <div className="flex place-content-between items-start">
                        <div className="flex items-center">
                            <div
                                style={{
                                    background: choosen.name?.includes("Manger local et de saison")
                                    ? "#BBF7D0"
                                    : "#F3F4F6",
                                    borderRadius: "50%",
                                }}
                                className="p-2"
                            >
                                <img src={apple} alt="apple" className="w-6 sm:w-10" />
                            </div>
                            <div>
                                <div className="font-bold ml-3">Manger local et de saison</div>
                                    <div className="text-xs text-left ml-3 text-gray-500">
                                        Économie <span className="font-bold card-color">20kg CO<sub>2</sub></span>
                                        <span>/ 3mois</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 relative cursor-pointer">
                                <Switch
                                    className="w-switch h-switch size-switch cursor-pointer mt-1"
                                    id="local"
                                    checked={choosen.name?.includes("Manger local et de saison")}
                                    onCheckedChange={() => toggleCheckbox("name", "Manger local et de saison")}
                                />
                                <div className="absolute top-2 left-11.5 hidden sm:block">
                                    {choosen.name?.includes("Manger local et de saison") && <FontAwesomeIcon icon={faCheck} color={"#22C55E"} />}
                                </div>
                            </div>
                        </div>
                    <div className="mt-3 text-sm text-left">
                        Privilégier les fruits et légumes locaux de saison
                    </div>
                </div>
                <div
                    className="text-left text-sm mt-2 text-blue-500 mb-3"
                    onClick={() => setOpenCard(openCard === "local" ? null : "local")}
                >
                    <div className="flex place-content-between">
                        <div className="cursor-pointer p-2">
                            <FontAwesomeIcon icon={faCircleInfo} />
                            <span className="ml-2 font-bold">Plus d'infos</span>
                        </div>
                        {choosen.name?.includes("Manger local et de saison") && 
                        <div className="rounded-full bg-text-active p-2">
                            <span className="text-active font-bold">
                                En cours: 4 jours
                                <FontAwesomeIcon icon={faFire} color={"orange"} className="ml-2" />
                            </span>
                        </div>}
                    </div>
                </div>
                {openCard === "local" &&
                    <div className="bg-card-append p-2 rounded-md">
                        <div className="text-left text-sm text-blue-900 flex">
                            <FontAwesomeIcon icon={faCircleInfo} className="mt-1" />
                            <div>
                                <p className="ml-2 font-bold">Le saviez-vous?</p>
                                <p className="ml-2">Un fruit importé hors-saison = 10x plus d'émissions</p>
                            </div>
                        </div>
                        <div className="bg-white mt-3 p-3 flex place-content-between">
                            <div>Local = </div>
                            <div>-95% d'émissions</div>
                        </div>
                    </div>
                }
            </div>

            {/* Réduire le gaspillage alimentaire */}
            <div
                className={`
                    rounded-lg drop-shadow-md p-4 flex flex-col justify-between h-full 
                    ${choosen.name?.includes("Réduire le gaspillage alimentaire") ? "bg-active border-active" : "bg-white border-food"}`
                }
            >
                <div className="flex flex-col flex-grow">
                    <div className="flex place-content-between items-start">
                        <div className="flex items-center">
                            <div
                                style={{
                                    background: choosen.name?.includes("Réduire le gaspillage alimentaire")
                                    ? "#BBF7D0"
                                    : "#F3F4F6",
                                    borderRadius: "50%",
                                }}
                                className="p-2"
                            >
                                <img src={recycle} alt="recycle" className="w-6 sm:w-10" />
                            </div>
                            <div>
                                <div className="font-bold ml-3">Réduire le gaspillage</div>
                                    <div className="text-xs text-left ml-3 text-gray-500">
                                        Économie <span className="font-bold card-color">15kg CO<sub>2</sub></span>
                                        <span>/ 3mois</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 relative cursor-pointer">
                                <Switch
                                    className="w-switch h-switch size-switch cursor-pointer mt-1"
                                    id="food"
                                    checked={choosen.name?.includes("Réduire le gaspillage alimentaire")}
                                    onCheckedChange={() => toggleCheckbox("name", "Réduire le gaspillage alimentaire")}
                                />
                                <div className="absolute top-2 left-11.5 hidden sm:block">
                                    {choosen.name?.includes("Réduire le gaspillage alimentaire") && <FontAwesomeIcon icon={faCheck} color={"#22C55E"} />}
                                </div>
                            </div>
                        </div>
                    <div className="mt-3 text-sm text-left">
                        Planifier ses repas et conserver correctement les aliments
                    </div>
                </div>
                <div
                    className="text-left text-sm mt-2 text-blue-500 mb-3"
                    onClick={() => setOpenCard(openCard === "food" ? null : "food")}
                >
                    <div className="flex place-content-between">
                        <div className="cursor-pointer p-2">
                            <FontAwesomeIcon icon={faCircleInfo} />
                            <span className="ml-2 font-bold">Plus d'infos</span>
                        </div>
                        {choosen.name?.includes("Réduire le gaspillage alimentaire") && 
                        <div className="rounded-full bg-text-active p-2">
                            <span className="text-active font-bold">
                                En cours: 1 jour
                                <FontAwesomeIcon icon={faFire} color={"orange"} className="ml-2" />
                            </span>
                        </div>}
                    </div>
                </div>
                {openCard === "food" &&
                    <div className="bg-card-append p-2 rounded-md">
                        <div className="text-left text-sm text-blue-900 flex">
                            <FontAwesomeIcon icon={faCircleInfo} className="mt-1" />
                            <div>
                                <p className="ml-2 font-bold">Le saviez-vous?</p>
                                <p className="ml-2">30% de la nourriture mondiale est gaspillée</p>
                            </div>
                        </div>
                        <div className="bg-white mt-3 p-3 flex place-content-between">
                            <div>Réduire 50% = </div>
                            <div>+2 arbres/an</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}