import React from "react";

interface TipComponent {
    tip: any;
}

export default function Suggestions({ tip }: TipComponent) {
    if (!tip) {
        return <p className="text-sm text-gray-400 px-5 py-3">Chargement des astuces...</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-3 py-4 mx-5">

            {/* ── Eco-friendly tips ── */}
            {/* FIX: API returns plain strings [], not objects with .category/.impact */}
            {tip.ecofriendly_tips?.length > 0 && (
                <div>
                    <p className="text-xs font-semibold text-green-700 uppercase mb-2">
                        🌿 Conseils éco-responsables
                    </p>
                    {tip.ecofriendly_tips.map((item: string, index: number) => (
                        <div
                            className="bg-astuce-globe p-4 raduis mb-2"
                            key={index}
                        >
                            <div className="flex items-start">
                                <span className="mr-2 text-lg">🚶‍♂️</span>
                                <div className="text-sm text-gray-700 mt-0.5">{item}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Local transport options ── */}
            {/* FIX: API returns plain strings [], not objects with .mode/.eco_impact/.cost */}
            {tip.local_transport_options?.length > 0 && (
                <div className="mt-2">
                    <p className="text-xs font-semibold text-blue-700 uppercase mb-2">
                        🚌 Transport local
                    </p>
                    {tip.local_transport_options.map((item: string, index: number) => (
                        <div
                            key={index}
                            className="flex items-center bg-white border border-gray-200 raduis p-3 mb-2"
                        >
                            <span className="mr-3 text-lg">🚆</span>
                            <div className="text-sm text-gray-700">{item}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Fallback if both arrays are empty */}
            {tip.ecofriendly_tips?.length === 0 && tip.local_transport_options?.length === 0 && (
                <p className="text-sm text-gray-400">Aucune astuce disponible pour ce voyage.</p>
            )}

        </div>
    );
}