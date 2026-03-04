import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import heart from "/images/heart.svg";
import photo from "/images/photo.jpg";
import photo2 from "/images/photo-2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faBuilding, faCalendar, faCamera, faClock, faCloudSun, faLeaf, faLightbulb, faMap, faPen, faStar, faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useUser } from "@/context/userContext";
import axiosInstance from "@/api/config";
import { calculateDurationDays, capitalizeWords, formatDateRange, getDate } from "@/assets/helpers";
import Map from "@/components/navbar/map";
import Suggestions from "./suggestions";
import Slider from "./slider";
import Button from "./button";

interface Trip {
    id: number,
    name: string,
    type: string,
    country: string,
    destination: string,
    budget: string,
    start_date: Date,
    end_date: Date,
    adult: number,
    transportation: string,
    carbon_emission: number,
    children: number
}

interface Schedule {
    morning: any;
    afternoon: any;
    evening: any;
}

interface Day {
    day: number;
    date: string;
    schedule: Schedule;
}

// FIX: itinerary is a flat Day[] array, NOT { days: Day[] }
interface Program {
    id: number;
    days: number;
    accommodation: any;
    itinerary: Day[];
    // New fields saved from enhanced API response
    transport_details: any;
    activities: any[];
    price_breakdown: any;
    trip_id: number;
}

interface Tip {
    id: number;
    ecofriendly_tips: string[];
    local_transport_options: string[];
    trip_id: number;
}

interface Food {
    id: number;
    items: [];
    name: string;
    slug: string;
}

export default function Details() {
    const navigate = useNavigate();
    const { auth, loading, sidebarOpen, setSidebarOpen } = useUser();
    const { id } = useParams();
    const [trip, setTrip] = useState<Trip | null>(null);
    const [program, setProgram] = useState<Program | null>(null);
    const [tip, setTip] = useState<Tip | null>(null);
    const [food, setFood] = useState<Food[]>([]);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);

    useEffect(() => {
        if (!loading && !auth) {
            navigate("/");
        }
    }, [auth, loading, navigate]);

    useEffect(() => {
        const getTrip = async () => {
            if (!id) return;
            const response = await axiosInstance.post("trips/first", { id });
            if (response.status === 200) {
                setTrip(response.data.trip);
            }
        }
        getTrip();
    }, [id]);

    const slides = [
        { image: photo, text_1: "Vieux Lyon", text_2: "Découverte des traboules historiques" },
        { image: photo2, text_1: "Balade à Vélo", text_2: "Le long du Rhône au coucher du soleil" }
    ];

    useEffect(() => {
        const getProgram = async () => {
            if (!id) return;
            const response = await axiosInstance.post('program/get', { id });
            if (response.status === 200) {
                setProgram(response.data.program);
            }
        }
        getProgram();
    }, [id]);

    useEffect(() => {
        const getFood = async () => {
            const response = await axiosInstance.get("adems/alimentation", {
                params: { category: "group", language: "fr" }
            });
            console.log(response.data);
        };
        getFood();
    }, []);

    useEffect(() => {
        const getTip = async () => {
            if (!id) return;
            const response = await axiosInstance.post("tip/get", { id });
            if (response.status === 200) {
                setTip(response.data.tip);
            }
        }
        getTip();
    }, [id]);

    return (
        <div>
            <div className='flex relative'>
                {trip &&
                    <div className='bg-main rounded-r-lg w-full lg:px-20 px-5'>

                        {/* ── Trip Title ── */}
                        <h2 className="text-2xl sm:text-2xl lg:text-4xl text-center mt-3 font-semibold">
                            <span className="text-blue-950">
                                {capitalizeWords(trip.name)}
                            </span>
                        </h2>
                        <h2 className="text-base sm:text-lg lg:text-xl text-center mt-3 font-semibold">
                            <div className="text-gray-500 flex place-content-center items-center">
                                <div>{capitalizeWords(trip.destination)}</div>
                                <div className="w-1 h-1 bg-gray-500 rounded-full mx-2 font-bold mt-1"></div>
                                <div>{formatDateRange(trip.start_date, trip.end_date)}</div>
                            </div>
                        </h2>

                        {/* ── Stats Bar ── */}
                        <div className="my-5 border border-gray-300 bg-white raduis p-4">
                            <div className="flex items-center justify-around">
                                <div className="text-center">
                                    <div className="text-blue-950 font-bold text-lg lg:text-2xl">
                                        {calculateDurationDays(trip.start_date, trip.end_date)}
                                    </div>
                                    <div className="text-gray-500 text-sm mt-1">Jours</div>
                                </div>
                                <div className="text-center">
                                    {/* FIX: was hardcoded 245 kg — now uses real carbon_emission from API */}
                                    <div className="text-green-600 font-bold text-lg lg:text-2xl">
                                        {trip.carbon_emission ?? 0} kg
                                    </div>
                                    <div className="text-gray-500 text-sm mt-1">CO₂ émis</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-blue-950 font-bold text-lg lg:text-2xl">{trip.budget} €</div>
                                    <div className="text-gray-500 text-sm mt-1">Budget total</div>
                                </div>
                            </div>
                        </div>

                        {/* ── Day Selector ── */}
                        <div className="my-5 grid gap-4 grid-cols-4 md:grid-cols-6">
                            {/* FIX: program.itinerary is a flat array, not { days: [] } */}
                            {program?.itinerary?.map((day: Day, index: number) => (
                                <div
                                    className={`py-2 border rounded-2xl font-semibold text-sm link-hover cursor-pointer w-20 lg:w-28 text-center mr-2 ${index === selectedDayIndex ? 'bg-blue-950 text-white' : 'text-blue-950'}`}
                                    key={index}
                                    onClick={() => setSelectedDayIndex(index)}
                                >
                                    <FontAwesomeIcon icon={faCalendar} /> <span className="ms-2">{`Jour ${index + 1}`}</span>
                                </div>
                            ))}
                        </div>

                        {/* ── Main Content Grid ── */}
                        <div className="mx-auto my-5">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                                {/* ── Left Column ── */}
                                <div className="col-span-1 md:col-span-7">

                                    {/* Date & Weather */}
                                    <div className="border border-gray-300 bg-white raduis p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-blue-950 font-semibold">{getDate(trip.start_date, selectedDayIndex)}</div>
                                            <div className="text-blue-950 font-semibold">
                                                <FontAwesomeIcon icon={faCloudSun} className="text-2xl" /> 15
                                            </div>
                                        </div>
                                    </div>

                                    {/* Transport — uses program.transport_details saved from new API */}
                                    <div className="border border-gray-300 bg-white raduis p-4 mt-5">
                                        <div className="text-blue-950 font-semibold">
                                            <FontAwesomeIcon icon={faTrainSubway} />
                                            <span className="ms-2">Transport</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <span className="text-blue-950 font-semibold">
                                                    {trip.transportation === "car" ? "Voiture" : trip.transportation === "train" ? "Train" : "Avion"}
                                                </span>
                                                <span className="ms-2 text-blue-950 font-semibold">
                                                    {capitalizeWords(trip.destination)}
                                                </span>
                                                {/* Provider name e.g. OUIGO */}
                                                {program?.transport_details?.provider && (
                                                    <span className="ms-2 text-gray-400 text-sm">
                                                        ({program.transport_details.provider})
                                                    </span>
                                                )}
                                                {/* Duration from transport_details */}
                                                <div className="text-gray-500 text-sm mt-1">
                                                    {program?.transport_details?.details?.duration ?? "N/A"}
                                                </div>
                                                {/* Booking URL */}
                                                {program?.transport_details?.booking?.booking_url && (
                                                    <a
                                                        href={program.transport_details.booking.booking_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-blue-600 text-xs underline mt-1 block"
                                                    >
                                                        Réserver le billet
                                                    </a>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                {/* Carbon footprint */}
                                                <div className="text-blue-950 font-semibold text-trip-color">
                                                    -{program?.transport_details?.eco_impact?.carbon_footprint_kg ?? trip.carbon_emission ?? 0} kg
                                                </div>
                                                {/* Price */}
                                                <div className="text-blue-950">
                                                    {program?.transport_details?.pricing?.price_per_person
                                                        ? `${program.transport_details.pricing.price_per_person}€`
                                                        : "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hébergement — new API returns full hotel data */}
                                    <div className="border border-gray-300 bg-white raduis p-4 mt-5">
                                        <div className="text-blue-950 font-semibold mb-2">
                                            <FontAwesomeIcon icon={faBuilding} />
                                            <span className="ms-2">Hébergement</span>
                                        </div>

                                        {program?.accommodation?.name ? (
                                            /* ── New API: real hotel data available ── */
                                            <>
                                                <span className="text-blue-950 font-semibold">
                                                    {program.accommodation.name}
                                                </span>
                                                <span className="ms-2 text-gray-500 text-sm">
                                                    {capitalizeWords(trip.destination)}
                                                </span>
                                                <div className="flex items-center justify-between mt-3 mb-2">
                                                    <div>
                                                        {/* Room type */}
                                                        {program.accommodation.details?.room_type && (
                                                            <div className="text-gray-500 text-sm mb-1">
                                                                {program.accommodation.details.room_type}
                                                            </div>
                                                        )}
                                                        <div className="text-sm flex items-center mt-1 flex-wrap gap-2">
                                                            {/* Rating — only show if > 0 */}
                                                            {program.accommodation.reviews?.rating > 0 && (
                                                                <span className="flex items-center">
                                                                    <FontAwesomeIcon icon={faStar} color={"#FFCD4F"} />
                                                                    <span className="ms-1 text-blue-950">
                                                                        {program.accommodation.reviews.rating}
                                                                    </span>
                                                                </span>
                                                            )}
                                                            {/* Eco certifications */}
                                                            {program.accommodation.eco_certifications?.length > 0
                                                                ? program.accommodation.eco_certifications.map((cert: string, i: number) => (
                                                                    <div key={i} className="bg-trip text-trip-color text-xs font-semibold rounded-xl py-1 px-3">
                                                                        <FontAwesomeIcon icon={faLeaf} /> {cert}
                                                                    </div>
                                                                ))
                                                                : (
                                                                    <div className="bg-trip text-trip-color text-xs font-semibold rounded-xl py-1 px-3">
                                                                        <FontAwesomeIcon icon={faLeaf} /> Eco
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                        {/* Amenities */}
                                                        {program.accommodation.details?.amenities?.length > 0 && (
                                                            <div className="text-gray-400 text-xs mt-2">
                                                                {program.accommodation.details.amenities.slice(0, 3).join(" · ")}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="mt-2 text-right">
                                                        {/* Price per night */}
                                                        <div className="text-blue-950 font-semibold">
                                                            {program.accommodation.pricing?.price_per_night
                                                                ? `${program.accommodation.pricing.price_per_night}€/nuit`
                                                                : "Prix non disponible"}
                                                        </div>
                                                        {/* Cancellation policy */}
                                                        {program.accommodation.pricing?.cancellation_policy && (
                                                            <div className="text-green-600 text-xs mt-1">
                                                                {program.accommodation.pricing.cancellation_policy}
                                                            </div>
                                                        )}
                                                        {/* Booking button */}
                                                        {program.accommodation.booking?.booking_url ? (
                                                            <a
                                                                href={program.accommodation.booking.booking_url}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="py-2 border rounded-2xl font-semibold text-sm link-hover cursor-pointer w-28 text-center block mt-2 text-blue-950"
                                                            >
                                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                <span className="ms-2">Réserver</span>
                                                            </a>
                                                        ) : (
                                                            <div className="py-2 border rounded-2xl font-semibold text-sm link-hover cursor-pointer w-28 text-center mt-2 text-blue-950">
                                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                <span className="ms-2">Réserver</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            /* ── Fallback: no hotel selected yet ── */
                                            <>
                                                <span className="text-blue-950 font-semibold">À sélectionner</span>
                                                <span className="ms-2 text-blue-950 font-semibold">{capitalizeWords(trip.destination)}</span>
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        {program?.accommodation?.suggestions ? (
                                                            <div className="text-gray-500 text-sm">
                                                                {program.accommodation.suggestions.join(", ")}
                                                            </div>
                                                        ) : (
                                                            <div className="text-gray-500 text-sm">
                                                                {program?.accommodation?.message ?? ""}
                                                            </div>
                                                        )}
                                                        <div className="bg-trip text-trip-color text-xs font-semibold rounded-xl py-1 px-3 mt-2 w-fit">
                                                            <FontAwesomeIcon icon={faLeaf} /> Eco
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="text-blue-950 text-center font-semibold">Prix non disponible</div>
                                                        <div className="py-2 border rounded-2xl font-semibold text-sm link-hover cursor-pointer w-28 text-center me-2 text-blue-950 mt-1">
                                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                            <span className="ms-2">Réserver</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Activités du jour */}
                                    <h2 className="text-blue-950 text-lg font-bold my-5">Activités du jour</h2>
                                    {/* FIX: program.itinerary is a flat array — use [selectedDayIndex] directly */}
                                    {program?.itinerary?.[selectedDayIndex] &&
                                        ['morning', 'afternoon', 'evening'].map((period) => {
                                            const slot = program.itinerary[selectedDayIndex]?.schedule?.[period];
                                            if (!slot) return null; // FIX: guard missing periods
                                            return (
                                                <div key={period} className="border border-gray-300 bg-white raduis p-4 mt-5">
                                                    <div className="text-gray-500 w-24 mb-3 ml-3">
                                                        <FontAwesomeIcon icon={faClock} />
                                                        <span className="ml-1">{period.charAt(0).toUpperCase() + period.slice(1)}</span>
                                                    </div>
                                                    <div className="flex mb-4 text-sm">
                                                        <div className="ml-3 flex-1 w-100">
                                                            <div className="flex items-start justify-between w-full">
                                                                <div className="flex items-start mb-2">
                                                                    <FontAwesomeIcon icon={faCamera} className="text-blue-950 me-2 text-sm mt-1" />
                                                                    <div>
                                                                        {/* Generic activity label e.g. "Dinner", "Morning activity" */}
                                                                        <h2 className="text-blue-950 font-bold">{slot.activity ?? "Activité"}</h2>
                                                                        {/* Specific place name e.g. "Glen Lyon Restaurant & Pub", "Vieux Lyon" */}
                                                                        {slot.booking?.name && (
                                                                            <div className="text-gray-500 text-xs mt-0.5">
                                                                                📍 {slot.booking.name}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-start text-blue-950 text-sm">
                                                                    <div className="cursor-pointer py-1 px-3 rounded-full link-hover">
                                                                        <FontAwesomeIcon icon={faPen} />
                                                                    </div>
                                                                    {/* 
                                                                        Booking link — 3 possible locations depending on booking type:
                                                                        - attractions: slot.booking.booking.booking_url
                                                                        - restaurants: slot.booking.reservation.reservation_url
                                                                        - transport:   slot.booking.booking.booking_url
                                                                    */}
                                                                    {(slot.booking?.booking?.booking_url || slot.booking?.reservation?.reservation_url) && (
                                                                        <a
                                                                            href={slot.booking?.booking?.booking_url || slot.booking?.reservation?.reservation_url}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            className="ms-3 cursor-pointer link-hover py-1 px-3 rounded-full"
                                                                        >
                                                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Description / eco tip / extra info */}
                                                            <div className="text-sm text-gray-500">
                                                                {slot.booking?.details?.description
                                                                    || slot.eco_tip
                                                                    || slot.additional
                                                                    || slot.suggestion
                                                                    || slot.note
                                                                    || ""}
                                                            </div>

                                                            {/* Cuisine type for restaurants */}
                                                            {slot.booking?.details?.cuisine?.length > 0 && (
                                                                <div className="text-xs text-gray-400 mt-1">
                                                                    🍽 {slot.booking.details.cuisine.join(", ")}
                                                                </div>
                                                            )}

                                                            {/* Dietary options for restaurants */}
                                                            {slot.booking?.details?.dietary_options?.length > 0 && (
                                                                <div className="text-xs text-gray-400 mt-0.5">
                                                                    {slot.booking.details.dietary_options.join(" · ")}
                                                                </div>
                                                            )}

                                                            <div className="flex items-center mt-2 flex-wrap gap-x-4">
                                                                {/* Duration (attractions) or time slot */}
                                                                <div className="text-xs text-blue-950">
                                                                    {slot.booking?.details?.duration || slot.time || ""}
                                                                </div>
                                                                {/* Carbon footprint (transport) */}
                                                                {slot.booking?.eco_impact?.carbon_footprint_kg && (
                                                                    <div className="text-xs text-green-600">
                                                                        {slot.booking.eco_impact.carbon_footprint_kg} kg CO₂
                                                                    </div>
                                                                )}
                                                                {/* 
                                                                    Price — 3 possible fields:
                                                                    - transport/attractions: pricing.price_per_person
                                                                    - restaurants: pricing.avg_meal_cost
                                                                */}
                                                                <div className="text-xs text-green-950 font-semibold">
                                                                    {slot.booking?.pricing?.price_per_person
                                                                        ? `${slot.booking.pricing.price_per_person}€`
                                                                        : slot.booking?.pricing?.avg_meal_cost
                                                                            ? `~${slot.booking.pricing.avg_meal_cost}€/pers`
                                                                            : "Gratuit"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }

                                    {/* Map — passes real destination + current day's activity names */}
                                    <div className="border border-gray-300 bg-white raduis p-4 mt-5">
                                        <div className="flex items-center mb-4">
                                            <FontAwesomeIcon icon={faMap} className="text-green-600" />
                                            <span className="ms-2 font-semibold text-blue-950">Points d'Intérêt</span>
                                        </div>
                                        <div>
                                            <Map
                                                destination={trip.destination}
                                                activityLocations={
                                                    program?.itinerary?.[selectedDayIndex]
                                                        ? ['morning', 'afternoon', 'evening']
                                                            .map(p => program.itinerary[selectedDayIndex]?.schedule?.[p])
                                                            .filter(Boolean)
                                                            .map(slot => ({ name: slot.activity ?? slot.booking?.name ?? "" }))
                                                            .filter(a => a.name)
                                                        : []
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* ── Right Column ── */}
                                <div className="col-span-1 md:col-span-5">

                                    {/* Inspirations Voyage */}
                                    <div className="border border-gray-300 bg-white raduis p-4">
                                        <div className="flex items-center mb-4">
                                            <img src={heart} alt="heart" />
                                            <div className="text-blue-950 font-semibold ms-2">Inspirations Voyage</div>
                                        </div>
                                        <Slider slides={slides} />
                                    </div>

                                    {/* Astuces Locales */}
                                    <div className="border border-gray-300 bg-white raduis p-4 mt-5">
                                        <div className="flex items-center mb-4">
                                            <FontAwesomeIcon icon={faLightbulb} className="text-yellow-300" />
                                            <div className="text-blue-950 font-semibold ms-2">Astuces Locales</div>
                                        </div>
                                        <Suggestions tip={tip} />
                                    </div>

                                    {/* Actions */}
                                    <div className="border border-gray-300 bg-white raduis p-4 mt-5">
                                        <div className="mb-4">
                                            <div className="text-blue-950 font-semibold ms-2">Actions</div>
                                        </div>
                                        <div className={`py-2 border rounded-2xl font-semibold text-sm link-hover cursor-pointer w-full text-center me-2 text-blue-950 mt-2`}>
                                            <FontAwesomeIcon icon={faPen} /> <span className="ms-2">Modifier le voyage</span>
                                        </div>
                                        <div className={`py-2 border rounded-2xl font-semibold text-sm link-hover cursor-pointer w-full text-center me-2 text-blue-950 mt-2`}>
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> <span className="ms-2">Partager l'itinéraire</span>
                                        </div>
                                        <div className={`py-2 border rounded-2xl font-semibold text-sm cursor-pointer w-full text-center me-2 text-white bg-blue-950 mt-2 hover:opacity-80`}>
                                            <FontAwesomeIcon icon={faStar} color={"#fff"} /> <span className="ms-2">Ajouter aux favoris</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <Button trip={trip.destination} />
                    </div>
                }
            </div>
        </div>
    )
}