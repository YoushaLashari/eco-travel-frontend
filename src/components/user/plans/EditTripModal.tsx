// src/components/user/plans/EditTripModal.tsx
// Drop this file in: src/components/user/plans/

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faHotel, faStar, faUtensils, faMapMarkerAlt, faPen } from "@fortawesome/free-solid-svg-icons";

interface EditTripModalProps {
    program: any;
    onClose: () => void;
    onSave: (updatedProgram: any) => void;
}

export default function EditTripModal({ program, onClose, onSave }: EditTripModalProps) {
    const [activeTab, setActiveTab] = useState<"hotel" | "activities" | "restaurants">("hotel");
    const [editedProgram, setEditedProgram] = useState<any>(JSON.parse(JSON.stringify(program)));

    const handleHotelChange = (field: string, value: string) => {
        setEditedProgram((prev: any) => ({
            ...prev,
            accommodation: {
                ...prev.accommodation,
                [field]: value,
            }
        }));
    };

    const handleActivityChange = (index: number, field: string, value: string) => {
        const updated = [...(editedProgram.activities || [])];
        updated[index] = { ...updated[index], [field]: value };
        setEditedProgram((prev: any) => ({ ...prev, activities: updated }));
    };

    const handleDiningChange = (dayIndex: number, period: string, field: string, value: string) => {
        const updated = JSON.parse(JSON.stringify(editedProgram));
        if (updated.itinerary?.[dayIndex]?.schedule?.[period]?.booking) {
            updated.itinerary[dayIndex].schedule[period].booking[field] = value;
        }
        setEditedProgram(updated);
    };

    // Collect all restaurant slots from itinerary
    const restaurantSlots: { dayIndex: number; period: string; slot: any }[] = [];
    editedProgram.itinerary?.forEach((day: any, dayIndex: number) => {
        ['morning', 'afternoon', 'evening'].forEach(period => {
            const slot = day?.schedule?.[period];
            if (slot?.booking?.type === 'restaurant') {
                restaurantSlots.push({ dayIndex, period, slot });
            }
        });
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
                
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faPen} className="text-orange-500" />
                        <h2 className="text-blue-950 font-bold text-lg">Modifier le voyage</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <FontAwesomeIcon icon={faXmark} className="text-xl" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b">
                    {[
                        { key: "hotel", label: "🏨 Hébergement" },
                        { key: "activities", label: "🎯 Activités" },
                        { key: "restaurants", label: "🍽 Restaurants" },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`flex-1 py-3 text-sm font-semibold transition ${
                                activeTab === tab.key
                                    ? "border-b-2 border-orange-500 text-orange-500"
                                    : "text-gray-500 hover:text-blue-950"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-5">

                    {/* Hotel Tab */}
                    {activeTab === "hotel" && (
                        <div className="space-y-4">
                            <p className="text-gray-500 text-sm mb-4">Modifiez les informations de votre hébergement</p>
                            
                            <div>
                                <label className="text-blue-950 font-semibold text-sm block mb-1">Nom de l'hôtel</label>
                                <input
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-blue-950 text-sm focus:outline-none focus:border-orange-400"
                                    value={editedProgram.accommodation?.name || ""}
                                    onChange={e => handleHotelChange("name", e.target.value)}
                                    placeholder="Nom de l'hôtel"
                                />
                            </div>

                            <div>
                                <label className="text-blue-950 font-semibold text-sm block mb-1">Type de chambre</label>
                                <input
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-blue-950 text-sm focus:outline-none focus:border-orange-400"
                                    value={editedProgram.accommodation?.details?.room_type || ""}
                                    onChange={e => {
                                        setEditedProgram((prev: any) => ({
                                            ...prev,
                                            accommodation: {
                                                ...prev.accommodation,
                                                details: {
                                                    ...prev.accommodation?.details,
                                                    room_type: e.target.value
                                                }
                                            }
                                        }));
                                    }}
                                    placeholder="Standard Double Room"
                                />
                            </div>

                            <div>
                                <label className="text-blue-950 font-semibold text-sm block mb-1">Prix par nuit (€)</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-blue-950 text-sm focus:outline-none focus:border-orange-400"
                                    value={editedProgram.accommodation?.pricing?.price_per_night || ""}
                                    onChange={e => {
                                        setEditedProgram((prev: any) => ({
                                            ...prev,
                                            accommodation: {
                                                ...prev.accommodation,
                                                pricing: {
                                                    ...prev.accommodation?.pricing,
                                                    price_per_night: e.target.value
                                                }
                                            }
                                        }));
                                    }}
                                    placeholder="120"
                                />
                            </div>

                            <div>
                                <label className="text-blue-950 font-semibold text-sm block mb-1">Lien de réservation</label>
                                <input
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-blue-950 text-sm focus:outline-none focus:border-orange-400"
                                    value={editedProgram.accommodation?.booking?.booking_url || ""}
                                    onChange={e => {
                                        setEditedProgram((prev: any) => ({
                                            ...prev,
                                            accommodation: {
                                                ...prev.accommodation,
                                                booking: {
                                                    ...prev.accommodation?.booking,
                                                    booking_url: e.target.value
                                                }
                                            }
                                        }));
                                    }}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Activities Tab */}
                    {activeTab === "activities" && (
                        <div className="space-y-5">
                            <p className="text-gray-500 text-sm mb-4">Modifiez les activités de votre voyage</p>
                            {editedProgram.activities?.length > 0 ? (
                                editedProgram.activities.map((activity: any, index: number) => (
                                    <div key={index} className="border border-gray-100 rounded-xl p-4">
                                        <div className="text-blue-950 font-semibold text-sm mb-3">
                                            🎯 Activité {index + 1}
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-gray-500 text-xs block mb-1">Nom</label>
                                                <input
                                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-blue-950 text-sm focus:outline-none focus:border-orange-400"
                                                    value={activity.name || ""}
                                                    onChange={e => handleActivityChange(index, "name", e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-500 text-xs block mb-1">Lien de réservation</label>
                                                <input
                                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-blue-950 text-sm focus:outline-none focus:border-orange-400"
                                                    value={activity.booking?.booking_url || ""}
                                                    onChange={e => {
                                                        const updated = [...(editedProgram.activities || [])];
                                                        updated[index] = {
                                                            ...updated[index],
                                                            booking: { ...updated[index].booking, booking_url: e.target.value }
                                                        };
                                                        setEditedProgram((prev: any) => ({ ...prev, activities: updated }));
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-500 text-xs block mb-1">Prix par personne (€)</label>
                                                <input
                                                    type="number"
                                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-blue-950 text-sm focus:outline-none focus:border-orange-400"
                                                    value={activity.pricing?.price_per_person || ""}
                                                    onChange={e => {
                                                        const updated = [...(editedProgram.activities || [])];
                                                        updated[index] = {
                                                            ...updated[index],
                                                            pricing: { ...updated[index].pricing, price_per_person: e.target.value }
                                                        };
                                                        setEditedProgram((prev: any) => ({ ...prev, activities: updated }));
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm text-center py-8">Aucune activité disponible</p>
                            )}
                        </div>
                    )}

                    {/* Restaurants Tab */}
                    {activeTab === "restaurants" && (
                        <div className="space-y-5">
                            <p className="text-gray-500 text-sm mb-4">Modifiez les restaurants de votre voyage</p>
                            {restaurantSlots.length > 0 ? (
                                restaurantSlots.map(({ dayIndex, period, slot }, index) => (
                                    <div key={index} className="border border-gray-100 rounded-xl p-4">
                                        <div className="text-blue-950 font-semibold text-sm mb-3">
                                            🍽 Jour {dayIndex + 1} — {period === "evening" ? "Soir" : period === "afternoon" ? "Après-midi" : "Matin"}
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-gray-500 text-xs block mb-1">Nom du restaurant</label>
                                                <input
                                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-blue-950 text-sm focus:outline-none focus:border-orange-400"
                                                    value={slot.booking?.name || ""}
                                                    onChange={e => handleDiningChange(dayIndex, period, "name", e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-500 text-xs block mb-1">Lien de réservation</label>
                                                <input
                                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-blue-950 text-sm focus:outline-none focus:border-orange-400"
                                                    value={slot.booking?.reservation?.reservation_url || ""}
                                                    onChange={e => {
                                                        const updated = JSON.parse(JSON.stringify(editedProgram));
                                                        if (updated.itinerary?.[dayIndex]?.schedule?.[period]?.booking?.reservation) {
                                                            updated.itinerary[dayIndex].schedule[period].booking.reservation.reservation_url = e.target.value;
                                                        }
                                                        setEditedProgram(updated);
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-500 text-xs block mb-1">Prix moyen par personne (€)</label>
                                                <input
                                                    type="number"
                                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-blue-950 text-sm focus:outline-none focus:border-orange-400"
                                                    value={slot.booking?.pricing?.avg_meal_cost || ""}
                                                    onChange={e => {
                                                        const updated = JSON.parse(JSON.stringify(editedProgram));
                                                        if (updated.itinerary?.[dayIndex]?.schedule?.[period]?.booking?.pricing) {
                                                            updated.itinerary[dayIndex].schedule[period].booking.pricing.avg_meal_cost = e.target.value;
                                                        }
                                                        setEditedProgram(updated);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm text-center py-8">Aucun restaurant disponible</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-5 border-t">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-500 font-semibold text-sm hover:bg-gray-50 transition"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={() => { onSave(editedProgram); onClose(); }}
                        className="flex-1 py-3 bg-orange-500 rounded-xl text-white font-semibold text-sm hover:bg-orange-600 transition"
                    >
                        Enregistrer les modifications
                    </button>
                </div>
            </div>
        </div>
    );
}