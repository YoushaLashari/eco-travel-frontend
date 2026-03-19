import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Leaf, Plane, Home, Utensils, MapPin, Plus, Check, Target, Train } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Simulation de données ADEME
const mockHabits = [
    {
        id: 1,
        title: "Prendre le train plutôt que l'avion",
        description: "Pour vos trajets en Europe, privilégiez le train",
        category: "Transport",
        level: "Facile",
        co2Saved: 145,
        points: 145,
        icon: "🚂"
    },
    {
        id: 2,
        title: "Choisir un hébergement éco-certifié",
        description: "Optez pour des hôtels avec labels environnementaux",
        category: "Hébergement",
        level: "Facile",
        co2Saved: 25,
        points: 25,
        icon: "🏨"
    },
    {
        id: 3,
        title: "Manger local et de saison",
        description: "Découvrez la cuisine locale et les produits du terroir",
        category: "Alimentation",
        level: "Moyen",
        co2Saved: 40,
        points: 60,
        icon: "🥗"
    },
    {
        id: 4,
        title: "Utiliser les transports en commun locaux",
        description: "Bus, métro, vélo partagé sur votre destination",
        category: "Transport",
        level: "Facile",
        co2Saved: 30,
        points: 30,
        icon: "🚌"
    },
    {
        id: 5,
        title: "Participer à des activités nature",
        description: "Randonnée, observation de la faune, écotourisme",
        category: "Activités",
        level: "Moyen",
        co2Saved: 15,
        points: 45,
        icon: "🌿"
    },
    {
        id: 6,
        title: "Voyage en covoiturage longue distance",
        description: "Partagez votre véhicule ou rejoignez un covoiturage",
        category: "Transport",
        level: "Expert",
        co2Saved: 80,
        points: 120,
        icon: "🚗"
    }
];

const categories = [
    { name: "Tout", icon: Leaf },
    { name: "Transport", icon: Train },
    { name: "Hébergement", icon: Home },
    { name: "Alimentation", icon: Utensils },
    { name: "Activités", icon: MapPin }
];

const levels = ["Tout", "Facile", "Moyen", "Expert"];

const Habits = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState("Tout");
    const [selectedLevel, setSelectedLevel] = useState("Tout");
    const [selectedHabits, setSelectedHabits] = useState<number[]>([]);

    // Budget carbone du voyage (récupéré depuis les paramètres URL ou défaut)
    const tripCO2Budget = parseInt(searchParams.get('budget') || '300');
    const minThreshold = tripCO2Budget;
    const maxThreshold = Math.round(tripCO2Budget * 1.15); // +15% de marge max

    const filteredHabits = mockHabits.filter(habit => {
        const categoryMatch = selectedCategory === "Tout" || habit.category === selectedCategory;
        const levelMatch = selectedLevel === "Tout" || habit.level === selectedLevel;
        return categoryMatch && levelMatch;
    });

    const toggleHabit = (habitId: number) => {
        setSelectedHabits(prev =>
            prev.includes(habitId)
                ? prev.filter(id => id !== habitId)
                : [...prev, habitId]
        );
    };

    const selectedHabitsData = mockHabits.filter(habit => selectedHabits.includes(habit.id));
    const totalCO2Saved = selectedHabitsData.reduce((sum, habit) => sum + habit.co2Saved, 0);
    const totalPoints = selectedHabitsData.reduce((sum, habit) => sum + habit.points, 0);

    // Progression vers l'objectif
    const progressPercentage = Math.min((totalCO2Saved / minThreshold) * 100, 100);
    const isThresholdReached = totalCO2Saved >= minThreshold;
    const isOverThreshold = totalCO2Saved > maxThreshold;

    const handleValidate = () => {
        if (!isThresholdReached || isOverThreshold) return;

        // Sauvegarder le plan de décarbonisation
        const carbonPlan = {
            tripId: searchParams.get('tripId') || Date.now().toString(),
            budget: tripCO2Budget,
            selectedHabits: selectedHabitsData,
            totalCO2Saved,
            status: 'in_progress_decarbonization',
            createdAt: new Date().toISOString(),
            completedActions: []
        };

        // Sauvegarder dans localStorage pour transfert vers MesActions
        localStorage.setItem('carbonPlan', JSON.stringify(carbonPlan));

        // Mettre à jour le statut du voyage de pending_decarbonization -> in_progress_decarbonization
        const trips = JSON.parse(localStorage.getItem('trips') || '[]');
        const tripIndex = trips.findIndex((t: any) => t.id === carbonPlan.tripId);

        if (tripIndex >= 0) {
            trips[tripIndex] = {
                ...trips[tripIndex],
                status: 'in_progress_decarbonization',
                carbonPlan: carbonPlan
            };
            localStorage.setItem('trips', JSON.stringify(trips));
        }

        navigate('/mission-carbon', { state: { activeTab: 'En cours' } });
    };

    return (
        <div className="min-h-screen bg-gradient-subtle bg-main">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-4xl font-bold text-foreground mb-4">
                        Construis ton plan éco-responsable
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Choisis les gestes qui feront la différence pour ton voyage.
                    </p>
                </div>

                {/* Budget Carbone */}
                <Card className="mb-8 border-orange-200 bg-orange-50/50">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Target className="w-6 h-6 text-orange-600" />
                            <h2 className="text-xl font-semibold text-orange-900">Objectif de décarbonisation</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-orange-700">
                                    Budget carbone à compenser : {tripCO2Budget} kg CO₂
                                </span>
                                <span className="text-sm text-orange-600">
                                    {totalCO2Saved} / {minThreshold} kg CO₂
                                </span>
                            </div>

                            <Progress
                                value={progressPercentage}
                                className="h-3"
                            />

                            <div className="flex justify-between text-xs text-orange-600">
                                <span>Minimum requis: {minThreshold} kg</span>
                                <span>Maximum recommandé: {maxThreshold} kg</span>
                            </div>

                            {isThresholdReached && !isOverThreshold && (
                                <div className="text-center text-green-600 font-medium">
                                    ✅ Objectif atteint ! Vous pouvez valider votre plan.
                                </div>
                            )}

                            {isOverThreshold && (
                                <div className="text-center text-orange-600 font-medium">
                                    ⚠️ Vous dépassez la marge recommandée. Ajustez votre sélection.
                                </div>
                            )}

                            {!isThresholdReached && (
                                <div className="text-center text-red-600 font-medium">
                                    ❌ Il vous manque {minThreshold - totalCO2Saved} kg CO₂ pour atteindre l'objectif.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Filtres */}
                <div className="mb-8 space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-foreground">Catégorie</h3>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(({ name, icon: Icon }) => (
                                <Button
                                    key={name}
                                    variant={selectedCategory === name ? "default" : "outline"}
                                    onClick={() => setSelectedCategory(name)}
                                    className="flex items-center gap-2"
                                >
                                    <Icon size={16} />
                                    {name}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-foreground">Niveau</h3>
                        <div className="flex flex-wrap gap-2">
                            {levels.map(level => (
                                <Button
                                    key={level}
                                    variant={selectedLevel === level ? "default" : "outline"}
                                    onClick={() => setSelectedLevel(level)}
                                >
                                    {level}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Liste des habitudes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredHabits.map((habit, index) => (
                        <Card
                            key={habit.id}
                            className="hover:shadow-lg transition-all duration-300 animate-scale-in cursor-pointer border-2"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                borderColor: selectedHabits.includes(habit.id) ? 'hsl(var(--primary))' : undefined
                            }}
                            onClick={() => toggleHabit(habit.id)}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-3xl">{habit.icon}</div>
                                    <div className="flex items-center gap-2">
                                        {selectedHabits.includes(habit.id) ? (
                                            <Check className="w-6 h-6 text-primary" />
                                        ) : (
                                            <Plus className="w-6 h-6 text-muted-foreground" />
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold mb-2 text-foreground">{habit.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{habit.description}</p>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-success">-{habit.co2Saved} kg CO₂</span>
                                        <Badge variant="secondary">+{habit.points} GreenPoints</Badge>
                                    </div>
                                    <div className="flex gap-2">
                                        <Badge variant="outline" className="text-xs">{habit.category}</Badge>
                                        <Badge variant={habit.level === "Facile" ? "secondary" : habit.level === "Moyen" ? "default" : "destructive"} className="text-xs">
                                            {habit.level}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Résumé sélection */}
                {selectedHabits.length > 0 && (
                    <Card className="bg-gradient-card border-primary/20 animate-slide-up">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-4 text-foreground">Résumé de votre sélection</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">{selectedHabits.length}</div>
                                    <div className="text-sm text-muted-foreground">Habitudes choisies</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-success">{totalCO2Saved} kg</div>
                                    <div className="text-sm text-muted-foreground">CO₂ évité</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">{totalPoints}</div>
                                    <div className="text-sm text-muted-foreground">Points Green League</div>
                                </div>
                            </div>
                            <Button
                                onClick={handleValidate}
                                disabled={!isThresholdReached || isOverThreshold}
                                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                size="lg"
                            >
                                {!isThresholdReached
                                    ? `Manque ${minThreshold - totalCO2Saved} kg CO₂`
                                    : isOverThreshold
                                        ? "Réduisez votre sélection"
                                        : "Valider mon plan de décarbonisation"
                                }
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default Habits;