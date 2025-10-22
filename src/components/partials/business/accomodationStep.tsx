import React from "react";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { AccommodationData } from "./carbonCalulator";

interface AccommodationStepProps {
    onComplete: (data: AccommodationData) => void;
    onBack: () => void;
}

const AccommodationStep = ({ onComplete, onBack }: AccommodationStepProps) => {
    const [data, setData] = useState<AccommodationData>({
        nights: 1,
        type: '',
        rooms: 1
    });

    const handleNext = () => {
        if (data.type && data.nights > 0 && data.rooms > 0) {
            onComplete(data);
        }
    };

    const isValid = data.type && data.nights > 0 && data.rooms > 0;

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
                                Étape 2: Hébergement
                            </h1>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            2 / 3
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            🏨 Informations d'hébergement
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label htmlFor="nights">Nombre de nuits</Label>
                            <Input
                                id="nights"
                                type="number"
                                min="1"
                                value={data.nights}
                                onChange={(e) => setData({ ...data, nights: parseInt(e.target.value) || 1 })}
                                className="w-32"
                            />
                        </div>

                        <div>
                            <Label htmlFor="type">Type d'hébergement</Label>
                            <Select value={data.type} onValueChange={(value) => setData({ ...data, type: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner le type..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="standard-hotel">🏨 Hôtel standard</SelectItem>
                                    <SelectItem value="eco-hotel">🌿 Hôtel éco-label</SelectItem>
                                    <SelectItem value="airbnb">🏠 Airbnb</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="rooms">Nombre de chambres</Label>
                            <Input
                                id="rooms"
                                type="number"
                                min="1"
                                value={data.rooms}
                                onChange={(e) => setData({ ...data, rooms: parseInt(e.target.value) || 1 })}
                                className="w-32"
                            />
                        </div>

                        {/* Info cards */}
                        <div className="space-y-3 mt-6">
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-green-600">🌿</span>
                                    <span className="font-medium text-green-800">Hôtel éco-label</span>
                                </div>
                                <p className="text-sm text-green-700">
                                    Réduction de 43% des émissions CO₂ par rapport à un hôtel standard
                                </p>
                            </div>

                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-blue-600">ℹ️</span>
                                    <span className="font-medium text-blue-800">Calcul personnalisé</span>
                                </div>
                                <p className="text-sm text-blue-700">
                                    Les émissions sont calculées par nuit et par chambre selon le type d'hébergement
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end pt-6">
                    <Button
                        onClick={handleNext}
                        disabled={!isValid}
                        style={{ backgroundColor: '#fd490f' }}
                        className="hover:opacity-90 text-white px-8"
                    >
                        Étape suivante: Restauration & Networking
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AccommodationStep;