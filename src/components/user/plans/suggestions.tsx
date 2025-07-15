import { faCarSide, faPersonRunning, faRecycle, faUtensils, faVanShuttle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface TipComponent {
    tip: any;
}

export default function Suggestions({ tip }: TipComponent){
    if(!tip){
        return <p>Loading tips...</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5 mx-5">
            {/* Card 1: Conseils éco-responsables */}
            <div className="flex flex-col h-full">
                <p className="text-center bg-card text-white p-3 rounded-t-lg text-lg font-bold">
                    Conseils éco-responsables
                </p>
                <div className="flex-1 rounded-b-lg shadow-lg bg-white">
                    {tip.ecofriendly_tips.map((item, index) => (
                        <div key={index} className="flex card-select items-center">
                            <div className={`${item.category === 'Transportation' ? "p-4 bg-blue-400" : item.category === "Accommodation" ? "py-4 px-5 bg-red-400" : "p-4 bg-amber-400"} ms-2 circle`}>
                                <FontAwesomeIcon icon={item.category === 'Transportation' ? faVanShuttle : item.category === "Accommodation" ? faUtensils : faRecycle} />
                            </div>
                            <div className="w-full border-astuce p-4">
                                <div className="mt-2">{item.category}</div>
                                <div className="text-sm text-gray-500 mt-2">{item.tip}</div>
                                <div className={`${item.category === "Transportation" ? "bg-green-200" : item.category === "Accommodation" ? "bg-yellow-200" : "bg-red-200"} rounded-full w-full text-center mt-2 text-sm p-2`}>
                                    <span className={`${item.category === "Transportation" ? "text-green-700" : item.category === "Accommodation" ? "text-yellow-700" : "text-red-700"}`}>
                                        <strong>{item.impact}</strong>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Card 2: Options de transport local */}
            <div className="flex flex-col h-full">
                <p className="text-center bg-card text-white p-3 rounded-t-lg text-lg font-bold">
                    Options de transport local
                </p>
                <div className="flex-1 rounded-b-lg shadow-lg bg-white">
                    {tip.local_transport_options.map((item, index) => (
                        <div
                            key={index}
                            className={`flex place-content-between items-center ${index !== tip.local_transport_options.length - 1 ? "border-astuce" : ""} card-select`}
                        >
                            <div className={`${item.mode === "Walking" ? "py-4 px-5" : "p-4"} bg-green-500 ms-2 circle`}>
                                <FontAwesomeIcon icon={item.mode === 'Public Bus' ? faVanShuttle : item.mode === "Taxi" ? faCarSide : faPersonRunning} />
                            </div>
                            <div className="p-4 w-full">
                                <div>{item.mode}</div>
                                <div className="text-sm text-gray-500 mt-2">{item.eco_impact}</div>
                            </div>
                            <div
                                className={`${item.mode === "Public Bus"
                                    ? "bg-amber-500"
                                    : item.mode === "Taxi"
                                        ? "bg-red-500"
                                        : "bg-green-500"
                                    } circle ${item.cost > 9 ? "pad-cost-big" : "pad-cost-small"} shadow-lg m-5 text-white font-bold`}
                            >
                                <strong>{item.cost}€</strong>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}