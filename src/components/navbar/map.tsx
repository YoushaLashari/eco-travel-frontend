import { google_key } from "@/assets/helpers";
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";

interface Location {
    id: number;
    lat: number;
    lng: number;
    name: string;
}

const center = {
    lat: -8.5197096,
    lng: 115.2606299,
};

const locations: Location[] = [
    { id: 1, lat: -8.5197096, lng: 115.2606299, name: "Fôret des singes" },
    { id: 2, lat: -8.52511923611096, lng: 115.25705392001352, name: "Warung Rama" },
    { id: 3, lat: -8.428108118952041, lng: 115.27973412799288, name: "Les rizières de Tegalalang" },
];

export default function Map() {
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowWidth < 768; // breakpoint for responsiveness

    const containerStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: isMobile ? "column" : "row", // stack on mobile, row on desktop
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
            {/* Sidebar */}
            <div style={sidebarStyle}>
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
                            }}
                            onClick={() => setSelectedLocation(location)}
                        >
                            {location.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Map */}
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={selectedLocation ? { lat: selectedLocation.lat, lng: selectedLocation.lng } : center}
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
                            fontSize: "14px",
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
                        <div>{selectedLocation.name}</div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    </LoadScript>
  );
}
