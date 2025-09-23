import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Train, Home, Utensils, Plus , Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

type TabType = "nouveaux" | "En cours" | "decarbonises";

interface Action {
    id: string;
    title: string;
    description: string;
    co2Saved: number;
    points: number;
    icon: React.ComponentType<{ className?: string }>;
    completed?: boolean;
}

interface Trip {
    id: string;
    title: string;
    location: string;
    status: "nouveau" | "En cours" | "decarborise";
    progress?: number;
    completedActions?: number;
    totalActions: number;
    co2Saved?: number;
    points: number;
    actions: Action[];
}

const mockTrips: Trip[] = [
    {
        id: "1",
        title: "Escapade à Paris",
        location: "Paris, France",
        status: "nouveau",
        totalActions: 5,
        points: 0,
        actions: [
            { 
                id: "1",
                title: "Prendre le train plutôt que l'avion",
                description: "90% moins de CO₂ qu'un vol court-courrier",
                co2Saved: 150,
                points: 50,
                icon: Train
            },
            {
                id: "2",
                title: "Choisir un hébergement éco-certifié",
                description: "30% moins d'impact qu'un hôtel traditionnel",
                co2Saved: 25,
                points: 30,
                icon: Home
            },
            {
                id: "3",
                title: "Manger local et de saison",
                description: "",
                co2Saved: 40,
                points: 20,
                icon: Utensils
            }
        ]
    },
    {
        id: "2",
        title: "Week-end en Provence",
        location: "Provence, France",
        status: "En cours",
        progress: 60,
        completedActions: 3,
        totalActions: 5,
        points: 95,
        actions: [
            {
                id: "4",
                title: "Prendre le train plutôt que l'avion",
                description: "Opter pour le transport ferroviaire réduit considérablement votre empreinte carbone",
                co2Saved: 150,
                points: 50,
                icon: Train,
                completed: true
            },
            {
                id: "5",
                title: "Choisir un hébergement éco-certifié",
                description: "Séjourner dans un établissement avec une certification environnementale",
                co2Saved: 25,
                points: 30,
                icon: Home,
                completed: true
            }
        ]
    },
    {
        id: "3",
        title: "Séjour à Rome",
        location: "Rome, Italie",
        status: "decarborise",
        progress: 100,
        completedActions: 5,
        totalActions: 5,
        co2Saved: 100,
        points: 140,
        actions: []
    }
];

export default function Actions() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>("nouveaux");
    const [trips, setTrips] = useState<Trip[]>(mockTrips);
    const [visibleActions, setVisibleActions] = useState<Record<string, boolean>>({});

    // Charger le plan de décarbonisation depuis localStorage au chargement
    useEffect(() => {
        const carbonPlan = localStorage.getItem('carbonPlan');
        if (carbonPlan) {
            const plan = JSON.parse(carbonPlan);
      
            // Mettre à jour ou ajouter le voyage avec plan de décarbonisation
            setTrips(prevTrips => {
                const existingTripIndex = prevTrips.findIndex(t => t.id === plan.tripId);
        
                const tripActions = plan.selectedHabits.map((habit: any) => ({
                    id: habit.id.toString(),
                    title: habit.title,
                    description: habit.description,
                    co2Saved: habit.co2Saved,
                    points: habit.points,
                    icon: Train, // Default icon
                    completed: plan.completedActions.includes(habit.id)
                }));
        
                const completedCount = plan.completedActions.length;
                const totalCount = plan.selectedHabits.length;
                const progress = Math.round((completedCount / totalCount) * 100);
        
                // Déterminer le statut automatiquement
                let status: "nouveau" | "En cours" | "decarborise";
                if (plan.status === 'in_progress_decarbonization') {
                    status = completedCount === totalCount ? "decarborise" : "En cours";
                } else {
                    status = "nouveau";
                }
        
                if (existingTripIndex >= 0) {
                    const updatedTrips = [...prevTrips];
                    updatedTrips[existingTripIndex] = {
                        ...updatedTrips[existingTripIndex],
                        status,
                        actions: tripActions,
                        totalActions: totalCount,
                        completedActions: completedCount,
                        progress,
                        co2Saved: completedCount === totalCount ? plan.totalCO2Saved : undefined,
                        points: completedCount * 25
                    };
                    return updatedTrips;
                } else {
                    // Créer un nouveau voyage
                    const newTrip: Trip = {
                        id: plan.tripId,
                        title: "Mon plan de décarbonisation",
                        location: "Voyage éco-responsable",
                        status,
                        actions: tripActions,
                        totalActions: totalCount,
                        completedActions: completedCount,
                        progress,
                        co2Saved: completedCount === totalCount ? plan.totalCO2Saved : undefined,
                        points: completedCount * 25
                    };
                    return [...prevTrips, newTrip];
                }
            });
      
            // Nettoyer le localStorage après traitement
            localStorage.removeItem('carbonPlan');
        }
    }, []);

    const toggleAction = (tripId: string, actionId: string) => {
        setTrips(prevTrips => {
            const updatedTrips = prevTrips.map(trip => {
                if (trip.id === tripId && trip.status === "En cours") {
                    const updatedActions = trip.actions.map(action => 
                        action.id === actionId 
                        ? { ...action, completed: !action.completed }
                        : action
                    );
          
                    const completedCount = updatedActions.filter(a => a.completed).length;
                    const newProgress = Math.round((completedCount / trip.totalActions) * 100);
          
                    // Transition automatique vers "décarbonisés" quand 100% des actions sont complétées
                    const newStatus: "nouveau" | "En cours" | "decarborise" = 
                    completedCount === trip.totalActions ? "decarborise" : "En cours";
          
                    // Calculer le CO₂ économisé total si toutes les actions sont complétées
                    const totalCO2Saved = completedCount === trip.totalActions 
                    ? updatedActions.reduce((sum, action) => sum + action.co2Saved, 0)
                    : undefined;
          
                    const updatedTrip = {
                        ...trip,
                        actions: updatedActions,
                        completedActions: completedCount,
                        progress: newProgress,
                        status: newStatus,
                        points: completedCount * 25,
                        co2Saved: totalCO2Saved
                    };
          
                    // Si le voyage vient d'être complété (transition vers "decarborise")
                    if (newStatus === "decarborise" && trip.status === "En cours") {
                        // Ici on pourrait ajouter une notification ou un événement
                        console.log(`Félicitations ! Votre voyage "${trip.title}" a été complètement décarbonisé !`);
                    }
          
                    return updatedTrip;
                }
                return trip;
            });
      
            // Sauvegarder l'état mis à jour dans localStorage pour persistance
            localStorage.setItem('trips', JSON.stringify(updatedTrips));
            return updatedTrips;
        });
    };

    const toggleActionVisibility = (tripId: string) => {
        setVisibleActions(prev => ({
            ...prev,
            [tripId]: !prev[tripId]
        }));
    };

    const filteredTrips = trips.filter(trip => {
        switch (activeTab) {
            case "nouveaux":
                return trip.status === "nouveau";
            case "En cours":
                return trip.status === "En cours";
            case "decarbonises":
                return trip.status === "decarborise";
            default:
                return false;
        }
    });

    const getTabButtonClass = (tab: TabType) => {
        const baseClass = "px-3 py-2 sm:px-6 sm:py-3 rounded-full font-medium transition-all text-sm sm:text-base";
    
        if (activeTab === tab) {
            switch (tab) {
                case "nouveaux":
                    return `${baseClass} bg-orange-500 text-white shadow-md`;
                case "En cours":
                    return `${baseClass} bg-blue-900 text-white shadow-md`;
                case "decarbonises":
                    return `${baseClass} bg-red-300 text-gray-800 shadow-md`;
                default:
                    return baseClass;
            }
        }
    
        return `${baseClass} bg-gray-100 text-gray-600 hover:bg-gray-200`;
    };

    return (
        <div className="bg-main min-h-screen">
            {/* <Helmet>
                <title>Mission Carbone - Trekr</title>
                <meta name="description" content="Mission Carbone : réduisez votre empreinte carbone à chaque voyage avec des actions simples et efficaces." />
            </Helmet> */}

            <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 px-4 md:px-6 bg-main">
                {/* Header */}
                <div className="text-center space-y-3 md:space-y-4">
                    <h1 className="text-2xl md:text-4xl font-bold text-blue-900 pt-4">
                        Mission Carbone 🌱
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 px-4 md:px-0">
                        Réduisez votre empreinte carbone voyage après voyage
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                    <button
                        onClick={() => setActiveTab("nouveaux")}
                        className={getTabButtonClass("nouveaux")}
                    >
                        <Clock className="w-4 h-4 mr-2 inline" />
                        <span className="hidden sm:inline">Nouveaux voyages</span>
                        <span className="sm:hidden">Nouveaux</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("En cours")}
                        className={getTabButtonClass("En cours")}
                    >
                        <Calendar className="w-4 h-4 mr-2 inline" />
                        <span className="hidden sm:inline">Voyages en cours</span>
                        <span className="sm:hidden">En cours</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("decarbonises")}
                        className={getTabButtonClass("decarbonises")}
                    >
                        <CheckCircle className="w-4 h-4 mr-2 inline" />
                        <span className="hidden sm:inline">Voyages décarbonisés</span>
                        <span className="sm:hidden">Décarbonisés</span>
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {filteredTrips.map((trip) => (
                        <Card key={trip.id} className="shadow-lg">
                            <CardHeader className="pb-4 md:pb-6">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
                                    <div className="flex-1">
                                        <CardTitle className="text-xl md:text-2xl text-blue-900 mb-1 md:mb-2">
                                            {trip.title}
                                        </CardTitle>
                                        <p className="text-sm md:text-base text-gray-600">{trip.location}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {trip.status === "En cours" && (
                                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs md:text-sm">
                                                En cours
                                            </Badge>
                                        )}
                                        {trip.status === "nouveau" && (
                                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs md:text-sm">
                                                Nouveau
                                            </Badge>
                                        )}
                                        {trip.status === "decarborise" && (
                                            <>
                                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs md:text-sm">
                                                    Décarbonisé
                                                </Badge>
                                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs md:text-sm">
                                                    <span className="hidden sm:inline">👑 Voyageur Éco-Exemplaire</span>
                                                    <span className="sm:hidden">👑 Éco-Exemplaire</span>
                                                </Badge>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="px-4 md:px-6">
                                {/* Progress section for ongoing trips */}
                                {trip.status === "En cours" && (
                                    <div className="mb-4 md:mb-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium">Progression CO₂</span>
                                            <span className="text-sm font-bold">{trip.progress}%</span>
                                        </div>
                                        <Progress value={trip.progress} className="h-2 mb-4" />
                                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 text-sm">
                                            <span className="flex items-center gap-1">
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                                {trip.completedActions}/{trip.totalActions} actions
                                            </span>
                                            <span className="flex items-center gap-1 text-orange-600">
                                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                                {trip.points} GreenPoints
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Statistics for completed trips */}
                                {trip.status === "decarborise" && (
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">
                                                {trip.co2Saved}%
                                            </div>
                                            <div className="text-xs md:text-sm text-gray-600">CO₂ économisé</div>
                                        </div>
                                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                                            <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">
                                                {trip.points}
                                            </div>
                                            <div className="text-xs md:text-sm text-gray-600">GreenPoints</div>
                                        </div>
                                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                                            <div className="text-2xl md:text-3xl font-bold text-blue-900 mb-1">
                                                {trip.completedActions}/{trip.totalActions}
                                            </div>
                                            <div className="text-xs md:text-sm text-gray-600">Actions validées</div>
                                        </div>
                                    </div>
                                )}

                                {/* Actions list */}
                                {trip.actions.length > 0 && trip.status !== "nouveau" && (
                                    <>
                                        {trip.status === "En cours" && (
                                            <h3 className="font-semibold text-blue-900 mb-3 md:mb-4 text-base md:text-lg">Actions à valider :</h3>
                                        )}  

                                        {/* Show actions for in-progress trips or when visibility is toggled for completed trips */}
                                        {(trip.status === "En cours" || (trip.status === "decarborise" && visibleActions[trip.id])) && (
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                                                {trip.actions.map((action) => {
                                                    const IconComponent = action.icon;
                                                    
                                                    return (
                                                        <div
                                                            key={action.id}
                                                            className={`p-3 md:p-4 rounded-lg border transition-colors ${
                                                                action.completed
                                                                ? "bg-green-50 border-green-200"
                                                                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                                                            }`}
                                                        >
                                                            <div className="flex items-start gap-2 md:gap-3">
                                                                {trip.status === "En cours" && (
                                                                    <Checkbox
                                                                        checked={action.completed || false}
                                                                        onCheckedChange={() => toggleAction(trip.id, action.id)}
                                                                        className="mt-1"
                                                                    />
                                                                )}
                                
                                                                <div className={`p-1.5 md:p-2 rounded-lg ${
                                                                        action.completed ? "bg-green-100" : "bg-orange-100"
                                                                    }`}
                                                                >
                                                                    <IconComponent className={`w-4 h-4 md:w-5 md:h-5 ${
                                                                            action.completed ? "text-green-600" : "text-orange-600"
                                                                        }`} 
                                                                    />
                                                                </div>
                                
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <h4 className="font-medium text-blue-900 text-sm md:text-base">
                                                                            {action.title}
                                                                        </h4>
                                                                        {action.completed && (
                                                                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                                        )}
                                                                    </div>
                                  
                                                                    {action.description && (
                                                                        <p className="text-xs md:text-sm text-gray-600 mb-2">
                                                                            {action.description}
                                                                        </p>
                                                                    )}
                                  
                                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs md:text-sm">
                                                                        <span className="text-red-600 font-medium">
                                                                            -{action.co2Saved}kg CO₂
                                                                        </span>
                                                                        <span className="text-green-600 font-medium">
                                                                            +{action.points} GreenPoints
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                              
                                                            {action.completed && (
                                                                <div className="mt-3 p-2 bg-green-100 rounded text-xs md:text-sm text-green-700 flex flex-col sm:flex-row sm:items-center gap-2">
                                                                    <span className="flex-1">🎉 Félicitations ! Cette action contribue à réduire votre empreinte carbone.</span>
                                                                    <Badge variant="outline" className="bg-green-200 text-green-800 border-green-300 text-xs">
                                                                        ✅ Validée !
                                                                    </Badge>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                        
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Action buttons */}
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                                    {trip.status === "nouveau" && (
                                        <Button 
                                            onClick={() => navigate(`/habits/${trip.id}`)}
                                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 md:px-8 py-2 md:py-3 rounded-full font-medium text-sm md:text-base w-full sm:w-auto"
                                        >
                                            <span className="hidden sm:inline">Commencer mon plan de décarbonisation</span>
                                            <span className="sm:hidden">Commencer le plan</span>
                                        </Button>
                                    )}
                  
                                    {trip.status === "decarborise" && (
                                        <>
                                            <Button 
                                                variant="outline" 
                                                className="text-blue-900 border-blue-200 text-sm md:text-base w-full sm:w-auto order-2 sm:order-1"
                                                onClick={() => toggleActionVisibility(trip.id)}
                                            >
                                                {visibleActions[trip.id] ? "Masquer mes actions" : "Voir mes actions validées"}
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                className="text-red-600 border-red-200 text-sm md:text-base w-full sm:w-auto order-1 sm:order-2"
                                            >
                                                <span className="hidden sm:inline">Supprimer définitivement</span>
                                                <span className="sm:hidden">Supprimer</span>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredTrips.length === 0 && (
                    <div className="text-center py-8 md:py-12 px-4">
                        <div className="text-gray-400 mb-4">
                            <Calendar className="w-12 h-12 md:w-16 md:h-16 mx-auto" />
                        </div>
                        <h3 className="text-lg md:text-xl font-medium text-gray-600 mb-2">
                            Aucun voyage dans cette catégorie
                        </h3>
                        <p className="text-sm md:text-base text-gray-500">
                            {activeTab === "nouveaux" && "Planifiez votre prochain voyage éco-responsable"}
                            {activeTab === "En cours" && "Aucun voyage en cours de décarbonisation"}
                            {activeTab === "decarbonises" && "Aucun voyage complètement décarbonisé pour le moment"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}