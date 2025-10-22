import React from "react";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { FoodNetworkingData } from "./carbonCalulator";

interface FoodNetworkingStepProps {
    onComplete: (data: FoodNetworkingData) => void;
    onBack: () => void;
}

const FoodNetworkingStep = ({ onComplete, onBack }: FoodNetworkingStepProps) => {
    const [data, setData] = useState<FoodNetworkingData>({
        lunches: 0,
        dinners: 0,
        mealType: 'standard',
        // Séminaires internes
        hasInternalSeminar: false,
        seminarDays: 1,
        seminarParticipants: 1,
        seminarType: 'without-accommodation',
        seminarMealsIncluded: false,
        // Événements externes
        hasExternalEvent: false,
        externalEventType: 'salon',
        externalEventParticipants: 1,
        externalEventDays: 1,
        hasExhibitorStand: false
    });

    const handleNext = () => {
        onComplete(data);
    };

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
                                Étape 3: Repas, Séminaires & Événements
                            </h1>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            3 / 3
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8 max-w-2xl">
                <div className="space-y-6">
                    {/* Repas individuels */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                🍽️ Repas individuels
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="lunches">Nombre de déjeuners</Label>
                                    <Input
                                        id="lunches"
                                        type="number"
                                        min="0"
                                        value={data.lunches}
                                        onChange={(e) => setData({ ...data, lunches: parseInt(e.target.value) || 0 })}
                                        className="w-32"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="dinners">Nombre de dîners</Label>
                                    <Input
                                        id="dinners"
                                        type="number"
                                        min="0"
                                        value={data.dinners}
                                        onChange={(e) => setData({ ...data, dinners: parseInt(e.target.value) || 0 })}
                                        className="w-32"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="mealType">Type de repas</Label>
                                <Select value={data.mealType} onValueChange={(value) => setData({ ...data, mealType: value })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="standard">🥩 Standard</SelectItem>
                                        <SelectItem value="vegetarian">🥗 Végétarien</SelectItem>
                                        <SelectItem value="vegan">🌱 Vegan</SelectItem>
                                        <SelectItem value="premium">🍷 Premium</SelectItem>
                                        <SelectItem value="hotel-buffet">🏨 Buffet hôtel</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {(data.mealType === 'vegetarian' || data.mealType === 'vegan') && (
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-green-600">🌱</span>
                                        <span className="font-medium text-green-800">Excellente initiative !</span>
                                    </div>
                                    <p className="text-sm text-green-700">
                                        Les repas {data.mealType === 'vegan' ? 'vegan' : 'végétariens'} réduisent l'empreinte carbone de {data.mealType === 'vegan' ? '60%' : '40%'} par rapport aux repas standards
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Séminaires internes */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                🏢 Séminaires internes
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="hasInternalSeminar"
                                    checked={data.hasInternalSeminar}
                                    onCheckedChange={(checked) => setData({ ...data, hasInternalSeminar: checked })}
                                />
                                <Label htmlFor="hasInternalSeminar">Organiser un séminaire interne</Label>
                            </div>

                            {data.hasInternalSeminar && (
                                <div className="space-y-4 pl-6 border-l-2" style={{ borderColor: '#fd490f' }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="seminarDays">Nombre de jours</Label>
                                            <Input
                                                id="seminarDays"
                                                type="number"
                                                min="1"
                                                value={data.seminarDays}
                                                onChange={(e) => setData({ ...data, seminarDays: parseInt(e.target.value) || 1 })}
                                                className="w-32"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="seminarParticipants">Nombre de participants</Label>
                                            <Input
                                                id="seminarParticipants"
                                                type="number"
                                                min="1"
                                                value={data.seminarParticipants}
                                                onChange={(e) => setData({ ...data, seminarParticipants: parseInt(e.target.value) || 1 })}
                                                className="w-32"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="seminarType">Type de séminaire</Label>
                                        <Select value={data.seminarType} onValueChange={(value) => setData({ ...data, seminarType: value })}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="with-accommodation">🏨 Avec hébergement</SelectItem>
                                                <SelectItem value="without-accommodation">🏢 Sans hébergement</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="seminarMealsIncluded"
                                            checked={data.seminarMealsIncluded}
                                            onCheckedChange={(checked) => setData({ ...data, seminarMealsIncluded: checked as boolean })}
                                        />
                                        <Label htmlFor="seminarMealsIncluded">Repas inclus</Label>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Événements externes & Networking */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                🎤 Événements externes & Networking
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="hasExternalEvent"
                                    checked={data.hasExternalEvent}
                                    onCheckedChange={(checked) => setData({ ...data, hasExternalEvent: checked })}
                                />
                                <Label htmlFor="hasExternalEvent">Participer à un événement externe</Label>
                            </div>

                            {data.hasExternalEvent && (
                                <div className="space-y-4 pl-6 border-l-2" style={{ borderColor: '#fd490f' }}>
                                    <div>
                                        <Label htmlFor="externalEventType">Type d'événement</Label>
                                        <Select value={data.externalEventType} onValueChange={(value) => setData({ ...data, externalEventType: value })}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="salon">🏪 Salon</SelectItem>
                                                <SelectItem value="conference">🎯 Conférence</SelectItem>
                                                <SelectItem value="cocktail-networking">🥂 Cocktail networking</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="externalEventParticipants">Nombre de participants de l'entreprise</Label>
                                            <Input
                                                id="externalEventParticipants"
                                                type="number"
                                                min="1"
                                                value={data.externalEventParticipants}
                                                onChange={(e) => setData({ ...data, externalEventParticipants: parseInt(e.target.value) || 1 })}
                                                className="w-32"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="externalEventDays">Nombre de jours</Label>
                                            <Input
                                                id="externalEventDays"
                                                type="number"
                                                min="1"
                                                value={data.externalEventDays}
                                                onChange={(e) => setData({ ...data, externalEventDays: parseInt(e.target.value) || 1 })}
                                                className="w-32"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="hasExhibitorStand"
                                            checked={data.hasExhibitorStand}
                                            onCheckedChange={(checked) => setData({ ...data, hasExhibitorStand: checked as boolean })}
                                        />
                                        <Label htmlFor="hasExhibitorStand">Stand exposant</Label>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="flex justify-between pt-6">
                        <Button
                            variant="outline"
                            onClick={onBack}
                            className="px-8"
                        >
                            Retour
                        </Button>
                        <Button
                            onClick={handleNext}
                            style={{ backgroundColor: '#fd490f' }}
                            className="hover:opacity-90 text-white px-8"
                        >
                            Étape suivante : Résultats
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodNetworkingStep;