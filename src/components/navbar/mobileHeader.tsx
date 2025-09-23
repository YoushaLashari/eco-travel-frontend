import React from 'react';
import { useState, useEffect } from 'react';
import { Plane, Luggage, Compass, Camera, Map,Star,MapPin,Route,Calendar,Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import travelBg from '/images/travel.jpg';
import { capitalizeWords } from '@/assets/helpers';

interface MobileHeaderProps {
  userName?: string;
}

export default function MobileHeader({ userName = "Voyageur" }: MobileHeaderProps) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return "Bonjour";
        if (hour < 18) return "Bon après-midi";
        return "Bonsoir";
    };

    const travelQuotes = [
        "Chaque voyage commence par un rêve",
        "La vie est courte, voyage loin",
        "Collectionne des moments, pas des choses",
        "L'aventure t'attend au prochain tournant", 
        "Voyage léger, rêve grand",
        "Le monde est ton terrain de jeu",
        "Ose l'inconnu, découvre l'extraordinaire",
        "Ton passeport vers l'aventure"
    ];

    const [currentQuote] = useState(() => 
        travelQuotes[Math.floor(Math.random() * travelQuotes.length)]
    );

    return (
        <div className="relative overflow-hidden bg-gradient-primary rounded-b-3xl mb-10">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img 
                    src={travelBg} 
                    alt="Travel destination" 
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-orange-700/70" />
            </div>

            {/* Subtle Travel Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Plane className="absolute top-6 right-6 w-5 h-5 text-white/20 animate-pulse" />
                <Compass className="absolute bottom-8 left-6 w-4 h-4 text-white/15 animate-pulse delay-300" />
            </div>

            {/* Content */}
            <div className="relative z-10 px-6 py-6">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-8">
                    <div className="animate-slide-up">
                        <h1 className="text-white text-xl font-bold">
                            {getGreeting()} {capitalizeWords(userName)} !
                        </h1>
                        <p className="text-white/75 text-sm mt-1">
                            {currentTime.toLocaleDateString('fr-FR', { 
                                weekday: 'long', 
                                day: 'numeric', 
                            month: 'long' 
                            })}
                        </p>
                    </div>
          
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-white hover:bg-white/20 transition-colors"
                    >
                        <Bell className="w-5 h-5" />
                    </Button>
                </div>

                {/* Main Message */}
                <div className="text-center mb-8 animate-slide-up stagger-3">
                    <h2 className="text-3xl font-bold text-white mb-3 font-display leading-tight">
                        {currentQuote}
                    </h2>
                    <p className="text-white/85 text-base leading-relaxed max-w-sm mx-auto">
                        Prêt à vivre ta prochaine aventure ?
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 animate-slide-up stagger-4">
                    <Button 
                        className="flex-1 bg-white hover:bg-white/90 text-primary font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                        size="lg"
                    >
                        <Luggage className="w-5 h-5 mr-2" />
                        Nouveau voyage
                    </Button>
          
                    <Button 
                        variant="outline"
                        size="icon"
                        className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 transition-all duration-300"
                    >
                        <Compass className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-2 left-0 w-full h-4 bg-gradient-to-r from-secondary/20 via-accent/20 to-primary/20 blur-sm" />
        </div>
    );
}