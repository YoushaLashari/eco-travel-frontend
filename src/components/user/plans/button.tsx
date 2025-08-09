import { capitalizeWords } from "@/assets/helpers";
import { Input } from "@/components/ui/input";
import { faAngleRight, faComment, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
interface Trip{
    trip: string
}

export default function Button({ trip } : Trip) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    let destination = trip.split(",")[0].trim();

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 bg-blue-950 text-white rounded-full p-4 shadow-lg animate-pulse-custom z-50 w-15 h-15 cursor-pointer"
            >
                <FontAwesomeIcon icon={faComment}/>
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-120 shadow-lg">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-blue-950">
                                <FontAwesomeIcon icon={faComment}/> Assistant Voyage Trekr
                            </h2>
                            <FontAwesomeIcon 
                                icon={faXmark} 
                                className="text-gray-400 cursor-pointer"
                                onClick={() => setIsModalOpen(false)}
                            />
                        </div>
                        <p className="mt-2 text-blue-950 bg-modal p-2 raduis text-sm text-center">
                            👋 Salut ! Comment puis-je t'aider avec ton voyage à {capitalizeWords(destination)} ?
                        </p>
                        <div className={`py-2 border rounded-2xl font-semibold text-sm link-hover cursor-pointer w-full text-left ps-4 text-blue-950 mt-3`}>
                            "Peux-tu changer l'hôtel du jour 2 ?"
                        </div>
                        <div className={`py-2 border rounded-2xl font-semibold text-sm link-hover cursor-pointer w-full text-left ps-4 text-blue-950 mt-2`}>
                            "Ajoute une activité culturelle"
                        </div>
                        <div className={`py-2 border rounded-2xl font-semibold text-sm link-hover cursor-pointer w-full text-left ps-4 text-blue-950 mt-2`}>
                            "Optimise mon impact carbone"
                        </div>
                        <div className={`py-2 border rounded-2xl font-semibold text-sm link-hover cursor-pointer w-full text-left ps-4 text-blue-950 mt-2`}>
                            "Montre-moi des restaurants bio"
                        </div>
                        <div className="flex items-center mt-4">
                            <Input
                                className="py-4 border rounded-2xl font-semibold text-sm w-full text-left ps-4"
                                placeholder="Tape ton message..."
                            />
                            <div className="bg-blue-950 text-white rounded-full p-2 ms-2 cursor-pointer hover:opacity-80 w-15 h-10 text-center">
                                <FontAwesomeIcon icon={faAngleRight} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
