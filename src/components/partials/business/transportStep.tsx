import React from "react";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { TransportData } from "./carbonCalulator";

interface TransportStepProps {
    onComplete: (data: TransportData[]) => void;
    onBack: () => void;
}

const TransportStep = ({ onComplete, onBack }: TransportStepProps) => {
    const [trips, setTrips] = useState<TransportData[]>([{
        mode: '',
        departure: '',
        arrival: '',
        passengers: 1,
        class: 'economy'
    }]);

    const addTrip = () => {
        setTrips([...trips, {
            mode: '',
            departure: '',
            arrival: '',
            passengers: 1,
            class: 'economy'
        }]);
    };

    const removeTrip = (index: number) => {
        if (trips.length > 1) {
            setTrips(trips.filter((_, i) => i !== index));
        }
    };

    const updateTrip = (index: number, field: keyof TransportData, value: string | number) => {
        const newTrips = [...trips];
        newTrips[index] = { ...newTrips[index], [field]: value };
        setTrips(newTrips);
    };

    const handleNext = () => {
        const validTrips = trips.filter(trip =>
            trip.mode && trip.departure && trip.arrival && trip.passengers > 0
        );

        if (validTrips.length > 0) {
            onComplete(validTrips);
        }
    };

    const isValid = trips.some(trip =>
        trip.mode && trip.departure && trip.arrival && trip.passengers > 0
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 md:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" onClick={onBack} className="p-2">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <h1 className="text-2xl font-bold" style={{ color: '#0d2c59' }}>
                                Étape 1: Transport
                            </h1>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            1 / 3
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8 max-w-3xl">
                <div className="space-y-6">
                    {trips.map((trip, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                                <CardTitle className="text-lg">
                                    Trajet {index + 1}
                                </CardTitle>
                                {trips.length > 1 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeTrip(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor={`mode-${index}`}>Mode de transport</Label>
                                        <Select value={trip.mode} onValueChange={(value) => updateTrip(index, 'mode', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="plane">✈️ Avion</SelectItem>
                                                <SelectItem value="train">🚆 Train</SelectItem>
                                                <SelectItem value="car">🚗 Voiture</SelectItem>
                                                <SelectItem value="bus">🚌 Bus</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {trip.mode === 'plane' && (
                                        <div>
                                            <Label htmlFor={`class-${index}`}>Classe</Label>
                                            <Select value={trip.class} onValueChange={(value) => updateTrip(index, 'class', value)}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="economy">Économique</SelectItem>
                                                    <SelectItem value="business">Business</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor={`departure-${index}`}>Ville de départ</Label>
                                        <Input
                                            id={`departure-${index}`}
                                            value={trip.departure}
                                            onChange={(e) => updateTrip(index, 'departure', e.target.value)}
                                            placeholder="Paris"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor={`arrival-${index}`}>Ville d'arrivée</Label>
                                        <Input
                                            id={`arrival-${index}`}
                                            value={trip.arrival}
                                            onChange={(e) => updateTrip(index, 'arrival', e.target.value)}
                                            placeholder="Lyon"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor={`passengers-${index}`}>Nombre de passagers</Label>
                                    <Input
                                        id={`passengers-${index}`}
                                        type="number"
                                        min="1"
                                        value={trip.passengers}
                                        onChange={(e) => updateTrip(index, 'passengers', parseInt(e.target.value) || 1)}
                                        className="w-32"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <Button
                        variant="outline"
                        onClick={addTrip}
                        className="w-full"
                        style={{ borderColor: '#fd490f', color: '#fd490f' }}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter un trajet
                    </Button>

                    <div className="flex justify-end pt-6">
                        <Button
                            onClick={handleNext}
                            disabled={!isValid}
                            style={{ backgroundColor: '#fd490f' }}
                            className="hover:opacity-90 text-white px-8"
                        >
                            Étape suivante: Hébergement
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransportStep;