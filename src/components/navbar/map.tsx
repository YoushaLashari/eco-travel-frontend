import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";
import { google_key } from "@/assets/helpers";

interface Location {
    id: number;
    lat: number;
    lng: number;
    name: string;
}

interface MapProps {
    // destination city name passed from details.tsx e.g. "lyon"
    destination?: string;
    // optional: activity locations extracted from the itinerary day
    activityLocations?: { name: string }[];
}

// Fallback center (Paris) — shown briefly while geocoding
const FALLBACK_CENTER = { lat: 48.8566, lng: 2.3522 };

export default function Map({ destination, activityLocations }: MapProps) {
    const [center, setCenter] = useState(FALLBACK_CENTER);
    const [locations, setLocations] = useState<Location[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [geocodeReady, setGeocodeReady] = useState(false);

    // ── Responsive layout ──
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ── Geocode destination city → lat/lng using Google Geocoding API ──
    useEffect(() => {
        if (!destination) return;

        const geocode = async () => {
            try {
                const query = encodeURIComponent(destination);
                const apiKey = google_key();
                const res = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${apiKey}`
                );
                const data = await res.json();

                if (data.status === "OK" && data.results.length > 0) {
                    const { lat, lng } = data.results[0].geometry.location;
                    const newCenter = { lat, lng };
                    setCenter(newCenter);

                    // Build marker list from activity names + slight offsets so they don't stack
                    const baseLocations: Location[] = [];

                    if (activityLocations && activityLocations.length > 0) {
                        // Use real activity names from itinerary with small random offsets
                        activityLocations.forEach((act, index) => {
                            baseLocations.push({
                                id: index + 1,
                                lat: lat + (index * 0.003) - 0.003,
                                lng: lng + (index * 0.002) - 0.002,
                                name: act.name,
                            });
                        });
                    } else {
                        // Fallback: just show the destination city center as one pin
                        baseLocations.push({
                            id: 1,
                            lat,
                            lng,
                            name: destination.charAt(0).toUpperCase() + destination.slice(1),
                        });
                    }

                    setLocations(baseLocations);
                    setGeocodeReady(true);
                } else {
                    console.warn("Geocoding failed:", data.status);
                    setGeocodeReady(true); // still show map at fallback
                }
            } catch (err) {
                console.error("Geocoding error:", err);
                setGeocodeReady(true);
            }
        };

        geocode();
    }, [destination]);

    const isMobile = windowWidth < 768;

    const containerStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        width: "100%",
        height: isMobile ? "auto" : "500px",
    };

    const sidebarStyle: React.CSSProperties = {
        width: isMobile ? "100%" : "25%",
        height: isMobile ? "auto" : "500px",
        overflowY: "auto",
        padding: "10px",
        borderRight: isMobile ? "none" : "1px solid #ccc",
        background: "#f9f9f9",
    };

    const mapContainerStyle: React.CSSProperties = {
        width: isMobile ? "100%" : "75%",
        height: "500px",
    };

    return (
        <LoadScript googleMapsApiKey={google_key()}>
            <div style={containerStyle}>

                {/* ── Sidebar: location list ── */}
                <div style={sidebarStyle}>
                    {locations.length === 0 ? (
                        <p style={{ fontSize: "13px", color: "#888", padding: "10px" }}>
                            Chargement des lieux...
                        </p>
                    ) : (
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {locations.map((location) => (
                                <li
                                    key={location.id}
                                    style={{
                                        padding: "10px",
                                        cursor: "pointer",
                                        background: selectedLocation?.id === location.id ? "#ddd" : "#fff",
                                        marginBottom: "5px",
                                        borderRadius: "5px",
                                        fontSize: "14px",
                                    }}
                                    onClick={() => setSelectedLocation(location)}
                                >
                                    📍 {location.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* ── Google Map ── */}
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={
                        selectedLocation
                            ? { lat: selectedLocation.lat, lng: selectedLocation.lng }
                            : center
                    }
                    zoom={13}
                    options={{
                        mapTypeControl: false,
                        zoomControl: false,
                        rotateControl: false,
                        streetViewControl: false,
                        fullscreenControl: false,
                    }}
                >
                    {locations.map((location) => (
                        <Marker
                            key={location.id}
                            position={{ lat: location.lat, lng: location.lng }}
                            title={location.name}
                            label={{
                                text: location.name,
                                color: "black",
                                fontSize: "12px",
                                fontWeight: "bold",
                            }}
                            onClick={() => setSelectedLocation(location)}
                        />
                    ))}

                    {selectedLocation && (
                        <InfoWindow
                            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                            onCloseClick={() => setSelectedLocation(null)}
                        >
                            <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                                📍 {selectedLocation.name}
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>

            </div>
        </LoadScript>
    );
}