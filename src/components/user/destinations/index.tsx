import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Compass } from "lucide-react";

declare global {
    interface Window {
        GetYourGuideWidget: any;
    }
}

export default function Destinations() {
    useEffect(() => {
        // Load GetYourGuide widget script
        const script = document.createElement('script');
        script.src = 'https://widget.getyourguide.com/dist/pa.umd.production.min.js';
        script.async = true;
        document.head.appendChild(script);

        return () => {
            // Cleanup script on unmount
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    const destinations = [
        {
            id: 1,
            name: "France",
            description: "Découvrez la richesse du patrimoine français, de Paris aux régions",
            locationId: "169008",
            ecoTip: "Privilégiez les trains régionaux et les vélos pour vos déplacements locaux",
            trainInfo: "Point de départ de votre aventure ferroviaire"
        },
        {
            id: 2,
            name: "Finlande",
            description: "Explorez les merveilles nordiques, aurores boréales et nature préservée",
            locationId: "169007",
            ecoTip: "Profitez des saunas traditionnels et respectez la nature fragile du Nord",
            trainInfo: "Accessible via train + ferry depuis l'Allemagne"
        },
        {
            id: 3,
            name: "Espagne",
            description: "Découvrez la culture ibérique, de Madrid à Barcelone",
            locationId: "169003",
            ecoTip: "Utilisez les trains AVE pour des trajets rapides et écologiques",
            trainInfo: "Direct en TGV depuis Paris en 6h30"
        },
        {
            id: 4,
            name: "Maroc",
            description: "Explorez le royaume aux mille couleurs via l'Espagne",
            locationId: "169143",
            ecoTip: "Choisissez des riads locaux et respectez les traditions locales",
            trainInfo: "Train jusqu'en Espagne + ferry vers Tanger"
        },
        {
            id: 5,
            name: "Irlande",
            description: "Découvrez l'île d'émeraude et ses paysages à couper le souffle",
            locationId: "169016",
            ecoTip: "Louez un vélo pour explorer les côtes irlandaises de manière authentique",
            trainInfo: "Train via Londres + ferry depuis Holyhead"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-subtle p-5">
            {/* Header */}
            <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg bg-gradient-to-r from-gray-900 to-orange-600">
                                T
                            </div>
                            <span className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent">
                                Trekr
                            </span>
                        </Link>

                        <div className="flex items-center gap-2">
                            <Compass className="h-5 w-5 text-primary animate-pulse-slow" />
                            <span className="text-sm text-muted-foreground font-medium">Explorez Responsable</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-5" />
                <div className="container mx-auto px-4 relative">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6 animate-float bg-red-100">
                            <MapPin className="h-4 w-4 text-orange-600" />
                            🚆 <span className="text-orange-600">Voyage Responsable</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent">
                            Destinations accessibles en train depuis la France 🚆
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 animate-slide-up [animation-delay:200ms] leading-relaxed">
                            Partez à l'aventure sans quitter la terre ou presque 🚢! Découvrez des destinations accessibles en train depuis la France, pour un voyage plus responsable et immersif.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 animate-slide-up [animation-delay:400ms]">
                            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                                🚆 <span className="text-blue-950">Voyage en Train</span>
                            </div>
                            <div className="text-accent px-4 py-2 rounded-full text-sm font-medium bg-red-100">
                                🌱 <span className="text-orange-600">Zéro Émission</span>
                            </div>
                            <div className="text-secondary px-4 py-2 rounded-full text-sm font-medium bg-pink">
                                🚢 <span className="text-pink">Avec Ferry si nécessaire</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Destinations avec Widgets GetYourGuide */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-950">
                            Explorez les activités par pays
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Chaque destination est accessible en train depuis la France, pour une aventure plus durable et immersive.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
                        {destinations.map((destination, index) => (
                            <div
                                key={destination.id}
                                className="animate-scale-in"
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div
                                    data-gyg-href="https://widget.getyourguide.com/default/city.frame"
                                    data-gyg-location-id={destination.locationId}
                                    data-gyg-locale-code="fr-FR"
                                    data-gyg-widget="city"
                                    data-gyg-partner-id="UL7RSD6"
                                    className="min-h-[400px]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-orange-600" />
                <div className="container mx-auto px-4 text-center relative">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
                            Prêt pour Votre Prochaine Aventure ?
                        </h2>
                        <p className="text-xl opacity-90 mb-8 leading-relaxed animate-slide-up [animation-delay:200ms]">
                            Rejoignez la communauté Trekr et planifiez des voyages qui respectent notre planète tout en créant des souvenirs inoubliables.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up [animation-delay:400ms]">
                            <Link
                                to="/register"
                                className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-2xl font-semibold text-lg shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105"
                            >
                                Commencer Maintenant
                            </Link>
                            <Link
                                to="/comment-ca-marche"
                                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
                            >
                                Comment ça marche ?
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}