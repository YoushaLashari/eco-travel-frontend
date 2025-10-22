import React from "react";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import TransportStep from "./transportStep";
import AccommodationStep from "./accomodationStep";
import FoodNetworkingStep from "./foodNetworkingStep";
import ResultsScreen from "./resultsScreen";

export interface TransportData {
    mode: string;
    departure: string;
    arrival: string;
    passengers: number;
    class?: string;
}

export interface AccommodationData {
    nights: number;
    type: string;
    rooms: number;
}

export interface FoodNetworkingData {
    lunches: number;
    dinners: number;
    mealType: string;
    // Séminaires internes
    hasInternalSeminar: boolean;
    seminarDays: number;
    seminarParticipants: number;
    seminarType: string;
    seminarMealsIncluded: boolean;
    // Événements externes
    hasExternalEvent: boolean;
    externalEventType: string;
    externalEventParticipants: number;
    externalEventDays: number;
    hasExhibitorStand: boolean;
}

export interface CarbonResults {
    transport: number;
    accommodation: number;
    food: number;
    event: number;
    total: number;
}

const CarbonCalculator = () => {
    const [currentStep, setCurrentStep] = useState<'home' | 'transport' | 'accommodation' | 'food' | 'results'>('home');
    const [transportData, setTransportData] = useState<TransportData[]>([]);
    const [accommodationData, setAccommodationData] = useState<AccommodationData | null>(null);
    const [foodNetworkingData, setFoodNetworkingData] = useState<FoodNetworkingData | null>(null);
    const [results, setResults] = useState<CarbonResults | null>(null);

    const calculateCarbon = (): CarbonResults => {
        let transport = 0;
        let accommodation = 0;
        let food = 0;
        let event = 0;

        // Transport calculation (simplified)
        transportData.forEach(trip => {
            const distance = 500; // Mock distance
            switch (trip.mode) {
                case 'plane':
                    transport += distance * 0.25 * trip.passengers * (trip.class === 'business' ? 1.5 : 1);
                    break;
                case 'train':
                    transport += distance * 0.05 * trip.passengers;
                    break;
                case 'car':
                    transport += distance * 0.2 * trip.passengers;
                    break;
                case 'bus':
                    transport += distance * 0.08 * trip.passengers;
                    break;
            }
        });

        // Accommodation calculation
        if (accommodationData) {
            const nightlyEmission = accommodationData.type === 'eco-hotel' ? 8 :
                accommodationData.type === 'standard-hotel' ? 14 : 10;
            accommodation = nightlyEmission * accommodationData.nights * accommodationData.rooms;
        }

        // Food calculation
        if (foodNetworkingData) {
            const mealEmission = foodNetworkingData.mealType === 'vegetarian' ? 1.5 :
                foodNetworkingData.mealType === 'vegan' ? 1.0 :
                    foodNetworkingData.mealType === 'premium' ? 3.5 :
                        foodNetworkingData.mealType === 'hotel-buffet' ? 2.0 : 2.5;
            food = (foodNetworkingData.lunches + foodNetworkingData.dinners) * mealEmission;
        }

        // Event calculation
        if (foodNetworkingData?.hasInternalSeminar) {
            const dailyEmission = 7.5;
            event += dailyEmission * foodNetworkingData.seminarDays * foodNetworkingData.seminarParticipants;
        }

        if (foodNetworkingData?.hasExternalEvent) {
            const eventEmission = foodNetworkingData.externalEventType === 'salon' ? 12 :
                foodNetworkingData.externalEventType === 'conference' ? 8 :
                    foodNetworkingData.externalEventType === 'cocktail-networking' ? 5 : 8;
            event += eventEmission * foodNetworkingData.externalEventDays * foodNetworkingData.externalEventParticipants;

            if (foodNetworkingData.hasExhibitorStand) {
                event += 25 * foodNetworkingData.externalEventDays; // Additional emission for stand
            }
        }

        const total = transport + accommodation + food + event;
        return { transport, accommodation, food, event, total };
    };

    const handleStartCalculation = () => {
        setCurrentStep('transport');
    };

    const handleTransportComplete = (data: TransportData[]) => {
        setTransportData(data);
        setCurrentStep('accommodation');
    };

    const handleAccommodationComplete = (data: AccommodationData) => {
        setAccommodationData(data);
        setCurrentStep('food');
    };

    const handleFoodNetworkingComplete = (data: FoodNetworkingData) => {
        setFoodNetworkingData(data);
        const carbonResults = calculateCarbon();
        setResults(carbonResults);
        setCurrentStep('results');
    };

    if (currentStep === 'transport') {
        return <TransportStep onComplete={handleTransportComplete} onBack={() => setCurrentStep('home')} />;
    }

    if (currentStep === 'accommodation') {
        return <AccommodationStep onComplete={handleAccommodationComplete} onBack={() => setCurrentStep('transport')} />;
    }

    if (currentStep === 'food') {
        return <FoodNetworkingStep onComplete={handleFoodNetworkingComplete} onBack={() => setCurrentStep('accommodation')} />;
    }

    if (currentStep === 'results' && results) {
        return <ResultsScreen results={results} onRestart={() => {
            setCurrentStep('home');
            setTransportData([]);
            setAccommodationData(null);
            setFoodNetworkingData(null);
            setResults(null);
        }} />;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 md:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl" style={{ color: '#0d2c59' }}>
                            🌱 Trekr
                        </Link>
                        <Link to="/" className="inline-flex items-center text-muted-foreground transition-colors" style={{ color: '#0d2c59' }}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="py-16 md:py-20" style={{ backgroundColor: '#0d2c59' }}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <Calculator className="w-16 h-16 mx-auto mb-6" style={{ color: '#fd490f' }} />
                        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6">
                            Calculez l'empreinte carbone de vos <span style={{ color: '#fd490f' }}>voyages d'affaires</span>
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                            Transport, hôtel, repas, séminaires → un seul rapport consolidé
                        </p>
                        <Button
                            size="lg"
                            onClick={handleStartCalculation}
                            style={{ backgroundColor: '#fd490f' }}
                            className="hover:opacity-90 text-white px-8 py-4 text-lg font-semibold rounded-full"
                        >
                            Commencer le calcul
                        </Button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" style={{ color: '#0d2c59' }}>
                            Un calcul complet en 3 étapes
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(253, 73, 15, 0.1)' }}>
                                    <span className="text-2xl">🚗</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2" style={{ color: '#0d2c59' }}>Transport</h3>
                                <p className="text-muted-foreground text-sm">Avion, train, voiture ou bus - Multi-trajets supportés</p>
                            </div>

                            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(253, 73, 15, 0.1)' }}>
                                    <span className="text-2xl">🏨</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2" style={{ color: '#0d2c59' }}>Hébergement</h3>
                                <p className="text-muted-foreground text-sm">Hôtel standard, éco-label ou Airbnb</p>
                            </div>

                            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(253, 73, 15, 0.1)' }}>
                                    <span className="text-2xl">🍽️</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2" style={{ color: '#0d2c59' }}>Repas & Événements</h3>
                                <p className="text-muted-foreground text-sm">Restauration et séminaires d'affaires</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarbonCalculator;